<template>
  <div class="fmr-bordered-area">
    <div class="header">
      <h1>What's new</h1>
    </div>
    <div class="container">
      <div class="row">
        <div class="col-md-10 order-lg-1 order-md-1 order-sm-2">
          this is the list
        </div>
        <div class="col-md-2 order-lg-2 order-md-2 order-sm-1">
          <list-filter />
          This is the list home for state {{ state }}
          category {{ categoryId }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
}
</script>