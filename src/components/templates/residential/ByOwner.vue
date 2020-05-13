<template>
  <div class="border-bottom pb-3 mb-3">
    <div class="form-row">
      <div class="col">
        <div class="custom-control custom-switch">
          <input type="checkbox" class="custom-control-input" id="fsbo" 
            v-model="byOwner" @change="updateRepresentation()" />
          <label class="custom-control-label" for="fsbo">Represented by owner (FSBO, FRBO)</label>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import AppDataHelper from '../../AppDataHelper'

export default {
  mixins: [ AppDataHelper ],
  props: ['ad'],
  data() {
    return {
      byOwner: this.isByOwner()
    }
  },
  methods: {
    isByOwner() {
      if (this.ad.getAttribute(this.attributeId('represented_by_owner')).value === 'yes') {
          return true
        }
      return false
    },
    updateRepresentation() {
      if (this.byOwner) {
        this.ad.getAttribute(this.attributeId('represented_by_owner')).value = 'yes'
      } else {
        this.ad.getAttribute(this.attributeId('represented_by_owner')).value = 'no'
      }
    }
  }
}
</script>