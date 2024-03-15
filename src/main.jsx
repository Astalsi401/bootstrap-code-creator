import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./assets/store";
import { Header } from "./components/header.jsx";
import { Preview } from "./components/preview.jsx";

const router = createBrowserRouter([
  {
    path: "/bootstrap-code-creator/",
    element: (
      <>
        <Header />
        <Preview />
      </>
    ),
  },
  {
    path: "/bootstrap-code-creator/custom",
    element: (
      <>
        <Header />
        <Preview />
      </>
    ),
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
