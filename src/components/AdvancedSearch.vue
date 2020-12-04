<template>
  <v-card elevation="0" outlined rounded="rounded-lg">
    <v-card-title>
      Filter by Course
    </v-card-title>
    <v-card-text>
      <v-text-field
        v-model="filters.instructor"
        label="Instructor"
        prepend-icon="mdi-school"
        :append-icon="filters.instructor ? 'mdi-filter-remove' : ''"
        @click:append="clearFilter('instructor')"
      ></v-text-field>
      <v-text-field
        v-model="filters.courseID"
        label="Course ID"
        prepend-icon="mdi-book-open-page-variant"
        :append-icon="filters.courseID ? 'mdi-filter-remove' : ''"
        maxlength="7"
        hint="Ex. CS441"
        @click:append="clearFilter('courseID')"
      ></v-text-field>
      <p class="mt-4">Between times of:</p>
      <div class="d-flex">
        <TimePicker
          class="pr-1"
          placeholderTitle="Starts"
          :existingTime="filters.start"
          @time-select="(time) => (filters.start = time)"
        />
        <TimePicker
          class="pl-1"
          placeholderTitle="Ends"
          :existingTime="filters.end"
          @time-select="(time) => (filters.end = time)"
        />
      </div>
      <p class="mb-0 mt-2">On day(s):</p>
      <div class="d-flex flex-wrap">
        <v-checkbox
          v-model="filters.days"
          class="mr-4"
          v-for="checkbox in checkboxes"
          :key="checkbox.label"
          :label="checkbox.label"
          :value="checkbox.value"
          multiple
          dense
        ></v-checkbox>
      </div>
    </v-card-text>
    <v-card-actions>
      <v-btn text color="primary" @click="clearAllFilters">Clear</v-btn>
      <v-spacer></v-spacer>
      <v-btn color="success" text @click="applyFilters">
        Apply
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import TimePicker from "../components/TimePicker";
export default {
  name: "AdvancedSearch",
  components: {
    TimePicker,
  },
  data() {
    return {
      checkboxes: [
        { label: "Mon", value: "monday" },
        { label: "Tue", value: "tuesday" },
        { label: "Wed", value: "wednesday" },
        { label: "Thu", value: "thursday" },
        { label: "Fri", value: "friday" },
        { label: "Sat", value: "saturday" },
        { label: "Sun", value: "sunday" },
      ],
      filters: {
        instructor: "",
        courseID: "",
        days: [],
        start: "",
        end: "",
      },
    };
  },
  methods: {
    clearAllFilters() {
      for (const key of Object.keys(this.filters)) {
        if (Array.isArray(this.filters[key])) {
          this.filters[key].splice(0);
        } else {
          this.filters[key] = "";
        }
      }
      this.applyFilters();
    },
    clearFilter(property) {
      this.filters[property] = "";
      this.applyFilters();
    },
    applyFilters() {
      this.$emit("apply-filters", this.filters);
    },
  },
  mounted() {
    // grabs all query params and assigns filters appropriately
    const filterKeys = Object.keys(this.filters);
    // if query param structure became complex, it may be best to abandon simple query params
    // in favor of parsing objects
    for (const [key, val] of Object.entries(this.$route.query)) {
      if (key === filterKeys[filterKeys.indexOf(key)]) {
        // if only one day is selected, it is treated as a string, so push it instead
        if (key === "days" && !Array.isArray(val)) {
          this.filters[key].push(val);
        } else {
          this.filters[key] = val;
        }
      }
    }
  },
};
</script>
