const STATES = {
    'nationwide': 'Nationwide', 
    'al': 'Alabama',
    'ak': 'Alaska',
    'az': 'Arizona',
    'ar': 'Arkansas',
    'ca': 'California',
    'co': 'Colorado',
    'ct': 'Connecticut',
    'dc': 'DC',
    'de': 'Delaware',
    'fl': 'Florida',
    'ga': 'Georgia',
    'hi': 'Hawaii',
    'id': 'Idaho',
    'il': 'Illinois',
    'in': 'Indiana',
    'ia': 'Iowa',
    'ks': 'Kansas',
    'ky': 'Kentucky',
    'la': 'Louisiana',
    'me': 'Maine',
    'md': 'Maryland',
    'ma': 'Massachusetts',
    'mi': 'Michigan',
    'mn': 'Minnesota',
    'ms': 'Mississippi',
    'mo': 'Missouri',
    'mt': 'Montana',
    'ne': 'Nebraska',
    'nv': 'Nevada',
    'nh': 'New Hampshire',
    'nj': 'New Jersey',
    'nm': 'New Mexico',
    'ny': 'New York',
    'nc': 'North Carolina',
    'nd': 'North Dakota',
    'oh': 'Ohio',
    'ok': 'Oklahoma',
    'or': 'Oregon',
    'pa': 'Pennsylvania',
    'ri': 'Rhode Island',
    'sc': 'South Carolina',
    'sd': 'South Dakota',
    'tn': 'Tennessee',
    'tx': 'Texas',
    'ut': 'Utah',
    'vt': 'Vermont',
    'va': 'Virginia',
    'wa': 'Washington',
    'wv': 'West Virginia',
    'wi': 'Wisconsin',
    'wy': 'Wyoming'
}

const ATTRIBUTES =
{
    "1": {
        "name": "title",
        "type": "string"
    },
    "2": {
        "name": "description",
        "type": "string"
    },
    "8": {
        "name": "bedroom",
        "type": "number"
    },
    "9": {
        "name": "bathroom",
        "type": "number"
    },
    "10": {
        "name": "city",
        "type": "string"
    },
    "12": {
        "name": "state",
        "type": "string"
    },
    "19": {
        "name": "square_footage",
        "type": "number"
    },
    "21": {
        "name": "monthly_rent",
        "type": "number"
    },
    "22": {
        "name": "asking_price",
        "type": "number"
    },
    "23": {
        "name": "year_built",
        "type": "number"
    },
    "24": {
        "name": "cap_rate",
        "type": "string"
    },
    "25": {
        "name": "security_deposit",
        "type": "number"
    },
    "26": {
        "name": "minimal_lease_term",
        "type": "number"
    },
    "28": {
        "name": "acreage",
        "type": "number"
    },
    "29": {
        "name": "building_square_footage",
        "type": "string"
    },
    "30": {
        "name": "street_address",
        "type": "string"
    },
    "31": {
        "name": "represented_by",
        "type": "string"
    },
    "33": {
        "name": "zip_code",
        "type": "string"
    },
    "35": {
        "name": "homeowner_association_fee",
        "type": "number"
    },
    "36": {
        "name": "condo_fee",
        "type": "number"
    },
    "39": {
        "name": "pet_policy",
        "type": "number"
    },
    "41": {
        "name": "other_amenities",
        "type": "string"
    },
    "42": {
        "name": "parking_spaces",
        "type": "number"
    },
    "43": {
        "name": "school",
        "type": "string"
    },
    "46": {
        "name": "basement",
        "type": "number"
    },
    "49": {
        "name": "neighborhood",
        "type": "string"
    },
    "50": {
        "name": "contact_name",
        "type": "string"
    },
    "51": {
        "name": "contact_phone",
        "type": "string"
    },
    "52": {
        "name": "county",
        "type": "string"
    },
    "53": {
        "name": "open_house",
        "type": "string"
    },
    "54": {
        "name": "open_house_hours",
        "type": "string"
    },
    "55": {
        "name": "brokerage_company",
        "type": "string"
    },
    "56": {
        "name": "MLS_ID",
        "type": "string"
    },
    "57": {
        "name": "lot_size",
        "type": "number"
    },
    "58": {
        "name": "contact_email",
        "type": "string"
    },
    "60": {
        "name": "interior",
        "type": "array"
    },
    "61": {
        "name": "exterior",
        "type": "array"
    },
    "62": {
        "name": "rent_includes",
        "type": "array"
    },
    "63": {
        "name": "lot_developed",
        "type": "array"
    },
    "65": {
        "name": "owner_financing_available",
        "type": "array"
    },
    "66": {
        "name": "kitchen_and_dining",
        "type": "array"
    },
    "67": {
        "name": "bed_and_bath",
        "type": "array"
    },
    "68": {
        "name": "community",
        "type": "array"
    },
    "69": {
        "name": "condo_amenities",
        "type": "array"
    },
    "70": {
        "name": "pet_policy_details",
        "type": "string"
    },
    "71": {
        "name": "apartment_unit_amenities",
        "type": "array"
    },
    "72": {
        "name": "apartment_amenities",
        "type": "array"
    },
    "73": {
        "name": "available_date",
        "type": "string"
    },
    "74": {
        "name": "special_offer",
        "type": "string"
    },
    "1004": {
        "name": "current_zoning",
        "type": "array"
    },
    "1008": {
        "name": "rate",
        "type": "string"
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

const LOOKUPS = {
    "MOM": "Master on main",
    "GOM": "Guest suite on main",
    "ILS": "In-law suite",
    "SSM": "Separate shower in master bath",
    "WIC": "Walk-in closet in master",
    "JT": "Jacuzzi tub",
    "RFG": "Refrigerator",
    "DW": "Dishwasher",
    "GD": "Garbage disposal",
    "RO": "Range/oven",
    "BA": "Breakfast area(nook)",
    "GCS": "Granite countertops",
    "FDG": "Formal dining room",
    "FUR": "Furnished",
    "WD": "Washer and dryer",
    "WDH": "Washer/dryer connection",
    "LR": "Laundry room",
    "FP": "Fireplace",
    "HW": "Hardwood floor",
    "CM": "Crown molding",
    "TZA": "2-zone AC/heating",
    "PKG": "Parking",
    "PARKING1": "1-car parking space",
    "PARKING2": "2-car parking space",
    "G1": "1-car garage",
    "G2": "2-car garage",
    "G3": "3-car garage",
    "FB": "Fenced backyard",
    "PSP": "Private swimming pool",
    "PT": "Patio",
    "DK": "Deck",
    "BLY": "Balcony",
    "FPCH": "Front porch",
    "IS": "Irrigation system",
    "CDS": "Cul-de-sac",
    "CCG": "24 Hour Concierge",
    "CP": "Children's playroom",
    "OSP": "On-site parking",
    "GC": "Gated community",
    "FC": "Fitness center",
    "CH": "Club house",
    "SSP": "Shared swimming pool",
    "TT": "Tennis",
    "BB": "Basketball",
    "PGD": "Playground",
    "GLF": "Golf",
    "PRK": "Close to park",
    "HBT": "Hiking/biking trails",
    "PTR": "Public transportation",
    "WT": "Water and sewer",
    "ELC": "Electricity",
    "GAS": "Gas",
    "GP": "Garbage pickup",
    "NOFEE": "No broker fee",
    "EXC": "Exclusive",
    "DOORMAN": "Doorman",
    "ELEVATOR": "Elevator",
    "CAT": "Cats",
    "DOG1": "Dogs (under 25 lbs)",
    "DOG2": "Large Dogs",
    "EIK": "Eat in kitchen or dining",
    "HPI": "High speed internet",
    "TF": "Top floor",
    "GF": "Ground floor",
    "LRF": "Laundry facilities",
    "GGP": "Garage parking",
    "STS": "Storage Space(s)",
    "WCA": "Wheelchair Access",
    "DMN": "Doorman",
    "BIZ": "business center",
    "LKF": "Lake front",
    "BV": "Beach view",
    "OV": "Ocean view",
    "WV": "Water view",
    "MTV": "Mountain view",
    "FK": "Full kitchen",
    "MV": "Microwave",
    "CU": "Cooking utensils",
    "IC": "Ice maker",
    "CFM": "Coffee maker",
    "LN": "Linens provided",
    "AC": "Air conditioning",
    "CF": "Ceiling fans",
    "HT": "Hot tub",
    "SNA": "Sauna",
    "BNY": "Balcony",
    "DCK": "Dock",
    "TV": "Cable/Satellite TV",
    "PC": "Computer",
    "WB": "Internet",
    "WF": "WiFi",
    "CR": "Conference room",
    "LT": "Live theater",
    "MUS": "Museums",
    "SRF": "Surfing",
    "SAL": "Sailing",
    "SDS": "Scuba diving/snorkeling",
    "KYK": "Kayaking",
    "PRS": "Parasailing",
    "SKI": "Skiing",
    "SNB": "Snowboarding",
    "SNM": "Snowmobiling",
    "ISK": "Ice skating",
    "SLT": "Sledding/Tubing",
    "FS": "Fishing",
    "BOT": "Boating",
    "RFT": "Rafting",
    "HOR": "Horseback riding",
    "ROC": "Rock climbing",
    "LF": "Lake front",
    "LK": "Lake",
    "SP": "Private swimming pool",
    "SPP": "Shared swimming pool",
    "STC": "Swimming/tennis community"
}

function stateName(code) {
    code = code.toLowerCase()
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

export { STATES, CATEGORIES, LOOKUPS, stateName, attribute, attributeIdLookup, attributeNameLookup, categoryNameLookup }