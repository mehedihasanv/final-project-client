import { useAuth } from "../../../hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import api from "../../../services/apiClient";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const MyProfile = () => {
  const { user, updateUserProfile } = useAuth();

  // ✅ Fetch user stats
  const { data: stats = {} } = useQuery({
    queryKey: ["user-stats", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await api.get(`/user-stats/${user.email}`);
      return res.data;
    },
  });

  const participated = stats.participated || 0;
  const won = stats.won || 0;

  const winPercentage = participated
    ? ((won / participated) * 100).toFixed(1)
    : 0;

  const chartData = {
    labels: ["Won", "Participated"],
    datasets: [
      {
        data: [won, participated],
        backgroundColor: ["#36A2EB", "#FF6384"],
      },
    ],
  };

  const { register, handleSubmit } = useForm();

  // ✅ Update profile
  const onSubmit = async (data) => {
    try {
      // ✅ Update Firebase profile
      await updateUserProfile(data.name, data.photo);

      // ✅ Update bio in backend
      await api.patch(`/update-user/${user.email}`, {
        bio: data.bio,
      });

      Swal.fire({
        icon: "success",
        title: "Profile Updated",
        timer: 1500,
        showConfirmButton: false,
      });
    } catch {
      Swal.fire({
        icon: "error",
        title: "Update Failed",
      });
    }
  };

  return (
    <div className="p-6">

      <h2 className="text-3xl font-bold mb-6">My Profile</h2>

      <div className="grid md:grid-cols-2 gap-10">

        {/* Left: Chart */}
        <div className="p-6 bg-base-200 rounded-lg shadow">
          <h3 className="text-xl font-bold mb-4">Win Percentage</h3>

          <Pie data={chartData} />

          <p className="mt-4 text-center text-lg font-semibold">
            Win Rate: {winPercentage}%
          </p>
        </div>

        {/* Right: Update Form */}
        <div className="p-6 bg-base-200 rounded-lg shadow">
          <h3 className="text-xl font-bold mb-4">Update Profile</h3>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

            <div>
              <label className="font-semibold">Name</label>
              <input
                type="text"
                defaultValue={user?.displayName}
                className="input input-bordered w-full"
                {...register("name")}
              />
            </div>

            <div>
              <label className="font-semibold">Photo URL</label>
              <input
                type="text"
                defaultValue={user?.photoURL}
                className="input input-bordered w-full"
                {...register("photo")}
              />
            </div>

            <div>
              <label className="font-semibold">Bio</label>
              <textarea
                className="textarea textarea-bordered w-full"
                placeholder="Write something about yourself"
                {...register("bio")}
              ></textarea>
            </div>

            <button className="btn btn-primary w-full">Update</button>
          </form>
        </div>

      </div>
    </div>
  );
};

export default MyProfile;
