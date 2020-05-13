<template>
  <div>
    <div class="card">
      <div class="card-body">
        <h5 class="card-title">{{ attributeValue('brokerage_company') }}</h5>
        <h6 class="card-subtitle mb-2 text-muted">{{ attributeValue('contact_phone') }}</h6>
        <div class="card-text">
          <div v-if="hasAttributeValue('mls_id')">
            <strong>MLS ID:</strong> {{ attributeValue('mls_id') }}
          </div>
        </div>
        <a href="#" class="card-link">Card link</a>
        <a href="#" class="card-link">Another link</a>
      </div>
    </div>
    <div class="d-flex flex-row flex-wrap bd-highlight">
      <div class="mr-4" v-if="hasAttributeValue('contact_name')">
        <label>Contact</label>
        <div>{{ attributeValue('contact_name') }}</div>
      </div>
    </div>
    <div>
      <div class="mr-4" v-if="hasAttributeValue('contact_phone')">
        <label>Phone</label>
        <div>{{ attributeValue('contact_phone') }}</div>
      </div>
    </div>
    <div class="d-flex flex-row flex-wrap bd-highlight">
      <div class="mr-4" v-if="hasAttributeValue('brokerage_company')">
        <label></label>
        <div>{{ attributeValue('brokerage_company') }}</div>
      </div>
    </div>
    <div>
      <div class="mr-4" v-if="hasAttributeValue('mls_id')">
        <label>MLS ID</label>
        <div>{{ attributeValue('mls_id') }}</div>
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