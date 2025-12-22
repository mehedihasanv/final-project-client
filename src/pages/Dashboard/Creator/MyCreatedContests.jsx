// src/pages/Dashboard/Creator/MyCreatedContests.jsx
import { useAuth } from "../../../hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import api from "../../../services/apiClient";

const MyCreatedContests = () => {
  const { user } = useAuth();

  const { data: contests = [], refetch, isLoading, error } = useQuery({
    queryKey: ["my-contests", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await api.get(`/creator-contests/${user.email}`);
      return res.data;
    },
  });

  const handleDelete = async (id) => {
    const confirm = await Swal.fire({ icon: "warning", title: "Delete this contest?", showCancelButton: true });
    if (!confirm.isConfirmed) return;

    try {
      const res = await api.delete(`/contest/${id}`);
      if (res.data.deletedCount > 0) {
        Swal.fire({ icon: "success", title: "Contest Deleted", timer: 1500, showConfirmButton: false });
        refetch();
      }
    } catch {
      Swal.fire({ icon: "error", title: "Delete Failed" });
    }
  };

  if (isLoading) return <div className="text-center py-10">Loading...</div>;
  if (error) return <div className="text-center py-10">Failed to load contests</div>;

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold mb-6">My Created Contests</h2>
      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr>
              <th>Name</th>
              <th>Type</th>
              <th>Status</th>
              <th>Participants</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {contests.map((c) => (
              <tr key={c._id}>
                <td>{c.name}</td>
                <td>{c.type}</td>
                <td className="font-semibold">{c.status}</td>
                <td>{c.participantsCount}</td>
                <td className="flex gap-2">
                  {c.status === "pending" && (
                    <>
                      <Link to={`/dashboard/edit/${c._id}`} className="btn btn-sm btn-warning">
                        Edit
                      </Link>
                      <button onClick={() => handleDelete(c._id)} className="btn btn-sm btn-error">
                        Delete
                      </button>
                    </>
                  )}
                  <Link to={`/dashboard/submissions/${c._id}`} className="btn btn-sm btn-info">
                    See Submissions
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyCreatedContests;
