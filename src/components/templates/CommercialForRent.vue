<template>
  <div class="mb-4">
    <title-lease-rate :ad=ad />
    <full-address :ad=ad />
    <location-close-to :ad=ad />
    <space-for-lease :ad=ad />
    <lot-parking :ad=ad />
    <tenancy :ad=ad />
    <com-amenities :ad=ad />
    <other-amenities :ad=ad />
    <description :ad=ad />
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
import TitleLeaseRate from './commercial/TitleLeaseRate'
import SpaceForLease from './commercial/SpaceForLease'
import LotParking from './commercial/LotParking'
import ComAmenities from './commercial/ComAmenities'
import Tenancy from './commercial/Tenancy'

export default {
  mixins: [ AppDataHelper ],
  props: ['ad'],
  components: {
    FullAddress, LocationCloseTo, Contact, Description, TitleLeaseRate, SpaceForLease, LotParking, ComAmenities, OtherAmenities, Tenancy
  }
}
</script>