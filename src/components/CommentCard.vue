<template>
  <v-card elevation="0" outlined rounded="rounded-lg">
    <v-card-text class="pb-0">
      <v-form v-model="isValid" ref="form">
        <div class="d-flex align-center justify-space-between mb-2">
          <div class="font-italic">Posted {{ formatDate }}</div>
          <v-btn
            icon
            v-if="comment.userID === $store.state.user.userID"
            @click="onEditCommentBtn"
            :disabled="!isValid"
            :loading="loading"
          >
            <v-icon>
              {{ editingComment ? "mdi-check-bold" : "mdi-pencil" }}
            </v-icon>
          </v-btn>
        </div>
        <v-textarea
          v-if="editingComment"
          auto-grow
          outlined
          counter
          v-model="editedText"
          ref="editBox"
          :rules="rules"
        ></v-textarea>
        <p v-else class="text-body-1 text--primary mb-0">
          {{ comment.text }}
        </p>
      </v-form>
    </v-card-text>
    <v-card-actions class="pr-4">
      <v-list-item two-line class="px-0">
        <v-icon large left>mdi-account-circle</v-icon>
        <v-list-item-content>
          <v-list-item-title>
            {{ comment.username }}
          </v-list-item-title>
          <v-list-item-subtitle>
            {{ comment.email }}
          </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
      <v-spacer></v-spacer>
      <v-btn
        icon
        v-if="comment.userID === $store.state.user.userID"
        @click="onDeleteCommentBtn"
      >
        <v-icon>mdi-delete</v-icon>
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import { format } from "date-fns";
export default {
  name: "CommentCard",
  props: {
    comment: Object,
  },
  data() {
    return {
      loading: false,
      editingComment: false,
      editedText: this.comment.text,
      rules: [
        (v) => v.length <= 350 || "Max 350 characters.",
        (v) => !!v.trim() || "A comment should contain text!",
      ],
      isValid: false,
    };
  },
  methods: {
    onDeleteCommentBtn() {
      this.$emit("delete-comment", this.comment.commentID);
    },
    onEditCommentBtn() {
      if (!this.editingComment) {
        this.editingComment = true;
        this.$nextTick(() => {
          this.$refs.editBox.focus(); // focus text box, make sure it's rendered first
        });
      } else {
        this.loading = true;
        this.$emit(
          "edit-comment",
          this.comment.commentID,
          this.editedText,
          () => {
            this.$refs.form.resetValidation();
            this.editingComment = false;
            this.loading = false;
          }
        );
      }
    },
  },
  computed: {
    formatDate() {
      return format(new Date(this.comment.datePosted), "LLL. d, yyyy | h:mm a");
    },
  },
};
</script>
