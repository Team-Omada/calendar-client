<template>
  <v-row class="text-center">
    <v-col>
      <h1 class="display-2 font-weight-bold mb-3">
        {{ msg }}
      </h1>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: "HelloWorld",
  props: {
    msg: String
  }
};
</script>