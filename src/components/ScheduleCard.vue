<template>
  <div :class="extraSpaced ? 'card-margin' : ''">
    <v-hover v-slot="{ hover }">
      <v-card
        :elevation="hover ? 3 : 0"
        outlined
        shaped
        @click="$router.push({ path: `/viewschedule/${schedule.scheduleID}` })"
      >
        <v-container fluid class="px-4 pb-0 pt-3">
          <v-row>
            <v-col cols="12" lg="8" sm="9" class="py-0">
              <div class="text-h6">{{ schedule.scheduleTitle }}</div>
            </v-col>
            <v-col
              cols="12"
              lg="4"
              sm="3"
              class="d-flex justify-sm-end align-center py-0"
            >
              <div class="text-button text--secondary">
                {{ schedule.semester + " | " + schedule.semesterYear }}
              </div>
            </v-col>
          </v-row>
        </v-container>
        <v-card-text class="py-0">
          <!-- Max of 3 or 4 most likely -->
          <v-container class="py-0">
            <v-row>
              <v-col cols="12" sm="7" class="px-0">
                <v-chip
                  class="mr-2 mt-1"
                  color="success"
                  outlined
                  small
                  v-for="course in formatCourses"
                  :key="course.courseID"
                  >{{ course }}</v-chip
                >
              </v-col>
              <v-col cols="12" sm="5" class="px-0">
                <div class="d-flex justify-end mt-1">
                  Posted: {{ formatDate }}
                </div>
              </v-col>
            </v-row>
          </v-container>
          <v-divider></v-divider>
          <v-card-actions class="pa-0">
            <v-list-item two-line class="px-0">
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
            <v-spacer></v-spacer>
            <v-btn icon @click.stop="onStarBtn" color="warning">
              <v-icon>{{
                isBookmarked ? "mdi-star" : "mdi-star-outline"
              }}</v-icon>
            </v-btn>
          </v-card-actions>
        </v-card-text>
      </v-card>
    </v-hover>
  </div>
</template>

<script>
import { format } from "date-fns";
import { postBookmark, deleteBookmark } from "../API";
import { errorHandlingMixin } from "../mixins/errorHandlingMixin";
export default {
  name: "ScheduleCard",
  props: {
    schedule: Object,
    bookmarked: Boolean,
    extraSpaced: Boolean,
  },
  mixins: [errorHandlingMixin],
  data() {
    return {
      isBookmarked: this.bookmarked,
    };
  },
  methods: {
    async onStarBtn() {
      try {
        if (this.isBookmarked) {
          await deleteBookmark(this.schedule.scheduleID);
          this.isBookmarked = false;
          this.$emit("delete-bookmark", this.schedule.scheduleID);
        } else {
          await postBookmark(this.schedule.scheduleID);
          this.isBookmarked = true;
        }
      } catch (err) {
        this.$emit("open-snackbar", this.handleGeneralErr(err), "error");
      }
    },
  },
  computed: {
    formatDate() {
      return format(
        new Date(this.schedule.datePosted),
        "LLL. d, yyyy | h:mm a"
      );
    },
    formatCourses() {
      return this.schedule.courses.split(", ").splice(0, 3);
    },
  },
};
</script>

<style scoped>
.v-card {
  transition: 0.2s ease;
}
.card-margin {
  padding: 12px 0;
}
.card-margin:first-child {
  padding-top: 0;
}
</style>
