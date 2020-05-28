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
      <div class="row" v-if="forRent">
        <div class="col">
          Rent
        </div>
      </div>
      <div class="row mb-2" v-if="forRent">
        <div class="col-6">
          <select class="form-control" name="RentMin" v-model="rentMin">
            <option value="0">min</option>
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
          <select class="form-control" name="RentMax" v-model="rentMax">
            <option value="max">max</option>
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
      <div class="row" v-if="forSale">
        <div class="col">
          Price
        </div>
      </div>
      <div class="row mb-2" v-if="forSale">
        <div class="col-6">
          <select class="form-control" name="PriceMin" v-model="priceMin">
            <option value="0">min</option>
            <option value=100000 >$100,000</option>
            <option value=200000 >$200,000</option>
            <option value=300000 >$300,000</option>
            <option value=400000 >$400,000</option>
            <option value=500000 >$500,000</option>
            <option value=600000 >$600,000</option>
            <option value=700000 >$700,000</option>
            <option value=800000 >$800,000</option>
          </select>
        </div>
        <div class="col-6">
          <select class="form-control" name="PriceMax" v-model="priceMax">
            <option value="max">max</option>
            <option value=200000 >$200,000</option>
            <option value=300000 >$300,000</option>
            <option value=400000 >$400,000</option>
            <option value=500000 >$500,000</option>
            <option value=600000 >$600,000</option>
            <option value=700000 >$700,000</option>
            <option value=800000 >$800,000</option>
            <option value=900000 >$900,000</option>
            <option value=1000000 >$1M</option>
            <option value=1250000 >$1.25M</option>
            <option value=15000000 >$1.5M</option>
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
          <select class="form-control" name="BedMin" v-model="bedMin">
            <option value="0">min</option>
            <option value=1 >1</option>
            <option value=2 >2</option>
            <option value=3 >3</option>
            <option value=4 >4</option>
            <option value=5 >5</option>
          </select>
        </div>
        <div class="col-6">
          <select class="form-control" name="BedMax" v-model="bedMax">
            <option value="max">max</option>
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
          <select class="form-control" name="BathMin" v-model="bathMin">
            <option value="0">min</option>
            <option value=1 >1</option>
            <option value=2 >2</option>
            <option value=3 >3</option>
            <option value=4 >4</option>
            <option value=5 >5</option>
          </select>
        </div>
        <div class="col-6">
          <select class="form-control" name="BathMax" v-model="bathMax">
            <option value="max">max</option>
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
import AppDataHelper from './AppDataHelper'

export default {
  mixins: [ AppDataHelper ],
  components: {
    StateSelector
  },
  data() {
    return {
      forRent: false,
      forSale: false,
      city: '',
      zipCode: '',
      bedMin: 0,
      bedMax: 'max',
      bathMin: 0,
      bathMax: 'max',
      rentMin: 0,
      rentMax: 'max',
      priceMin: 0,
      priceMax: 'max',
      posting: false
    }
  },
  beforeMount() {
    this.setFilter()
  },
  methods: {
    setFilter() {
      let params = AppContext.getParams().filters
      this.city = params['city']
      this.zipCode = params['zip_code']
      
      if (params['bedroom'] && params['bedroom'].includes('-')) {
        let [min, max] = params['bedroom'].split('-')
        if (min) {
          this.bedMin = min
        } else {
          this.bedMin = 0
        }
        if (max) {
          this.bedMax = max
        } else {
          this.bedMax = 'max'
        }
      } else {
        this.bedMin = 0
        this.bedMax = 'max'
      }

      if (params['bathroom'] && params['bathroom'].includes('-')) {
        let [min, max] = params['bathroom'].split('-')
        if (min) {
          this.bathMin = min
        } else {
          this.bathMin = 0
        }
        if (max) {
          this.bathMax = max
        } else {
          this.bathMax = 'max'
        }
      } else {
        this.bathMin = 0
        this.bathMax = 'max'
      }

      if (params['rent'] && params['rent'].includes('-')) {
        let [min, max] = params['rent'].split('-')
        if (min) {
          this.rentMin = min
        } else {
          this.rentMax = 0
        }
        if (max) {
          this.rentMax = max
        } else {
          this.rentMax = 'max'
        }
      } else {
        this.rentMin = 0
        this.rentMax = 'max'
      }
    },
    applyFilter() {
      let params = {}

      // beds
      let beds = ''
      if (this.bedMin != 0) {
        beds = this.bedMin + '-'
        if (this.bedMax !== 'max' && parseInt(this.bedMax) > parseInt(this.bedMin)) {
          beds += this.bedMax
        }
      } else if (this.bedMax != 'max') {
        beds = '-' + this.bedMax
      }
      if (beds) {
        params['bedroom'] = beds
      }

      // bath
      let bath = ''
      if (this.bathMin != 0) {
        bath = this.bathMin + '-'
        if (this.bathMax !== 'max' && parseInt(this.bathMax) > parseInt(this.bathMin)) {
          bath += this.bathMax
        }
      } else if (this.bathMax != 'max') {
        bath = '-' + this.bathMax
      }
      if (bath) {
        params['bathroom'] = bath
      }

      // rent
      let rent = ''
      if (this.rentMin != 0) {
        rent = this.rentMin + '-'
        if (this.rentMax !== 'max' && parseInt(this.rentMax) > parseInt(this.rentMin)) {
          rent += this.rentMax
        }
      } else if (this.rentMax != 'max') {
        rent = '-' + this.rentMax
      }
      if (rent) {
        params['rent'] = rent
      }

      // price
      let price = ''
      if (this.priceMin != 0) {
        price = this.priceMin + '-'
        if (this.priceMax !== 'max' && parseInt(this.priceMax) > parseInt(this.priceMin)) {
          price += this.priceMax
        }
      } else if (this.priceMax != 'max') {
        price = '-' + this.priceMax
      }
      if (price) {
        params['price'] = price
      }


      // location
      if (this.zipCode) {
        params['zip_code'] = this.zipCode
      }
      if (this.city) {
        params['city'] = this.city
      }

      let {path, queryParams} = AppContext.makePath(params)

      this.$router.push({path: path, query:queryParams})
      .catch(error => {
        if (error.name != "NavigationDuplicated") {
          throw error;
        }
      });
    }
  },
  watch: {
    "$route.query": function() {
      this.setFilter()
      this.forRent = this.isForRent(AppContext.getCategoryId())
      this.forSale = this.isForSale(AppContext.getCategoryId())
    }
  }
}
</script>