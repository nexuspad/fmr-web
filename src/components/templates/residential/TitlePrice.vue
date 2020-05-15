<template>
  <div class="border-bottom pb-3 mb-3">
    <div class="form-group">
      <div>
        <label for="title" class="required">Title</label>
        <input type="text" class="form-control" id="title" size="80" maxlength="80"
          name="title" v-model="ad.getAttribute(attributeId('title')).value" />
      </div>
    </div>
    <div class="form-row">
      <div class="col-md-4">
        <div class="form-group">
          <label for="asking_price" class="required">Asking price</label>
          <div class="input-group">
            <div class="input-group-prepend">
              <div class="input-group-text fmr-green bg-light">$</div>
            </div>
            <input type="text" class="form-control"
              name="asking_price" v-model="ad.getAttribute(attributeId('asking_price')).value" />
          </div>
        </div>
      </div>
      <div class="col-md-4 pl-4">
        <label for="ofa">Owner financing available</label>
        <div class="custom-control custom-switch right">
          <input type="checkbox" class="custom-control-input" id="ownerFinancing" 
            v-model="ad.getAttribute(attributeId('owner_financing_available')).value" />
          <label class="custom-control-label" for="ownerFinancing"></label>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import AppDataHelper from '../../AppDataHelper'

export default {
  mixins: [ AppDataHelper ],
  props: ['ad']
}
</script>
