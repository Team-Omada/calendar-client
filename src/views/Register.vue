<template>
  <v-card
    max-width="500"
    class="mx-auto"
    rounded="rounded-lg"
    elevation="2"
    :loading="loading"
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
          :error-messages="serverErrors.emailError"
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
          :error-messages="serverErrors.nameError"
        ></v-text-field>
        <v-text-field
          label="Password"
          v-model="password"
          prepend-icon="mdi-lock"
          autocomplete="new-password"
          :append-icon="passwordShow ? 'mdi-eye' : 'mdi-eye-off'"
          :type="passwordShow ? 'text' : 'password'"
          :rules="[rules.required, rules.password]"
          :error-messages="serverErrors.passwordError"
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
        <v-btn
          color="primary"
          :disabled="!isValid || submitted"
          @click="onRegisterBtn"
        >
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
      submitted: false,

      // :error-messages prop on text fields is now used with serverErrors data
      // these errors display info after server side validation
      serverErrors: {
        passwordError: "",
        emailError: "",
        nameError: "",
      },

      // client side rules for validation only runs for client
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
    /**
     * On clicking of registration button do this:
     *  (1) submit credentials to server, disable submit button and enable loading
     *  (2) catch any validation errors using the response's info field
     *  (3) store credentials/token and navigate to home
     */
    async onRegisterBtn() {
      this.loading = true;
      this.submitted = true;
      try {
        const res = await register({
          email: this.email,
          password: this.password,
          username: this.username,
        });
        this.$store.dispatch("setUser", res.data.user);
        this.$store.dispatch("setToken", res.data.token);
        this.$router.push({ path: "dashboard" });
        this.loading = false;
        this.submitted = false;
        console.log(res);
      } catch (err) {
        if (err.response) {
          // any non-200 responses are handled using server's error class "info" and "message" fields
          // any 500 responses from server will be displayed under email field
          const errMessage = err.response.data.message;
          switch (err.response.data.info) {
            case "emailError":
              this.serverErrors.emailError = errMessage;
              break;
            case "nameError":
              this.serverErrors.nameError = errMessage;
              break;
            case "passwordError":
              this.serverErrors.passwordError = errMessage;
              break;
            default:
              this.serverErrors.emailError = errMessage;
          }
        } else if (err.request) {
          this.serverErrors.emailError = "The request couldn't be sent.";
          console.log("Request couldn't be sent: ", err);
        } else {
          this.serverErrors.emailError = "Something went wrong...";
          console.log("Something happened when setting up request: ", err);
        }
        this.loading = false;
        this.submitted = false;
      }
    },
  },
  // clear any server validation errors once user starts typing in that field
  watch: {
    email() {
      this.serverErrors.emailError = "";
    },
    username() {
      this.serverErrors.nameError = "";
    },
    password() {
      this.serverErrors.passwordError = "";
    },
  },
  computed: {
    // should run whenever either this.password or this.confirmPassword changes
    passwordMatch() {
      return (
        this.password === this.confirmPassword || "Passwords do not match."
      );
    },
  },
};
</script>
