<template>
  <v-card class="mt-4" elevation="0" outlined rounded="rounded-lg">
    <v-card-title>Add Course</v-card-title>
    <v-card-text class="pb-0">
      <v-form v-model="isValid" ref="form">
        <v-row dense>
          <v-col cols="12" md="2" sm="4">
            <v-text-field
              dense
              outlined
              label="Course ID"
              hint="ex. CS441"
              v-model="course.courseID"
              hide-details="auto"
              :rules="[rules.required, rules.course]"
            >
            </v-text-field>
          </v-col>
          <v-col cols="12" md="3" sm="8">
            <v-text-field
              dense
              outlined
              label="Course Name"
              v-model="course.courseName"
              :rules="[rules.required]"
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="3" sm="6">
            <v-text-field
              dense
              outlined
              label="Instructor"
              v-model="course.instructor"
              :rules="[rules.required]"
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="2" sm="3">
            <TimePicker
              placeholderTitle="Start"
              :error="timeError"
              @time-select="setStartTime"
            />
          </v-col>
          <v-col cols="12" md="2" sm="3">
            <TimePicker
              placeholderTitle="End"
              :error="timeError"
              @time-select="setEndTime"
            />
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" sm="9">
            <div class="d-flex flex-wrap">
              <v-checkbox
                class="mr-6"
                v-for="day in days"
                :key="day.label"
                :label="day.label"
                v-model="course.selectedDays"
                :value="day.value"
                multiple
                dense
                :error="dayError"
                @click="dayError = false"
              ></v-checkbox>
            </div>
          </v-col>
          <v-col cols="12" sm="3" class="d-flex justify-end align-center">
            <v-btn :disabled="!isValid" color="success" @click="onAddBtn">
              Add<v-icon right>mdi-plus</v-icon>
            </v-btn>
          </v-col>
        </v-row>
      </v-form>
    </v-card-text>
  </v-card>
</template>

<script>
import TimePicker from "../components/TimePicker";
export default {
  name: "AddCourse",
  components: {
    TimePicker,
  },
  data() {
    return {
      isValid: false,
      dayError: false,
      timeError: "",
      days: [
        { label: "Mon", value: "monday" },
        { label: "Tue", value: "tuesday" },
        { label: "Wed", value: "wednesday" },
        { label: "Thu", value: "thursday" },
        { label: "Fri", value: "friday" },
        { label: "Sat", value: "saturday" },
        { label: "Sun", value: "sunday" },
      ],
      course: {
        courseID: null,
        courseName: null,
        instructor: null,
        selectedDays: [],
        startTime: null,
        endTime: null,
      },
      // client side rules for validation only runs for client
      rules: {
        required: (value) => !!value || "Field is required.",
        course: (value) => {
          const pattern = /^[A-Z]{2,4}[0-9]{3}$/;
          return pattern.test(value) || "2-4 letters followed by 3 numbers.";
        },
      },
    };
  },
  methods: {
    onAddBtn() {
      if (this.course.selectedDays.length === 0) {
        this.dayError = true;
      } else {
        const courseToAdd = { ...this.course };
        this.$emit("add-course", courseToAdd);
        // empty out this.courses object for next course
        for (let key in this.course) {
          if (key === "selectedDays") {
            this.course.selectedDays = [];
          } else {
            this.course[key] = null;
          }
        }
        this.$refs.form.reset(); // reset all fields so errors aren't thrown
      }
    },
    setStartTime(time) {
      this.course.startTime = time;
      this.checkValidTimes();
    },
    setEndTime(time) {
      this.course.endTime = time;
      this.checkValidTimes();
    },
    checkValidTimes() {
      const start = this.course.startTime;
      const end = this.course.endTime;
      // this looks bad comparing time strings like this, but...
      // since Vuetify calendar always spits out 24hr times 0 padded, this works
      if (start > end || start === end) {
        this.timeError = "Please provide valid times.";
      } else {
        this.timeError = "";
      }
    },
  },
};
</script>
