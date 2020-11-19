<template>
  <v-card elevation="0" outlined rounded="rounded-lg">
    <!-- v-card-title causes weird formatting here -->
    <v-container v-if="!editable" fluid class="px-4 pb-0 pt-3">
      <v-row>
        <v-col cols="12" lg="8" sm="9" class="pb-0">
          <div class="text-h5">{{ localSchedule.scheduleTitle }}</div>
        </v-col>
        <v-col
          cols="12"
          lg="4"
          sm="3"
          class="d-flex justify-sm-end align-center pb-0"
        >
          <div class="text-button text--secondary">
            {{ localSchedule.semester + " | " + localSchedule.semesterYear }}
          </div>
        </v-col>
      </v-row>
    </v-container>
    <v-container v-else fluid class="px-4 pb-0 pt-3">
      <v-row>
        <v-col cols="12" lg="8" sm="9" class="py-0">
          <v-text-field
            v-model="localSchedule.scheduleTitle"
            label="Schedule Title"
            :rules="[(v) => !!v || 'Field is required.']"
            @input="onTitleChange"
          ></v-text-field>
        </v-col>
        <v-col
          cols="12"
          lg="4"
          sm="3"
          class="d-flex justify-end align-center py-0"
        >
          <v-select
            v-model="localSchedule.semester"
            :items="items"
            label="Term"
            :rules="[(v) => !!v || 'Item is required']"
            @change="onSemesterChange"
          ></v-select>
          <div class="ml-6 text-button">{{ localSchedule.semesterYear }}</div>
        </v-col>
      </v-row>
    </v-container>
    <v-card-text class="pt-0">
      <v-list-item two-line class="px-0" v-if="!editable">
        <v-icon large left>mdi-account-circle</v-icon>
        <v-list-item-content>
          <v-list-item-title>
            {{ schedule.username }}
          </v-list-item-title>
          <v-list-item-subtitle>
            {{ schedule.email }}
          </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
      <v-sheet height="550">
        <v-calendar
          ref="calendar"
          :now="today"
          :start="start"
          :end="end"
          :value="today"
          :events="parseCourses"
          :first-interval="7"
          :interval-minutes="60"
          :interval-count="16"
          type="week"
        >
        </v-calendar>
      </v-sheet>
      <p class="text-right font-italic mt-4 mb-0">Posted on {{ formatDate }}</p>
    </v-card-text>
  </v-card>
</template>

<script>
import { mappedDaysMixin } from "../mixins/mappedDaysMixin";
import { format } from "date-fns";
export default {
  name: "Calendar",
  props: {
    schedule: Object,
    editable: Boolean,
  },
  mixins: [mappedDaysMixin],
  data() {
    return {
      localSchedule: this.schedule,
      start: "2020-11-01",
      end: "2020-11-07",
      today: "2020-11-04", // this is very bad, but it just so happens this week has Sun = 1 and Sat = 7
      // all events will be visualized on this week only
      items: ["Fall", "Spring", "Summer", "Winter"],
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
      const name = this.localSchedule.semester;
      const currDate = new Date();
      if (
        name === "Fall" ||
        name === "Winter" ||
        name === "Summer" ||
        (name === "Spring" && currDate.getMonth() === 0)
      ) {
        this.localSchedule.semesterYear = currDate.getFullYear();
      } else {
        this.localSchedule.semesterYear = currDate.getFullYear() + 1;
      }
      this.$emit("semester-change", this.localSchedule.semester);
    },
  },
  computed: {
    parseCourses() {
      const formatted = [];
      /**
       * Formats according to Vuetify calendar event standards
       * Needs at least name, start, and end in the object
       * Uses mappedDays to map list of days to associated day in week of this.today
       */
      this.schedule.courses.forEach((course) => {
        course.days.forEach((day) => {
          const formattedDay = day.toLowerCase();
          const start = `2020-11-0${this.mappedDays[formattedDay]} ${course.startTime}`;
          const end = `2020-11-0${this.mappedDays[formattedDay]} ${course.endTime}`;
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
    formatDate() {
      return format(
        new Date(this.schedule.datePosted),
        "LLL. d, yyyy | h:mm a"
      );
    },
  },
};
</script>
