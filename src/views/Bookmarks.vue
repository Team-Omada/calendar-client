<template>
  <v-container>
    <v-row justify="center">
      <v-col
        cols="12"
        md="8"
        class="text-h5"
        v-if="bookmarkList && bookmarkList.length !== 0"
      >
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
        <ScheduleCard
          :schedule="bookmark"
          bookmarked
          @delete-bookmark="onBookmarkDelete"
        />
      </v-col>
    </v-row>
    <v-row v-else-if="loading">
      <v-col cols="12">
        <Loader />
      </v-col>
    </v-row>
    <v-row v-else justify="center">
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
import Loader from "../components/Loader";
import { getUserBookmarks } from "../API";
export default {
  name: "Bookmarks",
  components: {
    ScheduleCard,
    Loader,
  },
  data() {
    return {
      bookmarkList: null,
      message: "You haven't bookmarked any schedules yet!",
      loading: false,
    };
  },
  methods: {
    onBookmarkDelete(id) {
      this.bookmarkList.splice(
        this.bookmarkList.findIndex((bookmark) => bookmark.scheduleID === id),
        1
      );
    },
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
