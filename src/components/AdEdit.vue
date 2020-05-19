<template>
  <div>
    <div class="fmr-bordered-area">
      <div class="header">
        <span class="h1">
          {{ categoryName(categoryId) }}
          <span class="fmr-deact ml-2" v-if="ad !== null && ad.isDeactivated()"></span>
        </span>
        <span class="font-italic font-weight-light fmr-sm-text" v-if="ad !== null && ad.isDraft()">draft
          &nbsp;<span v-if="ad !== null && ad.id">#{{ ad.id }}</span>
        </span>
        <div class="mr-2 float-right">
          <a class="far fa-times-circle fa-lg" @click="exitEdit()"></a>
        </div>
      </div>
      <message />
      <div v-if="ad == null" class="p-4">Loading...</div>
      <div class="fmr-form p-2" v-if="ad !== null">
        <div class="fmr-tab shadow-sm sticky-top">
          <div v-if="ad != null" class="float-right mr-2 pt-1 pb-1">
            <button class="btn btn-primary" :class="{disabled: invalidFields.length > 0}" 
              v-on:click="save(false)" v-if="ad !== null && !ad.isDraft()">Update</button>
            <button class="btn btn-primary" 
              data-toggle="modal" data-target="#SubmissionConfirmation" :class="{disabled: invalidFields.length > 0}" 
              v-if="ad !== null && ad.isDraft()">Publish</button>
          </div>
          <ul class="nav nav-tabs">
            <li class="nav-item">
              <a class="nav-link active" data-toggle="tab" href="#Content">Content</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" data-toggle="tab" href="#Photos">Photos</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" data-toggle="tab" href="#Preview">Preview</a>
            </li>
            <!--
            <li class="nav-item">
              <router-link to="/account/myads" class="nav-link text-danger" v-if="!ad.isDraft()">Cancel</router-link>
              <a class="nav-link text-danger" data-toggle="tab" href="#Cancel" v-if="ad.isDraft()">Cancel</a>
            </li>
            -->
          </ul>
        </div>
        <div class="tab-content pt-4 pr-2">
          <div class="tab-pane active pl-4" id="Content">
            <residential-for-sale :ad="ad" v-if="template == 'ResidentialForSale'" />
            <residential-for-rent :ad="ad" v-if="template == 'ResidentialForRent'" />
            <commercial-for-sale :ad="ad" v-if="template == 'CommercialForSale'" />
            <commercial-for-rent :ad="ad" v-if="template == 'CommercialForRent'" />
            <land-for-sale :ad="ad" v-if="template == 'LandForSale'" />
            <post-warning />
          </div>
          <div class="tab-pane pl-4" id="Photos">
            <uploader :ad=ad />
          </div>
          <div class="tab-pane" id="Preview">
            <ad-detail :ad=ad :key="ad.updateTime" v-if="invalidFields.length === 0" />
            <div v-if="invalidFields.length > 0">
              The following fields are required before you can submit the ad:
              <ul v-if="invalidFields.length > 0">
                <li v-for="(field, index) in invalidFields" v-bind:key="index" class="border-bottom p-2 text-capitalize">
                  {{ field.replace('_', ' ') }}
                </li>
              </ul>
            </div>
          </div>
          <div class="tab-pane" id="Submit">
            <div class="align-middle text-center pt-5 pb-5">
              <p>
              Before publishing, please review and make sure you agree to FindMyRoof.com's 
              <a href="/site/termsofservice">Terms of Service</a> and <a href="/site/privacypolicy">Privacy Policy</a>.
              </p>
              <button class="btn btn-primary" v-on:click="save">I agree and submit</button>
            </div>
          </div>
          <div class="tab-pane" id="Cancel">
            <div class="align-middle text-center pt-5 pb-5">
              <p>
              A draft copy has been saved. Keep it?
              <a class="text-primary ml-4 mr-4" href="">Yes</a>
              <a class="text-danger" href="">No</a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="modal" id="SubmissionConfirmation" tabindex="-1" role="dialog">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Submission Confirmation</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <p>Before submitting, please review and make sure you agree to FindMyRoof.com's Terms of Service and Privacy Policy.</p>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
            <button type="button" class="btn btn-primary" data-dismiss="modal" @click="submit()">I agree and submit</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Message from './Message'
import ResidentialForSale from "./templates/ResidentialForSale"
import ResidentialForRent from "./templates/ResidentialForRent"
import CommercialForSale from "./templates/CommercialForSale"
import CommercialForRent from "./templates/CommercialForRent"
import LandForSale from './templates/LandForSale'
import Uploader from './Uploader'
import AdDetail from './addisplay/AdDetail'
import AdService from "../service/AdService"
import AppDataHelper from './AppDataHelper'
import EventManager from '../util/EventManager'
import AppEvent from '../util/AppEvent'
import AdUpdateHelper from './AdUpdateHelper'
import PostWarning from './misc/PostWarning'

export default {
  data() {
    return {
      template: '',
      categoryId: null,
      id: 0,
      ad: null,
      changeTimestamp: 0,
      timerId: 0
    }
  },
  mixins: [ AppDataHelper, AdUpdateHelper ],
  components: {
    ResidentialForSale, ResidentialForRent, CommercialForSale, CommercialForRent, LandForSale,
    Uploader, AdDetail, Message, PostWarning
  },
  computed: {
    invalidFields: function() {
      return this.checkInvalidFields(this.ad)
    }
  },
  beforeMount() {
    if (this.$route.query.categoryId) {
      this.categoryId = this.$route.query.categoryId;
      this.template = this.getTemplate(this.categoryId)
    }
    if (this.$route.query.id) {
      this.id = this.$route.query.id;
    }
  },
  mounted() {
    const self = this;

    if (this.id) {
      AdService.getAd(self.id, true)
        .then(ad => {
          self.ad = ad;
          self.categoryId = self.ad.categoryId
          self.template = self.getTemplate(self.categoryId)
        })
        .catch((error) => {
          console.error("...error", error);
          EventManager.publishApiEvent(AppEvent.ofApiFailure(error));
        })
    } else if (this.categoryId) {
      AdService.adTemplate(self.categoryId)
        .then(draft => {
          self.ad = draft;
          // set an update time for use in "saveAsNeeded"
          self.ad.updateTime = Math.floor(Date.now() / 1000)
        })
        .catch((error) => {
          console.error("...error", error);
          EventManager.publishApiEvent(AppEvent.ofApiFailure(error));
        })
    }

    // set a timer to save every 5 seconds
    this.timerId = setInterval(() => self.saveAsNeeded(), 20000);
  },
  beforeDestroy() {
    if (this.timerId) {
      clearInterval(this.timerId)
    }
  },
  methods: {
    getTemplate() {
      let cCode = this.categoryCode(this.categoryId)
      if (cCode.startsWith('for-rent|residential')) {
        return 'ResidentialForRent'
      } else if (cCode.startsWith('for-sale|residential')) {
        return 'ResidentialForSale'
      } else if (cCode.startsWith('for-rent|commercial')) {
        return 'CommercialForRent'
      } else if (cCode.startsWith('for-sale|commercial')) {
        return 'CommercialForSale'
      } else if (cCode.startsWith('for-rent|vacation')) {
        return 'ResidentialForRent'
      } else if (cCode.startsWith('for-sale|land')) {
        return 'LandForSale'
      }
    },
    exitEdit() {
      this.saveAsNeeded()
      this.$router.back(-1)
    },
    saveAsNeeded() {
      if (this.changeTimestamp - this.ad.updateTime > 2)
        this.save()
    }
  },
  watch: {
    'ad.attributes': {
      handler() {
        this.changeTimestamp = Math.floor(Date.now() / 1000)
      },
      deep: true
    }
  }
};
</script>