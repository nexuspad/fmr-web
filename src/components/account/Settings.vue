<template>
  <div class="fmr-bordered-area">
    <div class="header">
      <h1>Settings</h1>
    </div>
    <div class="fmr-form p-4">
      <h2>Update password</h2>
      <hr/>
      <div class="ml-2">
        <div class="form-row">
          <div class="col-md-4">
            <label for="password">Current password</label>
            <input type="password" class="form-control" id="password" v-model="password">
          </div>
        </div>
        <div class="form-row">
          <div class="col-md-4">
            <label for="password">New password</label>
            <input type="password" class="form-control" id="password" v-model="password">
          </div>
          <div class="col-md-4">
            <label for="password">Confirm the new password</label>
            <input type="password" class="form-control" id="password" v-model="confirmPassword">
          </div>
        </div>
        <div class="form-row mt-2">
          <div class="col">
            <button class="btn btn-primary" v-on:click="changePassword()" :disabled="posting">Update</button>
          </div>
        </div>
      </div>

      <h2 class="mt-4">Remove my account</h2>
      <hr/>
      <div class="ml-2">
        <div class="form-row">
          <div class="col-md-4">
            <label for="password">Password</label>
            <input type="password" class="form-control" id="password" v-model="password">
          </div>
        </div>
        <div class="form-row mt-2">
          <input type="checkbox" />
          I want to remove my account and all my ads.
        </div>
        <div class="form-row mt-2">
          <div class="col">
            <button class="btn btn-danger" v-on:click="changePassword()" :disabled="posting">Remove my acount</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      posting: false
    }
  },
  methods: {
    changePassword() {}
  }
}
</script>