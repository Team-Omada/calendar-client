<template>
  <div>
    <v-dialog ref="dialog" v-model="open" persistent width="290px">
      <template v-slot:activator="{ on, attrs }">
        <v-text-field
          v-model="time"
          :label="placeholderTitle"
          prepend-icon="mdi-clock-time-four-outline"
          readonly
          v-bind="attrs"
          v-on="on"
        ></v-text-field>
      </template>
      <v-time-picker
        v-model="time"
        format="ampm"
        scrollable
        :allowed-minutes="allowedStep"
      >
        <v-spacer></v-spacer>
        <v-btn text color="primary" @click="open = false">
          Cancel
        </v-btn>
        <v-btn text color="primary" @click="$refs.dialog.save(time)">
          OK
        </v-btn>
      </v-time-picker>
    </v-dialog>
  </div>
</template>

<script>
export default {
  name: "TimePicker",
  props: {
    placeholderTitle: String,
  },
  data() {
    return {
      time: null,
      open: false,
    };
  },
  methods: {
    // 5 minute increments only
    allowedStep: (m) => m % 5 === 0,
  },
};
</script>
