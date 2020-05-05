<template>
  <div>
    <vue-headful :title="title" description="" />
    <category-navigation />
    <div class="container-fluid m-0">
      <div class="row">
        <div class="col-md-10 order-lg-1 order-md-1 order-sm-2 p-0">
          <div class="fmr-bordered-area">
            <div class="header">
              <h1>{{ title }}</h1>
            </div>
            <ul class="list-unstyled" v-if="ads.length > 0">
              <li v-for="adItem in ads" v-bind:key="adItem.id" class="border-bottom p-2">
                <ad-summary :ad="adItem" />
              </li>
            </ul>
            <there-is-nothing v-if="adList !== null && ads.length === 0" />
            <div class="row pt-2">
              <div class="col"></div>
              <div class="col">
                <nav aria-label="Page navigation">
                  <paginate :page-count="pageCount" :page-range="5" :click-handler="gotoPage" :prev-text="'Prev'" :next-text="'Next'" 
                    :container-class="'pagination'" :prev-class="'page-link'" :next-class="'page-link'" :page-class="'page-link'" />
                </nav>
              </div>
              <div class="col"></div>
            </div>
          </div>
        </div>
        <div class="col-md-2 order-lg-2 order-md-2 order-sm-1 mb-2 pr-1">
          <div class="fmr-bordered-area">
            <div class="header">
              <h1>Search filters</h1>
            </div>
            <div>
              <list-filter class="p-2" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CategoryNavigation from "./CategoryNavigation"
import Paginate from 'vuejs-paginate'
import AppDataHelper from './AppDataHelper'
import ListFilter from "./ListFilter";
import AdSummary from "./AdSummary";
import AdService from "../service/AdService";
import AppContext from './AppContext'
import ThereIsNothing from './misc/ThereIsNothing'

export default {
  components: {
    CategoryNavigation, Paginate, AdSummary, ListFilter, ThereIsNothing
  },
  mixins: [ AppDataHelper ],
  data() {
    return {
      title: '',
      pageCount: 0,
      adList: null,
      ads: [],
      currentPage: 1
    };
  },
  mounted() {
    this.getAds()
  },
  watch: {
    "$route.params": function() {
      this.getAds()
    }
  },
  methods: {
    getAds() {
      const self = this;

      AdService.getAds(AppContext.searchCriteria())
      .then((adList) => {
        self.adList = adList
        self.buildPages(adList)
      })
      .catch((error) => {
        console.error(error);
      });
    },
    gotoPage(pageId) {
      console.log('go to page', pageId)
    },
    buildPages(adList) {
      this.title = this.categoryName(adList.listCriteria.category.id)
      this.pageCount = adList.totalPages();

      while (this.ads.length) {
        this.ads.pop();
      }
      this.ads.push(...adList.ads);
    }
  }
};
</script>