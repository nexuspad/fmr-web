export default class FilterParams {
    _state = null
    _categoryId = 0
    _fsbo = false

    _filters = {
        'zip_code': '',
        'city': '',
        'bedroom': '',
        'bathroom': '',
        'price': '',
        'rent': ''
    };
    _page = 1

    constructor(otherFilterParam) {
        if (otherFilterParam) {
            this._state = otherFilterParam._state
            this._fsbo = otherFilterParam._fsbo
            this._categoryId = otherFilterParam._categoryId
            this._page = otherFilterParam._page
            this._filters = {}
            for (let name in otherFilterParam._filters) {
                this._filters[name] = otherFilterParam._filters[name]
            }
        }
    }

    getState() {
        return this._state
    }
    setState(state) {
        this._state = state
    }

    getCategoryId() {
        return this._categoryId
    }

    setFsbo(isFsbo) {
        this._fsbo = isFsbo
    }

    isFsbo() {
        return this._fsbo
    }

    getPage() {
        return this._page
    }

    getFilters() {
        return this._filters
    }

    mergePathParams(pathParams) {
        if (pathParams['state']) {
            this._state = pathParams['state'].toLowerCase()
        }

        if (FilterParams.hasValue(pathParams['categoryId'])) {
            this._categoryId = pathParams['categoryId']
        }
        
        if (pathParams['fsbo']) {
            this._fsbo = true
        } else {
            this._fsbo = false;
        }

    }

    mergeQueryParams(queryParams) {
        if (queryParams['page']) {
            this._page = queryParams['page']
        }

        for (let name in this._filters) {
            if (FilterParams.noValue(queryParams[name])) {       // this means the parameter should be removed
                this._filters[name] = ''
            } else {
                this._filters[name] = queryParams[name]
            }
        }
    }

    removeFilter(removeName) {
        for (let name in this._filters) {
            if (name === removeName) {
                this._filters[name] = ''
            }
        }
    }

    current() {
        return {
            'state': this._state,
            'categoryId': this._categoryId,
            'page': this._page,
            'filters': this._filters
        }
    }

    forLocalCopy() {
        let json = {}
        if (this._state) {
            json['state'] = this._state
        }
        if (this.categoryId) {
            json['categoryId'] = this._categoryId
        }
        return json
    }

    static hasValue(value) {
        return !FilterParams.noValue(value)
    }

    static noValue(value) {
        return value === null || typeof value === 'undefined' || value.length === 0 ? true : false
    }
}