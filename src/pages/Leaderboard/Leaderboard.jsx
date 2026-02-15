
import { useQuery } from "@tanstack/react-query";
import api from "../../services/apiClient";

const Leaderboard = () => {
  const { data: leaders = [], isLoading, error } = useQuery({
    queryKey: ["leaderboard"],
    queryFn: async () => {
      const res = await api.get("/leaderboard");
      
      return res.data;
    },
  });

  if (isLoading) return <div className="text-center py-10">Loading...</div>;
  if (error) return <div className="text-center py-10">Failed to load leaderboard</div>;

  return (
    <div className="max-w-5xl mx-auto px-4 my-16">
      <h2 className="text-4xl font-bold text-center mb-10">Leaderboard</h2>

      <div className="overflow-x-auto">
        <table className="table w-full shadow-lg rounded-lg">
          <thead className="bg-base-200">
            <tr>
              <th>Rank</th>
              <th>User</th>
              <th>Email</th>
              <th>Total Wins</th>
            </tr>
          </thead>
          <tbody>
            {leaders.map((user, index) => (
              <tr key={user._id} className="hover">
                <td className="font-bold text-lg">{index + 1}</td>
                <td className="flex items-center gap-3">
                  <img src={user.photo} className="w-10 h-10 rounded-full" alt="user" />
                  <span>{user.name}</span>
                </td>
                <td>{user._id}</td>
                <td className="font-semibold text-blue-600">{user.wins}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Leaderboard;

