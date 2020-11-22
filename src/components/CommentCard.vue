<template>
  <v-card elevation="0" outlined rounded="rounded-lg">
    <v-card-text class="pb-0">
      <div class="font-italic mb-2">Posted {{ formatDate }}</div>
      <p class="text-body-1 text--primary mb-0">
        {{ comment.text }}
      </p>
    </v-card-text>
    <v-card-actions>
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
  methods: {
    onDeleteCommentBtn() {
      this.$emit("delete-comment", this.comment.commentID);
    },
  },
  computed: {
    formatDate() {
      return format(new Date(this.comment.datePosted), "LLL. d, yyyy | h:mm a");
    },
  },
};
</script>
