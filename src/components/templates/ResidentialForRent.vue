<template>
  <div class="mb-4">
    <title-rent :ad=ad />
    <rent-includes :ad=ad />
    <pet-policy :ad=ad />
    <full-address :ad=ad />
    <location-close-to :ad=ad />
    <schools :ad=ad />
    <bed-bath :ad=ad />
    <manufactured-home :ad=ad v-if="isManufacturedHome(ad.categoryId)" />
    <property-size :ad=ad />
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
    <by-owner :ad=ad v-if="isByOwnerEligible(ad.categoryId)" />
    <contact :ad=ad />
  </div>
</template>

<script>
import TitleRent from './residential/TitleRent'
import RentIncludes from './residential/RentIncludes'
import PetPolicy from './residential/PetPolicy'
import BedBath from './residential/BedBath'
import FullAddress from './FullAddress'
import LocationCloseTo from './LocationCloseTo'
import Schools from './residential/Schools'
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
import ByOwner from './residential/ByOwner'
import PropertySize from './residential/PropertySize'
import ManufacturedHome from './residential/ManufacturedHome'
import Description from './Description'
import AppDataHelper from '../AppDataHelper'

export default {
  mixins: [ AppDataHelper ],
  props: ['ad'],
  components: {
      TitleRent, RentIncludes, PetPolicy, BedBath, FullAddress, LocationCloseTo, Schools,
      Interior, Exterior, CondoAmenities, KitchenDining, BedBathFeatures, ApartmentUnitAmenities, ApartmentAmenities,
      Community, OtherAmenities, Contact, ByOwner, PropertySize, ManufacturedHome, Description
  },
  methods: {
  }
};
</script>