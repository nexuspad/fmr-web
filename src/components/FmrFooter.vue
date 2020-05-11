<template>
  <footer class="container py-5">
    <div class="row">
      <div class="col-12 col-md">
        <div class="d-block mb-3 text-muted">&copy; FindMyRoof. All rights reserved.</div>
      </div>
      <div class="col-3 col-md">
        <h5>About</h5>
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
      <div class="col-3 col-md">
        <h5>Legal Stuff</h5>
        <ul class="list-unstyled text-small">
          <li>
            <router-link class="text-muted" to="/site/termsofservice">Terms of Use</router-link>
          </li>
          <li>
            <router-link class="text-muted" to="/site/privacypolicy">Privacy Policy</router-link>
          </li>
        </ul>
      </div>
      <div class="col-6 col-md">
      </div>
    </div>
  </footer>
</template>

<script>
export default {
}
</script>