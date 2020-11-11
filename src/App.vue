<template>
  <v-app>
    <NavDrawer v-model="open" />
    <NavHeader @open-drawer="open = !open" />
    <v-main>
      <v-container fluid>
        <router-view></router-view>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import NavHeader from "./components/NavHeader";
import NavDrawer from "./components/NavDrawer";
export default {
  name: "App",
  components: {
    NavHeader,
    NavDrawer,
  },
  data() {
    return {
      open: false,
    };
  },
};
</script>
