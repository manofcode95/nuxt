<template>
  <div class="posts-page">
    <PostList :loadedPosts="loadedPosts"/>
  </div>
</template>

<script>
export default {
  computed: {
    loadedPosts() {
      return this.$store.getters.getLoadedPosts;
    }
  }
};
</script>


<style scoped>
.posts-page {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
