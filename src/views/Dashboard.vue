<template>
  <v-container width="1100">
    <v-row>
      <v-col v-if="scheduleList" cols="12" md="8">
        <div v-if="scheduleList.length === 0" class="text-h5 text-center">
          {{ message }}
        </div>
        <div
          v-else
          v-for="schedule in scheduleList"
          :key="schedule.scheduleID"
          class="card-margin"
        >
          <ScheduleCard :schedule="schedule" />
        </div>
      </v-col>
      <v-col v-else-if="loading" cols="12" md="8">
        <div class="text-center">
          <v-progress-circular
            indeterminate
            color="primary"
          ></v-progress-circular>
        </div>
      </v-col>
      <v-col v-else cols="12" md="8">
        <div class="text-h5 text-center">
          {{ message }}
          <v-icon large>mdi-emoticon-frown-outline</v-icon>
        </div>
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
import { getAllSchedules } from "../API";
import { errorHandlingMixin } from "../mixins/errorHandlingMixin";
export default {
  name: "Dashboard",
  components: {
    ScheduleCard,
  },
  mixins: [errorHandlingMixin],
  data() {
    return {
      scheduleList: null,
      loading: false,
      message: "No schedules have been created yet, be the first!",
    };
  },
  async mounted() {
    try {
      this.loading = true;
      const res = await getAllSchedules();
      this.scheduleList = res.data.results;
    } catch (err) {
      this.message = "Something went wrong loading schedules...";
    } finally {
      this.loading = false;
    }
  },
};
</script>

<style scoped>
.card-margin {
  margin-top: 12px;
}
.card-margin:first-child {
  margin-top: 0;
}
</style>
