import {
  createBrowserRouter,
} from "react-router-dom";

import AppLayout from "../layout/AppLayout";

import TodayPage from "../../pages/TodayPage";
import LogPage from "../../pages/LogPage";
import HistoryPage from "../../pages/HistoryPage";
import InsightsPage from "../../pages/InsightsPage";
import SettingsPage from "../../pages/SettingsPage";
import FoodPage from "../../pages/FoodPage";
import WorkoutsPage from "../../pages/WorkoutPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,

    children: [
      {
        index: true,
        element: <TodayPage />,
      },

      {
        path: "log",
        element: <LogPage />,
      },

      {
        path: "history",
        element: <HistoryPage />,
      },

      {
        path: "insights",
        element: <InsightsPage />,
      },

      {
        path: "settings",
        element: <SettingsPage />,
      },

      {
        path: "food",
        element: <FoodPage />,
      },

      {
        path: "workouts",
        element: <WorkoutsPage />,
      },
    ],
  },
]);