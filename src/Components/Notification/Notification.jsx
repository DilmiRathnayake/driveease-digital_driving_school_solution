import Notify from 'devextreme/ui/notify';

export const Success = (message, redirect = null) => {
    Notify({ message: message, width: 230, position: { at: "center", my: "center", of: "#container" }, }, "success");
  if (redirect) { setTimeout(function () { window.location = redirect; }, 2000); }
};

export const Info = (message, redirect = null) => {
    Notify({ message: message, width: 230, position: { at: "center", my: "center", of: "#container" }, }, "info");
  if (redirect) { setTimeout(function () { window.location = redirect; }, 2000); }
};

export const Error = (message, redirect = null) => {
    Notify({ message: message, width: 230, position: { at: "center", my: "center", of: "#container" }, }, "error");
  if (redirect) { setTimeout(function () { window.location = redirect; }, 2000); }
};

export const Warning = (message, redirect = null) => {
    Notify({ message: message, width: 300, position: { at: "bottom", my: "bottom", of: "#container" }, }, "Warning");
  if (redirect) { setTimeout(function () { window.location = redirect; }, 2000); }
};
