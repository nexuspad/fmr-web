<template>
  <div>
    <title-rent :ad=ad />
    <rent-includes :ad=ad />
    <hr/>
    <bed-bath :ad=ad />
    <hr/>
    <full-address :ad=ad />
    <hr/>
    <property-size :ad=ad v-if="isHomeStyle(ad.categoryId)" />
    <kitchen-dining :ad=ad />
    <interior :ad=ad />
    <bed-bath-features :ad=ad />
    <exterior :ad=ad v-if="isHomeStyle(ad.categoryId)" />
    <building-amenities :ad=ad v-if="isCondoStyle(ad.categoryId)" />
    <community :ad=ad />
    <description :ad=ad />
    <contact :ad=ad />
  </div>
</template>

<script>
import TitleRent from './TitleRent'
import RentIncludes from './RentIncludes'
import BedBath from './BedBath'
import FullAddress from './FullAddress'
import Interior from './Interior'
import Exterior from './Exterior'
import BuildingAmenities from './BuildingAmenities'
import KitchenDining from './KitchenDining'
import BedBathFeatures from './BedBathFeatures'
import Community from './Community'
import Contact from './Contact'
import PropertySize from './PropertySize'
import Description from './Description'
import AppDataHelper from '../AppDataHelper'

export default {
  mixins: [ AppDataHelper ],
  props: ['ad'],
  components: {
      TitleRent, RentIncludes, BedBath, FullAddress,
      Interior, Exterior, BuildingAmenities, KitchenDining, BedBathFeatures, Community, 
      Contact, PropertySize, Description
  },
  methods: {
  }
};
</script>