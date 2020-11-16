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
      </v-col>
      <v-col cols="12" lg="6">
        <CourseTable
          :courses="schedule.courses"
          editable
          @edit-course="editCourse"
          @delete-course="deleteCourse"
          @add-course="pushCourse"
        />
        <div class="d-flex justify-space-between mt-4">
          <v-btn text color="error" @click="onResetBtn">
            Reset
          </v-btn>
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
    </v-row>
  </v-container>
</template>

<script>
import Calendar from "../components/Calendar";
import CourseTable from "../components/CourseTable";
import { postSchedule } from "../API";
import { errorHandlingMixin } from "../mixins/errorHandlingMixin";
import { calendarViewMixin } from "../mixins/calendarViewMixin";
export default {
  name: "CreateSchedule",
  components: {
    Calendar,
    CourseTable,
  },
  mixins: [errorHandlingMixin, calendarViewMixin],
  data() {
    return {
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
    async onPublishBtn() {
      this.loading = true;
      try {
        const res = await postSchedule(this.schedule);
        const scheduleID = res.data.scheduleID;
        this.$router.push({ path: `viewschedule/${scheduleID}` });
      } catch (err) {
        this.openSnackBar(this.handleGeneralErr(err), "error");
      }
      this.loading = false;
    },
    onResetBtn() {
      this.schedule.scheduleTitle = "";
      this.schedule.semester = "";
      this.schedule.semesterYear = new Date().getFullYear();
      this.schedule.courses.splice(0); // avoids declaring assigning new array
    },
  },
};
</script>
