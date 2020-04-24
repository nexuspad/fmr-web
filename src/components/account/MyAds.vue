<template>
  <div class="container-fluid m-0">
    <message />
    <div class="row">
      <div class="col-md-10 order-lg-1 order-md-1 order-sm-2 p-0">
        <div class="fmr-bordered-area">
          <div class="header">
            <h1>My ads</h1>
          </div>
          <ul class="list-unstyled">
            <li v-for="adItem in ads" v-bind:key="adItem.id" class="border-bottom p-2">
              <ad-summary :ad="adItem" />
              <ul class="nav justify-content-end pagination">
                <li class="page-item">
                  <router-link :to="'/ad/edit?id=' + adItem.id" class="page-link active">Update</router-link>
                </li>
                <li class="page-item">
                  <a class="page-link active" href="#">De-activate</a>
                </li>
                <li class="page-item">
                  <a class="page-link active" href="#">Activate</a>
                </li>
                <li class="page-item">
                  <a class="page-link active text-danger" href="#">Remove</a>
                </li>
              </ul>
            </li>
          </ul>
          <div class="row pt-2">
            <div class="col"></div>
            <div class="col">
              <nav aria-label="Page navigation" v-if="allPageIds.length > 1">
                <ul class="pagination">
                  <li class="page-item"><a class="page-link" href="#">previous</a></li>
                  <li class="page-item" v-for="p in allPageIds" :key="p">
                    <router-link class="page-link" to="/">{{ p }}</router-link>
                  </li>
                  <li class="page-item"><a class="page-link" href="#">next</a></li>
                </ul>
              </nav>
            </div>
            <div class="col"></div>
          </div>
        </div>
      </div>
      <div class="col-md-2 order-lg-2 order-md-2 order-sm-1 mb-2 pr-0">
        <div class="fmr-bordered-area">
          <div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import AdSummary from "../AdSummary"
import AdService from "../../service/AdService"
import Message from '../Message'

export default {
  components: {
    AdSummary, Message
  },
  data() {
    return {
      ads: [],
      allPageIds: []
    };
  },
  mounted() {
    const self = this;

    AdService.myAds()
      .then(adList => {
        self.ads.push(...adList.ads);

        while (self.allPageIds.length) {
          self.allPageIds.pop();
        }
        let totalPages = adList.totalPages();
        for (let i = 1; i <= totalPages; i++) {
          self.allPageIds.push(i);
        }
      })
      .catch(() => {
        console.error("...error");
      });
  }
};
</script>