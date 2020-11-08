<template>
  <div>
    <Calendar
      :schedule="schedule"
      editable
      @title-change="(value) => (schedule.title = value)"
      @semester-change="(value) => (schedule.semesterInfo = value)"
    />
    <AddCourse @add-course="pushCourse" :courses="schedule.courses" />
    <div class="d-flex justify-center mt-4">
      <v-btn
        :loading="loading"
        :disabled="!validSchedule"
        color="success"
        @click="onPublishBtn"
      >
        Publish!
      </v-btn>
    </div>
    <v-snackbar v-model="showSnackbar" timeout="2000" :color="snackBarColor">
      {{ snackBarMsg }}
      <template v-slot:action="{ attrs }">
        <v-btn text v-bind="attrs" @click="showSnackbar = false">
          Close
        </v-btn>
      </template>
    </v-snackbar>
  </div>
</template>

<script>
import Calendar from "../components/Calendar";
import AddCourse from "../components/AddCourse";
import { postSchedule } from "../API";
export default {
  name: "CreateSchedule",
  components: {
    Calendar,
    AddCourse,
  },
  data() {
    return {
      showSnackbar: false,
      snackBarMsg: "",
      snackBarColor: "",
      validSchedule: false,
      loading: false,
      schedule: {
        scheduleTitle: "",
        semester: "",
        semesterYear: new Date().getFullYear(),
        courses: [],
      },
    };
  },
  methods: {
    pushCourse(value) {
      this.schedule.courses.push(value);
      this.showSnackbar = true;
      this.snackBarMsg = "Course was added to your schedule!";
      this.snackBarColor = "success";
    },
    async onPublishBtn() {
      this.loading = true;
      try {
        const res = await postSchedule(this.schedule);
        const scheduleID = res.data.scheduleID;
        this.$router.push({ path: `viewschedule/${scheduleID}` });
      } catch (err) {
        this.snackBarColor = "error";
        this.showSnackbar = true;
        if (err.response) {
          // any non-200 responses will be either 401's or 500's
          // both fields will show this error
          this.snackBarMsg = err.response.data.message;
        } else if (err.request) {
          this.snackBarMsg = "Request couldn't be sent.";
          console.log(this.snackBarMsg, err);
        } else {
          this.snackBarMsg = "Something happened setting up request.";
          console.log(this.snackBarMsg, err);
        }
      }
      this.loading = false;
    },
  },
  computed: {
    scheduleChange() {
      return (
        this.schedule.scheduleTitle &&
        this.schedule.semester &&
        this.schedule.courses.length !== 0
      );
    },
  },
  watch: {
    // watching on the above function prevents us from using a deep watcher
    scheduleChange(value) {
      this.validSchedule = value;
    },
  },
};
</script>
