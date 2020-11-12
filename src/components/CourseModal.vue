<template>
  <v-card elevation="0" outlined rounded="rounded-lg">
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
              :rules="[rules.required, rules.course, uniqueCourse]"
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
              :existing-time="course.startTime"
              @time-select="setStartTime"
            />
          </v-col>
          <v-col cols="12" md="2" sm="3">
            <TimePicker
              placeholderTitle="End"
              :error="timeError"
              :existing-time="course.endTime"
              @time-select="setEndTime"
            />
          </v-col>
        </v-row>
        <v-row>
          <div class="d-flex flex-wrap">
            <v-checkbox
              class="mr-6"
              v-for="checkbox in checkboxes"
              :key="checkbox.label"
              :label="checkbox.label"
              v-model="course.days"
              :value="checkbox.value"
              multiple
              dense
              :error="dayError"
              @click="dayError = false"
            ></v-checkbox>
          </div>
        </v-row>
      </v-form>
    </v-card-text>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn color="primary" class="mr-2" text @click="closeModal">
        Close
      </v-btn>
      <v-btn
        v-if="!editMode"
        :disabled="!isValid"
        color="success"
        @click="onModalBtn('add-course')"
      >
        <v-icon>mdi-plus</v-icon>
      </v-btn>
      <v-btn
        v-else
        :disabled="!isValid"
        color="success"
        @click="onModalBtn('edit-course')"
      >
        <v-icon>mdi-pencil</v-icon>
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import TimePicker from "../components/TimePicker";
export default {
  name: "CourseModal",
  props: {
    courses: Array,
    editMode: Boolean,
    courseToEdit: String,
  },
  components: {
    TimePicker,
  },
  data() {
    return {
      isValid: false,
      dayError: false,
      timeError: "",
      checkboxes: [
        { label: "Mon", value: "monday" },
        { label: "Tue", value: "tuesday" },
        { label: "Wed", value: "wednesday" },
        { label: "Thu", value: "thursday" },
        { label: "Fri", value: "friday" },
        { label: "Sat", value: "saturday" },
        { label: "Sun", value: "sunday" },
      ],
      course: {
        courseID: "",
        courseName: "",
        instructor: "",
        days: [],
        startTime: "",
        endTime: "",
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
    clearForm() {
      // empty out this.courses object for next course
      this.$refs.form.reset(); // reset all fields so errors aren't thrown
      for (let key in this.course) {
        if (key === "days") {
          this.course.days = [];
        } else {
          this.course[key] = "";
        }
      }
    },
    closeModal() {
      this.$emit("close-modal");
      if (this.editMode) {
        this.clearForm();
      }
    },
    onModalBtn(event) {
      if (this.course.days.length === 0) {
        this.dayError = true;
      } else {
        const newCourse = { ...this.course };
        this.$emit(event, newCourse, this.courseToEdit);
        this.$emit("close-modal");
        this.clearForm();
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
        this.timeError = "Invalid times.";
      } else {
        this.timeError = "";
      }
    },
  },
  computed: {
    // checks all names of added courses to determine if current has already been added
    uniqueCourse() {
      if (!this.editMode) {
        const currentCourseID = this.course.courseID;
        return (
          this.courses.every((course) => currentCourseID !== course.courseID) ||
          "You've already added this course!"
        );
      }
      return true;
    },
  },
  watch: {
    courseToEdit: {
      immediate: true,
      // watches for courseToEdit and makes shallow copy of object it finds in parent component array
      handler() {
        if(this.courseToEdit) {
          const courseCopy = this.courses.find(
            (course) => course.courseID === this.courseToEdit
          );
          this.course = { ...courseCopy };
        }
      },
    }
  },
};
</script>
