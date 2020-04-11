import Vue from 'vue'
import VueCompositionApi from '@vue/composition-api'
Vue.use(VueCompositionApi)

import { ref } from '@vue/composition-api'
import { router } from '../router'
import ListCriteria from '../service/model/ListCriteria'
import AdCategory from '../service/model/AdCategory'
import PropertyLocation from '../service/model/PropertyLocation'
import AttributeFilter from '../service/model/AttributeFilter'

const state = ref('nationwide')
const city = ref('')
const zipCode = ref('')
const neighborhood = ref('')
const categoryId = ref(0)

export function listContextSetup () {
    console.log(router.currentRoute)

    if (router.currentRoute.params.state) {
        state.value = router.currentRoute.params.state
    }

    if (router.currentRoute.query.zipCode) {
        zipCode.value = router.currentRoute.query.zipCode
    }

    function currentCriteria () {
        let listCriteria = new ListCriteria()
        let category = new AdCategory()
        let location = new PropertyLocation()

        // category
        if (categoryId)
            category.id = categoryId.value
        listCriteria.category = category

        // location
        location.state = state.value
        location.city = city.value
        listCriteria.location = location

        // filters
        if (zipCode.value) {
            listCriteria.addFilter(AttributeFilter.eq('zip_code', zipCode.value))
        }

        return listCriteria
    }

    return {
        state,
        city,
        zipCode,
        neighborhood,
        categoryId,
        currentCriteria
    }
}

export function listContextUpdate () {
    function changeState (value) {
        if (value.length > 2) {
            value = ''
        }
        router.push({ name: router.currentRoute.name, params: { state: value.toLowerCase() } });
    }

    function changeFilter () {
        let queryParams = {}

        let listCriteria = listContextSetup().currentCriteria()
        if (listCriteria.location) {
            if (listCriteria.location.city) {
                queryParams['city'] = listCriteria.location.city
            }
            if (listCriteria.location.zipCode) {
                queryParams['zipCode'] = listCriteria.location.zipCode
            }
            if (listCriteria.location.neighborhood) {
                queryParams['neighborhood'] = listCriteria.location.neighborhood
            }
        }

        console.log('...', queryParams)

        router.push({ path: router.currentRoute.path, query: queryParams });
    }

    return {
        changeState,
        changeFilter
    }
}