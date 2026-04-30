import { createBrowserRouter, Navigate } from "react-router-dom";

import MainLayout from "../layouts/MainLayout";
import SubLayout from "../layouts/SubLayout";

import Main from "../pages/Main";

import Business from "../pages/About/Business";
import History from "../pages/About/History";
import Location from "../pages/About/Location";

import Powerchart from "../pages/Product/PowerChart";
import Powergraphics from "../pages/Product/PowerGraphics";

import Project from "../pages/Portfolio/Project";
import Partner from "../pages/Portfolio/Partner";

import Notice from "../pages/Notice/NoticeList";
import NoticeView from "../pages/Notice/NoticeView";
import Contact from "../pages/Contact/Contact";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { index: true, element: <Main /> },
      {
        path: "about",
        element: <SubLayout />,
        children: [
          { index: true, element: <Navigate to="business" replace /> },
          { path: "business", element: <Business /> },
          { path: "history", element: <History /> },
          { path: "location", element: <Location /> },
        ],
      },
      {
        path: "product",
        element: <SubLayout />,
        children: [
          { index: true, element: <Navigate to="powerchart" replace /> },
          { path: "powerchart", element: <Powerchart /> },
          { path: "powergraphics", element: <Powergraphics /> },
        ],
      },
      {
        path: "portfolio",
        element: <SubLayout />,
        children: [
          { index: true, element: <Navigate to="project" replace /> },
          { path: "project", element: <Project /> },
          { path: "partner", element: <Partner /> },
        ],
      },
      {
        path: "notice",
        element: <SubLayout />,
        children: [
          { index: true, element: <Notice /> },
          { path: ":slug", element: <NoticeView /> },
        ],
      },
      {
        path: "contact",
        element: <SubLayout />,
        children: [{ index: true, element: <Contact /> }],
      },
    ],
  },
]);

export default router;
