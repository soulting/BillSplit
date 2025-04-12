import supabase from "./supabase";

export default async function getGroups(user) {
  const firstResponse = await supabase
    .from("user_event")
    .select("event_id")
    .eq("user_id", user.value.userId);

  if (firstResponse.data) {
    const eventIdsArray = firstResponse.data.map((event) => event.event_id);
    const secondResponse = await supabase
      .from("group")
      .select("id, group_name, group_icon")
      .in("id", eventIdsArray);

    if (secondResponse.data) {
      user.value.groups = secondResponse.data;
    }
  } else {
    console.error(`No groups could be added: ${response.error}`);
  }
}
