<template>
  <section class="post-list">
    <PostPreview
      v-for="(post, index) in loadedPosts"
      :key="index"
      :is-admin="isAdmin"
      :title="post.title"
      :thumbnail="post.thumbnail"
      :previewText="post.previewText"
      :id="post.id"
    />
  </section>
</template>

<script>
import PostPreview from "@/components/Posts/PostPreview";

export default {
  components: {
    PostPreview
  },
  props: {
    isAdmin: {
      type: Boolean,
      default: false
    },
    loadedPosts: {
      type: Array
    }
  }
};
</script>


<style scoped>
.post-list {
  display: flex;
  padding: 20px;
  box-sizing: border-box;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
}
</style>

