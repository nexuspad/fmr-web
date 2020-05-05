<template>
  <div class="container">
    <form v-on:submit.prevent>
      <div class="row mb-2">
        <div class="col">
          <state-selector />
        </div>
      </div>
      <div class="row mb-2">
        <div class="col">
          <input type="text" class="form-control" placeholder="city" v-model="city" />
        </div>
      </div>
      <div class="row mb-2">
        <div class="col">
          <input type="text" class="form-control" placeholder="zip code" v-model="zipCode" />
        </div>
      </div>
      <div class="row">
        <div class="col">
          Rent
        </div>
      </div>
      <div class="row mb-2">
        <div class="col-6">
          <select class="form-control" name="RentMin">
            <option value="min">min</option>
            <option value=400 >$400</option>
            <option value=600 >$600</option>
            <option value=800 >$800</option>
            <option value=1000 >$1,000</option>
            <option value=1200 >$1,200</option>
            <option value=1400 >$1,400</option>
            <option value=1600 >$1,600</option>
            <option value=1800 >$1,800</option>
            <option value=2000 >$2,000</option>
            <option value=2500 >$2,500</option>
            <option value=3000 >$3,000</option>
          </select>
        </div>
        <div class="col-6">
          <select class="form-control" name="RentMax">
            <option value="min">min</option>
            <option value=400 >$400</option>
            <option value=600 >$600</option>
            <option value=800 >$800</option>
            <option value=1000 >$1,000</option>
            <option value=1200 >$1,200</option>
            <option value=1400 >$1,400</option>
            <option value=1600 >$1,600</option>
            <option value=1800 >$1,800</option>
            <option value=2000 >$2,000</option>
            <option value=2500 >$2,500</option>
            <option value=3000 >$3,000</option>
          </select>
        </div>
      </div>
      <div class="row">
        <div class="col">
          Bedroom
        </div>
      </div>
      <div class="row mb-2">
        <div class="col-6">
          <select class="form-control" name="BedMin">
            <option value="min">min</option>
            <option value=1 >1</option>
            <option value=2 >2</option>
            <option value=3 >3</option>
            <option value=4 >4</option>
            <option value=5 >5</option>
          </select>
        </div>
        <div class="col-6">
          <select class="form-control" name="BedMax">
            <option value="min">min</option>
            <option value=1 >1</option>
            <option value=2 >2</option>
            <option value=3 >3</option>
            <option value=4 >4</option>
            <option value=5 >5</option>
          </select>
        </div>
      </div>
      <div class="row">
        <div class="col">
          Bathroom
        </div>
      </div>
      <div class="row mb-2">
        <div class="col-6">
          <select class="form-control" name="BathMin">
            <option value="min">min</option>
            <option value=1 >1</option>
            <option value=2 >2</option>
            <option value=3 >3</option>
            <option value=4 >4</option>
            <option value=5 >5</option>
          </select>
        </div>
        <div class="col-6">
          <select class="form-control" name="BathMax">
            <option value="min">min</option>
            <option value=1 >1</option>
            <option value=2 >2</option>
            <option value=3 >3</option>
            <option value=4 >4</option>
            <option value=5 >5</option>
          </select>
        </div>
      </div>

      <!--
      <div class="row">
        <input type="text" class="form-control" placeholder="neighborhood" v-model="location.neighborhood" />
      </div>
      -->
      <div class="row">
        <div class="col">
          <button class="btn btn-primary" v-on:click="applyFilter()" :disabled="posting">Filter</button>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import StateSelector from "./StateSelector"
import AppContext from './AppContext'

export default {
  components: {
    StateSelector
  },
  data() {
    return {
      city: '',
      zipCode: '',
      posting: false
    }
  },
  beforeMount() {
    this.setFilter()
  },
  methods: {
    setFilter() {
      let params = AppContext.getParams().filters
      console.log(params)
      this.city = params['city']
      this.zipCode = params['zip_code']
    },
    applyFilter() {
      let {path, queryParams} = AppContext.makePath({zip_code: this.zipCode, city: this.city})
      this.$router.push({path: path, query:queryParams})
    }
  },
  watch: {
    "$route.query": function() {
      this.setFilter()
    }
  }
}
</script>