import supabase from "./supabase";

export default async function getGroups(user, groupID) {
  const response = await supabase
    .from("payment_instance")
    .select("*")
    .eq("group_id", groupID);

  if (response.data) {
    user.value.curretGroup = response.data;
    console.log(response.data);
    console.log("Added groups");
  } else {
    console.error(`No groups could be added: ${response.error}`);
  }
}
