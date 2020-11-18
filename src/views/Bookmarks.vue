<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12" md="8" class="text-h5">
        Your Bookmarks
      </v-col>
    </v-row>
    <v-row v-if="bookmarkList" justify="center">
      <v-col v-if="bookmarkList.length === 0" cols="12" md="8">
        <div class="text-h5 text-center">
          {{ message }}
        </div>
      </v-col>
      <v-col
        v-else
        cols="12"
        md="8"
        v-for="bookmark in bookmarkList"
        :key="bookmark.scheduleID"
      >
        <ScheduleCard :schedule="bookmark" />
      </v-col>
    </v-row>
    <v-row v-else-if="loading">
      <v-col cols="12" md="8">
        <div class="text-center">
          <v-progress-circular
            indeterminate
            color="primary"
          ></v-progress-circular>
        </div>
      </v-col>
    </v-row>
    <v-row v-else>
      <v-col cols="12" md="8">
        <div class="text-h5 text-center">
          {{ message }}
          <v-icon large>mdi-emoticon-frown-outline</v-icon>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import ScheduleCard from "../components/ScheduleCard";
import { getUserBookmarks } from "../API";
export default {
  name: "Bookmarks",
  components: {
    ScheduleCard,
  },
  data() {
    return {
      bookmarkList: null,
      message: "You haven't bookmarked a schedule yet!",
      loading: false,
    };
  },
  async mounted() {
    try {
      this.loading = true;
      const res = await getUserBookmarks();
      this.bookmarkList = res.data.results;
    } catch (err) {
      this.message = "Something went wrong loading bookmarks...";
    } finally {
      this.loading = false;
    }
  },
};
</script>
