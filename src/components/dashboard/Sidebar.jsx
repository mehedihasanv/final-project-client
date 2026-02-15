import { Link, NavLink } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const Sidebar = () => {
  const { user } = useAuth();


  const { data: role } = useQuery({
    queryKey: ["role", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/users/role/${user.email}`
      );
      return res.data.role;
    },
  });

  return (
    <div className="drawer-side">
      <label htmlFor="dashboard-drawer" className="drawer-overlay"></label>
      <ul className="menu p-4 w-72 min-h-full bg-base-200 text-base-content">
        <h2 className="text-2xl font-bold mb-6">Dashboard</h2>

        
        {role === "user" && (
          <>
            <li>
              <NavLink to="/dashboard/participated">My Participated Contests</NavLink>
            </li>
            <li>
              <NavLink to="/dashboard/winning">My Winning Contests</NavLink>
            </li>
            <li>
              <NavLink to="/dashboard/profile">My Profile</NavLink>
            </li>
          </>
        )}

      
        {role === "creator" && (
          <>
            <li>
              <NavLink to="/dashboard/add-contest">Add Contest</NavLink>
            </li>
            <li>
              <NavLink to="/dashboard/my-contests">My Created Contests</NavLink>
            </li>
          </>
        )}

    
        {role === "admin" && (
          <>
            <li>
              <NavLink to="/dashboard/manage-users">Manage Users</NavLink>
            </li>
            <li>
              <NavLink to="/dashboard/manage-contests">Manage Contests</NavLink>
            </li>
          </>
        )}

        <div className="divider"></div>

        
        <li>
          <Link to="/">Home</Link>
        </li>

      </ul>
    </div>
  );
};

export default Sidebar;
