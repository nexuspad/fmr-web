<template>
  <div class="mb-4">
    <title-rent :ad=ad />
    <rent-includes-and-pets :ad=ad />
    <hr/>
    <full-address :ad=ad />
    <hr/>
    <bed-bath :ad=ad />
    <hr/>
    <property-size :ad=ad v-if="isHomeStyle(ad.categoryId)" />
    <kitchen-dining :ad=ad v-if="isHomeStyle(ad.categoryId) || isCondoStyle(ad.categoryId)" />
    <interior :ad=ad v-if="isHomeStyle(ad.categoryId) || isCondo(ad.categoryId)" />
    <bed-bath-features :ad=ad v-if="isHomeStyle(ad.categoryId) || isCondoStyle(ad.categoryId)" />
    <exterior :ad=ad v-if="isHomeStyle(ad.categoryId)" />
    <condo-amenities :ad=ad v-if="isCondo(ad.categoryId)" />
    <apartment-unit-amenities :ad=ad v-if="isApartment(ad.categoryId)" />
    <apartment-amenities :ad=ad v-if="isApartment(ad.categoryId)" />
    <community :ad=ad v-if="isHomeStyle(ad.categoryId) || isCondoStyle(ad.categoryId)" />
    <other-amenities :ad=ad v-if="isHomeStyle(ad.categoryId) || isCondoStyle(ad.categoryId)" />
    <description :ad=ad />
    <contact :ad=ad />
  </div>
</template>

<script>
import TitleRent from './residential/TitleRent'
import RentIncludesAndPets from './residential/RentIncludesAndPets'
import BedBath from './residential/BedBath'
import FullAddress from './FullAddress'
import Interior from './residential/Interior'
import Exterior from './residential/Exterior'
import KitchenDining from './residential/KitchenDining'
import BedBathFeatures from './residential/BedBathFeatures'
import CondoAmenities from './residential/CondoAmenities'
import ApartmentUnitAmenities from './residential/ApartmentUnitAmenities'
import ApartmentAmenities from './residential/ApartmentAmenities'
import Community from './residential/Community'
import OtherAmenities from './OtherAmenities'
import Contact from './Contact'
import PropertySize from './residential/PropertySize'
import Description from './Description'
import AppDataHelper from '../AppDataHelper'

export default {
  mixins: [ AppDataHelper ],
  props: ['ad'],
  components: {
      TitleRent, RentIncludesAndPets, BedBath, FullAddress,
      Interior, Exterior, CondoAmenities, KitchenDining, BedBathFeatures, ApartmentUnitAmenities, ApartmentAmenities,
      Community, OtherAmenities, Contact, PropertySize, Description
  },
  methods: {
  }
};
</script>