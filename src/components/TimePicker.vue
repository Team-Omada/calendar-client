<template>
  <div>
    <v-dialog ref="dialog" v-model="open" persistent width="290px">
      <template v-slot:activator="{ on, attrs }">
        <v-text-field
          v-model="time"
          :label="placeholderTitle"
          readonly
          v-bind="attrs"
          v-on="on"
          :rules="[(v) => !!v || 'Please select a time.']"
          :error-messages="timeCheckError"
          dense
          outlined
          prepend-inner-icon="mdi-clock-time-four-outline"
        ></v-text-field>
      </template>
      <v-time-picker
        v-if="open"
        v-model="time"
        format="ampm"
        scrollable
        :allowed-minutes="allowedStep"
      >
        <v-spacer></v-spacer>
        <v-btn text color="primary" @click="open = false">
          Cancel
        </v-btn>
        <v-btn text color="primary" @click="onTimeSelect">
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
    error: String,
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
    onTimeSelect() {
      this.$refs.dialog.save(this.time);
      this.$emit("time-select", this.time);
    },
  },
  computed: {
    timeCheckError() {
      return this.error;
    },
  },
};
</script>
