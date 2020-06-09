<template>
  <div class="mb-4">
    <title-price :ad=ad />
    <full-address :ad=ad />
    <land-zone-size :ad=ad />
    <description :ad=ad />
    <by-owner :ad=ad />
    <contact :ad=ad />
  </div>
</template>

<script>
import TitlePrice from './residential/TitlePrice'
import FullAddress from './FullAddress'
import LandZoneSize from './land/LandZoneSize'
import Description from './Description'
import ByOwner from './ByOwner'
import Contact from './Contact'
import AppDataHelper from '../AppDataHelper'

export default {
  mixins: [ AppDataHelper ],
  props: ['ad'],
  components: {
      TitlePrice, FullAddress, LandZoneSize, ByOwner, Contact, Description
  }
};
</script>