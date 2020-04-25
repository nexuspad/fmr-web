<template>
  <div class="btn-group float-right">
    <button type="button" class="btn btn-primary">Update</button>
    <button type="button" class="btn btn-primary" :class="{disabled : ad.isActive()}">Activate</button>
    <button type="button" class="btn btn-primary" :class="{disabled : !ad.isActive()}">De-activate</button>
    <button type="button" class="btn btn-danger">Remove</button>
  </div>
</template>

<script>
export default {
  props: ['ad']
}
</script>