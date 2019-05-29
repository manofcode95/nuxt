export default function({ store, redirect }) {
  console.log("MIDDLEWARE [AUTHENTICATED]");
  if (!store.getters["modules/user/isAuthenticated"]) {
    return redirect("/admin/auth");
  }
}
