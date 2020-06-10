<template>
  <div class="col-md-3">
    <div class="custom-control custom-switch">
      <input type="checkbox" class="custom-control-input" id="availableNow" 
        v-model="isAvailableNow" @change="changeToAvailableNow()" />
      <label class="custom-control-label mb-2" for="availableNow">Available now or on</label>
    </div>
    <datepicker input-class="form-control" bootstrap-styling clear-button 
      :disabled="isAvailableNow" placeholder="Select a date"
      v-model="ad.getAttribute(attributeId('available_date')).value" />
  </div>
</template>

<script>
import AppDataHelper from '../AppDataHelper'
import Datepicker from 'vuejs-datepicker'

export default {
  mixins: [ AppDataHelper ],
  props: ['ad'],
  components: {
    Datepicker
  },
  data() {
    return {
      isAvailableNow: false
    }
  },
  mounted() {
    this.checkIfAvailableNow()
  },
  methods: {
    checkIfAvailableNow() {
      let attribute = this.ad.getAttribute(this.attributeId('available_date'))
      if (attribute && attribute.value === 'now') {
        this.isAvailableNow = true
      } else {
        this.isAvailableNow = false
      }
    },
    changeToAvailableNow() {
      if (this.isAvailableNow) {
        this.ad.getAttribute(this.attributeId('available_date')).value = 'now'
      } else {
        this.ad.getAttribute(this.attributeId('available_date')).value = ''
      }
    }
  }
}
</script>