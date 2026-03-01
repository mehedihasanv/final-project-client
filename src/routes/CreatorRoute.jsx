
import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import api from "../services/apiClient";

const CreatorRoute = ({ children }) => {
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
  if (role !== "creator") return <Navigate to="/" />;

  return children;
};

export default CreatorRoute;
