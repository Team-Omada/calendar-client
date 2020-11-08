<template>
  <div>
    <Calendar v-if="schedule" :schedule="schedule" />
    <div class="text-center" v-else>
      <v-progress-circular indeterminate color="primary"></v-progress-circular>
    </div>
  </div>
</template>

<script>
import Calendar from "../components/Calendar";
import { getScheduleById } from "../API/index";
export default {
  name: "ViewSchedule",
  components: {
    Calendar,
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
