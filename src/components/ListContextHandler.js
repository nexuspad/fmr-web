import Vue from 'vue'
import VueCompositionApi from '@vue/composition-api'
Vue.use(VueCompositionApi)

import { ref } from '@vue/composition-api'
import { router } from '../router'
import ListCriteria from '../service/model/ListCriteria'
import AdCategory from '../service/model/AdCategory'
import PropertyLocation from '../service/model/PropertyLocation'

const state = ref('Nationwide')

export function listContextSetup () {
    console.log(router.currentRoute)

    if (router.currentRoute.params.state) {
        state.value = router.currentRoute.params.state
    }

    function currentCriteria () {
        let listCriteria = new ListCriteria()
        let category = new AdCategory()
        let location = new PropertyLocation()

        category.id = 3011
        location.state = state.value

        listCriteria.category = category
        listCriteria.location = location

        return listCriteria
    }

    return {
        state,
        currentCriteria
    }
}

export function listContextUpdate () {
    function changeState (value) {
        router.push({ name: router.currentRoute.name, params: { state: value } });
    }

    return {
        changeState
    }
}