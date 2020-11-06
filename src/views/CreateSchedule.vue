<template>
  <div>
    <Calendar :courses="schedule.courses" scheduleTitle="My first schedule" />
    <AddCourse @add-course="pushCourse" />
    <v-snackbar v-model="successOnAdd" timeout="1500" color="success">
      Course was added to your schedule!
      <template v-slot:action="{ attrs }">
        <v-btn text v-bind="attrs" @click="snackbar = false">
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
      schedule: {
        courses: [],
      },
    };
  },
  methods: {
    pushCourse(value) {
      this.schedule.courses.push(value);
      this.successOnAdd = true;
    },
  },
};
</script>
