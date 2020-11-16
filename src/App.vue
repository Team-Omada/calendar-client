<template>
  <v-app>
    <NavDrawer v-model="openDrawer" />
    <NavHeader @open-drawer="openDrawer = !openDrawer" />
    <v-main>
      <v-container fluid>
        <router-view @open-snackbar="openSnackBar"></router-view>
        <v-snackbar v-model="show" timeout="2000" :color="color">
          {{ this.msg }}
          <template v-slot:action="{ attrs }">
            <v-btn text v-bind="attrs" @click="show = false">
              Close
            </v-btn>
          </template>
        </v-snackbar>
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
      openDrawer: false,
      show: false,
      color: "",
      msg: "",
    };
  },
  methods: {
    openSnackBar(msg, color) {
      this.show = true;
      this.color = color;
      this.msg = msg;
    },
  },
};
</script>
