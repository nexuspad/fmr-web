<template>
  <div class="form-inline">
    <div class="form-group">
      <label for="bedroom">Bedroom</label>
      <select id="bedroom" class="form-control mx-sm-3" v-model="ad.getAttribute('bedroom').value">
        <option v-for="(numOfBed, index) in ad.getAttribute('bedroom').options" :key="index" :value="numOfBed">{{numOfBed}}</option>
      </select>
    </div>
    <div class="form-group">
      <label for="bathroom">Bathroom</label>
      <select id="bathroom" class="form-control mx-sm-3" v-model="ad.getAttribute('bathroom').value">
        <option v-for="(numOfBath, index) in ad.getAttribute('bathroom').options" :key="index" :value="numOfBath">{{numOfBath}}</option>
      </select>
    </div>
  </div>
</template>

<script>
export default {
  props: ['ad']
}
</script>