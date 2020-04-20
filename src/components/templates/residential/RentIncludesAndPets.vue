<template>
  <div class="form-row">
    <div class="col-md-6">
      <label>Rent includes</label>
      <div class="d-flex flex-row flex-wrap bd-highlight mb-3">
        <div class="mr-4" v-for="(option, index) in ad.getAttribute(attributeId('rent_includes')).options" :key="index">
          <input type="checkbox" v-model="selections" :id="index" :value="option" v-on:change="updateSelection()" />
          <span class="p-2">{{ option }}</span>
        </div>
      </div>
    </div>
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
  methods: {
    isAllowPets() {
      if (this.ad.getAttribute(this.attributeId('pet_policy')).value &&
        this.ad.getAttribute(this.attributeId('pet_policy')).value.toLowerCase === 'yes')
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
    },
    updateSelection () {
      this.ad.getAttribute('rent_includes').value = this.selections.join(',')
    }
  }
}
</script>