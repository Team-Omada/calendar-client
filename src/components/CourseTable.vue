<template>
  <v-card elevation="0" outlined rounded="rounded-lg" class="mt-lg-0 mt-4">
    <v-data-table
      :headers="determineColNames"
      :items="formatRows"
      hide-default-footer
      disable-sort
    >
      <template v-slot:top>
        <v-card-title>
          Courses
          <v-spacer></v-spacer>
          <v-dialog v-if="editable" v-model="courseModal" max-width="900">
            <template v-slot:activator="{ on, attrs }">
              <v-btn icon large dense color="primary" v-bind="attrs" v-on="on">
                <v-icon>
                  mdi-plus
                </v-icon>
              </v-btn>
            </template>
            <CourseModal
              :courses="courses"
              :edit-mode="editMode"
              :course-to-edit="courseToEdit"
              @add-course="(value) => $emit('add-course', value)"
              @edit-course="(value, old) => $emit('edit-course', value, old)"
              @close-modal="closeModal"
            />
          </v-dialog>
        </v-card-title>
      </template>
      <template v-slot:no-data>
        Add a course to get started!
      </template>
      <template v-if="editable" v-slot:[`item.actions`]="{ item }">
        <v-icon small class="mr-2" @click="onEditRow(item.courseID)">
          mdi-pencil
        </v-icon>
        <v-icon small @click="onDeleteRow(item.courseID)">
          mdi-delete
        </v-icon>
      </template>
    </v-data-table>
  </v-card>
</template>

<script>
import CourseModal from "../components/CourseModal";
export default {
  name: "CourseTable",
  components: {
    CourseModal,
  },
  props: {
    editable: Boolean,
    courses: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      courseModal: false,
      editMode: false, // not to be confused with editable prop, used in CourseModal
      courseToEdit: "",
    };
  },
  methods: {
    // when someone clicks the edit button in the table
    onEditRow(courseID) {
      this.courseModal = true;
      this.courseToEdit = courseID;
      this.editMode = true;
    },
    // when someone clicks the delete button in the table
    onDeleteRow(courseID) {
      this.$emit("delete-course", courseID);
    },
    closeModal() {
      this.courseModal = false;
      this.editMode = false;
      this.courseToEdit = "";
    },
  },
  computed: {
    // removes actions column when a schedule is only meant for viewing
    determineColNames() {
      const names = [
        { text: "Actions", value: "actions" },
        { text: "CourseID", value: "courseID" },
        { text: "Name", value: "courseName" },
        { text: "Instructor", value: "instructor" },
        { text: "Start", value: "startTime" },
        { text: "End", value: "endTime" },
        { text: "Days", value: "formattedDays" },
      ];
      if (this.editable) {
        return names;
      } else {
        names.splice(0, 1);
        return names;
      }
    },
    // TODO: sort days in order for better table format
    formatRows() {
      return this.courses.map((course) => {
        let dayString = "";
        course.days.forEach((day) => {
          let dayFormat = day.charAt(0).toUpperCase() + day.slice(1);
          if (
            dayFormat === "Monday" ||
            dayFormat === "Wednesday" ||
            dayFormat === "Friday"
          )
            dayString = dayString + dayFormat.substring(0, 1);
          else dayString = dayString + dayFormat.substring(0, 2);
        });
        return {
          courseID: course.courseID,
          courseName: course.courseName,
          instructor: course.instructor,
          startTime: course.startTime,
          endTime: course.endTime,
          formattedDays: dayString,
        };
      });
    },
  },
};
</script>
