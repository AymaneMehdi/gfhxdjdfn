import React, { lazy } from "react";
import { Navigate } from "react-router-dom";
import Loadable from "../layouts/full/shared/loadable/Loadable";
import PrivateRoute from './Secure';

/* ***Layouts**** */
const FullLayout = Loadable(lazy(() => import("../layouts/full/FullLayout")));
const BlankLayout = Loadable(
  lazy(() => import("../layouts/blank/BlankLayout"))
);

/* ****Pages***** */

const AllPosts = Loadable(lazy(() => import("../views/posts/AllPosts")));
const AddPost = Loadable(lazy(() => import("../views/posts/AddPost")));
const Error = Loadable(lazy(() => import("../views/authentication/Error")));
const Login = Loadable(lazy(() => import("../views/authentication/Login")));

const Router = [
  {
    path: "/",
    element: <FullLayout />,
    children: [
      { path: "/", element: <Navigate to="/auth/login" /> }, // Redirect to login by default
      { path: "all-posts", element: <PrivateRoute element={AllPosts} /> }, // Secure route
      { path: "add-post", element: <PrivateRoute element={AddPost} /> }, // Secure route
      { path: "*", element: <Navigate to="/auth/404" /> }, // Catch-all route
    ],
  },
  {
    path: "/auth",
    element: <BlankLayout />,
    children: [
      { path: "404", element: <Error /> },
      { path: "login", element: <Login /> },
      { path: "*", element: <Navigate to="/auth/404" /> },
    ],
  },
];

export default Router;
