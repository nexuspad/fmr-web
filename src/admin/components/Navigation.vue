<template>
  <div class="fmr-tab shadow-sm sticky-top mb-4" style="background:#fff !important;">
    <nav class="nav">
      <router-link to="users" class="nav-link" :class="{'bg-light': $route.name=='users'}">
        Users
      </router-link>
      <router-link to="posts" class="nav-link" :class="{'bg-light': $route.name=='posts'}">
        Posts
      </router-link>
      <router-link to="jobs" class="nav-link" :class="{'bg-light': $route.name=='jobs'}">
        Jobs
      </router-link>
      <a class="nav-link" href="https://api.findmyroof.com/madmin/logs" target="_blank">Logs</a>
      <div>
        <iframe src="https://panda.findmyroof.com/polo.html" width="40" height="0" style="padding:0; margin:0" 
          frameBorder="0" id="Polo"></iframe>
      </div>
    </nav>
  </div>
</template>

<script>
export default {
}
</script>