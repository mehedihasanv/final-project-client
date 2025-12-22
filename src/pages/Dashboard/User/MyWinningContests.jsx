import { useAuth } from "../../../hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import api from "../../../services/apiClient";


const MyWinningContests = () => {
  const { user } = useAuth();

  const { data: wins = [], isLoading } = useQuery({
    queryKey: ["my-wins", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await api.get(
        `${import.meta.env.VITE_API_URL}/wins/${user.email}`
      );
      return res.data;
    },
  });

  if (isLoading) return <div className="text-center py-10">Loading...</div>;

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold mb-6">My Winning Contests</h2>

      {wins.length === 0 && <p>You haven't won any contest yet.</p>}

      <div className="grid md:grid-cols-2 gap-6">
        {wins.map((win) => (
          <div key={win._id} className="p-6 bg-base-200 rounded-lg shadow">
            <h3 className="text-xl font-bold">{win.name}</h3>
            <p className="mt-2">Prize: ${win.prize}</p>
            <p className="mt-1">Category: {win.type}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyWinningContests;
