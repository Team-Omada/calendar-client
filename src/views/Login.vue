<template>
  <v-card
    max-width="500"
    class="mx-auto"
    rounded="rounded-lg"
    elevation="2"
    :loading="loading"
  >
    <v-card-title>
      Login
    </v-card-title>
    <v-card-text>
      <v-form v-model="isValid">
        <v-text-field
          label="Email"
          prepend-icon="mdi-email"
          v-model="email"
          autocomplete="email"
          clearable
          :rules="[(v) => !!v || 'Please enter your email.']"
          :error-messages="authError"
        ></v-text-field>
        <v-text-field
          label="Password"
          v-model="password"
          prepend-icon="mdi-lock"
          autocomplete="current-password"
          :append-icon="passwordShow ? 'mdi-eye' : 'mdi-eye-off'"
          :type="passwordShow ? 'text' : 'password'"
          :rules="[(v) => !!v || 'Please enter your password.']"
          :error-messages="authError"
          @click:append="passwordShow = !passwordShow"
        ></v-text-field>
      </v-form>
      <v-card-actions>
        <v-btn text x-small>Forgot password?</v-btn>
        <v-spacer />
        <v-btn
          color="primary"
          :disabled="!isValid"
          :loading="loading"
          @click="onLoginBtn"
          >Login</v-btn
        >
      </v-card-actions>
      <v-divider />
      <div class="d-flex justify-center align-center mt-2">
        Need an account?
        <v-btn text small color="primary" class="ml-1" to="/register">
          Register
        </v-btn>
      </div>
    </v-card-text>
  </v-card>
</template>

<script>
import { login } from "../API";
export default {
  name: "Login",
  data() {
    return {
      email: null,
      password: null,
      passwordShow: false,
      isValid: false,
      loading: false,

      // :error-messages prop on text fields is now used after server validation
      // for security, we don't specify which field failed authentication
      authError: "",
    };
  },
  methods: {
    // will turn into async function when we implement backend
    // loading will take place as it connects to database
    async onLoginBtn() {
      this.loading = true;
      try {
        const res = await login({
          email: this.email,
          password: this.password,
        });
        this.$store.dispatch("setUser", res.data.user);
        this.$store.dispatch("setToken", res.data.token);
        this.$router.push({ path: "dashboard" });
      } catch (err) {
        if (err.response) {
          // any non-200 responses will be either 401's or 500's
          // both fields will show this error
          this.authError = err.response.data.message;
        } else if (err.request) {
          this.authError = "The request couldn't be sent.";
          console.log("Request couldn't be sent: ", err);
        } else {
          this.authError = "Something went wrong...";
          console.log("Something happened when setting up request: ", err);
        }
      }
      this.loading = false;
    },
  },
  watch: {
    email() {
      this.authError = "";
    },
    password() {
      this.authError = "";
    },
  },
};
</script>
