import supabase from "./supabase";

export default async function downloadGroups(user) {
  const response = await supabase
    .from("group")
    .select("group_name, group_icon, id");

  if (response.data) {
    user.value.groups = response.data;
    console.log("Added groups");
  } else {
    console.log("No groups could be added");
  }
}
