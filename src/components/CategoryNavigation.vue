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
            <a class="nav-link dropdown-toggle py-0" href="#" id="forRentDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              Rental homes and apartments
            </a>
            <div class="dropdown-menu" aria-labelledby="forRentDropdown">
              <div class="container">
                <div class="row">
                  <div class="col-auto">
                    <h4 class="dropdown-header">Residential</h4>
                    <a class="dropdown-item" href="#">Single family homes</a>
                    <a class="dropdown-item" href="#">Townhomes/multi-units</a>
                    <a class="dropdown-item" href="#">Apartments</a>
                    <a class="dropdown-item" href="#">Condos</a>
                    <a class="dropdown-item" href="#">Find roommate</a>
                  </div>
                  <div class="col-auto">
                    <h4 class="dropdown-header">Commercial</h4>
                    <a class="dropdown-item" href="#">Retail spaces</a>
                    <a class="dropdown-item" href="#">Shopping centers</a>
                    <a class="dropdown-item" href="#">Office spaces</a>
                    <a class="dropdown-item" href="#">Warehouse spaces</a>
                    <a class="dropdown-item" href="#">Others</a>
                  </div>
                </div>
              </div>
            </div>
          </li>
          <li class="nav-item dropdown active">
            <a class="nav-link dropdown-toggle py-0" href="#" id="forSaleDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              Real estate for sale
            </a>
            <div class="dropdown-menu" aria-labelledby="forSaleDropdown">
              <div class="container">
                <div class="row">
                  <div class="col-auto">
                    <h4 class="dropdown-header">Residential</h4>
                    <a class="dropdown-item" href="#">Single family homes</a>
                    <a class="dropdown-item" href="#">Townhomes/multi-units</a>
                    <a class="dropdown-item" href="#">Condos</a>
                    <a class="dropdown-item" href="#">Manufactured homes</a>
                    <a class="dropdown-item" href="#">Land</a>
                    <a class="dropdown-item" href="#">Foreclosures</a>
                  </div>
                  <div class="col-auto">
                    <h4 class="dropdown-header">Commercial</h4>
                    <a class="dropdown-item" href="#">Retail centers</a>
                    <a class="dropdown-item" href="#">Office buildings</a>
                    <a class="dropdown-item" href="#">Gas stations/stores</a>
                    <a class="dropdown-item" href="#">Warehouse spaces</a>
                    <a class="dropdown-item" href="#">Restaurants</a>
                    <a class="dropdown-item" href="#">Land</a>
                    <a class="dropdown-item" href="#">Others</a>
                  </div>
                </div>
              </div>
            </div>
          </li>
          <li class="nav-item dropdown active">
            <a class="nav-link dropdown-toggle py-0" href="#" id="fsboDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              For sale by owner
            </a>
            <div class="dropdown-menu" aria-labelledby="fsboDropdown">
              <div class="container">
                <div class="row">
                  <div class="col-auto">
                    <a class="dropdown-item" href="#">Single family homes</a>
                    <a class="dropdown-item" href="#">Townhomes/multi-units</a>
                    <a class="dropdown-item" href="#">Condos</a>
                    <a class="dropdown-item" href="#">Manufactured homes</a>
                    <a class="dropdown-item" href="#">Land</a>
                  </div>
                </div>
              </div>
            </div>
          </li>
          <li class="nav-item active">
            <a class="nav-link py-0" href="#" tabindex="-1">Vacation rentals</a>
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