<template>
  <b-navbar toggleable="md" fixed="top" type="transparent" variant="transparent">
    <b-navbar-toggle target="topnav_collapse"></b-navbar-toggle>
    <b-navbar-brand href="https://nexuspad.com/about.html" v-if="!isLoggedIn">
      <img src="http://www.findmyroof.com/static/images/find-my-roof.png"/>
    </b-navbar-brand>

    <b-collapse is-nav id="topnav_collapse" v-if="isLoggedIn === false">
      <!-- Right aligned nav items -->
      <b-navbar-nav class="ml-auto">
        <b-nav-item to="/login">Log in</b-nav-item>
      </b-navbar-nav>
    </b-collapse>

    <b-collapse is-nav id="topnav_collapse" v-if="isLoggedIn === true">
    </b-collapse>
  </b-navbar>
</template>

<script>

export default {
  data () {
    return {
      isLoggedIn: false
    };
  },
  beforeCreate () {
  },
  mounted () {
  },
  beforeDestroy () {
  },
  methods: {
  },
  watch: {
  }
}
</script>