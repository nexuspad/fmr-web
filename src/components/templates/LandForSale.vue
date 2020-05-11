<template>
  <div class="mb-4">
    <title-price :ad=ad />
    <full-address :ad=ad />
    <description :ad=ad />
    <contact :ad=ad />
  </div>
</template>

<script>
import TitlePrice from './residential/TitlePrice'
import FullAddress from './FullAddress'
import Description from './Description'
import Contact from './Contact'
import AppDataHelper from '../AppDataHelper'

export default {
  mixins: [ AppDataHelper ],
  props: ['ad'],
  components: {
      TitlePrice, FullAddress, Contact, Description
  }
};
</script>