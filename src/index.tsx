import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { router } from "./routing/router";

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);

root.render(
      <RouterProvider router={router} />
);
