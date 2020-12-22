import Swal from "sweetalert2";

function Alert() {
  Swal.fire({
    icon: "error",
    text: "You have to complete all the steps first!",
    showConfirmButton: false,
  });
}
export default Alert;
