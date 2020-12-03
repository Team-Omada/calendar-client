<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12" lg="6" md="8" class="pb-0">
        <Searchbar @search-term="setTerm" />
      </v-col>
    </v-row>
    <v-row justify="center">
      <v-col v-if="scheduleList" cols="12" lg="6" md="8">
        <div v-if="scheduleList.length === 0" class="text-h5 text-center">
          {{ message }}
        </div>

        <ScheduleCard
          extraSpaced
          v-else
          v-for="schedule in scheduleList"
          :key="schedule.scheduleID"
          :schedule="schedule"
          :bookmarked="!!schedule.bookmarked"
        />
      </v-col>
      <v-col v-else-if="loading" cols="12" lg="6" md="8">
        <Loader />
      </v-col>
      <v-col v-else cols="12" lg="6" md="8">
        <div class="text-h5 text-center">
          {{ message }}
          <v-icon large>mdi-emoticon-frown-outline</v-icon>
        </div>
      </v-col>
      <v-col cols="12" lg="3" md="4">
        <AdvancedSearch @apply-filters="setFilters" :key="$route.fullPath" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import ScheduleCard from "../components/ScheduleCard";
import AdvancedSearch from "../components/AdvancedSearch";
import Searchbar from "../components/Searchbar";
import Loader from "../components/Loader";
import { getAllSchedules } from "../API";
import { errorHandlingMixin } from "../mixins/errorHandlingMixin";
export default {
  name: "Dashboard",
  components: {
    ScheduleCard,
    Loader,
    AdvancedSearch,
    Searchbar,
  },
  mixins: [errorHandlingMixin],
  data() {
    return {
      scheduleList: null,
      loading: false,
      message: "",
      search: {}, // this object remains empty if no search params are present
      // therefore, it is not passed as prop to AdvancedSearch or Searchbar
    };
  },
  methods: {
    async init() {
      try {
        this.loading = true;
        let res, msg;
        if (this.$route.query) {
          let params = {};
          for (const [key, val] of Object.entries(this.$route.query)) {
            if (key === "days" && !Array.isArray(val)) {
              params.days = [];
              params.days.push(val);
            } else {
              params[key] = val;
            }
          }
          res = await getAllSchedules(params);
          this.search = params;
          msg = "No matching schedules found.";
        } else {
          res = await getAllSchedules();
          msg = "No schedules have been created yet, be the first!";
        }
        this.scheduleList = res.data.results;
        this.setMessageNoResults(msg);
      } catch (err) {
        console.log(err);
        this.message = "Something went wrong loading schedules...";
      } finally {
        this.loading = false;
      }
    },
    setMessageNoResults(msg) {
      if (this.scheduleList.length === 0) {
        this.message = msg;
      }
    },
    setFilters(filters) {
      for (const [key, val] of Object.entries(filters)) {
        if (!val || (Array.isArray(val) && val.length === 0)) {
          const { [key]: param, ...rest } = this.search;
          this.search = rest;
        } else {
          this.search = {
            ...this.search,
            [key]: val,
          };
        }
      }
      this.searchSchedules();
    },
    setTerm(term) {
      if (!term) {
        const { q, ...rest } = this.search;
        this.search = rest;
      } else {
        this.search = {
          ...this.search,
          q: term,
        };
      }
      this.searchSchedules();
    },
    async searchSchedules() {
      try {
        const res = await getAllSchedules(this.search);
        this.scheduleList = res.data.results;
        this.setMessageNoResults("No matching schedules found.");
        this.$router.push({ query: this.search }).catch((err) => {
          // Ignore the vuex err regarding  navigating to the page they are already on.
          if (err.name != "NavigationDuplicated") {
            // But print any other errors to the console
            console.error(err);
          }
        });
      } catch (err) {
        this.message = "Something went wrong loading schedules...";
      }
    },
  },
  mounted() {
    this.init();
  },
  // without moving a key to the router-view, just init when navigating back from a filter
  watch: {
    $route(to, from) {
      if (Object.keys(from.query).length !== 0 && to.path === "/dashboard") {
        this.init();
      }
    },
  },
};
</script>
