// src/pages/Dashboard/Admin/ManageContests.jsx
import { useQuery } from "@tanstack/react-query";
import api from "../../../services/apiClient";
import Swal from "sweetalert2";

const ManageContests = () => {
  const { data: contests = [], refetch, isLoading, error } = useQuery({
    queryKey: ["admin-contests"],
    queryFn: async () => {
      const res = await api.get(`/admin/contests`, { params: { page: 1, limit: 100 } });
      return res.data.contests;
    },
  });

  const handleConfirm = async (id) => {
    try {
      const res = await api.patch(`/contests/confirm/${id}`);
      if (res.data.modifiedCount > 0) {
        Swal.fire({ icon: "success", title: "Contest Approved", timer: 1500, showConfirmButton: false });
        refetch();
      }
    } catch {
      Swal.fire({ icon: "error", title: "Approval Failed" });
    }
  };

  const handleReject = async (id) => {
    try {
      const res = await api.patch(`/contests/reject/${id}`);
      if (res.data.modifiedCount > 0) {
        Swal.fire({ icon: "info", title: "Contest Rejected", timer: 1500, showConfirmButton: false });
        refetch();
      }
    } catch {
      Swal.fire({ icon: "error", title: "Reject Failed" });
    }
  };

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
      <h2 className="text-3xl font-bold mb-6">Manage Contests</h2>
      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr>
              <th>Name</th>
              <th>Creator</th>
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
                <td>{c.creatorEmail}</td>
                <td>{c.type}</td>
                <td className="font-semibold">{c.status}</td>
                <td>{c.participantsCount}</td>
                <td className="flex gap-2">
                  <button onClick={() => handleConfirm(c._id)} className="btn btn-sm btn-success" disabled={c.status === "confirmed"}>
                    Confirm
                  </button>
                  <button onClick={() => handleReject(c._id)} className="btn btn-sm btn-warning" disabled={c.status === "rejected"}>
                    Reject
                  </button>
                  <button onClick={() => handleDelete(c._id)} className="btn btn-sm btn-error">
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageContests;
