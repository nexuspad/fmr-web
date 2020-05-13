<template>
  <div class="border-bottom pb-3 mb-3">
    <div class="form-row">
      <div class="col-md-3">
        <label for="elementary_school">Elementary school</label>
        <input type="text" class="form-control" id="elementary_school" placeholder=""
          name="elementary_school" v-model="ad.getAttribute(attributeId('elementary_school')).value" />
      </div>
      <div class="col-md-3">
        <label for="middle_school">Middle school</label>
        <input type="text" class="form-control" id="middle_school" placeholder=""
          name="middle_school" v-model="ad.getAttribute(attributeId('middle_school')).value" />
      </div>
      <div class="col-md-3">
        <label for="high_school">High school</label>
        <input type="text" class="form-control" id="high_school" placeholder=""
          name="high_school" v-model="ad.getAttribute(attributeId('high_school')).value" />
      </div>
      <div class="col-md-3">
        <label for="college">College</label>
        <input type="text" class="form-control" id="college" placeholder=""
          name="college" v-model="ad.getAttribute(attributeId('college')).value" />
      </div>
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