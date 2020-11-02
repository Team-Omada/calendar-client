<template>
  <v-app>
    <NavHeader />
    <v-main>
      <v-container fluid>
        <router-view></router-view>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import NavHeader from "./components/NavHeader";
export default {
  name: "App",
  components: {
    NavHeader,
  },
};
</script>
