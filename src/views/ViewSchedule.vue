<template>
  <v-container v-if="schedule" fluid>
    <v-row>
      <v-col cols="12" lg="6">
        <Calendar
          :schedule="schedule"
          :editable="editable"
          @title-change="titleChange"
          @semester-change="semesterChange"
        />
      </v-col>
      <v-col cols="12" lg="6">
        <CourseTable
          :courses="schedule.courses"
          :editable="editable"
          @edit-course="editCourse"
          @delete-course="deleteCourse"
          @add-course="pushCourse"
        />
        <div class="d-flex justify-space-between mt-4" v-if="editable">
          <v-btn text color="error" @click="onDeleteBtn">
            <v-icon left>mdi-delete</v-icon> Delete
          </v-btn>
          <v-btn
            color="success"
            :disabled="!scheduleChange"
            :loading="loading"
            @click="onUpdateBtn"
          >
            Update
            <v-icon right>mdi-pencil</v-icon>
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
import { getScheduleById, putSchedule, deleteSchedule } from "../API";
import { errorHandlingMixin } from "../mixins/errorHandlingMixin";
import { calendarViewMixin } from "../mixins/calendarViewMixin";
export default {
  name: "ViewSchedule",
  components: {
    Calendar,
    CourseTable,
  },
  mixins: [errorHandlingMixin, calendarViewMixin],
  data() {
    return {
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
        this.$emit("open-snackbar", "Schedule successfully deleted", "success");
        this.$router.push({ path: "/dashboard" });
      } catch (err) {
        this.loading = false;
        this.$emit("open-snackbar", this.handleGeneralErr(err), "error");
      }
    },
    async onUpdateBtn() {
      try {
        await putSchedule(this.schedule.scheduleID, this.schedule);
        this.$emit("open-snackbar", "Schedule successfully updated", "success");
      } catch (err) {
        this.$emit("open-snackbar", this.handleGeneralErr(err), "error");
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
      this.$emit("open-snackbar", this.handleGeneralErr(err), "error");
      this.$router.push({ path: "/dashboard" });
    }
  },
};
</script>
