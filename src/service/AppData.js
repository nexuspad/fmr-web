const STATES = {
    'ALL': 'Nationwide', 
    'AL': 'Alabama',
    'AK': 'Alaska',
    'AZ': 'Arizona',
    'AR': 'Arkansas',
    'CA': 'California',
    'CO': 'Colorado',
    'CT': 'Connecticut',
    'DC': 'DC',
    'DE': 'Delaware',
    'FL': 'Florida',
    'GA': 'Georgia',
    'HI': 'Hawaii',
    'ID': 'Idaho',
    'IL': 'Illinois',
    'IN': 'Indiana',
    'IA': 'Iowa',
    'KS': 'Kansas',
    'KY': 'Kentucky',
    'LA': 'Louisiana',
    'ME': 'Maine',
    'MD': 'Maryland',
    'MA': 'Massachusetts',
    'MI': 'Michigan',
    'MN': 'Minnesota',
    'MS': 'Mississippi',
    'MO': 'Missouri',
    'MT': 'Montana',
    'NE': 'Nebraska',
    'NV': 'Nevada',
    'NH': 'New Hampshire',
    'NJ': 'New Jersey',
    'NM': 'New Mexico',
    'NY': 'New York',
    'NC': 'North Carolina',
    'ND': 'North Dakota',
    'OH': 'Ohio',
    'OK': 'Oklahoma',
    'OR': 'Oregon',
    'PA': 'Pennsylvania',
    'RI': 'Rhode Island',
    'SC': 'South Carolina',
    'SD': 'South Dakota',
    'TM': 'Tennessee',
    'TX': 'Texas',
    'UT': 'Utah',
    'VT': 'Vermont',
    'VA': 'Virginia',
    'WA': 'Washington',
    'WV': 'West Virginia',
    'WI': 'Wisconsin',
    'WY': 'Wyoming'
}

const ATTRIBUTES =
{
    "1": {
        "name": "title",
        "id": 1,
        "required": true
    },
    "2": {
        "name": "description",
        "id": 2,
        "required": true
    },
    "8": {
        "name": "bedroom",
        "options": [
            "1",
            "2",
            "3",
            "4",
            "5",
            "6",
            "7"
        ],
        "id": 8,
        "type": "number",
        "required": true
    },
    "9": {
        "name": "bathroom",
        "options": [
            "1",
            "2",
            "3",
            "4",
            "5",
            "6",
            "7",
            "1.5",
            "2.5",
            "3.5",
            "4.5",
            "5.5",
            "6.5"
        ],
        "id": 9,
        "type": "number",
        "required": true
    },
    "10": {
        "name": "city",
        "id": 10,
        "required": true
    },
    "12": {
        "name": "state",
        "id": 12,
        "required": true
    },
    "19": {
        "name": "square_footage",
        "id": 19,
        "type": "number",
        "required": false
    },
    "21": {
        "name": "monthly_rent",
        "id": 21,
        "type": "number",
        "required": true
    },
    "22": {
        "name": "asking_price",
        "id": 22,
        "type": "number",
        "required": true
    },
    "23": {
        "name": "year_built",
        "id": 23,
        "type": "number",
        "required": false
    },
    "24": {
        "name": "cap_rate",
        "id": 24,
        "required": false
    },
    "25": {
        "name": "security_deposit",
        "id": 25,
        "type": "number",
        "required": false
    },
    "26": {
        "name": "minimal_lease_term",
        "id": 26,
        "required": false
    },
    "28": {
        "name": "acreage",
        "id": 28,
        "type": "number",
        "required": false
    },
    "29": {
        "name": "building_square_footage",
        "id": 29,
        "type": "number",
        "required": false
    },
    "30": {
        "name": "street_address",
        "id": 30,
        "required": true
    },
    "31": {
        "name": "represented_by",
        "id": 31,
        "required": false
    },
    "32": {
        "name": "address_line_2",
        "id": 32,
        "required": false
    },
    "33": {
        "name": "zip_code",
        "id": 33,
        "required": true
    },
    "35": {
        "name": "homeowner_association_fee",
        "id": 35,
        "type": "number",
        "required": false
    },
    "36": {
        "name": "condo_fee",
        "id": 36,
        "type": "number",
        "required": false
    },
    "39": {
        "name": "pet_policy",
        "options": [
            "no",
            "yes"
        ],
        "id": 39,
        "required": false
    },
    "41": {
        "name": "other_amenities",
        "id": 41,
        "required": false
    },
    "42": {
        "name": "parking_spaces",
        "id": 42,
        "type": "number",
        "required": false
    },
    "43": {
        "name": "school",
        "id": 43,
        "required": false
    },
    "46": {
        "name": "basement",
        "options": [
            "slab/none",
            "full, unfinished",
            "full, finished",
            "crawl space",
            "partial, unfinished",
            "partial, finished"
        ],
        "id": 46,
        "required": false
    },
    "49": {
        "name": "neighborhood",
        "id": 49,
        "required": false
    },
    "50": {
        "name": "contact_name",
        "id": 50,
        "required": false
    },
    "51": {
        "name": "contact_phone",
        "id": 51,
        "required": false
    },
    "52": {
        "name": "county",
        "id": 52,
        "required": false
    },
    "53": {
        "name": "open_house",
        "id": 53,
        "required": false
    },
    "54": {
        "name": "open_house_hours",
        "id": 54,
        "required": false
    },
    "55": {
        "name": "brokerage_company",
        "id": 55,
        "required": false
    },
    "56": {
        "name": "MLS_ID",
        "id": 56,
        "required": false
    },
    "57": {
        "name": "lot_size",
        "id": 57,
        "type": "number",
        "required": false
    },
    "58": {
        "name": "contact_email",
        "id": 58,
        "required": false
    },
    "60": {
        "name": "interior",
        "options": [
            "Hardwood floor",
            "2-zone AC/heating",
            "Washer and dryer",
            "Laundry room",
            "Furnished",
            "Crown molding",
            "Washer/dryer connection",
            "Fireplace"
        ],
        "id": 60,
        "type": "array",
        "required": false
    },
    "61": {
        "name": "exterior",
        "options": [
            "2-car parking space",
            "3-car garage",
            "Private swimming pool",
            "Balcony",
            "Deck",
            "1-car garage",
            "Irrigation system",
            "Front porch",
            "2-car garage",
            "1-car parking space",
            "Patio",
            "Cul-de-sac",
            "Fenced backyard"
        ],
        "id": 61,
        "type": "array",
        "required": false
    },
    "62": {
        "name": "rent_includes",
        "options": [
            "Water and sewer",
            "Electricity",
            "Garbage pickup",
            "Gas"
        ],
        "id": 62,
        "type": "array",
        "required": false
    },
    "63": {
        "name": "lot_developed",
        "options": [
            "no",
            "yes"
        ],
        "id": 63,
        "required": false
    },
    "65": {
        "name": "owner_financing_available",
        "options": [
            "no",
            "yes"
        ],
        "id": 65,
        "required": false
    },
    "66": {
        "name": "kitchen_and_dining",
        "options": [
            "Breakfast area(nook)",
            "Garbage disposal",
            "Formal dining room",
            "Dishwasher",
            "Refrigerator",
            "Range/oven",
            "Granite countertops"
        ],
        "id": 66,
        "type": "array",
        "required": false
    },
    "67": {
        "name": "bed_and_bath",
        "options": [
            "In-law suite",
            "Separate shower in master bath",
            "Walk-in closet in master",
            "Guest suite on main",
            "Master on main",
            "Jacuzzi tub"
        ],
        "id": 67,
        "type": "array",
        "required": false
    },
    "68": {
        "name": "community",
        "options": [
            "Gated community",
            "Tennis",
            "Fitness center",
            "Golf",
            "Shared swimming pool",
            "Club house",
            "Close to park",
            "Hiking/biking trails",
            "Basketball",
            "Public transportation",
            "Playground"
        ],
        "id": 68,
        "type": "array",
        "required": false
    },
    "69": {
        "name": "condo_amenities",
        "options": [
            "Fitness center",
            "24 Hour Concierge",
            "On-site parking",
            "Children's playroom",
            "Garage parking"
        ],
        "id": 69,
        "type": "array",
        "required": false
    },
    "70": {
        "name": "pet_policy_details",
        "id": 70,
        "required": false
    },
    "71": {
        "name": "apartment_unit_amenities",
        "options": [
            "Eat in kitchen or dining",
            "Washer and dryer",
            "Ground floor",
            "Dishwasher",
            "Refrigerator",
            "Deck",
            "Furnished",
            "Washer/dryer connection",
            "High speed internet",
            "Range/oven",
            "Patio",
            "Top floor",
            "Fireplace"
        ],
        "id": 71,
        "type": "array",
        "required": false
    },
    "72": {
        "name": "apartment_amenities",
        "options": [
            "Gated community",
            "Laundry facilities",
            "Tennis",
            "Business center",
            "Fitness center",
            "Shared swimming pool",
            "Storage Space(s)",
            "Wheelchair Access",
            "Garage parking",
            "Club house",
            "Hiking/biking trails",
            "Public transportation"
        ],
        "id": 72,
        "type": "array",
        "required": false
    },
    "73": {
        "name": "available_date",
        "id": 73,
        "required": false
    },
    "74": {
        "name": "special_offer",
        "id": 74,
        "required": false
    },
    "1004": {
        "name": "current_zoning",
        "options": [
            "Commercial",
            "Residential"
        ],
        "id": 1004,
        "required": false
    },
    "1008": {
        "name": "rate",
        "id": 1008,
        "required": false
    }
}

const ATTRIBUTE_NAME_LOOKUP = {}
for (let id in ATTRIBUTES) {
    ATTRIBUTE_NAME_LOOKUP[ATTRIBUTES[id].name] = id
}

const CATEGORIES =
{
    "0": {
        "id": 0,
        "name": "all"
    },
    "1006": {
        "id": 1006,
        "code": "for-sale|residential|lease-purchase",
        "name": "lease purchase",
        "uri": "lease-purchase"
    },
    "2007": {
        "id": 2007,
        "code": "for-rent|residential|roommate",
        "name": "roommate",
        "uri": "roommate"
    },
    "2011": {
        "id": 2011,
        "code": "for-rent|vacation",
        "name": "vacation rental",
        "uri": "vacation-rental"
    },
    "3001": {
        "id": 3001,
        "code": "for-rent|residential|single-family-home",
        "name": "single family home for rent",
        "uri": "single-family-home-for-rent"
    },
    "3002": {
        "id": 3002,
        "code": "for-rent|residential|townhome",
        "name": "townhome/multiple-unit for rent",
        "uri": "townhome-multiple-unit-for-rent"
    },
    "3003": {
        "id": 3003,
        "code": "for-rent|residential|apartment",
        "name": "apartment",
        "uri": "apartment"
    },
    "3004": {
        "id": 3004,
        "code": "for-rent|residential|condominium",
        "name": "condominium for rent",
        "uri": "condominium-for-rent"
    },
    "3006": {
        "id": 3006,
        "code": "for-rent|commercial|retail-space",
        "name": "commercial retail space for rent",
        "uri": "commercial-retail-space-for-rent"
    },
    "3007": {
        "id": 3007,
        "code": "for-rent|commercial|shopping-center",
        "name": "shopping center space for rent",
        "uri": "shopping-center-space-for-rent"
    },
    "3008": {
        "id": 3008,
        "code": "for-rent|commercial|office-space",
        "name": "office space for rent",
        "uri": "office-space-for-rent"
    },
    "3009": {
        "id": 3009,
        "code": "for-rent|commercial|warehouse",
        "name": "warehouse/garage space for rent",
        "uri": "warehouse-garage-space-for-rent"
    },
    "3010": {
        "id": 3010,
        "code": "for-rent|commercial|others",
        "name": "others",
        "uri": "other-commercial-properties-for-rent"
    },
    "3011": {
        "id": 3011,
        "code": "for-sale|residential|single-family-home",
        "name": "single family home for sale",
        "uri": "single-family-home-for-sale"
    },
    "3012": {
        "id": 3012,
        "code": "for-sale|residential|townhouse",
        "name": "townhome/multi-unit for sale",
        "uri": "townhome-multi-unit-for-sale"
    },
    "3013": {
        "id": 3013,
        "code": "for-sale|residential|condominium",
        "name": "condominium for sale",
        "uri": "condominium-for-sale"
    },
    "3014": {
        "id": 3014,
        "code": "for-sale|residential|manufactured-home",
        "name": "manufactured home for sale",
        "uri": "manufactured-home-for-sale"
    },
    "3015": {
        "id": 3015,
        "code": "for-sale|residential|land",
        "name": "residential land for sale",
        "uri": "residential-land-for-sale"
    },
    "3016": {
        "id": 3016,
        "code": "for-sale|commercial|retail-center",
        "name": "retail center for sale",
        "uri": "retail-center-for-sale"
    },
    "3017": {
        "id": 3017,
        "code": "for-sale|commercial|office",
        "name": "office building for sale",
        "uri": "office-building-for-sale"
    },
    "3019": {
        "id": 3019,
        "code": "for-sale|commercial|gasstation",
        "name": "gas station/convenient store for sale",
        "uri": "gas-station-convenient-store-for-sale"
    },
    "3021": {
        "id": 3021,
        "code": "for-sale|commercial|warehouse",
        "name": "warehouse/garage space for sale",
        "uri": "warehouse-garage-space-for-sale"
    },
    "3022": {
        "id": 3022,
        "code": "for-sale|commercial|restaurant",
        "name": "restaurant for sale",
        "uri": "restaurant-for-sale"
    },
    "3023": {
        "id": 3023,
        "code": "for-sale|commercial|land",
        "name": "commercial land for sale",
        "uri": "commercial-land-for-sale"
    },
    "3024": {
        "id": 3024,
        "code": "for-sale|commercial|others",
        "name": "Others",
        "uri": "other-commercial-properties-for-sale"
    },
    "3025": {
        "id": 3025,
        "code": "for-sale|residential|foreclosure",
        "name": "foreclosures",
        "uri": "foreclosures"
    }
}

function stateName(code) {
    code = code.toUpperCase()
    if (STATES[code]) {
        return STATES[code]
    }
    return ''
}

function attribute(id) {
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

function categoryNameLookup(categoryId) {
    if (!CATEGORIES[categoryId]) {
        console.log('error ', categoryId)
        return '';
    }
    return CATEGORIES[categoryId].name
}

export { STATES, CATEGORIES, ATTRIBUTES, stateName, attribute, attributeIdLookup, attributeNameLookup, attributeTypeLookup, attributeOptionsLookup, categoryNameLookup }