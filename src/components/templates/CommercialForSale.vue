<template>
  <div class="mb-4">
    <title-rate-price :ad=ad />
    <full-address :ad=ad />
    <location-close-to :ad=ad />
    <building :ad=ad />
    <lot-parking :ad=ad />
    <tenancy :ad=ad />
    <com-amenities :ad=ad />
    <other-amenities :ad=ad />
    <description :ad=ad />
    <financials :ad=ad />
    <contact :ad=ad />
  </div>
</template>

<script>
import AppDataHelper from '../AppDataHelper'
import FullAddress from './FullAddress'
import LocationCloseTo from './LocationCloseTo'
import Contact from './Contact'
import Description from './Description'
import OtherAmenities from './OtherAmenities'
import TitleRatePrice from './commercial/TitleRatePrice'
import Building from './commercial/Building'
import LotParking from './commercial/LotParking'
import ComAmenities from './commercial/ComAmenities'
import Tenancy from './commercial/Tenancy'
import Financials from './commercial/Financials'

export default {
  mixins: [ AppDataHelper ],
  props: ['ad'],
  components: {
    FullAddress, LocationCloseTo, Contact, Description, TitleRatePrice, Building, LotParking, ComAmenities, OtherAmenities, Tenancy, Financials
  }
}
</script>