import { db, fbAuth } from "@/firebase/fireinit";

import { getUserFromCookie, getUserFromSession } from "@/helpers";

export const actions = {
  async nuxtServerInit({ commit, dispatch }, { req }) {
    const user = getUserFromCookie(req);
    if (user) {
      await dispatch("modules/user/setUSER", {
        email: user.email,
        uid: user.user_id
      });
    }
    await db
      .collection("posts")
      .get()
      .then(data => {
        let posts = [];
        data.forEach(el => {
          posts.push({ ...el.data(), id: el.id });
        });
        commit("modules/posts/setPosts", posts);
      })

      .catch(e => console.log(e));
  }
};
