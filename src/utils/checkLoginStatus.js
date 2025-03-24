import supabase from "./supabase";

export default async function checkIfLogedIn(status) {
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (user) {
    status.value = true;
    console.log("Logged in successfully, reloading the page");
  } else {
    status.value = false;
  }
}
