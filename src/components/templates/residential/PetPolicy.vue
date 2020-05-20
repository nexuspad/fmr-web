<template>
  <div class="border-bottom pb-3 mb-3">
    <div class="form-row">
      <div class="col-md-2">
        <label for="pp">Pet policy</label>
        <select id="pp" class="form-control" v-model="allowPets" @change="updatePetPolicy()">
          <option value="no">No</option>
          <option value="yes">Yes</option>
        </select>
      </div>
      <div class="col-md-4" v-show="allowPets === 'yes'">
        <label for="ppd">Details</label>
        <textarea-autosize id="ppd" class="form-control" v-model="ad.getAttribute(attributeId('pet_policy_details')).value"
          :min-height="50" :max-height="80"></textarea-autosize>
      </div>
    </div>
  </div>
</template>

<script>
import AppDataHelper from '../../AppDataHelper'

export default {
  data () {
    return {
      allowPets: this.isAllowPets(),
      selections: []
    };
  },
  mixins: [ AppDataHelper ],
  props: ['ad'],
  mounted() {
    this.allowPets = this.isAllowPets()
  },
  methods: {
    isAllowPets() {
      if (this.ad.getAttribute(this.attributeId('pet_policy')).value &&
        this.ad.getAttribute(this.attributeId('pet_policy')).value.toLowerCase() === 'yes')
      {
        return 'yes'
      }
      return 'no'
    },
    updatePetPolicy() {
      if (this.allowPets) {
        this.ad.getAttribute(this.attributeId('pet_policy')).value = 'yes'
      } else {
        this.ad.getAttribute(this.attributeId('pet_policy')).value = 'no'
      }
    }
  }
}
</script>