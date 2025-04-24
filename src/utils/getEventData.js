import supabase from "./supabase";

export default async function getEvents(user) {
  try {
    const response = await supabase.rpc("get_event_data", {
      rec_event_id: user.value.curretEvent.event_id,
    });
    console.log(response);
    if (response.error) {
      console.log(response.data);
      throw new Error(`Error => getEvents => ${error}`);
    }
    user.value.curretEventDetails = response.data;
    console.log("Successfully downloaded events");
  } catch (error) {
    console.error(error);
  }
}
