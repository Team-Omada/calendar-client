<template>
  <v-hover v-slot="{ hover }">
    <v-card :elevation="hover ? 3 : 0" outlined rounded="rounded-lg">
      <v-card-title class="pb-0">
        Title of schedule to get people's attention.
      </v-card-title>
      <v-card-text class="pb-0">
        <!-- Max of 3 or 4 most likely -->
        <v-container class="py-0">
          <v-row>
            <v-col cols="12" sm="8" class="px-0">
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
            <v-col cols="12" sm="4" class="px-0">
              <div class="d-flex justify-end">
                Nov. 12th 2020 | 6:30PM
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
          <v-icon>mdi-star-plus-outline</v-icon>
        </v-card-actions>
      </v-card-text>
    </v-card>
  </v-hover>
</template>

<script>
export default {
  name: "ScheduleCard",
};
</script>

<style scoped>
.v-card {
  transition: 0.2s ease;
}
.pointer {
  cursor: pointer;
}
</style>
