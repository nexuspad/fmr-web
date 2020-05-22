<template>
  <div class="border-bottom pb-3 mb-3">
    <div class="form-row">
      <div class="col-md-2">
        <label for="bedroom" class="required">Bedroom</label>
        <select id="bedroom" class="form-control" v-model="ad.getAttribute(attributeId('bedroom')).value">
          <option :value="''">Choose...</option>
          <option v-for="(numOfBed, index) in attributeOptions('bedroom')" :key="index" :value="numOfBed">{{numOfBed}}</option>
        </select>
      </div>
      <div class="col-md-2">
        <label for="sleeps" class="required">Sleeps</label>
        <input type="text" class="form-control" id="sleeps"
          name="sleeps" v-model="ad.getAttribute(attributeId('sleeps')).value" />
      </div>
      <div class="col-md-2">
        <label for="bathroom" class="required">Bathroom</label>
        <select id="bathroom" class="form-control" v-model="ad.getAttribute(attributeId('bathroom')).value">
          <option :value="''">Choose...</option>
          <option v-for="(numOfBath, index) in attributeOptions('bathroom')" :key="index" :value="numOfBath">{{numOfBath}}</option>
        </select>
      </div>
      <div class="col-md-2">
        <label for="square_footage">Square footage</label>
        <div class="input-group">
          <input type="text" class="form-control" id="square_footage" placeholder="ex. 1000"
            name="square_footage" v-model="ad.getAttribute(attributeId('square_footage')).value" />
          <div class="input-group-append">
            <span class="input-group-text">SF</span>
          </div>
        </div>
      </div>
      <div class="col-md-2">
        <label for="parking">Parking</label>
        <input type="text" class="form-control" id="parking"
          name="parking" v-model="ad.getAttribute(attributeId('parking')).value" />
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