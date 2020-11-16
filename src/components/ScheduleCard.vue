<template>
  <v-hover v-slot="{ hover }">
    <v-card
      :elevation="hover ? 3 : 0"
      outlined
      shaped
      @click="$router.push({ path: `/createschedule` })"
    >
      <v-container fluid class="px-4 pb-0 pt-3">
        <v-row>
          <v-col cols="12" lg="8" sm="9" class="py-0">
            <div class="text-h6">Title of schedule to get attention.</div>
          </v-col>
          <v-col
            cols="12"
            lg="4"
            sm="3"
            class="d-flex justify-sm-end align-center py-0"
          >
            <div class="text-button text--secondary">
              Fall | 2020
            </div>
          </v-col>
        </v-row>
      </v-container>
      <v-card-text class="py-0">
        <!-- Max of 3 or 4 most likely -->
        <v-container class="py-0">
          <v-row>
            <v-col cols="12" sm="7" class="px-0">
              <v-chip class="mr-2" color="success" outlined small
                >MATH485</v-chip
              >
              <v-chip class="mr-2" color="success" outlined small
                >MATH374</v-chip
              >
              <v-chip class="mr-2" color="success" outlined small
                >MATH441</v-chip
              >
            </v-col>
            <v-col cols="12" sm="5" class="px-0">
              <div class="d-flex justify-end">
                Posted: Nov. 12th 2020 | 6:30PM
              </div>
            </v-col>
          </v-row>
        </v-container>
        <v-divider></v-divider>
        <v-card-actions class="pa-0">
          <v-list-item two-line class="px-0">
            <v-icon large left>mdi-account-circle</v-icon>
            <v-list-item-content>
              <v-list-item-title>
                username
              </v-list-item-title>
              <v-list-item-subtitle>
                email@cougars.csusm.edu
              </v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
          <v-spacer></v-spacer>
          <v-btn icon @click.stop="bookmarked = !bookmarked" color="warning">
            <v-icon>{{ bookmarked ? "mdi-star" : "mdi-star-outline" }}</v-icon>
          </v-btn>
        </v-card-actions>
      </v-card-text>
    </v-card>
  </v-hover>
</template>

<script>
export default {
  name: "ScheduleCard",
  data() {
    return {
      bookmarked: false,
    };
  },
};
</script>

<style scoped>
.v-card {
  transition: 0.2s ease;
}
</style>
