<template>
  <div class="mb-4">
    <title-price :ad=ad />
    <full-address :ad=ad />
    <bed-bath :ad=ad v-if="!isLand(ad.categoryId)" />
    <property-size :ad=ad v-if="isHomeStyle(ad.categoryId)" />
    <kitchen-dining :ad=ad v-if="isHomeStyle(ad.categoryId) || isCondoStyle(ad.categoryId)" />
    <interior :ad=ad v-if="isHomeStyle(ad.categoryId) || isCondoStyle(ad.categoryId)" />
    <bed-bath-features :ad=ad v-if="isHomeStyle(ad.categoryId) || isCondoStyle(ad.categoryId)" />
    <exterior :ad=ad v-if="isHomeStyle(ad.categoryId) || isCondoStyle(ad.categoryId)" />
    <condo-amenities :ad=ad v-if="isCondoStyle(ad.categoryId)" />
    <community :ad=ad v-if="isHomeStyle(ad.categoryId) || isCondoStyle(ad.categoryId)" />
    <other-amenities :ad=ad v-if="isHomeStyle(ad.categoryId) || isCondoStyle(ad.categoryId)" />
    <description :ad=ad />
    <contact :ad=ad />
  </div>
</template>

<script>
import TitlePrice from './residential/TitlePrice'
import BedBath from './residential/BedBath'
import FullAddress from './FullAddress'
import Interior from './residential/Interior'
import Exterior from './residential/Exterior'
import KitchenDining from './residential/KitchenDining'
import BedBathFeatures from './residential/BedBathFeatures'
import CondoAmenities from './residential/CondoAmenities'
import Community from './residential/Community'
import OtherAmenities from './OtherAmenities'
import Contact from './Contact'
import PropertySize from './residential/PropertySize'
import Description from './Description'
import AppDataHelper from '../AppDataHelper'

export default {
  mixins: [ AppDataHelper ],
  props: ['ad'],
  components: {
      TitlePrice, BedBath, FullAddress,
      Interior, Exterior, KitchenDining, BedBathFeatures, CondoAmenities, Community, OtherAmenities,
      Contact, PropertySize, Description
  }
};
</script>