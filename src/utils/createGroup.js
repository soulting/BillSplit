import supabase from "./supabase";

export default async function createGroup(groupName) {
  const response = await supabase
    .from("group")
    .insert([{ group_name: "new", group_icon: "src/assets/default.png" }]);

  if (response.error) {
    console.error(`Something went wrong: ${response.error}`);
    return false;
  } else {
    console.log("created new group");
    return true;
  }
}
