import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import NAvbar from "./Pages/NAvbar";
import Home from "./Pages/Home";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <NAvbar />,
      children: [
        { path: "", element: <Home /> },
        { path: "login", element: <Login /> },
        { path: "register", element: <Register /> },
      ],
    },
  ]);
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
