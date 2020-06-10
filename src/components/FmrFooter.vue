<template>
  <footer class="container mt-5 mb-5">
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#FooterContent">
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="FooterContent">
        <ul class="navbar-nav mr-auto">
          <li class="nav-item active">
            <span class="nav-link">&copy; FindMyRoof. All rights reserved.</span>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/site/aboutus">About</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/site/faqs">FAQs</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/site/contactus">Contact</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/site/termsofservice">Terms of Service</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/site/privacypolicy">Privacy Policy</router-link>
          </li>
        </ul>
      </div>
    </nav>
  </footer>
</template>

<script>
export default {
}
</script>