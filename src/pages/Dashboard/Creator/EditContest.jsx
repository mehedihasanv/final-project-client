import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import api from "../../../services/apiClient";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";

const EditContest = () => {
  const { id } = useParams();

  const { data: contest = {}, isLoading, refetch } = useQuery({
    queryKey: ["edit-contest", id],
    queryFn: async () => {
      const res = await api.get(`/contest/${id}`);
      return res.data;
    },
  });

  const { register, handleSubmit } = useForm();

  if (isLoading) return <div className="text-center py-10">Loading...</div>;

  const onSubmit = async (data) => {
    const res = await api.patch(`/contest/${id}`, data);

    if (res.data.modifiedCount > 0) {
      Swal.fire({
        icon: "success",
        title: "Contest Updated",
        timer: 1500,
        showConfirmButton: false,
      });
      refetch();
    }
  };

  return (
    <div className="p-6 max-w-3xl">
      <h2 className="text-3xl font-bold mb-6">Edit Contest</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

        <div>
          <label className="font-semibold">Contest Name</label>
          <input
            type="text"
            defaultValue={contest.name}
            className="input input-bordered w-full"
            {...register("name")}
          />
        </div>

        <div>
          <label className="font-semibold">Image URL</label>
          <input
            type="text"
            defaultValue={contest.image}
            className="input input-bordered w-full"
            {...register("image")}
          />
        </div>

        <div>
          <label className="font-semibold">Description</label>
          <textarea
            defaultValue={contest.description}
            className="textarea textarea-bordered w-full"
            {...register("description")}
          ></textarea>
        </div>

        <div>
          <label className="font-semibold">Task Instructions</label>
          <textarea
            defaultValue={contest.task}
            className="textarea textarea-bordered w-full"
            {...register("task")}
          ></textarea>
        </div>

        <button className="btn btn-primary w-full">Update</button>
      </form>
    </div>
  );
};

export default EditContest;
