<template>
  <div class="container">
    <div class="row">
      <div class="col-1">
      </div>
      <div class="col-11">
        <div class="container">
          <div class="row">
            <div class="col-9">
              <h2><router-link :to="'/ad/' + ad.id">{{ ad.title }}</router-link></h2>
            </div>
            <div class="col-3">
              <div class="container">
                <div>
                  <div class="row">
                    <div class="col text-center">
                      price
                    </div>
                  </div>
                  <div class="row">
                    <div class="col text-center">
                      bath
                    </div>
                    <div class="col text-center">
                      bed
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col">
              {{ ad.description }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['ad']
}
</script>