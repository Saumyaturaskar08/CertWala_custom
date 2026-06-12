import {
  Routes,
  Route,
} from "react-router-dom";

import MainLayout from "../layout/MainLayout";

import Dashboard from "../modules/dashboard/Dashboard";
import CustomPlus from "../modules/custom-plus/pages/CustomPlus";

function AppRoutes() {
  return (
    <Routes>

      {/* Dashboard Layout */}
      <Route
        element={<MainLayout />}
      >
        <Route
          path="/"
          element={<Dashboard />}
        />
      </Route>

      {/* Full Screen Editor */}
      <Route
        path="/custom-plus"
        element={<CustomPlus />}
      />

    </Routes>
  );
}

export default AppRoutes;