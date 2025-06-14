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

export default async function insertUserEvent(
  user,
  event_name,
  event_password
) {
  const response = await supabase.rpc("join_event", {
    rec_userid: user.value.userId,
    rec_user_name: user.value.username,
    rec_event_name: event_name,
    rec_event_password: event_password,
  });

  if (response.error) {
    Swal.fire({
      ...alert,
      text: "Coś poszło nie tak, spróbuj ponownie później",
    });
  } else if (response.data === "event_not_found") {
    Swal.fire({ ...alert, text: "Grupa o takiej nazwie nie istnieje" });
  } else if (response.data === "invalid_password") {
    Swal.fire({
      ...alert,
      text: "Podałeś złe hasło",
    });
  } else if (response.data === "joined") {
    Swal.fire({
      ...alert,
      text: "Dołączyłeś do grupy",
      icon: "success",
      title: "Sukses",
    });
  }
}
