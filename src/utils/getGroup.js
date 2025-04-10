import supabase from "./supabase";

export default async function getGroups(user, group) {
  const response = await supabase
    .from("payment_instance")
    .select("*")
    .eq("group_id", group.id);

  if (response.data) {
    user.value.curretGroup = {
      group_name: group.group_name,
      group_icon: group.group_icon,
      group_id: group.id,
      group_payments: response.data,
    };
    user.value.currentPage = "groupDetails";
    console.log("Added groups");
  } else {
    console.error(`No groups could be added: ${response.error}`);
  }
}
