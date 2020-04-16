<template>
  <div>
    <nav class="navbar navbar-expand-lg navbar-dark bg-primary fmr-nav rounded mb-1">
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav"
        aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav">
          <li class="nav-item dropdown active">
            <a class="nav-link dropdown-toggle py-0" href="#" id="rentalDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              Rentals &amp; apartments
            </a>
            <div class="dropdown-menu" aria-labelledby="rentalDropdown">
              <div class="container">
                <div class="row">
                  <div class="col-auto">
                    <h4 class="dropdown-header">Residential</h4>
                    <a class="dropdown-item" href="#">Action</a>
                  </div>
                  <div class="col-auto">
                    <h4 class="dropdown-header">Commercial</h4>
                    <a class="dropdown-item" href="#">Action</a>
                  </div>
                </div>
              </div>
            </div>
          </li>
          <li class="nav-item">
            <a class="nav-link py-0" href="#">Pricing</a>
          </li>
          <li class="nav-item">
            <a class="nav-link py-0 disabled" href="#" tabindex="-1" aria-disabled="true">Disabled</a>
          </li>
        </ul>
      </div>
    </nav>
  </div>
</template>

<script>
// import { CATEGORY_URIS } from "../service/AppData"
// import AppContext from './AppContext'

export default {
}
</script>