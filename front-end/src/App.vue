<template>
  <div id="app" class="d-flex flex-column h-100" v-if="user">
    <!-- Top Navbar -->
    <header>
      <b-navbar
        type="dark"
        variant="dark"
        toggleable="lg"
        class="flex-lg-nowrap p-0 shadow"
        fixed="top"
      >
        <b-navbar-brand class="col-lg-2 col-md-12 mr-0" to="/">
          <svg
            width="100%"
            height="100%"
            viewBox="0 0 400 48"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink"
            preserveAspectRatio="xMidYMid"
          >
            <g fill="#ffffff">
              <g transform="translate(125.848739, 10.756303)">
                <text
                  class=""
                  x="25%"
                  y="50%"
                  dominant-baseline="middle"
                  text-anchor="middle"
                  font-size="40px"
                >
                  Pokemon
                </text>
              </g>
            </g>
          </svg>
        </b-navbar-brand>
        <b-navbar-toggle target="sidebar"> </b-navbar-toggle>
        <ul class="ml-auto mr-md-4 navbar-nav px-3 flex-row">
          <span class="navbar-text text-white">
            Logged in as: {{ user.firstName }} {{ user.lastName }}
          </span>
          <li class="nav-item">
            <a href="#" @click="logout" class="nav-link">
              Logout
            </a>
          </li>
        </ul>
      </b-navbar>
    </header>
    <!-- Container to hold content and sidebar -->
    <b-container fluid="true">
      <b-row>
        <!-- Sidebar -->
        <b-collapse id="sidebar" class="sidebar bg-light d-lg-block col-lg-2">
          <nav class="sidebar-sticky">
            <ul class="nav flex-column">
              <li class="nav-item">
                <router-link class="nav-link" to="/">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    class="nav-icon feather-home"
                  >
                    <path
                      d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"
                    ></path>
                    <polyline points="9 22 9 12 15 12 15 22"></polyline>
                  </svg>
                  My Pokemon <span class="sr-only">(current)</span>
                </router-link>
              </li>
              <li class="nav-item">
                <router-link class="nav-link" to="/browse">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    class="nav-icon feather-file"
                  >
                    <path
                      d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"
                    ></path>
                    <polyline points="13 2 13 9 20 9"></polyline>
                  </svg>
                  All Pokemon
                </router-link>
              </li>
              <li class="nav-item">
                <router-link class="nav-link" to="/types">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    class="nav-icon feather-file"
                  >
                    <path
                      d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"
                    ></path>
                    <polyline points="13 2 13 9 20 9"></polyline>
                  </svg>
                  Types
                </router-link>
              </li>
            </ul>
          </nav>
        </b-collapse>
        <main role="main" class="ml-md-auto col-lg-10 px-4 mb-3">
          <noscript>
            <strong
              >We're sorry but <%= htmlWebpackPlugin.options.title %> doesn't
              work properly without JavaScript enabled. Please enable it to
              continue.</strong
            >
          </noscript>
          <router-view />
        </main>
      </b-row>
    </b-container>
    <footer class="footer mt-auto py-3 bg-dark shadow">
      <div class="container">
        <a
          class="offset-lg-2 col-lg-10 text-light"
          href="https://github.com/Jacob-Roberts/school-repository/tree/master/pokedex"
          >Link to Github Repo</a
        >
      </div>
    </footer>
  </div>
  <div v-else>
    <router-view />
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "App",
  async created() {
    try {
      let response = await axios.get("/api/users");
      this.$root.$data.user = response.data.user;
    } catch (error) {
      this.$root.$data.user = null;
    }
  },
  computed: {
    user() {
      return this.$root.$data.user;
    },
  },
  methods: {
    async logout() {
      try {
        await axios.delete("/api/users");
        this.$root.$data.user = null;
      } catch (error) {
        this.$root.$data.user = null;
      }
    },
  },
};
</script>

<style>
.navbar-brand {
  height: 48px;
}

#app {
  margin-top: 10px;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
