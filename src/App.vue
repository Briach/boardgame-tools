<template>
  <div id="page-wrapper" class="page-wrapper with-navbar with-sidebar with-navbar-fixed-bottom"
       data-sidebar-type="overlayed-all">

    <!-- Sticky alerts -->
    <div class="sticky-alerts"></div>

    <!-- Navbar start -->
    <nav class="navbar">
      <div class="navbar-content">
        <button id="toggle-sidebar-btn" class="btn btn-action" type="button" onclick="halfmoon.toggleSidebar()">
          <i class="fa fa-bars" aria-hidden="true"></i>
        </button>
      </div>
      <router-link to="/" class="navbar-brand mx-auto">
        <i class="fas fa-dice"></i>&nbsp;<span class="d-none d-sm-flex">Boardgame Tools</span>
      </router-link>
      <div class="navbar-content">
        <button id="toggle-darkmode-btn" class="btn btn-action mr-5" type="button" onclick="halfmoon.toggleDarkMode()">
          <i class="fa fa-moon-o" aria-hidden="true"></i>
          <span class="sr-only">Toggle dark mode</span>
        </button>
      </div>
    </nav>
    <!-- Navbar end -->

    <!-- Sidebar overlay -->
    <div class="sidebar-overlay" onclick="halfmoon.toggleSidebar()"></div>

    <!-- Sidebar start -->
    <div class="sidebar my-auto ml-15">
      <div class="sidebar-menu">
        <h5 class="sidebar-title">Timers</h5>
        <div class="sidebar-divider"></div>

        <router-link to="/count-up" class="sidebar-link sidebar-link-with-icon" onclick="halfmoon.toggleSidebar()">
          <span class="sidebar-icon">⏱️</span>
          Count Up
        </router-link>

        <router-link to="/countdown" class="sidebar-link sidebar-link-with-icon" onclick="halfmoon.toggleSidebar()">
          <span class="sidebar-icon">⏳</span>
          Countdown
        </router-link>

        <br>
        <h5 class="sidebar-title">Sheets and Tables</h5>
        <div class="sidebar-divider"></div>

        <!-- <router-link to="/old-timers" class="sidebar-link sidebar-link-with-icon" onclick="halfmoon.toggleSidebar()">
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
           <span class="navbar-text" style="display: inline">
                Made with <i class="fas fa-heart"></i> and <i class="fas fa-coffee"></i> by <a href="https://twitter.com/FabianBrecht_">Fabian Brecht</a>
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

<style>

#freepik_stories-game-day {
  margin-top: -15%;
}

#toggle-sidebar-btn, #toggle-darkmode-btn {
  border-radius: 50%;
  height: var(--navbar-action-button-width);
}

.navbar {
  background-color: var(--primary-color);
  color: #ffffff;
}

.navbar.navbar-fixed-bottom {
  background-color: #212529;
  color: #ffffff
}

.sidebar {
  border-radius: 35px;
  border-top: var(--sidebar-border-width) solid var(--lm-sidebar-border-color);
  border-bottom: var(--sidebar-border-width) solid var(--lm-sidebar-border-color);
  -webkit-box-shadow: 6px 0px 35px 5px rgba(74,74,74,0.41); 
  box-shadow: 6px 0px 35px 5px rgba(74,74,74,0.41);
}

</style>
