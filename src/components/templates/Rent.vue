<template>
  <div>
    <div>
      $ <input type="text" size="4" maxlength="5"
        name="monthly_rent" v-model="ad.getAttribute(attributeId('monthly_rent')).value" />
    </div>
  </div>
</template>

<script>
import AppDataHelper from '../AppDataHelper'

export default {
  mixins: [ AppDataHelper ],
  props: ['ad']
}
</script>