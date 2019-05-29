import { db } from "@/firebase/fireinit";

export const state = () => ({
  loadedPosts: []
});

export const mutations = {
  setPosts(state, payload) {
    console.log("[STORE MUATATION] - SET-POSTS");
    console.log(payload);
    state.loadedPosts = payload;
  },
  addPost(state, payload) {
    state.loadedPosts.push(payload);
  },
  editPost(state, editedPost) {
    const postIndex = state.loadedPosts.findIndex(
      post => post.id == editedPost.id
    );
    state.loadedPosts[postIndex].title = editedPost.title;
    state.loadedPosts[postIndex] = editedPost;
  }
};

export const actions = {
  loadPosts({ commit }) {
    console.log("[STORE ACTIONS] - LOAD-POSTS");
    db.collection("posts")
      .get()
      .then(data => {
        let posts = [];
        data.forEach(el => {
          posts.push({ ...el.data(), id: el.id });
        });
        commit("setPosts", posts);
      })

      .catch(e => console.log(e.message));
  },
  setPosts({ commit }, payload) {
    commit("setPosts", payload.loadedPosts);
  },

  submitPost({ commit }, payload) {
    return db
      .collection("posts")
      .add({
        author: payload.author,
        title: payload.title,
        thumbnail: payload.thumbnail,
        previewText: payload.previewText,
        updatedDate: new Date()
      })
      .then(res => commit("addPost", { ...payload, id: res.id }))
      .catch(err => console.log(err));
  },
  editPost({ commit }, payload) {
    return db
      .collection("posts")
      .doc(payload.id)
      .set(payload)
      .then(res => {
        commit("editPost", { ...payload });
      })
      .catch(err => console.log(err));
  }
};

export const getters = {
  getLoadedPosts(state) {
    console.log("[STORE GETTER] - GET-LOADED-POSTS");
    return state.loadedPosts;
  },
  getPost(state, id) {
    return id => state.loadedPosts.find(el => el.id == id);
  }
};
