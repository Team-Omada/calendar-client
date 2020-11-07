<template>
  <v-card elevation="0" outlined rounded="rounded-lg">
    <!-- v-card-title causes weird formatting here -->
    <v-container v-if="!editable" fluid class="px-4 pb-0 pt-3">
      <v-row>
        <v-col cols="12" sm="9">
          <div class="text-h5">{{ currentTitle }}</div>
        </v-col>
        <v-col cols="12" sm="3" class="d-flex justify-end align-center">
          <div class="text-button text--secondary">
            {{ semesterInfo.name + " | " + semesterInfo.year }}
          </div>
        </v-col>
      </v-row>
    </v-container>
    <v-container v-else fluid class="px-4 pb-0 pt-3">
      <v-row>
        <v-col cols="12" sm="9" class="py-0">
          <v-text-field
            v-model="scheduleTitle"
            label="Schedule Title"
            :rules="[(v) => !!v || 'Field is required.']"
            @input="onTitleChange"
          ></v-text-field>
        </v-col>
        <v-col cols="12" sm="3" class="d-flex justify-end align-center py-0">
          <v-select
            v-model="selectedSemester.name"
            :items="items"
            label="Term"
            :rules="[(v) => !!v || 'Item is required']"
            @change="onSemesterChange"
          ></v-select>
          <div class="ml-6 text-button">{{ selectedSemester.year }}</div>
        </v-col>
      </v-row>
    </v-container>
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
    currentTitle: String,
    semesterInfo: Object,
    editable: Boolean,
    courses: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      scheduleTitle: this.currentTitle,
      selectedSemester: this.semesterInfo,
      value: "2020-11-04", // this is very bad, but it just so happens this week has Sun = 1 and Sat = 7
      // all events will be visualized on this week only
      items: ["Fall", "Spring", "Summer", "Winter"],
      assocDays: {
        sunday: 1,
        monday: 2,
        tuesday: 3,
        wednesday: 4,
        thursday: 5,
        friday: 6,
        saturday: 7,
      },
    };
  },
  methods: {
    onTitleChange() {
      this.$emit("title-change", this.scheduleTitle);
    },
    onSemesterChange() {
      /**
       * CSUSM releases class schedules at the following times:
       *  Fall: April, meaning any selections of "Fall" will be for the current year
       *  Spring: November, meaning any selections of "Spring" will be for next year
       *  Winter: October, meaning any selections of "Winter" will be for the current year
       *  Summer: April, meaning any selections of "Summer" will be for the current year
       *  It could be possible to late enroll for Spring while in January
       */
      const name = this.selectedSemester.name;
      const currDate = new Date();
      if (
        name === "Fall" ||
        name === "Winter" ||
        name === "Summer" ||
        (name === "Spring" && currDate.getMonth() === 0)
      ) {
        this.selectedSemester.year = currDate.getFullYear();
      } else {
        this.selectedSemester.year = currDate.getFullYear() + 1;
      }
      this.$emit("semester-change", this.selectedSemester);
    },
  },
  computed: {
    parseCourses() {
      const unformatted = this.courses;
      const formatted = [];
      /**
       * Formats according to Vuetify calendar event standards
       * Needs at least name, start, and end in the object
       * Uses assocDays to map list of days to associated day in week of this.value
       */
      unformatted.forEach((course) => {
        course.selectedDays.forEach((day) => {
          const formattedDay = day.toLowerCase();
          const start = `2020-11-0${this.assocDays[formattedDay]} ${course.startTime}`;
          const end = `2020-11-0${this.assocDays[formattedDay]} ${course.endTime}`;
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
