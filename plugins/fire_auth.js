import { fbAuth } from "@/firebase/fireinit.js";

export default context => {
  const { store } = context;

  return new Promise((resolve, reject) => {
    fbAuth.onAuthStateChanged(user => {
      if (user) {
        return resolve(store.commit("setUser", user));
      }
      return resolve();
    });
  });
};
