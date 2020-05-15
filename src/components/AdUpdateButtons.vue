<template>
  <div>
    <div class="p-2 pr-4 text-right fmr-sm-text">
      Last Updated:  {{ ad.updateTimeDisplay }},
      expires in {{ daysToExpire() }} days
    </div>
    <div class="btn-group float-right mr-4">
      <button type="button" class="btn btn-primary" @click="editAd()">Update</button>
      <button type="button" class="btn btn-primary" @click="extend()" v-if="!ad.isDraft() && daysToExpire() < 7">Extend</button>
      <button type="button" class="btn btn-primary" v-if="!ad.isDraft() && ad.isDeactivated()" @click="activate()">
        Activate
      </button>
      <button type="button" class="btn btn-primary" v-if="!ad.isDraft() && ad.isActive()" @click="deActivate()">
        De-activate
      </button>
      <button type="button" class="btn btn-danger" data-toggle="modal" :data-target="'#DeleteConfirmation' + ad.id">Remove</button>
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
  </div>
</template>

<script>
import AdUpdateHelper from './AdUpdateHelper'

export default {
  props: ['ad'],
  mixins: [ AdUpdateHelper ],
  methods: {
    daysToExpire() {
      return Math.floor((this.ad.expiryDate - new Date())/86400000)
    }
  }
}
</script>