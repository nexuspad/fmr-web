<template>
  <div>
    <title-price :ad=ad />
    <hr/>
    <bed-bath :ad=ad />
    <hr/>
    <full-address :ad=ad />
    <hr/>
    <interior :ad=ad />
    <hr/>
    <contact :ad=ad />
  </div>
</template>

<script>
import TitlePrice from './TitlePrice'
import BedBath from './BedBath'
import FullAddress from './FullAddress'
import Interior from './Interior'
import Contact from './Contact'

export default {
  props: ['ad'],
  components: {
      TitlePrice, BedBath, FullAddress, Interior, Contact
  }
};
</script>