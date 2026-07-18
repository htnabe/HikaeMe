import Dropdown from "bootstrap/js/dist/dropdown";
import Modal from "bootstrap/js/dist/modal";
import Offcanvas from "bootstrap/js/dist/offcanvas";
import Tooltip from "bootstrap/js/dist/tooltip";

// Register only components currently used by this theme.
void Dropdown;
void Modal;
void Offcanvas;

document.querySelectorAll<HTMLElement>('[data-bs-toggle="tooltip"]').forEach((element) => {
  Tooltip.getOrCreateInstance(element, { container: document.body });
});
