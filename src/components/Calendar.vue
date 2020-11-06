<template>
  <v-card elevation="0" outlined rounded="rounded-lg">
    <v-card-title>{{ scheduleTitle }}</v-card-title>
    <v-card-text>
      <v-sheet height="550">
        <v-calendar
          ref="calendar"
          :now="value"
          :events="parseCourses"
          type="week"
        >
        </v-calendar>
      </v-sheet>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  name: "Calendar",
  props: {
    scheduleTitle: String,
    courses: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      value: "2020-11-04", // this is very bad, but it just so happens this week has Sun = 1 and Sat = 7
      // all events will be visualized on this week only
    };
  },
  computed: {
    parseCourses() {
      const unformatted = this.courses;
      const formatted = [];
      unformatted.forEach((course) => {
        course.selectedDays.forEach((day) => {
          const start = `2020-11-0${day.assoc} ${course.startTime}`;
          const end = `2020-11-0${day.assoc} ${course.endTime}`;
          formatted.push({
            name: course.courseID,
            start: start,
            end: end,
            courseName: course.courseName,
            instructor: course.instructor,
          });
        });
      });
      return formatted;
    },
  },
};
</script>
