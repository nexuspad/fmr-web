<template>
  <div>
    <navigation />
    <div class="container-fluid" v-if="jobs.length > 0">
      <div class="row pb-1 font-weight-bold">
        <div class="col-2">Time</div>
        <div class="col-2">Name</div>
        <div class="col-8"></div>
      </div>
      <div class="row pb-1 fmr-sm-text mb-2" v-for="job in jobs" v-bind:key="job.reportId">
        <div class="col-2">
          {{ displayDate(job.reportDate) }}
        </div>
        <div class="col-2">
          {{ job.jobName }}
        </div>
        <div class="col-8">
          {{ job.log }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import AdminHelper from './AdminHelper'
import Navigation from './Navigation'
import AdminService from '../service/AdminService'

export default {
  mixins: [ AdminHelper ],
  components: {
    Navigation
  },
  data() {
    return {
      jobs: []
    }
  },
  mounted() {
    this.getLatest()
  },
  methods: {
    getLatest() {
      const self = this
      AdminService.jobsLog().then((jobsReturned) => {
        while (self.jobs.length > 0) {
          self.jobs.pop()
        }
        jobsReturned.forEach(j => {
          self.jobs.push(j)
        });
      }).catch((error) => {
        console.error(error)
      })
    },
    displayDate(ts) {
      return new Date(ts*1000).toLocaleString("en-US")
    }
  }
}
</script>