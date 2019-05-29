export default function({ store, redirect, route }) {
  store.state.user == null ? redirect("/admin/auth") : "";
}
