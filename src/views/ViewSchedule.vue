<template>
  <v-container v-if="schedule" fluid>
    <v-row>
      <v-col cols="12" lg="6">
        <Calendar :schedule="schedule" />
      </v-col>
      <v-col cols="12" lg="6">
        <CourseTable :courses="schedule.courses" />
      </v-col>
    </v-row>
  </v-container>
  <div class="text-center" v-else>
    <v-progress-circular indeterminate color="primary"></v-progress-circular>
  </div>
</template>

<script>
import Calendar from "../components/Calendar";
import CourseTable from "../components/CourseTable";
import { getScheduleById } from "../API/index";
export default {
  name: "ViewSchedule",
  components: {
    Calendar,
    CourseTable,
  },
  data() {
    return {
      schedule: null,
    };
  },
  async created() {
    const scheduleID = this.$route.params.scheduleID;
    try {
      const res = await getScheduleById(scheduleID);
      this.schedule = res.data.results;
    } catch (err) {
      console.log("Couldn't find schedule with that ID");
    }
  },
};
</script>
