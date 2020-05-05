export default class FilterParams {
    _state = null
    _categoryId = 0
    _filters = {
        'zip_code': '',
        'bedroom': '',
        'bathroom': '',
        'price': '',
        'rent': ''
    };
    _page = 1

    constructor(otherFilterParam) {
        if (otherFilterParam) {
            this._state = otherFilterParam._state
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

    getPage() {
        return this._page
    }

    getFilters() {
        return this._filters
    }

    merge(otherParams, alwaysOverwrite) {
        if (otherParams['state']) {
            this._state = otherParams['state']
        }
        if (otherParams['categoryId']) {
            this._categoryId = otherParams['categoryId']
        }
        if (otherParams['page']) {
            this._page = otherParams['page']
        }

        for (let name in this._filters) {
            if (!FilterParams._noValue(otherParams[name])) {
                if (alwaysOverwrite) {
                    this._filters[name] = otherParams[name]
                } else {
                    // if NOT always overwrite, only replace when there is no current value
                    if (FilterParams._noValue(this._filters[name])) {
                        this._filters[name] = otherParams[name]
                    }
                }
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

    static _noValue(value) {
        return value === null || typeof value === 'undefined' ? true : false
    }
}