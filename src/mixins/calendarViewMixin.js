export const calendarViewMixin = {
  methods: {
    titleChange(value) {
      this.schedule.title = value;
    },
    semesterChange(value) {
      this.schedule.semester = value;
    },
    // edits course object, replacing if existing
    editCourse(course, originalID) {
      const index = this.schedule.courses.findIndex(
        (course) => course.courseID === originalID
      );
      this.schedule.courses.splice(index, 1, course);
      this.$emit("open-snackbar", `${originalID} was edited!`, "success");
    },
    // deletes course object in the courses array
    deleteCourse(id) {
      this.schedule.courses.splice(
        this.schedule.courses.findIndex((course) => course.courseID === id),
        1
      );
      this.$emit("open-snackbar", `${id} deleted!`, "success");
    },
    // adds a schedule to the courses array
    pushCourse(value) {
      this.schedule.courses.push(value);
      this.$emit(
        "open-snackbar",
        "Course was added to your schedule!",
        "success"
      );
    },
  },
  computed: {
    scheduleChange() {
      return (
        this.schedule.scheduleTitle &&
        this.schedule.semester &&
        this.schedule.courses.length !== 0
      );
    },
  },
};
