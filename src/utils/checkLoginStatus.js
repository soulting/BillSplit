import supabase from "./supabase";
import downloadEvents from "./getEvents";

export default async function checkIfLogedIn(user) {
  const response = await supabase.auth.getUser();
  if (response.data.user) {
    user.value.status = "loggedIn";
    user.value.userId = response.data.user.id;
    user.value.username = response.data.user.email.split("@").at(0);
    console.log("Logged in successfully, reloading the page");
  } else {
    user.value.status = "loggedOut";
    console.log("You're not logged in");
  }

  if (user.value.status === "loggedIn") {
    downloadEvents(user);
  } else {
    user.value.events = [];
  }
}
