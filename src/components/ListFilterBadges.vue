<template>
  <div class="border-bottom pt-2 pr-2" v-if="filters.length > 0">
    <ul class="list-inline text-right mb-1">
      <li v-for="(filter, index) in filters" v-bind:key="index" class="list-inline-item">
        <span class="badge badge-info fmr-sm-text pt-1 pl-2">{{ filter.value }}
          <button type="button" class="icon-button" v-on:click="removeFilter(filter.name)">
            <i class="fa fa-times fa-medium text-light"></i>
          </button>
        </span>
      </li>
    </ul>
  </div>
</template>

<script>
import AppContext from './AppContext'
import FilterParams from './FilterParams'

export default {
  data() {
    return {
      filters: []
    }
  },
  beforeMount() {
    this.setFilter()
  },
  watch: {
    "$route.query": function() {
      this.setFilter()
    }
  },
  methods: {
    setFilter() {
      const rangeValue = (name, value) => {
        if (name === 'bedroom' || name === 'bathroom') {
          if (name === 'bedroom') name = 'bd'
          if (name === 'bathroom') name = 'ba'
          if (value.startsWith('-')) {
            return value.replace('-', 'up to ') + name
          } else if (value.endsWith('-')) {
            return value.replace('-', '+ ') + name
          } else {
            return value + ' ' + name
          }
        } else if (name ==='rent') {
          if (value.startsWith('-')) {
            return 'rent < $' + value.replace('-', '')
          } else if (value.endsWith('-')) {
            return 'rent > $' + value.replace('-', '')
          } else {
            return 'rent between ' + value
          }
        }
        return value
      }
      
      while (this.filters.length > 0) {
        this.filters.pop()
      }

      let contextFilters = AppContext.getParams().filters
      for (let name in contextFilters) {
        if (!FilterParams.noValue(contextFilters[name])) {
          this.filters.push({name: name, value: rangeValue(name, contextFilters[name])})
        }
      }
    },
    removeFilter(name) {
      let overwriteParam = {}
      overwriteParam[name] = null
console.log(overwriteParam)
      let {path, queryParams} = AppContext.makePath(overwriteParam)
console.log(path, queryParams)
      this.$router.push({path: path, query:queryParams})
      .catch(error => {
        if (error.name != "NavigationDuplicated") {
          throw error;
        }
      });
    }
  }
}
</script>

<style scoped>
button.icon-button {border: 0; background: none;}
</style>