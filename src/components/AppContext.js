import ListCriteria from '../service/model/ListCriteria'
import AdCategory from '../service/model/AdCategory'
import AttributeFilter from '../service/model/AttributeFilter'
import { categoryLookup, categoryIdLookup, stateName } from '../service/AppData'
import StorageUtils from '../util/StorageUtil'
import FilterParams from './FilterParams'

export default class AppContext {
    static _filterParams = new FilterParams

    static getParams() {
        return this._filterParams.current()
    }

    // called by router to set the context
    static updateContext({routeParams = {}, routeQueries = {}}) {
        // convert the category name in the uri to category id
        if (routeParams['categoryName']) {
            routeParams['categoryId'] = categoryIdLookup(routeParams['categoryName'])
        }

        // merge into the context and overwrite existing values
        this._filterParams.merge(routeParams, true)
        this._filterParams.merge(routeQueries, true)
        
        console.log('From the route....', this._filterParams);

        // merge the locally saved context.
        this._mergeFromLocal()

        // store back locally
        this._updateLocal()
    }

    static getState() {
        return this._filterParams.getState()
    }

    // _state should always be stored in lower case
    static changeState(stateCode) {
        if (!stateCode || stateCode === 'all') {
            this._filterParams.setState(null)
        } else {
            if (stateName(stateCode)) {
                this._filterParams.setState(stateCode)
            } else {
                this._filterParams.setState(null)
            }    
        }

        this._updateLocal()

        return this.makePath()
    }

    // This call creates path and params for the route, it should not update the context
    static makePath(updateParams = {}) {
        let fp = new FilterParams(this._filterParams)
        fp.merge(updateParams, true)

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
            if (!FilterParams.noValue(fp.getFilters()[name])) {
                queryParams[name] = fp.getFilters()[name]
            }
        }

        return {path: path, queryParams: queryParams}
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

    static searchCriteria() {
        let listCriteria = new ListCriteria()

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
                    listCriteria.addFilter(AttributeFilter.range(name, value))
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