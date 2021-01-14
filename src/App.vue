<template>
  <div id="page-wrapper" class="page-wrapper with-navbar with-sidebar with-navbar-fixed-bottom with-transitions"
       data-sidebar-type="overlayed-sm-and-down">

    <!-- Sticky alerts -->
    <div class="sticky-alerts"></div>

    <!-- Navbar start -->
    <nav class="navbar">
      <div class="navbar-content">
        <button id="toggle-sidebar-btn" class="btn btn-action" type="button" onclick="halfmoon.toggleSidebar()">
          <i class="fa fa-bars" aria-hidden="true"></i>
        </button>
      </div>
      <a href="#" class="navbar-brand ml-10 ml-sm-20">
        <i class="fas fa-stopwatch"></i>&nbsp;<span class="d-none d-sm-flex">Timer App</span>
      </a>
      <div class="navbar-content ml-auto">
        <router-link to="/login" class="btn btn-primary mr-5" role="button">Login</router-link>
        <router-link to="/signup" class="btn btn-primary ml-5 mr-10" role="button">SignUp</router-link>

        <button class="btn btn-action mr-5" type="button" onclick="halfmoon.toggleDarkMode()">
          <i class="fa fa-moon-o" aria-hidden="true"></i>
          <span class="sr-only">Toggle dark mode</span>
        </button>
      </div>
    </nav>
    <!-- Navbar end -->

    <!-- Sidebar overlay -->
    <div class="sidebar-overlay" onclick="halfmoon.toggleSidebar()"></div>

    <!-- Sidebar start -->
    <div class="sidebar">
      <div class="sidebar-menu">
        <h5 class="sidebar-title">Timers</h5>
        <div class="sidebar-divider"></div>

        <router-link to="/simple-timer" class="sidebar-link sidebar-link-with-icon">
          <span class="sidebar-icon"><i class="fas fa-stopwatch"></i></span>
          Simple Timer
        </router-link>

        <router-link to="/countdown" class="sidebar-link sidebar-link-with-icon">
          <span class="sidebar-icon"><i class="fas fa-hourglass-start"></i></span>
          Countdown
        </router-link>

        <br>
        <h5 class="sidebar-title">Sheets and Tables</h5>
        <div class="sidebar-divider"></div>

        <!-- <router-link to="/old-timers" class="sidebar-link sidebar-link-with-icon">
          <span class="sidebar-icon"><i class="fas fa-history"></i></span>
          Old Timers
        </router-link> -->

      </div>
    </div>
    <!-- Sidebar end -->

    <!-- Content wrapper start -->
    <div class="content-wrapper d-flex" wfd-id="4">
      <div class="container-fluid my-auto" wfd-id="5">

         <router-view />

      </div>
    </div>
    <!-- Content wrapper end -->

    <!-- Navbar fixed bottom start -->
    <nav class="navbar navbar-fixed-bottom">
           <span class="navbar-text">
                Made with&nbsp;<i class="fas fa-heart"></i>&nbsp;and&nbsp;<i class="fas fa-coffee"></i>&nbsp;by Fabian Brecht, Katja Kruse and Bernd Maier
            </span>
      <ul class="navbar-nav ml-auto">
        <li class="nav-item">
          <a href="#" class="nav-link">
            <i class="fa fa-question-circle-o mr-5" aria-hidden="true"></i>
            About
          </a>
        </li>
      </ul>
    </nav>
    <!-- Navbar fixed bottom end -->

  </div>
</template>

<script>

export default {
  name: 'App',
  components: {
    
  }
}
</script>

<style>

</style>
