import supabase from "./supabase";
import downloadGroups from "./downloadGroups";

export default async function checkIfLogedIn(user) {
  const response = await supabase.auth.getUser();
  if (response.data.user) {
    user.value.status = "loggedIn";
    console.log("Logged in successfully, reloading the page");
  } else {
    user.value.status = "loggedOut";
    console.log("You're not logged in");
  }

  if (user.value.status === "loggedIn") {
    downloadGroups(user);
  } else {
    user.value.groups = [];
  }
}
