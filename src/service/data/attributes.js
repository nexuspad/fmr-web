const ATTRIBUTES =
{
    "1": {
        "name": "title",
        "id": 1,
        "type": "string",
        "required": true
    },
    "2": {
        "name": "description",
        "id": 2,
        "type": "string",
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
            "1.5",
            "2",
            "2.5",
            "3",
            "3.5",
            "4",
            "4.5",
            "5",
            "5.5",
            "6",
            "6.5",
            "7"
        ],
        "id": 9,
        "type": "number",
        "required": true
    },
    "10": {
        "name": "city",
        "id": 10,
        "type": "string",
        "required": true
    },
    "12": {
        "name": "state",
        "id": 12,
        "type": "string",
        "required": true
    },
    "18": {
        "name": "dimension",
        "id": 18,
        "type": "string",
        "required": false
    },
    "19": {
        "name": "square_footage",
        "id": 19,
        "type": "number",
        "required": false
    },
    "21": {
        "name": "rent",
        "id": 21,
        "type": "number",
        "required": false
    },
    "22": {
        "name": "price",
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
        "type": "string",
        "required": false
    },
    "25": {
        "name": "security_deposit",
        "id": 25,
        "type": "number",
        "required": false
    },
    "26": {
        "name": "lease_term",
        "id": 26,
        "type": "string",
        "required": false
    },
    "28": {
        "name": "acreage",
        "id": 28,
        "type": "number",
        "required": false
    },
    "29": {
        "name": "space_size",
        "id": 29,
        "type": "number",
        "required": false
    },
    "30": {
        "name": "street_address",
        "id": 30,
        "type": "string",
        "required": true
    },
    "31": {
        "name": "represented_by_owner",
        "options": [
            "true",
            "false"
        ],
        "id": 31,
        "type": "bool",
        "required": false
    },
    "32": {
        "name": "address_line_2",
        "id": 32,
        "type": "string",
        "required": false
    },
    "33": {
        "name": "zip_code",
        "id": 33,
        "type": "string",
        "required": true
    },
    "35": {
        "name": "hoa_fee",
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
    "37": {
        "name": "other_fees",
        "id": 37,
        "type": "string",
        "required": false
    },
    "39": {
        "name": "pet_allowed",
        "options": [
            "true",
            "false"
        ],
        "id": 39,
        "type": "bool",
        "required": false
    },
    "40": {
        "name": "furnished",
        "options": [
            "true",
            "false"
        ],
        "id": 40,
        "type": "bool",
        "required": false
    },
    "41": {
        "name": "other_amenities",
        "id": 41,
        "type": "string",
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
        "type": "string",
        "required": false
    },
    "46": {
        "name": "basement",
        "options": [
            "slab/none",
            "full, unfinished",
            "full, finished",
            "partial, unfinished",
            "partial, finished",
            "crawl space"
        ],
        "id": 46,
        "type": "string",
        "required": false
    },
    "47": {
        "name": "close_to",
        "id": 47,
        "type": "string",
        "required": false
    },
    "48": {
        "name": "geo_coordinates",
        "id": 48,
        "type": "json",
        "required": false
    },
    "49": {
        "name": "neighborhood",
        "id": 49,
        "type": "string",
        "required": false
    },
    "50": {
        "name": "contact_name",
        "id": 50,
        "type": "string",
        "required": false
    },
    "51": {
        "name": "contact_phone",
        "id": 51,
        "type": "number",
        "required": false
    },
    "52": {
        "name": "county",
        "id": 52,
        "type": "string",
        "required": false
    },
    "53": {
        "name": "open_house",
        "id": 53,
        "type": "date",
        "required": false
    },
    "54": {
        "name": "open_house_hours",
        "id": 54,
        "type": "string",
        "required": false
    },
    "55": {
        "name": "brokerage_company",
        "id": 55,
        "type": "string",
        "required": false
    },
    "56": {
        "name": "mls_id",
        "id": 56,
        "type": "string",
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
        "type": "string",
        "required": false
    },
    "59": {
        "name": "company_web_address",
        "id": 59,
        "type": "string",
        "required": false
    },
    "60": {
        "name": "interior",
        "options": [
            "Furnished",
            "Washer & Dryer",
            "Washer/dryer Connection",
            "Laundry Room",
            "Fireplace",
            "Hardwood Floor",
            "Crown Molding",
            "2-zone AC/heating"
        ],
        "id": 60,
        "type": "array",
        "required": false
    },
    "61": {
        "name": "exterior",
        "options": [
            "1-car Parking Space",
            "2-car Parking Space",
            "1-car Garage",
            "2-car Garage",
            "3-car Garage",
            "Fenced Backyard",
            "Private Pool",
            "Patio",
            "Deck",
            "Balcony",
            "Front Porch",
            "Irrigation System",
            "Cul-de-sac"
        ],
        "id": 61,
        "type": "array",
        "required": false
    },
    "62": {
        "name": "rent_includes",
        "options": [
            "Water & Sewer",
            "Electricity",
            "Gas",
            "Garbage Pickup"
        ],
        "id": 62,
        "type": "array",
        "required": false
    },
    "63": {
        "name": "lot_developed",
        "options": [
            "true",
            "false"
        ],
        "id": 63,
        "type": "bool",
        "required": false
    },
    "64": {
        "name": "hide_address",
        "options": [
            "true",
            "false"
        ],
        "id": 64,
        "type": "bool",
        "required": false
    },
    "65": {
        "name": "owner_financing_available",
        "options": [
            "true",
            "false"
        ],
        "id": 65,
        "type": "bool",
        "required": false
    },
    "66": {
        "name": "kitchen_and_dining",
        "options": [
            "Refrigerator",
            "Dishwasher",
            "Garbage Disposal",
            "Range/oven",
            "Breakfast Area(nook)",
            "Granite Countertops",
            "Formal Dining Room"
        ],
        "id": 66,
        "type": "array",
        "required": false
    },
    "67": {
        "name": "bed_and_bath",
        "options": [
            "Master on Main",
            "Guest Suite",
            "In-law Suite",
            "Separate Shower in Master Bath",
            "Walk-in Closet",
            "Jacuzzi Tub"
        ],
        "id": 67,
        "type": "array",
        "required": false
    },
    "68": {
        "name": "community",
        "options": [
            "Gated Community",
            "Fitness Center",
            "Club House",
            "Swimming Pool",
            "Tennis",
            "Basketball",
            "Playground",
            "Golf",
            "Close to Park",
            "Hiking/Biking Trails",
            "Public Transportation"
        ],
        "id": 68,
        "type": "array",
        "required": false
    },
    "69": {
        "name": "condo_amenities",
        "options": [
            "24 Hour Concierge",
            "Fitness Center",
            "Children's Playroom",
            "On-site Parking",
            "Garage Parking"
        ],
        "id": 69,
        "type": "array",
        "required": false
    },
    "70": {
        "name": "pet_policy_details",
        "id": 70,
        "type": "string",
        "required": false
    },
    "71": {
        "name": "apartment_unit_amenities",
        "options": [
            "Furnished",
            "Refrigerator",
            "Dishwasher",
            "Range/oven",
            "Eat in Kitchen or Dining",
            "Fireplace",
            "Internet",
            "Washer & Dryer",
            "Washer/dryer Connection",
            "Patio",
            "Deck",
            "Top Floor",
            "Ground Floor"
        ],
        "id": 71,
        "type": "array",
        "required": false
    },
    "72": {
        "name": "apartment_amenities",
        "options": [
            "Gated Community",
            "Tennis",
            "Swimming Pool",
            "Fitness Center",
            "Club House",
            "Laundry Facilities",
            "Garage Parking",
            "Storage Space(s)",
            "Wheelchair Access",
            "Hiking/Biking Trails",
            "Business Center",
            "Public Transportation"
        ],
        "id": 72,
        "type": "array",
        "required": false
    },
    "73": {
        "name": "available_date",
        "id": 73,
        "type": "date",
        "required": false
    },
    "74": {
        "name": "special_offer",
        "id": 74,
        "type": "string",
        "required": false
    },
    "75": {
        "name": "college",
        "id": 75,
        "type": "string",
        "required": false
    },
    "76": {
        "name": "elementary_school",
        "id": 76,
        "type": "string",
        "required": false
    },
    "77": {
        "name": "middle_school",
        "id": 77,
        "type": "string",
        "required": false
    },
    "78": {
        "name": "high_school",
        "id": 78,
        "type": "string",
        "required": false
    },
    "81": {
        "name": "community_type",
        "id": 81,
        "type": "string",
        "required": false
    },
    "83": {
        "name": "model",
        "id": 83,
        "type": "string",
        "required": false
    },
    "91": {
        "name": "sleeps",
        "id": 91,
        "type": "string",
        "required": true
    },
    "92": {
        "name": "min_stay",
        "id": 92,
        "type": "string",
        "required": true
    },
    "93": {
        "name": "rate_per_night",
        "id": 93,
        "type": "string",
        "required": true
    },
    "94": {
        "name": "vac_amenities",
        "options": [
            "No Smoking",
            "Air Conditioning",
            "Private Pool",
            "Communal Pool",
            "Washer & Dryer",
            "Air Conditioning"
        ],
        "id": 94,
        "type": "array",
        "required": false
    },
    "95": {
        "name": "vac_other_provided",
        "options": [
            "Internet",
            "Cable TV",
            "Linens",
            "Iron & Board",
            "Hair Dryer",
            "Bath Towels",
            "Basic Soaps",
            "Toilet Paper"
        ],
        "id": 95,
        "type": "array",
        "required": false
    },
    "96": {
        "name": "vac_kitchen_provided",
        "options": [
            "Dishwasher",
            "Microwave",
            "Ice Maker",
            "Refrigerator",
            "Oven",
            "Coffee Maker",
            "Dishes & Utensils",
            "Outdoor Grill"
        ],
        "id": 96,
        "type": "array",
        "required": false
    },
    "99": {
        "name": "cancellation_policy",
        "id": 99,
        "type": "string",
        "required": true
    },
    "101": {
        "name": "typical_floor_size",
        "id": 101,
        "type": "number",
        "required": false
    },
    "102": {
        "name": "gross_leasable_area",
        "id": 102,
        "type": "number",
        "required": false
    },
    "110": {
        "name": "rate_sqft_year",
        "id": 110,
        "type": "number",
        "required": false
    },
    "111": {
        "name": "tenancy",
        "options": [
            "single",
            "multiple"
        ],
        "id": 111,
        "type": "string",
        "required": false
    },
    "112": {
        "name": "building_size_sqft",
        "id": 112,
        "type": "number",
        "required": false
    },
    "113": {
        "name": "tenants",
        "id": 113,
        "type": "string",
        "required": false
    },
    "121": {
        "name": "building_class",
        "options": [
            "A",
            "B",
            "C"
        ],
        "id": 121,
        "type": "string",
        "required": false
    },
    "122": {
        "name": "zoning_code",
        "id": 122,
        "type": "string",
        "required": false
    },
    "123": {
        "name": "number_of_stories",
        "id": 123,
        "type": "string",
        "required": false
    },
    "124": {
        "name": "parking",
        "id": 124,
        "type": "string",
        "required": false
    },
    "125": {
        "name": "parking_ratio",
        "id": 125,
        "type": "string",
        "required": false
    },
    "126": {
        "name": "condition",
        "id": 126,
        "type": "string",
        "required": false
    },
    "131": {
        "name": "price_per_sqft",
        "id": 131,
        "type": "number",
        "required": false
    },
    "140": {
        "name": "commercial_amenities",
        "options": [
            "24 Hour Access",
            "Air Conditioning",
            "Central Heating",
            "Bus Line",
            "Conferencing Facility",
            "Food Service",
            "Wi-Fi",
            "Fitness Centers",
            "Outdoor Space"
        ],
        "id": 140,
        "type": "array",
        "required": false
    },
    "151": {
        "name": "land_assessment",
        "id": 151,
        "type": "number",
        "required": false
    },
    "152": {
        "name": "improvement_assessment",
        "id": 152,
        "type": "number",
        "required": false
    },
    "153": {
        "name": "total_assessment",
        "id": 153,
        "type": "number",
        "required": false
    },
    "154": {
        "name": "parcel_number",
        "id": 154,
        "type": "string",
        "required": false
    },
    "161": {
        "name": "showing_instruction",
        "id": 161,
        "type": "string",
        "required": false
    },
    "201": {
        "name": "foreclosure_phase",
        "options": [
            "Short Sale",
            "Pre-foreclosure",
            "Auction Sale",
            "Real estate-owned (REO)",
            "Government-owned"
        ],
        "id": 201,
        "type": "string",
        "required": false
    },
    "202": {
        "name": "property_type",
        "options": [
            "Single Family Home",
            "Townhouse/multi-unit",
            "Condominium",
            "Manufactured Home"
        ],
        "id": 202,
        "type": "string",
        "required": false
    },
    "1004": {
        "name": "current_zoning",
        "options": [
            "Residential",
            "Commercial"
        ],
        "id": 1004,
        "type": "string",
        "required": false
    }
}

export { ATTRIBUTES }