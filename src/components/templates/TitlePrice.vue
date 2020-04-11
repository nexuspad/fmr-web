<template>
  <div>
    <div class="form-group">
      <div>
        <input type="text" class="form-control input-underline" placeholder="Title" size="80" maxlength="80"
          name="title" v-model="ad.getAttribute('title').value" />
      </div>
    </div>
    <div class="form-inline">
      <div class="input-group">
        <div class="input-group-prepend">
          <div class="input-group-text">$</div>
        </div>
        <input type="text" class="form-control" placeholder="Asking price"
          name="asking_price" v-model="ad.getAttribute('asking_price').value" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['ad']
};
</script>
