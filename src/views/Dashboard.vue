<template>
  <HelloWorld msg="Hello from the dashboard, you are authenticated!" />
</template>

<script>
import HelloWorld from "../components/HelloWorld";
export default {
  name: "Dashboard",
  components: {
    HelloWorld,
  },
};
</script>
