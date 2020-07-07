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
      showMessage: false,
      dismissTimer: null
    }
  },
  watch: { 
    message: function() {
      this.showMessage = true
      
      if (this.dismissTimer) {
        clearTimeout(this.dismissTimer)
      }

      let self = this
      this.dismissTimer = setTimeout(function() {
        self.showMessage = false
        self.dismissTimer = null
    }, 4000);
    }
  }
}
</script>