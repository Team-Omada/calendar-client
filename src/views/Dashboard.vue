<template>
  <v-container width="1100">
    <v-row>
      <v-col cols="12" md="8">
        <ScheduleCard />
      </v-col>
      <v-col cols="12" md="4">
        <v-card elevation="0" outlined rounded="rounded-lg" height="600">
          <v-card-title>
            Advanced Search
          </v-card-title>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import ScheduleCard from "../components/ScheduleCard";
export default {
  name: "Dashboard",
  components: {
    ScheduleCard
  }
};
</script>
