<template>
  <div>
    <div>
      <input type="text" class="form-control input-underline" placeholder="Title" size="80" maxlength="80"
        name="title" v-model="ad.getAttribute('title').value" />
    </div>
    <rent :ad=ad />
    <bed-bath :ad=ad />
    <full-address :ad=ad />
    <interior :ad=ad />
    <contact :ad=ad />
  </div>
</template>

<script>
import Rent from './Rent'
import BedBath from './BedBath'
import FullAddress from './FullAddress'
import Interior from './Interior'
import Contact from './Contact'

export default {
  props: ['ad'],
  components: {
      BedBath, FullAddress, Interior, Contact
  }
};
</script>