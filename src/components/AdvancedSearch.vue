<template>
  <v-card elevation="0" outlined rounded="rounded-lg">
    <v-card-title>
      Filter Options
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
      <div class="d-flex flex-wrap">
        <v-checkbox
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
export default {
  name: "AdvancedSearch",
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
      },
    };
  },
  methods: {
    clearAllFilters() {
      for (const key of Object.keys(this.filters)) {
        this.filters[key] = "";
      }
      this.$emit("apply-filters", this.filters);
    },
    clearFilter(property) {
      this.filters[property] = "";
      this.$emit("apply-filters", this.filters);
    },
    applyFilters() {
      this.$emit("apply-filters", this.filters);
    },
  },
  mounted() {
    const filterKeys = Object.keys(this.filters);
    for (const [key, val] of Object.entries(this.$route.query)) {
      if (key === filterKeys[filterKeys.indexOf(key)]) {
        this.filters[key] = val;
      }
    }
  },
};
</script>
