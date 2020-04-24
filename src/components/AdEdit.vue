<template>
  <div>
    <top-navigation />
    <div class="fmr-bordered-area">
      <div class="header">
        <h1>{{ categoryName(categoryId) }}</h1>
      </div>
      <message />
      <div class="fmr-form p-2">
        <div class="fmr-tab">
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
              <a class="nav-link" data-toggle="tab" href="#Submit" @click="save()">Submit</a>
            </li>
            <li class="nav-item">
              <a class="nav-link disabled" data-toggle="tab" href="#">Disabled</a>
            </li>
            <li class="nav-item">
              <router-link to="/account/myads" class="nav-link text-danger">Cancel</router-link>
            </li>
          </ul>
        </div>
        <div class="tab-content pt-4 pl-4">
          <div class="tab-pane active" id="Content">
            <residential-for-sale :ad="ad" v-if="template == 'ResidentialForSale'" />
            <residential-for-rent :ad="ad" v-if="template == 'ResidentialForRent'" />
            <commercial-for-sale :ad="ad" v-if="template == 'CommercialForSale'" />
            <commercial-for-rent :ad="ad" v-if="template == 'CommercialForRent'" />
          </div>
          <div class="tab-pane" id="Photos">
            <uploader :ad=ad />
          </div>
          <div class="tab-pane" id="Preview">
            <ad-detail :ad=ad />
          </div>
          <div class="tab-pane" id="Submit">
            <div class="form-group">
              <button class="btn btn-primary" v-on:click="save">Save</button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <fmr-footer />
  </div>
</template>

<script>
import TopNavigation from './TopNavigation'
import Message from './Message'
import FmrFooter from './FmrFooter'
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

export default {
  data() {
    return {
      template: '',
      categoryId: 0,
      id: 0,
      ad: new FmrAd()
    }
  },
  mixins: [ AppDataHelper ],
  components: {
    TopNavigation, FmrFooter, ResidentialForSale, ResidentialForRent, CommercialForSale, CommercialForRent, 
    Uploader, AdDetail, Message
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
      AdService.getAd(self.id)
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
    save() {
      AdService.update(this.ad).then(() => {
      })
      .catch((error) => {
        console.error(error)
      })
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