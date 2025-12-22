
import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import api from "../services/apiClient";

const AdminRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const { data: role, isLoading, error } = useQuery({
    queryKey: ["role", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await api.get(`/users/role/${user.email}`);
      return res.data.role;
    },
  });

  if (loading || isLoading) return <div className="text-center py-20">Loading...</div>;
  if (error) return <div className="text-center py-20">Error loading role</div>;
  if (role !== "admin") return <Navigate to="/"/>;

  return children;
};

export default AdminRoute;

