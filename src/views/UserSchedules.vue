<template>
  <v-container>
    <v-row justify="center">
      <v-col
        cols="12"
        md="8"
        class="text-h5"
        v-if="scheduleList && scheduleList.length !== 0"
      >
        Your Schedules
      </v-col>
    </v-row>
    <v-row v-if="scheduleList" justify="center">
      <v-col v-if="scheduleList.length === 0" cols="12" md="8">
        <div class="text-h5 text-center">
          {{ message }}
        </div>
      </v-col>
      <v-col
        v-else
        cols="12"
        md="8"
        v-for="schedule in scheduleList"
        :key="schedule.scheduleID"
      >
        <ScheduleCard
          :schedule="schedule"
          :bookmarked="!!schedule.bookmarked"
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
import { getUserSchedules } from "../API";
export default {
  name: "UserSchedules",
  components: {
    ScheduleCard,
    Loader,
  },
  data() {
    return {
      scheduleList: null,
      message: "You haven't created any schedules yet!",
      loading: false,
    };
  },
  async mounted() {
    try {
      this.loading = true;
      const res = await getUserSchedules(this.$store.state.user.userID);
      this.scheduleList = res.data.results;
    } catch (err) {
      this.message = "Something went wrong loading your schedules...";
    } finally {
      this.loading = false;
    }
  },
};
</script>
