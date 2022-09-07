import { toast } from "react-toastify";

export const showNotification = (
  message,
  type = "warning",
  autoClose = 2500
) => {
  const toastOptions = {
    position: "top-right",
    autoClose: autoClose,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    toastId: "no-duplicate",
  };
  if (type === "success") {
    toast.success(message, toastOptions);
    return;
  }
  if (type === "error") {
    toast.error(message, toastOptions);
    return;
  }
  if (type === "info") {
    toast.info(message, toastOptions);
    return;
  }
  if (type === "warning") {
    toast.warn(message, toastOptions);
    return;
  }
};
