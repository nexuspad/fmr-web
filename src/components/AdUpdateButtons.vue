<template>
  <div>
    <div class="p-2 pr-4 text-right fmr-sm-text">
      #{{ ad.id }} &ndash;
      Last Updated:  {{ ad.updateTimeDisplay }},
      <span v-if="daysToExpire > 0">expires in {{ daysToExpire }} days</span>
      <span v-if="daysToExpire <= 0">expired</span>
    </div>
    <div class="btn-group float-right mr-4">
      <button type="button" class="btn btn-primary" @click="editAd()" v-if="!ad.isDraft()">
        Update
      </button>
      <button type="button" class="btn btn-primary pl-4 pr-4" @click="editAd()" v-if="ad.isDraft()">
        Edit
      </button>
      <button type="button" class="btn btn-primary" v-if="!ad.isDraft() && !ad.isDisapproved() && daysToExpire < 30" 
        data-toggle="modal" :data-target="'#ExtendConfirmation' + ad.id">
        Extend
      </button>
      <button type="button" class="btn btn-primary" v-if="!ad.isDraft() && !ad.isDisapproved() && ad.isDeactivated()" 
        @click="activate()">
        Activate
      </button>
      <button type="button" class="btn btn-primary" v-if="!ad.isDraft() && !ad.isDisapproved() && !ad.isDeactivated()" 
        @click="deActivate()">
        Deactivate
      </button>
      <button type="button" class="btn btn-danger" data-toggle="modal" :data-target="'#DeleteConfirmation' + ad.id">
        Remove
      </button>
    </div>
    <div class="modal" :id="'DeleteConfirmation' + ad.id" tabindex="-1" role="dialog">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Confirm Deletion</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <p>
              Delete this <span v-if="!ad.isDraft()">ad</span><span v-if="ad.isDraft()">draft</span>: 
              <span v-if="!ad.title">#{{ad.id}}</span>
              <span v-if="ad.title">"{{ ad.title }}"</span>?
            </p>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancel</button>
            <button type="button" class="btn btn-danger" data-dismiss="modal" @click="deleteAd(ad)">Yes</button>
          </div>
        </div>
      </div>
    </div>
    <div class="modal" :id="'ExtendConfirmation' + ad.id" tabindex="-1" role="dialog">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Confirm Extension</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <p>
              Extend your ad <span v-if="ad.title">"{{ ad.title }}"</span> for another 90 days?
            </p>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancel</button>
            <button type="button" class="btn btn-primary" data-dismiss="modal" @click="extend(ad)">Yes</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import AdUpdateHelper from './AdUpdateHelper'

export default {
  props: ['ad'],
  mixins: [ AdUpdateHelper ],
  data() {
    return {
      daysToExpire: 0
    }
  },
  mounted() {
    this.calcDaysToExpire()
  },
  methods: {
    calcDaysToExpire() {
      let parts = this.ad.expiryDate.split('-')
      let now = new Date
      this.daysToExpire = Math.floor((Date.UTC(parts[0], parts[1], parts[2]) - Date.UTC(now.getFullYear(), now.getMonth()+1, now.getDate()))/86400000)
    }
  },
  watch: {
    "ad.expiryDate": function() {
      this.calcDaysToExpire()
    }
  }
}
</script>