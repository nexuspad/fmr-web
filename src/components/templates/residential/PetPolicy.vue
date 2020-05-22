<template>
  <div class="border-bottom pb-3 mb-3">
    <div class="form-row">
      <div class="col-md-2">
        <label for="pp">Pets allowed</label>
        <select id="pp" class="form-control" v-model="ad.getAttribute(attributeId('pet_allowed')).value">
          <option value="false">No</option>
          <option value="true">Yes</option>
        </select>
      </div>
      <div class="col-md-4" v-show="ad.getAttribute(attributeId('pet_allowed')).value == true">
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
  mixins: [ AppDataHelper ],
  props: ['ad']
}
</script>