<template>
  <div>
    <div class="card" v-if="hasContactInfo">
      <div class="card-header">
        <span v-if="hasAttributeValue('brokerage_company')">{{ attributeValue('brokerage_company') }}</span>
        <span v-if="!hasAttributeValue('brokerage_company')">Contact</span>
      </div>
      <div class="card-body">
        <h5 class="card-title" v-if="hasAttributeValue('contact_name')">{{ attributeValue('contact_name') }}</h5>
        <h6 class="card-subtitle mb-2 text-muted" v-if="hasAttributeValue('contact_phone')">
          {{ formatPhone(attributeValue('contact_phone')) }}
        </h6>
        <h6 class="card-subtitle mb-2 text-muted" v-if="hasAttributeValue('contact_email')">
          {{ formatPhone(attributeValue('contact_email')) }}
        </h6>
        <div class="card-text">
          <div v-if="hasAttributeValue('mls_id')">
            <strong>MLS ID:</strong> {{ attributeValue('mls_id') }}
          </div>
        </div>
        <div class="card-text" v-if="hasAttributeValue('open_house')">
          <div>
            <strong>Open house:</strong> {{ formatDate(attributeValue('open_house')) }}
          </div>
          <div v-if="hasAttributeValue('open_house_hours')">
            <strong>Hours:</strong> {{ attributeValue('open_house_hours') }}
          </div>
        </div>
        <a :href="attributeValue('company_web_address')" class="card-link" target="_blank" v-if="hasAttributeValue('company_web_address')">
          More info...
        </a>
      </div>
    </div>
  </div>
</template>

<script>
import AppDataHelper from '../AppDataHelper'
export default {
  mixins: [ AppDataHelper ],
  props: ['ad'],
  data() {
    return {
      hasContactInfo: false
    }
  },
  mounted() {
    if (this.hasAttributeValue('brokerage_company') || 
        this.hasAttributeValue('contact_name') || 
        this.hasAttributeValue('contact_phone') || 
        this.hasAttributeValue('mls_id') ||
        this.hasAttributeValue('open_house') || 
        this.hasAttributeValue('open_house_hours')) {
      this.hasContactInfo = true
    }
  },
  methods: {
    formatPhone(number) {
      let match = number.toString().match(/^(\d{3})(\d{3})(\d{4})$/);
      if (match) {
        return match[1] + '-' + match[2] + '-' + match[3]
      } else {
        return number
      }
    }
  }
}
</script>