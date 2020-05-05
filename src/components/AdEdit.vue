<template>
  <div>
    <div class="fmr-bordered-area">
      <div class="header">
        <h1>
          {{ categoryName(categoryId) }}
          <span class="fmr-deact ml-2" v-if="!ad.isActive()"></span>
        </h1>
      </div>
      <message />
      <div class="fmr-form p-2">
        <div class="fmr-tab shadow-sm sticky-top">
          <div class="float-right mr-2 pt-1 pb-1" style="background-color: #ffffff;">
            <button class="btn btn-primary" v-on:click="save" v-if="!ad.isDraft()">Save</button>
            <button class="btn btn-primary" 
              data-toggle="modal" data-target="#SubmissionConfirmation" v-if="ad.isDraft()">Submit</button>
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
            <li class="nav-item">
              <router-link to="/account/myads" class="nav-link text-danger" v-if="!ad.isDraft()">Cancel</router-link>
              <a class="nav-link text-danger" data-toggle="tab" href="#Cancel" v-if="ad.isDraft()">Cancel</a>
            </li>
          </ul>
        </div>
        <div class="tab-content pt-4 pl-4 pr-2">
          <div class="tab-pane active" id="Content">
            <residential-for-sale :ad="ad" v-if="template == 'ResidentialForSale'" />
            <residential-for-rent :ad="ad" v-if="template == 'ResidentialForRent'" />
            <commercial-for-sale :ad="ad" v-if="template == 'CommercialForSale'" />
            <commercial-for-rent :ad="ad" v-if="template == 'CommercialForRent'" />
            <post-warning />
          </div>
          <div class="tab-pane" id="Photos">
            <uploader :ad=ad />
          </div>
          <div class="tab-pane" id="Preview">
            <ad-detail :ad=ad :key="ad.updateTime" />
          </div>
          <div class="tab-pane" id="Submit">
            <div class="align-middle text-center pt-5 pb-5">
              <p>
              Before submitting, please review and make sure you agree to FindMyRoof.com's Terms of use and Privacy policy.
              </p>
              <button class="btn btn-primary" v-on:click="save">I agree and submit</button>
            </div>
          </div>
          <div class="tab-pane" id="Cancel">
            <div class="align-middle text-center pt-5 pb-5">
              <p>
              A draft copy has been saved.
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
            <h5 class="modal-title">Submission confirmation</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <p>Before submitting, please review and make sure you agree to FindMyRoof.com's Terms of use and Privacy policy.</p>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
            <button type="button" class="btn btn-primary">I agree and submit</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Message from './Message'
import ResidentialForSale from "./templates/ResidentialForSale";
import ResidentialForRent from "./templates/ResidentialForRent";
import CommercialForSale from "./templates/CommercialForSale";
import CommercialForRent from "./templates/CommercialForRent";
import Uploader from './Uploader'
import AdDetail from './addisplay/AdDetail'
import AdService from "../service/AdService";
import FmrAd from "../service/model/FmrAd";
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
      ad: new FmrAd()
    }
  },
  mixins: [ AppDataHelper, AdUpdateHelper ],
  components: {
    ResidentialForSale, ResidentialForRent, CommercialForSale, CommercialForRent, 
    Uploader, AdDetail, Message, PostWarning
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
        })
        .catch((error) => {
          console.error("...error", error);
          EventManager.publishApiEvent(AppEvent.ofApiFailure(error));
        })
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
      }
    },
    submitAndActivate() {
      AdService.submitAndActivate(this.ad).then(() => {
      })
      .catch((error) => {
        console.error(error)
      })
    }
  }
};
</script>