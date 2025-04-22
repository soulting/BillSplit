import supabase from "./supabase";

export default async function getEvents(user) {
  try {
    const response = await supabase.rpc("get_events", {
      userid: user.value.userId,
    });
    if (response.error) {
      console.log(response);
      throw new Error(`Error => getEvents => ${error}`);
    }
    user.value.events = response.data;
    console.log("Successfully downloaded events");
  } catch (error) {
    console.error(error);
  }
}
