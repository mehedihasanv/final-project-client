import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import api from "../../../services/apiClient";
import Swal from "sweetalert2";

const Submissions = () => {
  const { id } = useParams();

  const { data: submissions = [], refetch } = useQuery({
    queryKey: ["submissions", id],
    queryFn: async () => {
      const res = await api.get(`/submissions/${id}`);
      return res.data;
    },
  });

  const handleWinner = async (submission) => {
    const confirm = await Swal.fire({
      icon: "warning",
      title: "Declare this user as winner?",
      showCancelButton: true,
    });

    if (!confirm.isConfirmed) return;

    const res = await api.post(`/declare-winner`, {
      contestId: id,
      winnerName: submission.name,
      winnerPhoto: submission.photo,
      winnerEmail: submission.email,
    });

    if (res.data.success) {
      Swal.fire({
        icon: "success",
        title: "Winner Declared",
        timer: 1500,
        showConfirmButton: false,
      });
      refetch();
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold mb-6">Submissions</h2>

      {submissions.length === 0 && <p>No submissions yet.</p>}

      <div className="grid md:grid-cols-2 gap-6">
        {submissions.map((s) => (
          <div key={s._id} className="p-6 bg-base-200 rounded-lg shadow">
            <h3 className="text-xl font-bold">{s.name}</h3>
            <p className="mt-2">Email: {s.email}</p>
            <p className="mt-2">Task: {s.task}</p>

            <button
              onClick={() => handleWinner(s)}
              className="btn btn-primary mt-4"
            >
              Declare Winner
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Submissions;
