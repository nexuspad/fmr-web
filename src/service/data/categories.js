const CATEGORIES =
{
    "0": {
        "id": 0,
        "name": "latest listings",
        "residential": false,
        "commercial": false
    },
    "1006": {
        "id": 1006,
        "code": "for-sale|residential|lease-purchase",
        "name": "lease purchase",
        "uri": "lease-purchase",
        "residential": true,
        "commercial": false
    },
    "2000": {
        "id": 2000,
        "code": "for-rent|residential",
        "name": "all residential for rent",
        "uri": "residential-for-rent",
        "residential": true,
        "commercial": false
    },
    "2001": {
        "id": 2001,
        "code": "for-sale|residential",
        "name": "all residential for sale",
        "uri": "residential-for-sale",
        "residential": true,
        "commercial": false
    },
    "2007": {
        "id": 2007,
        "code": "for-rent|residential|roommate",
        "name": "roommate",
        "uri": "roommate",
        "residential": true,
        "commercial": false
    },
    "2010": {
        "id": 2010,
        "code": "for-rent|commercial",
        "name": "all commercial for rent",
        "uri": "commercial-for-rent",
        "residential": false,
        "commercial": true
    },
    "2011": {
        "id": 2011,
        "code": "for-rent|residential|vacation",
        "name": "vacation rental",
        "uri": "vacation-rental",
        "residential": true,
        "commercial": false
    },
    "2012": {
        "id": 2012,
        "code": "for-sale|commercial",
        "name": "all commercial for sale",
        "uri": "commercial-for-sale",
        "residential": false,
        "commercial": true
    },
    "3001": {
        "id": 3001,
        "code": "for-rent|residential|single-family-home",
        "name": "single family home for rent",
        "uri": "single-family-home-for-rent",
        "residential": true,
        "commercial": false
    },
    "3002": {
        "id": 3002,
        "code": "for-rent|residential|townhome",
        "name": "townhome/multiple-unit for rent",
        "uri": "townhome-multiple-unit-for-rent",
        "residential": true,
        "commercial": false
    },
    "3003": {
        "id": 3003,
        "code": "for-rent|residential|apartment",
        "name": "apartment",
        "uri": "apartment",
        "residential": true,
        "commercial": false
    },
    "3004": {
        "id": 3004,
        "code": "for-rent|residential|condominium",
        "name": "condominium for rent",
        "uri": "condominium-for-rent",
        "residential": true,
        "commercial": false
    },
    "3006": {
        "id": 3006,
        "code": "for-rent|commercial|retail-space",
        "name": "commercial retail space for rent",
        "uri": "commercial-retail-space-for-rent",
        "residential": false,
        "commercial": true
    },
    "3007": {
        "id": 3007,
        "code": "for-rent|commercial|shopping-center",
        "name": "shopping center space for rent",
        "uri": "shopping-center-space-for-rent",
        "residential": false,
        "commercial": true
    },
    "3008": {
        "id": 3008,
        "code": "for-rent|commercial|office-space",
        "name": "office space for rent",
        "uri": "office-space-for-rent",
        "residential": false,
        "commercial": true
    },
    "3009": {
        "id": 3009,
        "code": "for-rent|commercial|warehouse",
        "name": "warehouse/garage space for rent",
        "uri": "warehouse-garage-space-for-rent",
        "residential": false,
        "commercial": true
    },
    "3010": {
        "id": 3010,
        "code": "for-rent|commercial|others",
        "name": "others",
        "uri": "other-commercial-properties-for-rent",
        "residential": false,
        "commercial": true
    },
    "3011": {
        "id": 3011,
        "code": "for-sale|residential|single-family-home",
        "name": "single family home for sale",
        "uri": "single-family-home-for-sale",
        "residential": true,
        "commercial": false
    },
    "3012": {
        "id": 3012,
        "code": "for-sale|residential|townhouse",
        "name": "townhome/multi-unit for sale",
        "uri": "townhome-multi-unit-for-sale",
        "residential": true,
        "commercial": false
    },
    "3013": {
        "id": 3013,
        "code": "for-sale|residential|condominium",
        "name": "condominium for sale",
        "uri": "condominium-for-sale",
        "residential": true,
        "commercial": false
    },
    "3014": {
        "id": 3014,
        "code": "for-sale|manufactured-home",
        "name": "manufactured home for sale",
        "uri": "manufactured-home-for-sale",
        "residential": false,
        "commercial": false
    },
    "3015": {
        "id": 3015,
        "code": "for-sale|land",
        "name": "residential land for sale",
        "uri": "residential-land-for-sale",
        "residential": false,
        "commercial": false
    },
    "3016": {
        "id": 3016,
        "code": "for-sale|commercial|retail-center",
        "name": "retail center for sale",
        "uri": "retail-center-for-sale",
        "residential": false,
        "commercial": true
    },
    "3017": {
        "id": 3017,
        "code": "for-sale|commercial|office",
        "name": "office building for sale",
        "uri": "office-building-for-sale",
        "residential": false,
        "commercial": true
    },
    "3019": {
        "id": 3019,
        "code": "for-sale|commercial|gasstation",
        "name": "gas station/convenient store for sale",
        "uri": "gas-station-convenient-store-for-sale",
        "residential": false,
        "commercial": true
    },
    "3021": {
        "id": 3021,
        "code": "for-sale|commercial|warehouse",
        "name": "warehouse/garage space for sale",
        "uri": "warehouse-garage-space-for-sale",
        "residential": false,
        "commercial": true
    },
    "3022": {
        "id": 3022,
        "code": "for-sale|commercial|restaurant",
        "name": "restaurant for sale",
        "uri": "restaurant-for-sale",
        "residential": false,
        "commercial": true
    },
    "3023": {
        "id": 3023,
        "code": "for-sale|land",
        "name": "commercial land for sale",
        "uri": "commercial-land-for-sale",
        "residential": false,
        "commercial": false
    },
    "3024": {
        "id": 3024,
        "code": "for-sale|commercial|others",
        "name": "Others",
        "uri": "other-commercial-properties-for-sale",
        "residential": false,
        "commercial": true
    },
    "3025": {
        "id": 3025,
        "code": "for-sale|residential|foreclosure",
        "name": "foreclosures",
        "uri": "foreclosures",
        "residential": true,
        "commercial": false
    }
}

export { CATEGORIES }