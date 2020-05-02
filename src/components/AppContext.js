import ListCriteria from '../service/model/ListCriteria'
import AdCategory from '../service/model/AdCategory'
import PropertyLocation from '../service/model/PropertyLocation'
import AttributeFilter from '../service/model/AttributeFilter'
import { router } from '../router'
import { CATEGORIES, stateName } from '../service/AppData'
import StorageUtils from '../util/StorageUtil'
import FmrUtils from '../util/FmrUtils'

export default class AppContext {
    static _params = {
        state: null,
        city: null,
        zipCode: null,
        categoryId: 0,
        filters: {}
    }

    static updateContext({routeParams = {}, routeQueries = {}}) {
        this._params = this._merge(this._params, routeParams)
        this._params['filters'] = this._merge(this._params['filters'], routeQueries)
        
        this._mergeFromLocal()

        // store back locally
        this._updateLocal()

        console.log('AppContext updated: ', AppContext.searchCriteria())
    }

    // _state should always be stored in lower case
    static changeState(theState) {
        if (this._isValidStateSelection(theState)) {
            this._params['state'] = theState
        } else {
            this._params['state'] = null
        }

        // merge with the rest of the contexts
        this._updateLocal()

        router.push(this.makePath())
    }

    static _merge(thisParams, otherParams) {
        let mergedParams = {}
        for (let name in thisParams) {
            if (name !== 'filters') {
                if (otherParams[name]) {
                    mergedParams[name] = otherParams[name]
                } else {
                    mergedParams[name] = thisParams[name]
                }
            }
        }
        return mergedParams
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
            for (let name in localParams) {
                if (!this._params[name] && localParams[name]) {
                    this._params[name] = localParams[name]
                }
            }
        }
    }

    static _updateLocal() {
        let params = {}

        for (let name in this._params) {
            if (this._params[name]) {
                params[name] = this._params[name]
            }
        }
        if (Object.keys(params).length > 0) {
            StorageUtils.save('context', params)
        } else {
            StorageUtils.delete('context')
        }
    }

    static changeFilter({name = '', value = ''}) {
        switch(name) {
        case 'city':
            this._params[name] = value
            break;
        case 'zip':
            this._params[name] = value
            break;
        case 'bedroom':
            this._params[name] = value
            break;
        case 'bathroom':
            this._params[name] = value
            break;
        }
    }

    static getState() {
        return this._params['state']
    }

    // This call should not update the states
    static makePath(otherParams = {state: null, city: null, zipCode: null, categoryId: null, pageId: null}) {
        let mergedParams = this._merge(this._params, otherParams)

        let params = []

        if (mergedParams['state'] && mergedParams['state'] !== 'all') {
            params.push(mergedParams['state'])
        }

        if (mergedParams['categoryId']) {
            const category = CATEGORIES[mergedParams['categoryId']]
            if (category) {
                params.push(category.uri)
            }
        }

        let uri = '/' + params.join('/')

        if (mergedParams['city']) {
            uri = FmrUtils.addParamToUri(uri, 'city', mergedParams['city'])
        }

        if (mergedParams['zipCode']) {
            uri = FmrUtils.addParamToUri(uri, 'zipCode', mergedParams['zipCode'])
        }

        for (let name in mergedParams['filters']) {
            uri = FmrUtils.addParamToUri(uri, name, mergedParams['filters'])
        }

        return uri
    }

    static searchCriteria() {
        let listCriteria = new ListCriteria()
        let location = new PropertyLocation()

        // category
        if (this._params['categoryId']) {
            let category = new AdCategory()
            category.id = this._params['categoryId']
            listCriteria.category = category
        }

        // location
        if (this._params['state'] !== null) {
            location.state = this._params['state']
        }
        listCriteria.location = location

        // filters
        if (this._params['zipCode']) {
            listCriteria.addFilter(AttributeFilter.eq('zip_code', this._params['zipCode']))
        }

        return listCriteria
    }
}