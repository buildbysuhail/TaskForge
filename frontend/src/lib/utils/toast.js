import { toast } from "sonner";

export const showToast = {
    success: (title, description) => {
        toast.success(title, {
            ...(description && { description }),
            className: "!bg-emerald-100 !text-emerald-800 !border !border-emerald-300",
        }) ;
    },
    error: (title, description) => {
    toast.error(title, {
      ...(description && { description }),
      className: "!bg-red-100 1text-red-800 !border !border-red-300",
    });
  },

  info: (title, description) => {
    toast.info(title, {
      ...(description && { description }),
    });
  },

  warning: (title, description) => {
    toast.warning(title, {
      ...(description && { description }),
    });
  },

  default: (title, description) => {
    toast(title, {
      ...(description && { description }),
    });
  },

  promise: (promise, messages) => {
    toast.promise(promise, messages);
  },
}