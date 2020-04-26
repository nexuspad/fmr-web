<template>
  <div class="btn-group float-right">
    <button type="button" class="btn btn-primary" @click="editAd()">Update</button>
    <button type="button" class="btn btn-primary" :class="{disabled : ad.isActive()}" @click="activate()">Activate</button>
    <button type="button" class="btn btn-primary" :class="{disabled : !ad.isActive()}" @click="deActivate()">De-activate</button>
    <button type="button" class="btn btn-danger" @click="remove()">Remove</button>
  </div>
</template>

<script>
import AdUpdateHelper from './AdUpdateHelper'

export default {
  props: ['ad'],
  mixins: [ AdUpdateHelper ]
}
</script>