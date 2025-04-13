import supabase from "./supabase";

export default async function getEvents(user, event) {
  const response = await supabase
    .from("payment_instance")
    .select("*")
    .eq("event_id", event.id);

  if (response.data) {
    user.value.curretEvent = {
      event_name: event.event_name,
      event_icon: event.event_icon,
      event_id: event.id,
      event_payments: response.data,
    };
    user.value.currentPage = "eventDetails";
    console.log("Added events");
  } else {
    console.error(`No events could be added: ${response.error}`);
  }
}
