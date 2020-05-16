<template>
  <footer class="container pt-5">
    <div class="row">
      <div class="col-md-2">
        <div class="d-block mb-3 text-muted">&copy; FindMyRoof.</div>
        <div class="d-block mb-3 text-muted">All rights reserved.</div>
      </div>
      <div class="col-md-2">
        <h5 class="text-muted">About</h5>
        <ul class="list-unstyled text-small">
          <li>
            <router-link class="text-muted" to="/site/aboutus">The Site</router-link>
          </li>
          <li>
            <router-link class="text-muted" to="/site/faqs">FAQs</router-link>
          </li>
          <li>
            <router-link class="text-muted" to="/site/contactus">Contact</router-link>
          </li>
        </ul>
      </div>
      <div class="col-md-2">
        <h5 class="text-muted">Legal Stuff</h5>
        <ul class="list-unstyled text-small">
          <li>
            <router-link class="text-muted" to="/site/termsofservice">Terms of Use</router-link>
          </li>
          <li>
            <router-link class="text-muted" to="/site/privacypolicy">Privacy Policy</router-link>
          </li>
        </ul>
      </div>
      <div class="col-md-3">
        <h5 class="text-muted">Community Shoutout</h5>
        <ul class="list-unstyled text-small">
          <li>
            <router-link class="text-muted" to="/site/termsofservice">Our Crafts</router-link>
          </li>
        </ul>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
}
</script>