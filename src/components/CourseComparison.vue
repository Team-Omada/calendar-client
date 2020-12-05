<template>
  <v-autocomplete
    outlined
    v-model="selected"
    clearable
    :items="items"
    :placeholder="errorMsg"
    :disabled="disabled"
    prepend-inner-icon="mdi-compare-vertical"
    item-value="id"
    label="Compare one of your schedules"
    :filter="filterObject"
    @change="$emit('compare-schedule', selected)"
  >
    <template v-slot:selection="data">
      <v-chip
        color="success"
        outlined
        small
        v-for="course in data.item.courses"
        :key="course"
      >
        {{ course }}
      </v-chip>
      {{ data.item.title }}
    </template>
    <template v-slot:item="data">
      <div class="d-flex flex-wrap my-1">
        <v-chip
          class="mr-1"
          color="success"
          outlined
          small
          v-for="course in data.item.courses"
          :key="course"
        >
          {{ course }}
        </v-chip>
        {{ data.item.title }}
      </div>
    </template>
  </v-autocomplete>
</template>

<script>
import { getAllSchedules } from "../API";
export default {
  name: "CourseComparison",
  data() {
    return {
      selected: "",
      items: [],
      errorMsg: "",
      disabled: false,
    };
  },
  methods: {
    filterObject(item, queryText) {
      // credit: https://stackoverflow.com/questions/54561935/how-to-have-vue-vuetify-autocomplete-filter-on-two-properties
      return (
        item.searchCourses
          .toLocaleLowerCase()
          .indexOf(queryText.toLocaleLowerCase()) > -1 ||
        item.title.toLocaleLowerCase().indexOf(queryText.toLocaleLowerCase()) >
          -1
      );
    },
  },
  async mounted() {
    try {
      const res = await getAllSchedules({
        email: this.$store.state.user.email,
      });
      if (res.data.results.length === 0) {
        this.disabled = true;
        this.errorMsg = "Add your own schedule to use this feature!";
      } else {
        this.items = res.data.results.map((schedule) => {
          return {
            title: schedule.scheduleTitle,
            id: schedule.scheduleID,
            courses: schedule.courses.split(", ").splice(0, 3),
            searchCourses: schedule.courses,
          };
        });
      }
    } catch (err) {
      this.disabled = true;
      this.errorMsg = "Could not load your schedules for comparison.";
    }
  },
};
</script>
