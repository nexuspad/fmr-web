<template>
  <div class="mb-4">
    <title-vac-rate :ad=ad />
    <bed-bath-sleeps :ad=ad />
    <pet-policy :ad=ad />
    <full-address :ad=ad />
    <location-close-to :ad=ad />
    <vac-amenities :ad=ad />
    <description :ad=ad />
    <contact :ad=ad />
  </div>
</template>

<script>
import TitleVacRate from './vacation/TitleVacRate'
import PetPolicy from './residential/PetPolicy'
import BedBathSleeps from './vacation/BedBathSleeps'
import FullAddress from './FullAddress'
import LocationCloseTo from './LocationCloseTo'
import VacAmenities from './vacation/VacAmenities'
import Description from './Description'
import Contact from './Contact'
import AppDataHelper from '../AppDataHelper'

export default {
  mixins: [ AppDataHelper ],
  props: ['ad'],
  components: {
      TitleVacRate, PetPolicy, BedBathSleeps, FullAddress, LocationCloseTo, VacAmenities, Contact, Description
  }
};
</script>