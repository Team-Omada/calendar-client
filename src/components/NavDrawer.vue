<template>
  <!-- Two way binding required for some reason, not too sure on this one -->
  <v-navigation-drawer
    :value="value"
    right
    temporary
    app
    @input="$emit('input', $event)"
  >
    <template v-slot:prepend>
      <v-list-item two-line>
        <v-icon large left>mdi-account-circle</v-icon>

        <v-list-item-content v-if="isLoggedIn">
          <v-list-item-title>
            {{ $store.state.user.username }}
          </v-list-item-title>
          <v-list-item-subtitle>
            {{ $store.state.user.email }}
          </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
    </template>
    <v-divider></v-divider>
    <v-list>
      <v-list-item v-for="item in items" :key="item.title" :to="item.route">
        <v-list-item-icon>
          <v-icon>{{ item.icon }}</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title>{{ item.title }}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
    <template v-slot:append>
      <div class="pa-2 d-flex justify-center">
        <v-btn color="error" @click="onLogoutBtn">
          Logout
          <v-icon right>mdi-logout</v-icon>
        </v-btn>
      </div>
    </template>
  </v-navigation-drawer>
</template>

<script>
export default {
  name: "NavDrawer",
  props: {
    value: Boolean,
  },
  data() {
    return {
      items: [
        { title: "Dashboard", icon: "mdi-view-dashboard", route: "/dashboard" },
        {
          title: "Create Schedule",
          icon: "mdi-calendar-plus",
          route: "/createschedule",
        },
      ],
    };
  },
  methods: {
    onLogoutBtn() {
      this.$emit("input", false);
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
