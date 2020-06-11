import { stateName, categoryNameLookup } from '../service/AppData'
import AppContext from './AppContext'
import FmrUtil from '../util/FmrUtils'

export default {
    methods: {
        getListHeaderTitle() {
            let titleParts = []
            if (AppContext.getState()) {
                titleParts.push(stateName(AppContext.getState()))
            }
            if (AppContext.isFsbo()) {
                titleParts.push('FSBO')
            }
            titleParts.push(FmrUtil.capitalizeFirstLetter(categoryNameLookup(AppContext.getCategoryId())))
            titleParts.push('page ' + AppContext.getPage())
            return titleParts.join(' - ')
        },
        getAdHeaderTitle(ad) {
            return '#' + ad.id + ' - ' + ad.title + ' - ' + ad.city + ', ' + ad.state + ' ' + ad.zipCode;
        }
    }
}
