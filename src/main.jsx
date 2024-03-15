import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./assets/store";
import App from "./App";

const router = createBrowserRouter([
  {
    path: "/bootstrap-code-creator/",
    element: <App />,
  },
  {
    path: "/bootstrap-code-creator/custom",
    element: <App />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
