<template>
  <v-text-field
    v-model="searchTerm"
    outlined
    dense
    clearable
    label="Search..."
    type="search"
    prepend-inner-icon="mdi-magnify"
    hint="A course, user, schedule title, term, or instructor."
    @keydown.enter="searchSchedules"
    @click:clear="clearSearch"
  >
  </v-text-field>
</template>

<script>
export default {
  name: "Searchbar",
  data() {
    return {
      searchTerm: "",
    };
  },
  methods: {
    clearSearch() {
      this.$emit("search-term", "");
    },
    searchSchedules() {
      this.$emit("search-term", this.searchTerm);
    },
  },
  mounted() {
    this.searchTerm = this.$route.query.q;
  },
};
</script>
