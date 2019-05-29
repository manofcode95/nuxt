<template>
  <div class="admin-post-page">
    <section class="update-form">
      <AdminPostForm :post="loadedPost" @submitForm="onSubmitted"/>
    </section>
  </div>
</template>

<script>
import AdminPostForm from "@/components/Admin/AdminPostForm";

import { db } from "@/firebase/fireinit";
export default {
  name: "admin",
  layout: "admin",
  components: {
    AdminPostForm
  },
  asyncData(context) {
    let id = context.route.params.postId;
    return db
      .collection("posts")
      .doc(id)
      .get()
      .then(doc => {
        return { loadedPost: doc.data() };
      })
      .catch(err => console.log(err));
  },
  methods: {
    onEdit(post) {
      this.$store
        .dispatch("editPost", {
          ...post,
          id: this.$route.params.postId
        })
        .then(() => {
          this.$router.push("/");
        });
    },
    onSubmitted(editedPost) {
      this.$store
        .dispatch("editPost", {
          ...editedPost,
          id: this.$route.params.postId
        })
        .then(() => {
          this.$router.push("/admin");
        });
    }
  }
};
</script>

<style scoped>
.update-form {
  width: 90%;
  margin: 20px auto;
}

@media (min-width: 768px) {
  .update-form {
    width: 500px;
  }
}
</style>
