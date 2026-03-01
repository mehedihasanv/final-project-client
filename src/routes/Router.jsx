import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import DashboardLayout from "../layouts/DashboardLayout";
import Home from "../pages/Home/Home";
import AllContests from "../pages/AllContests/AllContests";
import ContestDetails from "../pages/ContestsDetails/ContestDetails";
import Leaderboard from "../pages/Leaderboard/Leaderboard";
import ExtraPageOne from "../pages/ExtraPageOne/ExtraPageOne";
import ExtraPageTwo from "../pages/ExtraPageTwo/ExtraPageTwo";
import Login from "../pages/Auth/Login";
import Register from "../pages/Auth/Register";
import ErrorPage from "../components/shared/ErrorPage";

import PrivateRoute from "./PrivateRoute";
import AdminRoute from "./AdminRoute";
import CreatorRoute from "./CreatorRoute";

import MyParticipatedContests from "../pages/Dashboard/User/MyParticipatedContests";
import MyWinningContests from "../pages/Dashboard/User/MyWinningContests";
import MyProfile from "../pages/Dashboard/User/MyProfile";

import AddContest from "../pages/Dashboard/Creator/AddContest";
import MyCreatedContests from "../pages/Dashboard/Creator/MyCreatedContests";
import EditContest from "../pages/Dashboard/Creator/EditContest";
import Submissions from "../pages/Dashboard/Creator/Submissions";

import ManageUsers from "../pages/Dashboard/Admin/ManageUsers";
import ManageContests from "../pages/Dashboard/Admin/ManageContests";
import About from "../pages/About/About";
import Blog from "../pages/Blog/Blog";
import Contact from "../pages/Contact/Contact";
import BlogForm from "../pages/Dashboard/Admin/BlogForm";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <ErrorPage />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/all-contests", element: <AllContests /> },
      { path: "/leaderboard", element: <Leaderboard /> },
      { path: "/extra-1", 
         element: (
         <PrivateRoute>
          <ExtraPageOne />
          </PrivateRoute>) },
      { path: "/extra-2", element: <ExtraPageTwo /> },
      { path: "/about", element: <About /> },
      { path: "/blog", element: <Blog /> },
      {
        path: "/contact",
        element: (
          <PrivateRoute>
            <Contact />
          </PrivateRoute>
        ),
      },
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
      { path: "participated", element: <MyParticipatedContests /> },
      { path: "winning", element: <MyWinningContests /> },
      { path: "profile", element: <MyProfile /> },

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
      {
        path: "blog",
        element: (
          <AdminRoute>
            <BlogForm />
          </AdminRoute>
        ),
      },
    ],
  },
  { path: "/login", element: <Login /> },
  { path: "/register", element: <Register /> },
]);

export default router;
