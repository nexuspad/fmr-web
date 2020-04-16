<template>
  <div>
    <top-navigation />
    <div class="fmr-bordered-area">
      <div class="header">
        <h1>Single family home for rent</h1>
      </div>
      <div class="p-2">
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
              <a class="nav-link" data-toggle="tab" href="#Submit">Submit</a>
            </li>
            <li class="nav-item">
              <a class="nav-link disabled" data-toggle="tab" href="#">Disabled</a>
            </li>
            <li class="nav-item">
              <a class="nav-link text-danger" href="#">Cancel</a>
            </li>
          </ul>
        </div>
        <div class="tab-content pt-4">
          <div class="tab-pane active" id="Content">
            <residential-for-sale :ad="ad" />
          </div>
          <div class="tab-pane" id="Photos">
            <uploader />
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
import FmrFooter from './FmrFooter'
import ResidentialForSale from "./templates/ResidentialForSale";
import Uploader from './Uploader'
import AdService from "../service/AdService";
import FmrAd from "../service/model/FmrAd";

export default {
  data() {
    return {
      categoryId: 0,
      id: 0,
      ad: new FmrAd()
    }
  },
  components: {
    TopNavigation, FmrFooter, ResidentialForSale, Uploader
  },
  mounted() {
    const self = this;

    if (this.$route.query.id) {
      this.id = this.$route.query.id;
      AdService.getAd(self.id)
        .then(ad => {
          self.ad = ad;
        })
        .catch(() => {
          console.error("...error");
        })
    } else if (this.$route.query.categoryId) {
      this.categoryId = this.$route.query.categoryId;
      AdService.adTemplate(self.categoryId)
        .then(draft => {
          self.ad = draft;
        })
        .catch(() => {
          console.error("...error");
        })
    }
  },
  beforeDestroy() {},
  methods: {
    save () {
      console.log(this.ad)
    }
  },
  watch: {}
};
</script>