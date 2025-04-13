import supabase from "./supabase";

export default async function getEvents(user) {
  const response = await supabase.rpc("get_events", {
    userid: user.value.userId,
  });
  if (response.error) {
    throw new Error(`Error => getEvents => ${error}`);
  }
  user.value.events = response.data;
  console.log("Successfully downloaded events");
}
