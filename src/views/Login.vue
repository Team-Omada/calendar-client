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
          prepend-icon="mdi-account-circle"
          v-model="email"
          clearable
          :rules="[(v) => !!v || 'Please enter your email.']"
        ></v-text-field>
        <v-text-field
          label="Password"
          v-model="password"
          prepend-icon="mdi-lock"
          :append-icon="passwordShow ? 'mdi-eye' : 'mdi-eye-off'"
          :type="passwordShow ? 'text' : 'password'"
          :rules="[(v) => !!v || 'Please enter your password.']"
          @click:append="passwordShow = !passwordShow"
        ></v-text-field>
      </v-form>
      <v-card-actions>
        <v-btn text color="primary">Register</v-btn>
        <v-spacer />
        <v-btn color="primary" :disabled="!isValid" @click="login">Login</v-btn>
      </v-card-actions>
      <v-divider />
      <div class="d-flex justify-center mt-2">
        <v-btn text small>Forgot password?</v-btn>
      </div>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  name: "Login",
  data() {
    return {
      email: null,
      password: null,
      passwordShow: false,
      isValid: false,
      loading: false,
    };
  },
  methods: {
    // will turn into async function when we implement backend
    // loading will take place as it connects to database
    login() {
      this.loading = true;
      setTimeout(() => (this.loading = false), 2000);
    },
  },
};
</script>
