<template>
  <div class="fmr-message" v-show="showMessage">
    <div class="alert alert-primary">
      <button type="button" class="close" @click="showMessage=false" aria-label="Close">
        <span aria-hidden="true">&times;</span>
      </button>
      <div>{{ message }}</div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['message'],
  data() {
    return {
      showMessage: false
    }
  },
  watch: { 
    message: function() {
      this.showMessage = true
    }
  }
}
</script>