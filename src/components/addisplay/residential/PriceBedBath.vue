<template>
  <div class="container">
    <div class="row justify-content-md-center">
      <div class="col text-center mb-1" v-if="hasAttributeValue('price')">
        <strong class="fmr-green">{{ dollar(attributeValue('price')) }}</strong>
      </div>
      <div class="col text-center mb-1" v-if="hasAttributeValue('rent')">
        <strong class="fmr-green">{{ dollar(attributeValue('rent')) }}</strong>
      </div>
    </div>
    <div class="row justify-content-md-center" v-if="hasAttributeValue('bedroom') && hasAttributeValue('bathroom')">
      <div class="col text-center p-0">
        <ul class="list-group list-group-horizontal-sm">
          <li class="list-group-item text-nowrap pt-1 pb-1"><i class="fas fa-bed mr-1"></i>{{ attributeValue('bedroom') }}</li>
          <li class="list-group-item text-nowrap pt-1 pb-1"><i class="fas fa-bath mr-1"></i>{{ attributeValue('bathroom') }}</li>
        </ul>
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