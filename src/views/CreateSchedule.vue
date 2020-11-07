<template>
  <div>
    <Calendar
      :courses="schedule.courses"
      :semesterInfo="schedule.semesterInfo"
      editable
      @title-change="(value) => (schedule.title = value)"
      @semester-change="(value) => (schedule.semesterInfo = value)"
    />
    <AddCourse @add-course="pushCourse" />
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
    <v-snackbar v-model="successOnAdd" timeout="2000" color="success">
      Course was added to your schedule!
      <template v-slot:action="{ attrs }">
        <v-btn text v-bind="attrs" @click="successOnAdd = false">
          Close
        </v-btn>
      </template>
    </v-snackbar>
  </div>
</template>

<script>
import Calendar from "../components/Calendar";
import AddCourse from "../components/AddCourse";
export default {
  name: "CreateSchedule",
  components: {
    Calendar,
    AddCourse,
  },
  data() {
    return {
      successOnAdd: false,
      validSchedule: false,
      loading: false,
      schedule: {
        title: null,
        semesterInfo: {
          name: null,
          year: new Date().getFullYear(),
        },
        courses: [],
      },
    };
  },
  methods: {
    pushCourse(value) {
      this.schedule.courses.push(value);
      this.successOnAdd = true;
    },
    onPublishBtn() {
      this.loading = true;
      setTimeout(() => {
        console.log("Submitted schedule!");
        console.log(this.schedule);
        this.loading = false;
      }, 2000);
    },
  },
  computed: {
    scheduleChange() {
      return (
        this.schedule.title &&
        this.schedule.semesterInfo.name &&
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
