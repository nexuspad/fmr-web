import { STATES } from './data/states'
import { CATEGORIES } from './data/categories'
import { ATTRIBUTES } from './data/attributes'

const ATTRIBUTE_NAME_LOOKUP = {}
for (let id in ATTRIBUTES) {
    ATTRIBUTE_NAME_LOOKUP[ATTRIBUTES[id].name] = id
}

const CATEGORY_URI_LOOKUP = {}
for (let id in CATEGORIES) {
    if (CATEGORIES[id].uri) {
        CATEGORY_URI_LOOKUP[CATEGORIES[id].uri] = id
    }
}

function allStatesOrTerritories() {
    return STATES
}

function stateName(code) {
    code = code.toUpperCase()
    if (STATES[code]) {
        return STATES[code]
    }
    return ''
}

function attributeLookup(id) {
    return ATTRIBUTES[id]
}

function attributeNameLookup(attributeId) {
    if (ATTRIBUTES[attributeId]) {
        return ATTRIBUTES[attributeId].name
    }
    return ATTRIBUTES[attributeId]
}

function attributeTypeLookup(attributeId) {
    if (ATTRIBUTES[attributeId]) {
        return ATTRIBUTES[attributeId].type
    }
    return ''
}

function attributeOptionsLookup(attributeId) {
    if (ATTRIBUTES[attributeId]) {
        return ATTRIBUTES[attributeId].options
    }
    return ''
}

function attributeIdLookup(name) {
    return parseInt(ATTRIBUTE_NAME_LOOKUP[name])
}

function categoryLookup(categoryId) {
    if (CATEGORIES[categoryId]) {
        return CATEGORIES[categoryId]
    }
    return null
}

function categoryNameLookup(categoryId) {
    if (!CATEGORIES[categoryId]) {
        console.log('error ', categoryId)
        return '';
    }
    return CATEGORIES[categoryId].name
}

function categoryIdLookup(uri) {
    return CATEGORY_URI_LOOKUP[uri]
}

export {
    allStatesOrTerritories,
    stateName, 
    attributeLookup, 
    attributeIdLookup, 
    attributeNameLookup, 
    attributeTypeLookup, 
    attributeOptionsLookup, 
    categoryLookup,
    categoryNameLookup,
    categoryIdLookup
}