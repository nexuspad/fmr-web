<template>
  <div>
    <div class="form-inline">
      <div class="form-group">
        <div class="pr-2">
          <input type="text" class="form-control" placeholder="Name" size="40" maxlength="40"
            name="contact_name" v-model="ad.getAttribute('contact_name').value" />
        </div>
        <div class="pr-2">
          <input type="tel" class="form-control" placeholder="Phone" size="12" maxlength="20"
            name="contact_phone" v-model="ad.getAttribute('contact_phone').value" />
        </div>
        <div>
          <input type="email" class="form-control" placeholder="Email" size="40" maxlength="80"
            name="contact_email" v-model="ad.getAttribute('contact_email').value" />
        </div>
      </div>
    </div>

    <div class="form-group mt-2">
      <div class="custom-control custom-switch">
        <input type="checkbox" class="custom-control-input" id="byAgent" v-model="ad.getAttribute('represented_by').value" />
        <label class="custom-control-label" for="byAgent">Represented by agent</label>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['ad']
}
</script>