<template>
  <v-app-bar app color="primary" dark>
    <div class="d-flex align-center">
      <router-link to="/dashboard">
        <v-img
          alt="Omada Icon Logo"
          class="shrink mr-2 hidden-md-and-up"
          contain
          src="../assets/simple-omada.svg"
          transition="scale-transition"
          width="45"
        />
        <v-img
          alt="Omada Full Name Logo"
          class="shrink hidden-sm-and-down"
          contain
          min-width="100"
          src="../assets/omada.svg"
          width="120"
        />
      </router-link>
    </div>
    <v-spacer></v-spacer>
    <v-btn v-if="!isLoggedIn" to="/login" text class="mr-2">
      <span>Login</span>
    </v-btn>
    <v-btn v-if="!isLoggedIn" to="/register" text>
      <span>Register</span>
    </v-btn>
    <v-btn v-if="isLoggedIn" text @click="onLogoutBtn">
      Log Out
    </v-btn>
  </v-app-bar>
</template>

<script>
export default {
  name: "NavHeader",
  methods: {
    onLogoutBtn() {
      this.$store.dispatch("setToken", null);
      this.$store.dispatch("setUser", null);
      this.$router.push({ path: "login" });
    },
  },
  computed: {
    isLoggedIn() {
      return this.$store.state.isLoggedIn;
    },
  },
};
</script>
