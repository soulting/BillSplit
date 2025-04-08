import supabase from "./supabase";

export default async function getGroups(user) {
  const response = await supabase
    .from("group")
    .select("group_name, group_icon, id");

  if (response.data) {
    user.value.groups = response.data;
    console.log("Added groups");
  } else {
    console.error(`No groups could be added: ${response.error}`);
  }
}
