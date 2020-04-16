import Vue from 'vue'
import VueCompositionApi from '@vue/composition-api'
Vue.use(VueCompositionApi)

import { ref } from '@vue/composition-api'
import AdService from '../service/AdService'

const title = ref('')
const description = ref('')
const interior = ref([])

export function setupTemplate() {
    
    function getTemplate (categoryId, adId) {
        categoryId = 3011
        adId = 0
        if (adId === 0) {
            return AdService.adTemplate(categoryId)
            .then(draft => {
                console.log(draft);
            })
            .catch(() => {
                console.error("...error");
            })    
        }
    }

    return {
        title,
        description,
        interior,
        getTemplate
    }
}

export function adUpdate() {
}