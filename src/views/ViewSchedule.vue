<template>
  <v-container v-if="schedule" fluid>
    <v-row>
      <v-col cols="12" lg="6">
        <Calendar :schedule="schedule" />
      </v-col>
      <v-col cols="12" lg="6">
        <CourseTable :courses="schedule.courses" :editable="editable" />
        <div class="d-flex justify-space-between mt-4">
          <v-btn text color="error" @click="onDeleteBtn">
            <v-icon left>mdi-delete</v-icon> Delete
          </v-btn>
          <v-btn
            color="success"
            :disabled="!wasEdited"
            :loading="loading"
            @click="onUpdateBtn"
          >
            Update!
          </v-btn>
        </div>
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
import { getScheduleById, deleteSchedule, putSchedule } from "../API";
import { handleGeneralErr } from "../utils/errorHandling";
export default {
  name: "ViewSchedule",
  components: {
    Calendar,
    CourseTable,
  },
  data() {
    return {
      wasEdited: false,
      loading: false,
      schedule: null,
      editable: false,
    };
  },
  methods: {
    async onDeleteBtn() {
      try {
        this.loading = true;
        await deleteSchedule(this.schedule.scheduleID);
        this.$router.push({ path: "/dashboard" });
      } catch (err) {
        this.loading = false;
        console.log(handleGeneralErr(err));
      }
    },
    async onUpdateBtn() {
      try {
        await putSchedule(this.schedule.scheduleID, this.schedule);
      } catch (err) {
        console.log(handleGeneralErr(err));
      }
    },
  },
  async mounted() {
    const scheduleID = this.$route.params.scheduleID;
    try {
      const res = await getScheduleById(scheduleID);
      this.editable = res.data.userID === this.$store.state.user.userID;
      this.schedule = res.data;
    } catch (err) {
      console.log(handleGeneralErr(err));
    }
  },
};
</script>
