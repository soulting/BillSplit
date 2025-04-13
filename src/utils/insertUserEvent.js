import supabase from "./supabase";

export default async function insertUserEvent(eventName) {
  const selectResponse = await supabase
    .from("event")
    .select("id")
    .eq("event_name", eventName)
    .single();

  if (selectResponse.error) {
    throw new Error("Event not found");
  }
  const eventID = selectResponse.data.id;

  const insertResponse = await supabase
    .from("user_event")
    .insert([{ event_id: eventID }]);

  if (insertResponse.error) {
    throw new Error("Insert error");
  }
  console.log("insert succed ");
}
