<template>
  <div class="mb-4">
    <title-price :ad=ad />
    <foreclosure-type :ad=ad />
    <full-address :ad=ad />
    <location-close-to :ad=ad />
    <schools :ad=ad />
    <bed-bath-basement :ad=ad />
    <property-size :ad=ad />
    <kitchen-dining :ad=ad />
    <interior :ad=ad />
    <bed-bath-features :ad=ad />
    <exterior :ad=ad />
    <community :ad=ad />
    <other-amenities :ad=ad />
    <description :ad=ad />
    <by-owner :ad=ad v-if="isByOwnerEligible(ad.categoryId)" />
    <contact :ad=ad />
  </div>
</template>

<script>
import TitlePrice from './residential/TitlePrice'
import ForeclosureType from './residential/ForeclosureType'
import BedBathBasement from './residential/BedBathBasement'
import FullAddress from './FullAddress'
import LocationCloseTo from './LocationCloseTo'
import Schools from './residential/Schools'
import Interior from './residential/Interior'
import Exterior from './residential/Exterior'
import KitchenDining from './residential/KitchenDining'
import BedBathFeatures from './residential/BedBathFeatures'
import Community from './residential/Community'
import OtherAmenities from './OtherAmenities'
import Contact from './Contact'
import ByOwner from './residential/ByOwner'
import PropertySize from './residential/PropertySize'
import Description from './Description'
import AppDataHelper from '../AppDataHelper'

export default {
  mixins: [ AppDataHelper ],
  props: ['ad'],
  components: {
      TitlePrice, ForeclosureType, BedBathBasement, FullAddress, LocationCloseTo, Schools,
      Interior, Exterior, KitchenDining, BedBathFeatures, Community, OtherAmenities,
      Contact, ByOwner, PropertySize, Description
  }
};
</script>