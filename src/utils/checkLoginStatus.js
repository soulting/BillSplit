import supabase from "./supabase";
import downloadGroups from "./getGroups";

export default async function checkIfLogedIn(user) {
  const response = await supabase.auth.getUser();
  if (response.data.user) {
    user.value.status = "loggedIn";
    user.value.userId = response.data.user.id;
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
