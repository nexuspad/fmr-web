<template>
  <div class="mb-4">
    <title-rate :ad=ad />
  </div>
</template>

<script>
import AppDataHelper from '../AppDataHelper'
import TitleRate from './commercial/TitleRate'

export default {
  mixins: [ AppDataHelper ],
  props: ['ad'],
  components: {
    TitleRate
  }
}
</script>