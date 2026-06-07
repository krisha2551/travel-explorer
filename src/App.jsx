import { createBrowserRouter, RouterProvider } from "react-router-dom";
import MainLayout from "./routes/MainLayout";
import Home from "./components/pages/Home";
import About from "./components/ui/About";
import Trips from "./components/pages/Trips";
import TripDetail from "./components/pages/TripDetail";
import Auth from "./components/auth/Auth";
import BookingsForm from "./components/pages/BookingsForm";
import ProtectedRoutes from "./routes/ProtectedRoutes";
import Error from "./components/pages/Error";
import MyBookings from "./components/pages/MyBookings";
import Profile from "./components/pages/Profile";

const App = () => {
  const router = createBrowserRouter([
    {
      path: "/auth",
      element: <Auth />,
    },
    {
      path: "/",
      element: <MainLayout />,
      errorElement: <Error />,
      children: [
        {
          index: true,
          element: <Home />,
        },
        {
          path: "about",
          element: <About />,
        },
        {
          path: "trips",
          element: <Trips />,
        },
        {
          path: "trip/:id",
          element: <TripDetail />,
        },
        {
          element: <ProtectedRoutes />,
          children: [
            {
              path: "/booking/:id",
              element: <BookingsForm />
            },
            {
              path: "/myBookings",
              element: <MyBookings />
            },
            {
              path: "/profile",
              element: <Profile />
            }
          ]
        }
      ],
    },
  ]);

  return (
    <>
      <RouterProvider router={router}></RouterProvider>
    </>
  );
};

export default App;
