// src/pages/Dashboard/Admin/ManageUsers.jsx
import { useQuery } from "@tanstack/react-query";
import api from "../../../services/apiClient";
import Swal from "sweetalert2";
import { useState } from "react";

const ManageUsers = () => {
  const [page, setPage] = useState(1);
  const limit = 10;

  const { data = {}, refetch, isLoading, error } = useQuery({
    queryKey: ["all-users", page],
    queryFn: async () => {
      const res = await api.get(`/users`, { params: { page, limit } });
      return res.data;
    },
  });

  const users = data.users || [];
  const total = data.total || 0;
  const totalPages = Math.ceil(total / limit);

  const handleRoleChange = async (email, role) => {
    try {
      const res = await api.patch(`/users/role/${email}`, { role });
      if (res.data.modifiedCount > 0) {
        Swal.fire({ icon: "success", title: "Role Updated", timer: 1500, showConfirmButton: false });
        refetch();
      }
    } catch {
      Swal.fire({ icon: "error", title: "Role Update Failed" });
    }
  };

  if (isLoading) return <div className="text-center py-10">Loading...</div>;
  if (error) return <div className="text-center py-10">Failed to load users</div>;

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold mb-6">Manage Users</h2>

      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Current Role</th>
              <th>Change Role</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u) => (
              <tr key={u._id}>
                <td>{u.name}</td>
                <td>{u.email}</td>
                <td className="font-semibold">{u.role}</td>
                <td className="flex gap-2">
                  <button
                    onClick={() => handleRoleChange(u.email, "user")}
                    className="btn btn-sm btn-outline"
                    disabled={u.role === "user"}
                  >
                    User
                  </button>
                  <button
                    onClick={() => handleRoleChange(u.email, "creator")}
                    className="btn btn-sm btn-outline"
                    disabled={u.role === "creator"}
                  >
                    Creator
                  </button>
                  <button
                    onClick={() => handleRoleChange(u.email, "admin")}
                    className="btn btn-sm btn-outline"
                    disabled={u.role === "admin"}
                  >
                    Admin
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Pagination */}
        <div className="flex justify-center mt-6 gap-2">
          <button className="btn btn-sm" disabled={page === 1} onClick={() => setPage(page - 1)}>
            Previous
          </button>
          {[...Array(totalPages).keys()].map((num) => (
            <button
              key={num}
              onClick={() => setPage(num + 1)}
              className={`btn btn-sm ${page === num + 1 ? "btn-primary" : "btn-outline"}`}
            >
              {num + 1}
            </button>
          ))}
          <button
            className="btn btn-sm"
            disabled={page === totalPages}
            onClick={() => setPage(page + 1)}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default ManageUsers;
