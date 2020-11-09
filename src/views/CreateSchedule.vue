<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12" lg="6">
        <Calendar
          :schedule="schedule"
          editable
          @title-change="(value) => (schedule.title = value)"
          @semester-change="(value) => (schedule.semesterInfo = value)"
        />
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
      </v-col>
      <v-col cols="12" lg="6">
        <CourseTable
          :courses="schedule.courses"
          editable
          @edit-course="editCourse"
          @delete-course="deleteCourse"
          @add-course="pushCourse"
        />
      </v-col>
    </v-row>
    <v-snackbar v-model="showSnackbar" timeout="2000" :color="snackBarColor">
      {{ snackBarMsg }}
      <template v-slot:action="{ attrs }">
        <v-btn text v-bind="attrs" @click="showSnackbar = false">
          Close
        </v-btn>
      </template>
    </v-snackbar>
  </v-container>
</template>

<script>
import Calendar from "../components/Calendar";
import CourseTable from "../components/CourseTable";
import { postSchedule } from "../API";
export default {
  name: "CreateSchedule",
  components: {
    Calendar,
    CourseTable,
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
    // a little message at the bottom of the screen
    openSnackBar(msg, color) {
      this.showSnackbar = true;
      this.snackBarMsg = msg;
      this.snackBarColor = color;
    },
    // edits course object, replacing if existing
    editCourse(course, originalID) {
      const index = this.schedule.courses.indexOf(originalID);
      this.schedule.courses.splice(index, 1, course);
      this.openSnackBar(`${originalID} was edited!`, "success");
    },
    // deletes course object in the courses array
    deleteCourse(id) {
      this.schedule.courses.splice(
        this.schedule.courses.findIndex((course) => course.courseID === id),
        1
      );
      this.openSnackBar(`${id} deleted!`, "success");
    },
    // adds a schedule to the courses array
    pushCourse(value) {
      this.schedule.courses.push(value);
      this.openSnackBar("Course was added to your schedule!", "success");
    },
    async onPublishBtn() {
      this.loading = true;
      try {
        const res = await postSchedule(this.schedule);
        const scheduleID = res.data.scheduleID;
        this.$router.push({ path: `viewschedule/${scheduleID}` });
      } catch (err) {
        if (err.response) {
          // any non-200 responses will be either 401's or 500's
          // both fields will show this error
          this.openSnackBar(err.response.data.message, "error");
        } else if (err.request) {
          this.openSnackBar("Request couldn't be sent.", "error");
          console.log(this.snackBarMsg, err);
        } else {
          this.openSnackBar("Something happened setting up request.", "error");
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
