<template>
  <div class="mb-4">
    <title-price :ad=ad />
    <full-address :ad=ad />
    <location-close-to :ad=ad />
    <schools :ad=ad />
    <bed-bath :ad=ad v-if="!isHomeStyle(ad.categoryId)" />
    <bed-bath-basement :ad=ad v-if="isHomeStyle(ad.categoryId)" />
    <manufactured-home :ad=ad v-if="isManufacturedHome(ad.categoryId)" />
    <property-size :ad=ad />
    <kitchen-dining :ad=ad v-if="isHomeStyle(ad.categoryId) || isCondoStyle(ad.categoryId)" />
    <interior :ad=ad v-if="isHomeStyle(ad.categoryId) || isCondoStyle(ad.categoryId)" />
    <bed-bath-features :ad=ad v-if="isHomeStyle(ad.categoryId) || isCondoStyle(ad.categoryId)" />
    <exterior :ad=ad v-if="isHomeStyle(ad.categoryId) || isCondoStyle(ad.categoryId)" />
    <condo-amenities :ad=ad v-if="isCondoStyle(ad.categoryId)" />
    <community :ad=ad v-if="isHomeStyle(ad.categoryId) || isCondoStyle(ad.categoryId)" />
    <other-amenities :ad=ad v-if="isHomeStyle(ad.categoryId) || isCondoStyle(ad.categoryId)" />
    <description :ad=ad />
    <by-owner :ad=ad v-if="isByOwnerEligible(ad.categoryId)" />
    <contact :ad=ad />
  </div>
</template>

<script>
import TitlePrice from './residential/TitlePrice'
import BedBath from './residential/BedBath'
import BedBathBasement from './residential/BedBathBasement'
import FullAddress from './FullAddress'
import LocationCloseTo from './LocationCloseTo'
import Schools from './residential/Schools'
import Interior from './residential/Interior'
import Exterior from './residential/Exterior'
import KitchenDining from './residential/KitchenDining'
import BedBathFeatures from './residential/BedBathFeatures'
import CondoAmenities from './residential/CondoAmenities'
import Community from './residential/Community'
import OtherAmenities from './OtherAmenities'
import Contact from './Contact'
import ByOwner from './residential/ByOwner'
import PropertySize from './residential/PropertySize'
import ManufacturedHome from './residential/ManufacturedHome'
import Description from './Description'
import AppDataHelper from '../AppDataHelper'

export default {
  mixins: [ AppDataHelper ],
  props: ['ad'],
  components: {
      TitlePrice, BedBath, BedBathBasement, FullAddress, LocationCloseTo, Schools,
      Interior, Exterior, KitchenDining, BedBathFeatures, CondoAmenities, Community, OtherAmenities,
      Contact, ByOwner, PropertySize, ManufacturedHome, Description
  }
};
</script>