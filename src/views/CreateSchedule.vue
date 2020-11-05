<template>
  <div>
    <Calendar />
    <TimePicker placeholderTitle="Start Time" />
    <TimePicker placeholderTitle="End Time" />
  </div>
</template>

<script>
import Calendar from "../components/Calendar";
import TimePicker from "../components/TimePicker";
export default {
  name: "CreateSchedule",
  components: {
    Calendar,
    TimePicker,
  },
};
</script>
