// src/pages/Dashboard/User/MyParticipatedContests.jsx
import { useAuth } from "../../../hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import api from "../../../services/apiClient";

const MyParticipatedContests = () => {
  const { user } = useAuth();

  const { data: contests = [], isLoading, error } = useQuery({
    queryKey: ["my-participated", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await api.get(`/participated/${user.email}`);
      return res.data;
    },
  });

  if (isLoading) return <div className="text-center py-10">Loading...</div>;
  if (error) return <div className="text-center py-10">Failed to load data</div>;

  const sorted = [...contests].sort(
    (a, b) => new Date(a.deadline) - new Date(b.deadline)
  );

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold mb-6">My Participated Contests</h2>
      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr>
              <th>Contest</th>
              <th>Price</th>
              <th>Deadline</th>
              <th>Payment Status</th>
            </tr>
          </thead>
          <tbody>
            {sorted.map((c) => (
              <tr key={c._id}>
                <td>{c.name}</td>
                <td>${c.price}</td>
                <td>{new Date(c.deadline).toLocaleDateString()}</td>
                <td className="text-green-600 font-semibold">Paid</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyParticipatedContests;
