import supabase from "./supabase";
import Swal from "sweetalert2";

const alert = {
  title: "Błąd",
  text: "Grupa o takiej nazwie już istnieje",
  icon: "error",
  confirmButtonText: "OK",
  background: "#373737",
  confirmButtonColor: "#2d2d2d",
  color: "#ffffff",
};

export default async function createEvent(
  user,
  event_name,
  event_password,
  event_icon
) {
  const response = await supabase.rpc("create_event", {
    rec_user_id: user.value.userId,
    rec_user_name: user.value.username,
    rec_event_name: event_name,
    rec_event_password: event_password,
    rec_event_icon: event_icon,
  });

  if (response.error) {
    if (response.error.code === "23505") {
      Swal.fire({ ...alert, text: "Grupa o takiej nazwie już istnieje" });
    } else {
      Swal.fire({
        ...alert,
        text: "Coś poszło nie tak, spróbuj ponownie później",
      });
    }
    console.error(`Something went wrong:`, response.error.code);

    return;
  } else {
    if (response.data === "event_already_exists") {
      Swal.fire({ ...alert, text: "Grupa o takiej nazwie już istnieje" });
    } else if (response.data === "event_created") {
      Swal.fire({
        ...alert,
        text: "Stworzono grupę",
        icon: "success",
        title: "Sukses",
      });
    }
  }
}
