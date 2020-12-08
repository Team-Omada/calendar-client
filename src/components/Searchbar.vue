<template>
  <v-text-field
    v-model="searchTerm"
    outlined
    dense
    clearable
    label="Search..."
    type="search"
    append-icon="mdi-magnify"
    hint="A course, user, schedule title, term, or instructor."
    @keydown.enter="searchSchedules"
    @click:append="searchSchedules"
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
      if (this.searchTerm) {
        this.$emit("search-term", this.searchTerm);
      }
    },
  },
  mounted() {
    this.searchTerm = this.$route.query.q;
  },
  watch: {
    searchTerm() {
      if (!this.searchTerm) {
        this.clearSearch();
      }
    },
  },
};
</script>
