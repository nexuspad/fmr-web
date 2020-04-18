<template>
  <div>
    <div class="form-group">
      <div>
        <label for="title">Title</label>
        <input type="text" class="form-control input-underline" id="title" size="80" maxlength="80"
          name="title" v-model="ad.getAttribute(attributeId('title')).value" />
      </div>
    </div>
    <div class="form-row">
      <div class="col-md-4">
        <div class="form-group">
          <label for="asking_price">Asking price</label>
          <div class="input-group">
            <div class="input-group-prepend">
              <div class="input-group-text">$</div>
            </div>
            <input type="text" class="form-control" placeholder="Asking price"
              name="asking_price" v-model="ad.getAttribute(attributeId('asking_price')).value" />
          </div>
        </div>
      </div>
      <div class="col-md-8">
      </div>
    </div>
  </div>
</template>

<script>
import AppDataHelper from '../AppDataHelper'

export default {
  mixins: [ AppDataHelper ],
  props: ['ad']
}
</script>
