// src/routes/Router.jsx
import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import DashboardLayout from "../layouts/DashboardLayout";
import Home from "../pages/Home/Home";
import AllContests from "../pages/AllContests/AllContests";
import ContestDetails from "../pages/ContestsDetails/ContestDetails"; // FIXED PATH
import Leaderboard from "../pages/Leaderboard/Leaderboard";
import ExtraPageOne from "../pages/ExtraPageOne/ExtraPageOne";
import ExtraPageTwo from "../pages/ExtraPageTwo/ExtraPageTwo";
import Login from "../pages/Auth/Login";
import Register from "../pages/Auth/Register";
import ErrorPage from "../components/shared/ErrorPage";

import PrivateRoute from "./PrivateRoute";
import AdminRoute from "./AdminRoute";
import CreatorRoute from "./CreatorRoute";

// User Dashboard
import MyParticipatedContests from "../pages/Dashboard/User/MyParticipatedContests";
import MyWinningContests from "../pages/Dashboard/User/MyWinningContests";
import MyProfile from "../pages/Dashboard/User/MyProfile";

// Creator Dashboard
import AddContest from "../pages/Dashboard/Creator/AddContest";
import MyCreatedContests from "../pages/Dashboard/Creator/MyCreatedContests";
import EditContest from "../pages/Dashboard/Creator/EditContest";
import Submissions from "../pages/Dashboard/Creator/Submissions";

// Admin Dashboard
import ManageUsers from "../pages/Dashboard/Admin/ManageUsers";
import ManageContests from "../pages/Dashboard/Admin/ManageContests";


const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <ErrorPage />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/all-contests", element: <AllContests /> },
      { path: "/leaderboard", element: <Leaderboard /> },
      { path: "/extra-1", element: <ExtraPageOne/> },
      { path: "/extra-2", element: <ExtraPageTwo /> },
      {
        path: "/contest/:id",
        element: (
          <PrivateRoute>
            <ContestDetails />
          </PrivateRoute>
        ),
      },
    ],
  },
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <DashboardLayout />
      </PrivateRoute>
    ),
    children: [
      // User
      { path: "participated", element: <MyParticipatedContests /> },
      { path: "winning", element: <MyWinningContests /> },
      { path: "profile", element: <MyProfile /> },
      // Creator
      {
        path: "add-contest",
        element: (
          <CreatorRoute>
            <AddContest />
          </CreatorRoute>
        ),
      },
      {
        path: "my-contests",
        element: (
          <CreatorRoute>
            <MyCreatedContests />
          </CreatorRoute>
        ),
      },
      {
        path: "edit/:id",
        element: (
          <CreatorRoute>
            <EditContest />
          </CreatorRoute>
        ),
      },
      {
        path: "submissions/:id",
        element: (
          <CreatorRoute>
            <Submissions />
          </CreatorRoute>
        ),
      },
      // Admin
      {
        path: "manage-users",
        element: (
          <AdminRoute>
            <ManageUsers />
          </AdminRoute>
        ),
      },
      {
        path: "manage-contests",
        element: (
          <AdminRoute>
            <ManageContests />
          </AdminRoute>
        ),
      },
    ],
  },
  { path: "/login", element: <Login /> },
  { path: "/register", element: <Register /> },
]);

export default router;
