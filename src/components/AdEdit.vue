<template>
  <div class="p-2">
    <h1>This is the ad edit page</h1>
    <div class="form-group">
      <button class="btn btn-primary" v-on:click="save">Save</button>
    </div>
    <residential-for-sale :ad="ad" />
    <uploader />
  </div>
</template>

<script>
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
    };
  },
  components: {
    ResidentialForSale, Uploader
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