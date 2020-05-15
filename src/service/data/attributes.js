const ATTRIBUTES =
{
    "1": {
        "name": "title",
        "id": 1,
        "type": "string"
    },
    "2": {
        "name": "description",
        "id": 2,
        "type": "string"
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
        "type": "number"
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
        "type": "number"
    },
    "10": {
        "name": "city",
        "id": 10,
        "type": "string"
    },
    "12": {
        "name": "state",
        "id": 12,
        "type": "string"
    },
    "18": {
        "name": "dimension",
        "id": 18,
        "type": "string"
    },
    "19": {
        "name": "square_footage",
        "id": 19,
        "type": "number"
    },
    "21": {
        "name": "monthly_rent",
        "id": 21,
        "type": "number"
    },
    "22": {
        "name": "asking_price",
        "id": 22,
        "type": "number"
    },
    "23": {
        "name": "year_built",
        "id": 23,
        "type": "number"
    },
    "24": {
        "name": "cap_rate",
        "id": 24,
        "type": "string"
    },
    "25": {
        "name": "security_deposit",
        "id": 25,
        "type": "number"
    },
    "26": {
        "name": "lease_term",
        "id": 26,
        "type": "string"
    },
    "28": {
        "name": "acreage",
        "id": 28,
        "type": "number"
    },
    "29": {
        "name": "space_size",
        "id": 29,
        "type": "number"
    },
    "30": {
        "name": "street_address",
        "id": 30,
        "type": "string"
    },
    "31": {
        "name": "represented_by_owner",
        "options": [
            "no",
            "yes"
        ],
        "id": 31,
        "type": "string"
    },
    "32": {
        "name": "address_line_2",
        "id": 32,
        "type": "string"
    },
    "33": {
        "name": "zip_code",
        "id": 33,
        "type": "string"
    },
    "35": {
        "name": "homeowner_association_fee",
        "id": 35,
        "type": "number"
    },
    "36": {
        "name": "condo_fee",
        "id": 36,
        "type": "number"
    },
    "39": {
        "name": "pet_policy",
        "options": [
            "no",
            "yes"
        ],
        "id": 39,
        "type": "string"
    },
    "41": {
        "name": "other_amenities",
        "id": 41,
        "type": "string"
    },
    "42": {
        "name": "parking_spaces",
        "id": 42,
        "type": "number"
    },
    "43": {
        "name": "school",
        "id": 43,
        "type": "string"
    },
    "46": {
        "name": "basement",
        "options": [
            "crawl space",
            "full, finished",
            "full, unfinished",
            "partial, finished",
            "partial, unfinished",
            "slab/none"
        ],
        "id": 46,
        "type": "string"
    },
    "47": {
        "name": "close_to",
        "id": 47,
        "type": "string"
    },
    "49": {
        "name": "neighborhood",
        "id": 49,
        "type": "string"
    },
    "50": {
        "name": "contact_name",
        "id": 50,
        "type": "string"
    },
    "51": {
        "name": "contact_phone",
        "id": 51,
        "type": "number"
    },
    "52": {
        "name": "county",
        "id": 52,
        "type": "string"
    },
    "53": {
        "name": "open_house",
        "id": 53,
        "type": "date"
    },
    "54": {
        "name": "open_house_hours",
        "id": 54,
        "type": "string"
    },
    "55": {
        "name": "brokerage_company",
        "id": 55,
        "type": "string"
    },
    "56": {
        "name": "mls_id",
        "id": 56,
        "type": "string"
    },
    "57": {
        "name": "lot_size",
        "id": 57,
        "type": "number"
    },
    "58": {
        "name": "contact_email",
        "id": 58,
        "type": "string"
    },
    "59": {
        "name": "company_web_address",
        "id": 59,
        "type": "string"
    },
    "60": {
        "name": "interior",
        "options": [
            "2-zone AC/heating",
            "Crown molding",
            "Fireplace",
            "Furnished",
            "Hardwood floor",
            "Laundry room",
            "Washer and dryer",
            "Washer/dryer connection"
        ],
        "id": 60,
        "type": "array"
    },
    "61": {
        "name": "exterior",
        "options": [
            "1-car garage",
            "1-car parking space",
            "2-car garage",
            "2-car parking space",
            "3-car garage",
            "Balcony",
            "Cul-de-sac",
            "Deck",
            "Fenced backyard",
            "Front porch",
            "Irrigation system",
            "Patio",
            "Private swimming pool"
        ],
        "id": 61,
        "type": "array"
    },
    "62": {
        "name": "rent_includes",
        "options": [
            "Electricity",
            "Garbage pickup",
            "Gas",
            "Water and sewer"
        ],
        "id": 62,
        "type": "array"
    },
    "63": {
        "name": "lot_developed",
        "options": [
            "no",
            "yes"
        ],
        "id": 63,
        "type": "string"
    },
    "64": {
        "name": "hide_my_address",
        "id": 64,
        "type": "string"
    },
    "65": {
        "name": "owner_financing_available",
        "options": [
            "no",
            "yes"
        ],
        "id": 65,
        "type": "string"
    },
    "66": {
        "name": "kitchen_and_dining",
        "options": [
            "Breakfast area(nook)",
            "Dishwasher",
            "Formal dining room",
            "Garbage disposal",
            "Granite countertops",
            "Range/oven",
            "Refrigerator"
        ],
        "id": 66,
        "type": "array"
    },
    "67": {
        "name": "bed_and_bath",
        "options": [
            "Guest suite on main",
            "In-law suite",
            "Jacuzzi tub",
            "Master on main",
            "Separate shower in master bath",
            "Walk-in closet in master"
        ],
        "id": 67,
        "type": "array"
    },
    "68": {
        "name": "community",
        "options": [
            "Basketball",
            "Close to park",
            "Club house",
            "Fitness center",
            "Gated community",
            "Golf",
            "Hiking/biking trails",
            "Playground",
            "Public transportation",
            "Shared swimming pool",
            "Tennis"
        ],
        "id": 68,
        "type": "array"
    },
    "69": {
        "name": "condo_amenities",
        "options": [
            "24 Hour Concierge",
            "Children's playroom",
            "Fitness center",
            "Garage parking",
            "On-site parking"
        ],
        "id": 69,
        "type": "array"
    },
    "70": {
        "name": "pet_policy_details",
        "id": 70,
        "type": "string"
    },
    "71": {
        "name": "apartment_unit_amenities",
        "options": [
            "Deck",
            "Dishwasher",
            "Eat in kitchen or dining",
            "Fireplace",
            "Furnished",
            "Ground floor",
            "High speed internet",
            "Patio",
            "Range/oven",
            "Refrigerator",
            "Top floor",
            "Washer and dryer",
            "Washer/dryer connection"
        ],
        "id": 71,
        "type": "array"
    },
    "72": {
        "name": "apartment_amenities",
        "options": [
            "Business center",
            "Club house",
            "Fitness center",
            "Garage parking",
            "Gated community",
            "Hiking/biking trails",
            "Laundry facilities",
            "Public transportation",
            "Shared swimming pool",
            "Storage Space(s)",
            "Tennis",
            "Wheelchair Access"
        ],
        "id": 72,
        "type": "array"
    },
    "73": {
        "name": "available_date",
        "id": 73,
        "type": "date"
    },
    "74": {
        "name": "special_offer",
        "id": 74,
        "type": "string"
    },
    "75": {
        "name": "college",
        "id": 75,
        "type": "string"
    },
    "76": {
        "name": "elementary_school",
        "id": 76,
        "type": "string"
    },
    "77": {
        "name": "middle_school",
        "id": 77,
        "type": "string"
    },
    "78": {
        "name": "high_school",
        "id": 78,
        "type": "string"
    },
    "81": {
        "name": "community_type",
        "id": 81,
        "type": "string"
    },
    "83": {
        "name": "model",
        "id": 83,
        "type": "string"
    },
    "91": {
        "name": "sleeps",
        "id": 91,
        "type": "string"
    },
    "92": {
        "name": "min_stay",
        "id": 92,
        "type": "string"
    },
    "93": {
        "name": "rate_per_night",
        "id": 93,
        "type": "string"
    },
    "101": {
        "name": "typical_floor_size",
        "id": 101,
        "type": "number"
    },
    "102": {
        "name": "gross_leasable_area",
        "id": 102,
        "type": "number"
    },
    "110": {
        "name": "rate_sqft_year",
        "id": 110,
        "type": "number"
    },
    "111": {
        "name": "tenancy",
        "options": [
            "multiple",
            "single"
        ],
        "id": 111,
        "type": "string"
    },
    "112": {
        "name": "building_size_sqft",
        "id": 112,
        "type": "number"
    },
    "113": {
        "name": "tenants",
        "id": 113,
        "type": "string"
    },
    "121": {
        "name": "building_class",
        "options": [
            "A",
            "B",
            "C"
        ],
        "id": 121,
        "type": "string"
    },
    "122": {
        "name": "zoning_code",
        "id": 122,
        "type": "string"
    },
    "123": {
        "name": "number_of_stories",
        "id": 123,
        "type": "string"
    },
    "124": {
        "name": "parking",
        "id": 124,
        "type": "string"
    },
    "125": {
        "name": "parking_ratio",
        "id": 125,
        "type": "string"
    },
    "126": {
        "name": "condition",
        "id": 126,
        "type": "string"
    },
    "131": {
        "name": "price_per_sqft",
        "id": 131,
        "type": "number"
    },
    "140": {
        "name": "commercial_amenities",
        "options": [
            "24 Hour Access",
            "Air Conditioning",
            "Bus Line",
            "Central Heating",
            "Conferencing Facility",
            "Food Service"
        ],
        "id": 140,
        "type": "array"
    },
    "151": {
        "name": "land_assessment",
        "id": 151,
        "type": "number"
    },
    "152": {
        "name": "improvement_assessment",
        "id": 152,
        "type": "number"
    },
    "153": {
        "name": "total_assessment",
        "id": 153,
        "type": "number"
    },
    "154": {
        "name": "parcel_number",
        "id": 154,
        "type": "string"
    },
    "1004": {
        "name": "current_zoning",
        "options": [
            "commercial",
            "residential"
        ],
        "id": 1004,
        "type": "string"
    },
    "1008": {
        "name": "rate",
        "id": 1008,
        "type": "string"
    }
}

export { ATTRIBUTES }