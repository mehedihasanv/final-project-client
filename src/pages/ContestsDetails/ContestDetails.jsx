
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { useAuth } from "../../hooks/useAuth";
import api from "../../services/apiClient";
import { useForm } from "react-hook-form";   // 🔹 React Hook Form import

const ContestDetails = () => {
  const { id } = useParams();
  const { user } = useAuth();

  const [timeLeft, setTimeLeft] = useState("");
  const [showModal, setShowModal] = useState(false);
   const { register, handleSubmit, reset, formState: { errors } } = useForm();

  const { data: contest = {}, isLoading, error, refetch } = useQuery({
    queryKey: ["contest-details", id],
    queryFn: async () => {
      const res = await api.get(`/contest/${id}`);
      return res.data;
    },
  });

  const { data: participated = [], error: partError, refetch: refetchParticipated } = useQuery({
  queryKey: ["participated", user?.email],
  enabled: !!user?.email,
  queryFn: async () => {
    const res = await api.get(`/participated/${user.email}`);
    return res.data;
  },
});


//   const { data: participated = [], error: partError } = useQuery({
//     queryKey: ["participated", user?.email],
//     enabled: !!user?.email,
//     queryFn: async () => {
//       const res = await api.get(`/participated/${user.email}`);
//       return res.data;
//     },
//   });

  const isRegistered = participated.some((p) => p._id === id || p._id === contest._id);

  useEffect(() => {
    if (!contest.deadline) return;
    const interval = setInterval(() => {
      const now = Date.now();
      const end = new Date(contest.deadline).getTime();
      const distance = end - now;
      if (distance <= 0) {
        setTimeLeft("Contest Ended");
        clearInterval(interval);
      } else {
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        setTimeLeft(`${days}d ${hours}h ${minutes}m`);
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [contest.deadline]);

  if (isLoading) return <div className="text-center py-10">Loading...</div>;
  if (error || partError) return <div className="text-center py-10">Failed to load details</div>;

  const isEnded = timeLeft === "Contest Ended";

  const handleRegister = async () => {
    if (isEnded) return;
    try {
      const res = await api.post("/payment", {
        contestId: contest._id,
        email: user.email,
        price: contest.price,
      });
      if (res.data.success) {
  Swal.fire({ icon: "success", title: "Payment Successful", timer: 1500, showConfirmButton: false });
  refetch();              // contest details update
  refetchParticipated();  // participated list update
}

    //   if (res.data.success) {
    //     Swal.fire({ icon: "success", title: "Payment Successful", timer: 1500, showConfirmButton: false });
    //     refetch();
    //   }
    } catch {
      Swal.fire({ icon: "error", title: "Payment Failed" });
    }
  };

  // 🔹 React Hook Form setup
 

  const onSubmit = async (data) => {
    try {
      const res = await api.post("/submission", {
        contestId: contest._id,
        name: user.displayName,
        email: user.email,
        photo: user.photoURL,
        task: data.task,
      });
      if (res.data.success) {
        Swal.fire({ icon: "success", title: "Task Submitted", timer: 1500, showConfirmButton: false });
        setShowModal(false);
        reset(); // form reset
      }
    } catch {
      Swal.fire({ icon: "error", title: "Submission Failed" });
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 my-16">
      <div className="h-64 w-full rounded-xl overflow-hidden mb-10">
        <img src={contest.image} alt={contest.name} className="w-full h-full object-cover" />
      </div>

      <h1 className="text-4xl font-bold mb-4">{contest.name}</h1>

      <p className="text-lg font-semibold mb-2">
        Deadline: <span className={isEnded ? "text-red-500" : "text-green-600"}>{timeLeft}</span>
      </p>

      <p className="text-lg mb-2">
        Participants: <strong>{contest.participantsCount}</strong>
      </p>

      <p className="text-lg mb-4">
        Prize Money: <strong>${contest.prize}</strong>
      </p>

      {contest.winner && (
        <div className="p-4 bg-base-200 rounded-lg mb-6">
          <h3 className="font-bold text-xl mb-2">Winner</h3>
          <div className="flex items-center gap-4">
            <img src={contest.winner.photo} className="w-16 h-16 rounded-full" />
            <p className="text-lg font-semibold">{contest.winner.name}</p>
          </div>
        </div>
      )}

      <div className="mb-6">
        <h3 className="text-2xl font-bold mb-2">Description</h3>
        <p>{contest.description}</p>
      </div>

      <div className="mb-6">
        <h3 className="text-2xl font-bold mb-2">Task Instructions</h3>
        <p>{contest.task}</p>
      </div>

      <div className="flex gap-4 mt-6">
        <button onClick={handleRegister} disabled={isEnded} className="btn btn-primary">
          {isEnded ? "Contest Ended" : `Register / Pay $${contest.price}`}
        </button>

        {isRegistered && !isEnded && (
          <button onClick={() => setShowModal(true)} className="btn btn-secondary">
            Submit Task
          </button>
        )}
      </div>

      {showModal && (
        <dialog open className="modal">
          <div className="modal-box">
            <h3 className="font-bold text-lg mb-4">Submit Your Task</h3>
            {/* 🔹 React Hook Form used here */}
            <form onSubmit={handleSubmit(onSubmit)}>
              <textarea
                {...register("task", { required: "Task is required" })}
                className="textarea textarea-bordered w-full h-32"
                placeholder="Provide your task link or details"
              ></textarea>
              {errors.task && <p className="text-red-500 text-sm mt-1">{errors.task.message}</p>}
              <div className="modal-action">
                <button className="btn btn-primary" type="submit">Submit</button>
                <button type="button" className="btn" onClick={() => setShowModal(false)}>Close</button>
              </div>
            </form>
          </div>
        </dialog>
      )}
    </div>
  );
};

export default ContestDetails;

