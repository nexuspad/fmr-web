import ListCriteria from '../service/model/ListCriteria'
import AdCategory from '../service/model/AdCategory'
import PropertyLocation from '../service/model/PropertyLocation'
import AttributeFilter from '../service/model/AttributeFilter'

export default class AppContext {
    static _state
    static _city
    static _zipCode
    static _neighborhood
    static _categoryId = 0
    static _filters

    static getState() {
        return AppContext._state
    }

    static changeState(theState) {
        AppContext._state = theState
    }

    static findStateInRoute(routeParam) {
        if (routeParam.state) {
            AppContext._state = routeParam.state
        } else {
            AppContext._state = 'nationwide'
        }
        return AppContext._state
    }

    static changeFilter() {}

    static currentCriteria() {
        let listCriteria = new ListCriteria()
        let category = new AdCategory()
        let location = new PropertyLocation()

        // category
        category.id = AppContext._categoryId
        listCriteria.category = category

        // location
        location.state = AppContext._state
        location.city = AppContext._city
        listCriteria.location = location

        // filters
        if (AppContext._zipCode) {
            listCriteria.addFilter(AttributeFilter.eq('zip_code', AppContext._zipCode))
        }

        return listCriteria

    }

    static activity(currentRoute) {
        if (currentRoute.name === 'PlaceAd' || currentRoute.name === 'AdNew' || currentRoute.name === 'AdEdit') {
            return 'editing'
        } else if (currentRoute.name === 'Account' || currentRoute.name === 'Register' ||
            currentRoute.name === 'Login' || currentRoute.name === 'Settings' || currentRoute.name === 'MyAds') {
            return 'account'
        }
        return 'browsing'
    }
}