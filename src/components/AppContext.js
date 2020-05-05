import ListCriteria from '../service/model/ListCriteria'
import AdCategory from '../service/model/AdCategory'
import AttributeFilter from '../service/model/AttributeFilter'
import { router } from '../router'
import { categoryLookup, categoryIdLookup, stateName } from '../service/AppData'
import StorageUtils from '../util/StorageUtil'
import FilterParams from './FilterParams'

export default class AppContext {
    static _filterParams = new FilterParams

    static getParams() {
        return this._filterParams.current()
    }

    static updateContext({routeParams = {}, routeQueries = {}}) {
        if (routeParams['categoryName']) {
            routeParams['categoryId'] = categoryIdLookup(routeParams['categoryName'])
        }

        this._filterParams.merge(routeParams, true)
        this._filterParams.merge(routeQueries, true)
        
        this._mergeFromLocal()

        // store back locally
        this._updateLocal()
    }

    static getState() {
        return this._filterParams.getState()
    }

    // _state should always be stored in lower case
    static changeState(theState) {
        if (this._isValidStateSelection(theState)) {
            this._filterParams.setState(theState)
        } else {
            this._filterParams.setState(null)
        }

        // merge with the rest of the contexts
        this._updateLocal()

        let {path} = this.makePath()
        router.push(path)
    }

    static _isValidStateSelection(theState) {
        let name = stateName(theState)
        if (name && name.toLowerCase() !== 'nationwide') {
            return true
        }
        return false
    }

    static _mergeFromLocal() {
        let localParams = StorageUtils.get('context')
        if (localParams != null && typeof localParams === 'object') {
            this._filterParams.merge(localParams, false)
        }
    }

    static _updateLocal() {
        let params = this._filterParams.forLocalCopy()

        if (Object.keys(params).length > 0) {
            StorageUtils.save('context', params)
        } else {
            StorageUtils.delete('context')
        }
    }

    // This call should not update the states
    static makePath(otherParams = {}) {
        let fp = new FilterParams(this._filterParams)
        fp.merge(otherParams, true)

        let pathParams = []
        if (fp.getState()) {
            pathParams.push(fp.getState())
        }

        if (fp.getCategoryId()) {
            const category = categoryLookup(fp.getCategoryId())
            pathParams.push(category.uri)
        }

        let path = '/' + pathParams.join('/')

        let queryParams = {}
        for (let name in fp.getFilters()) {
            queryParams[name] = fp.getFilters()[name]
        }

        return {path: path, queryParams: queryParams}
    }

    static searchCriteria() {
        let listCriteria = new ListCriteria()

        console.log('....', this._filterParams)

        if (this._filterParams.getCategoryId()) {
            let category = new AdCategory()
            category.id = this._filterParams.getCategoryId()
            listCriteria.category = category
        }

        if (this._filterParams.getState()) {
            listCriteria.addFilter(AttributeFilter.eq('state', this._filterParams.getState()))
        }

        listCriteria.page = this._filterParams.getPage()

        for (let name in this._filterParams.getFilters()) {
            let value = this._filterParams.getFilters()[name]
            if (value !== null && typeof value !== 'undefined') {
                value = value.replace(/\s/g,'')
                if (value.length == 0) {
                    continue
                }

                if (value.includes('-')) {
                    let parts = value.split('-')
                    if (parts[0] && parts[1]) {
                        listCriteria.addFilter(AttributeFilter.range(name, parts[0], parts[1]))
                    } else if (parts[0]) {
                        listCriteria.addFilter(AttributeFilter.gt(name, parts[0]))
                    } else if (parts[1]) {
                        listCriteria.addFilter(AttributeFilter.lt(name, parts[1]))
                    }
                } else if (value.includes(',')) {
                    let parts = value.split(',')
                    listCriteria.addFilter(AttributeFilter.in(name, parts))
                } else {
                    listCriteria.addFilter(AttributeFilter.eq(name, value))
                }
            }
        }

        return listCriteria
    }
}