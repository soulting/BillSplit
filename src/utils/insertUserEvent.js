import supabase from "./supabase";

export default async function insertUserEvent(groupName) {
  const selectResponse = await supabase
    .from("group")
    .select("id")
    .eq("group_name", groupName)
    .single();

  if (selectResponse.error) {
    throw new Error("Group not found");
  }
  const groupID = selectResponse.data.id;

  const insertResponse = await supabase
    .from("user_event")
    .insert([{ event_id: groupID }]);

  if (insertResponse.error) {
    throw new Error("Insert error");
  }
  console.log("insert succed ");
}
