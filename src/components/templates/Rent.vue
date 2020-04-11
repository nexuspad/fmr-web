<template>
  <div>
    <div>
      $ <input type="text" size="4" maxlength="5"
        name="monthly_rent" v-model="ad.getAttribute('monthly_rent').value" />
    </div>
  </div>
</template>

<script>
export default {
  props: ['ad']
}
</script>