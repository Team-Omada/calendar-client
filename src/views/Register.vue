<template>
  <v-card
    max-width="500"
    class="mx-auto"
    rounded="rounded-lg"
    elevation="2"
    :loading="loading"
    transition="scroll-x-transition"
  >
    <v-card-title>
      Register
    </v-card-title>
    <v-card-text>
      <v-form v-model="isValid">
        <v-text-field
          label="Email"
          prepend-icon="mdi-email"
          v-model="email"
          clearable
          :rules="[rules.required, rules.email]"
        ></v-text-field>
        <v-text-field
          label="Username"
          prepend-icon="mdi-account-circle"
          v-model="username"
          autocomplete="username"
          clearable
          maxlength="20"
          counter
          :rules="[rules.required, rules.username]"
        ></v-text-field>
        <v-text-field
          label="Password"
          v-model="password"
          prepend-icon="mdi-lock"
          autocomplete="new-password"
          :append-icon="passwordShow ? 'mdi-eye' : 'mdi-eye-off'"
          :type="passwordShow ? 'text' : 'password'"
          :rules="[rules.required, rules.password]"
          @click:append="passwordShow = !passwordShow"
        ></v-text-field>
        <v-text-field
          label="Confirm Password"
          v-model="confirmPassword"
          prepend-icon="mdi-lock-check"
          autocomplete="new-password"
          :append-icon="confirmShow ? 'mdi-eye' : 'mdi-eye-off'"
          :type="confirmShow ? 'text' : 'password'"
          :rules="[passwordMatch]"
          @click:append="confirmShow = !confirmShow"
        ></v-text-field>
      </v-form>
      <v-card-actions class="justify-center">
        <v-btn color="primary" :disabled="!isValid" @click="onRegisterBtn">
          Register
        </v-btn>
      </v-card-actions>
      <v-divider />
      <div class="d-flex justify-center align-center mt-2">
        Already have an account?
        <v-btn text small color="primary" class="ml-1" to="/">
          Login
        </v-btn>
      </div>
    </v-card-text>
  </v-card>
</template>

<script>
// TODO: Use :error-messages option on text-fields when we make API requests
// The current implementation doesn't allow for us to modify error message from server error
import { register } from "../API";
export default {
  name: "Register",
  data() {
    return {
      email: null,
      password: null,
      username: null,
      confirmPassword: null,
      isValid: false,
      passwordShow: false,
      confirmShow: false,
      loading: false,
      rules: {
        required: (value) => !!value || "Field is required.",
        password: (value) =>
          (!!value && value.length > 8) || "Must be greater than 8 characters.",
        email: (value) => {
          const pattern = /^[A-Za-z]{2,5}[\d]{3}@cougars\.csusm\.edu$|^[A-Za-z]{2,}@csusm\.edu$/;
          return pattern.test(value) || "Must be a CSUSM student email.";
        },
        username: (value) => {
          const pattern = /^[\w]{3,20}$/;
          return (
            pattern.test(value) ||
            "Must contain only letters, digits, or underscore."
          );
        },
      },
    };
  },
  methods: {
    // will turn into async function when we implement backend
    // loading will take place as it connects to database
    async onRegisterBtn() {
      this.loading = true;
      const res = await register({
        email: this.email,
        password: this.password,
        username: this.username,
      });
      console.log(res.data);
      this.loading = false;
    },
  },
  computed: {
    // function needs to run on a this.password change as well
    passwordMatch() {
      return (
        this.password === this.confirmPassword || "Passwords do not match."
      );
    },
  },
};
</script>

<style></style>
