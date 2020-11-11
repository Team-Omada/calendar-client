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
    <v-icon v-if="isLoggedIn" large @click="$emit('open-drawer')">
      mdi-menu
    </v-icon>
  </v-app-bar>
</template>

<script>
export default {
  name: "NavHeader",
  computed: {
    isLoggedIn() {
      return this.$store.state.isLoggedIn;
    },
  },
};
</script>
