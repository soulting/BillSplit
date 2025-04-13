import supabase from "./supabase";

export default async function createEvent(
  userId,
  event_name,
  event_password,
  event_icon
) {
  const response = await supabase.rpc("create_event", {
    userid: userId,
    event_name: event_name,
    event_password: event_password,
    event_icon: event_icon,
  });

  if (response.error) {
    if (response.error.code === "23505") {
      alert("Taka grupa już istnieje");
    }
    console.error(`Something went wrong:`, response.error.code);
    return false;
  } else {
    console.log("created new event");
    return true;
  }
}
