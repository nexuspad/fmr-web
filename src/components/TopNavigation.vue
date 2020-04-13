<template>
  <nav class="navbar navbar-expand-lg bg-transparent">
    <a class="navbar-brand" href="#">
      <img src="http://www.findmyroof.com/static/images/find-my-roof.png" />
    </a>
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarText"
      aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarText">
      <ul class="navbar-nav mr-auto">
        <li class="nav-item active" v-if="activity === 'browsing'">
          <state-selector />
        </li>
      </ul>
      <ul class="navbar-nav justify-content-end" v-if="activity !== 'editing'">
        <li class="nav-item">
          <router-link class="nav-link" to="/account/register">Register</router-link>
        </li>
        <li class="nav-item">
          <router-link class="nav-link" to="/account/login">Log in</router-link>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
import StateSelector from "./StateSelector"
import { isLoggedIn, currentActivity } from './AppContextHandler'

export default {
  components: {
    StateSelector
  },
  setup () {
    const loginStatus = isLoggedIn()
    const activity = currentActivity()
    return {
      loginStatus, activity
    }
  }
};
</script>