<template>
  <div>
    <title-price :ad=ad />
    <hr/>
    <bed-bath :ad=ad />
    <hr/>
    <full-address :ad=ad />
    <hr/>
    <property-size :ad=ad v-if="isHomeStyle(ad.categoryId)" />
    <kitchen-dining :ad=ad />
    <interior :ad=ad />
    <bed-bath-features :ad=ad />
    <exterior :ad=ad />
    <building-amenities :ad=ad v-if="isCondoStyle(ad.categoryId)" />
    <community :ad=ad />
    <description :ad=ad />
    <contact :ad=ad />
  </div>
</template>

<script>
import TitlePrice from './TitlePrice'
import BedBath from './BedBath'
import FullAddress from './FullAddress'
import Interior from './Interior'
import Exterior from './Exterior'
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
      TitlePrice, BedBath, FullAddress,
      Interior, Exterior, KitchenDining, BedBathFeatures, Community, 
      Contact, PropertySize, Description
  }
};
</script>