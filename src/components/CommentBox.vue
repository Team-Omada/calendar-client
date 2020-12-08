<template>
  <v-form v-model="isValid" ref="form">
    <v-textarea
      auto-grow
      outlined
      counter
      label="Post a comment..."
      v-model="comment"
      :rules="rules"
    ></v-textarea>
    <div class="d-flex justify-end">
      <v-btn
        color="success"
        @click="onPostCommentBtn"
        :loading="loading"
        :disabled="!isValid"
      >
        Post <v-icon right>mdi-comment</v-icon>
      </v-btn>
    </div>
  </v-form>
</template>

<script>
export default {
  name: "CommentBox",
  data: () => ({
    comment: "",
    loading: false,
    isValid: false,
    rules: [
      (v) => v.length <= 350 || "Max 350 characters.",
      (v) => !!v.trim() || "A comment should contain text!",
    ],
  }),
  methods: {
    onPostCommentBtn() {
      this.loading = true;
      this.$emit("post-comment", this.comment, (err) => {
        if (!err) {
          this.comment = "";
        }
        this.loading = false;
        this.$refs.form.resetValidation();
      });
    },
  },
};
</script>
