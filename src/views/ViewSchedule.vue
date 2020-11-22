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
            :disabled="!scheduleChange || timeoutBtn"
            :loading="loading"
            @click="onUpdateBtn"
          >
            Update
            <v-icon right>mdi-pencil</v-icon>
          </v-btn>
        </div>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" lg="6">
        <div class="text-h5">
          Comments <v-icon right>mdi-comment-multiple-outline</v-icon>
        </div>
        <Loader v-if="!comments" />
        <p
          v-else-if="comments && comments.length === 0"
          class="mt-2 text-h6 font-weight-regular"
        >
          No comments yet, be the first!
        </p>
        <div v-else v-for="comment in comments" :key="comment.commentID">
          <CommentCard
            class="mt-2"
            :comment="comment"
            @delete-comment="deleteComment"
          />
        </div>
        <CommentBox
          class="mt-6"
          @post-comment="postComment"
          :loading="commentLoading"
        />
      </v-col>
    </v-row>
  </v-container>
  <Loader v-else />
</template>

<script>
import Calendar from "../components/Calendar";
import CourseTable from "../components/CourseTable";
import CommentCard from "../components/CommentCard";
import CommentBox from "../components/CommentBox";
import Loader from "../components/Loader";
import {
  getScheduleById,
  putSchedule,
  deleteSchedule,
  getComments,
  postComment,
  deleteComment,
} from "../API";
import { errorHandlingMixin } from "../mixins/errorHandlingMixin";
import { calendarViewMixin } from "../mixins/calendarViewMixin";
export default {
  name: "ViewSchedule",
  components: {
    Calendar,
    CourseTable,
    CommentCard,
    CommentBox,
    Loader,
  },
  mixins: [errorHandlingMixin, calendarViewMixin],
  data() {
    return {
      loading: false,
      commentLoading: false,
      schedule: null,
      comments: null,
      editable: false,
      timeoutBtn: false,
    };
  },
  methods: {
    async postComment(text) {
      try {
        this.commentLoading = true;
        await postComment(this.schedule.scheduleID, { text });
        const res = await getComments(this.schedule.scheduleID);
        this.comments = res.data.results;
      } catch (err) {
        this.$emit("open-snackbar", this.handleGeneralErr(err), "error");
      } finally {
        this.commentLoading = false;
      }
    },
    async deleteComment(commentID) {
      try {
        await deleteComment(this.schedule.scheduleID, commentID);
        this.comments.splice(
          this.comments.findIndex((comment) => comment.commentID === commentID),
          1
        ); // dont need to query database again
      } catch (err) {
        this.$emit("open-snackbar", this.handleGeneralErr(err), "error");
      }
    },
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
        this.timeoutBtn = true;
        this.loading = true;
        await putSchedule(this.schedule.scheduleID, this.schedule);
        this.$emit("open-snackbar", "Schedule successfully updated", "success");
      } catch (err) {
        this.$emit("open-snackbar", this.handleGeneralErr(err), "error");
      } finally {
        console.log(this.timeoutBtn);
        this.loading = false;
        setTimeout(() => {
          this.timeoutBtn = false;
        }, 3000);
      }
    },
  },
  async mounted() {
    const scheduleID = this.$route.params.scheduleID;
    try {
      const res = await getScheduleById(scheduleID);
      this.editable = res.data.userID === this.$store.state.user.userID;
      this.schedule = res.data;
      const resComments = await getComments(scheduleID);
      this.comments = resComments.data.results;
    } catch (err) {
      this.$emit("open-snackbar", this.handleGeneralErr(err), "error");
      this.$router.push({ path: "/dashboard" });
    }
  },
};
</script>
