<template>
  <v-row>
    <v-col>
      <v-sheet height="500">
        <v-calendar ref="calendar" :now="value" :events="events" type="week">
        </v-calendar>
      </v-sheet>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: "Calendar",
  data() {
    return {
      value: "2020-11-04", // this is very bad, but it just so happens this week has Sun = 1 and Sat = 7
      // to keep moving, all events will be visualized on this week only
      colors: [
        "blue",
        "indigo",
        "deep-purple",
        "cyan",
        "green",
        "orange",
        "grey darken-1",
      ],
      events: [
        {
          name: "Weekly Meeting",
          start: "2020-11-05 09:00",
          end: "2020-11-05 10:00",
        },
        {
          name: "Meeting",
          start: "2020-11-03 02:00",
          end: "2020-11-03 03:00",
        },
        {
          name: "Other meeting",
          start: "2020-11-03 02:30",
          end: "2020-11-03 03:30",
        },
      ],
    };
  },
  methods: {
    // random color generation for events eventually
    rnd(a, b) {
      return Math.floor((b - a + 1) * Math.random()) + a;
    },
    randomColor() {
      return this.colors[this.rnd(0, this.colors.length - 1)];
    },
  },
};
</script>
