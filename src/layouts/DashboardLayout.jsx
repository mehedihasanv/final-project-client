import { Outlet } from "react-router-dom";
import Sidebar from "../components/dashboard/Sidebar";

const DashboardLayout = () => {
  return (
    <div className="drawer lg:drawer-open">

     
      <input id="dashboard-drawer" type="checkbox" className="drawer-toggle" />

    
      <div className="drawer-content p-6">
        <label
          htmlFor="dashboard-drawer"
          className="btn btn-primary drawer-button lg:hidden mb-4"
        >
          Open Menu
        </label>

        <Outlet />
      </div>

   
      <Sidebar />

    </div>
  );
};

export default DashboardLayout;
