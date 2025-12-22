import { useQuery } from "@tanstack/react-query";
import api from "../../services/apiClient";

const WinnerAdvertise = () => {
  const { data: contests = [], isLoading } = useQuery({
    queryKey: ["winner-advertise"],
    queryFn: async () => {
      const res = await api.get("/contests", {
        params: { status: "confirmed" },
      });
      return res.data.contests.filter(c => c.winner);
    },
  });

  if (isLoading) return <p>Loading winners...</p>;

  return (
    <div className="my-16 max-w-7xl mx-auto px-4">
      <h2 className="text-3xl font-bold mb-8 text-center"> Our Winners</h2>
      <p className="mt-4 italic  text-center">
                 "Dream big, work hard, and success will follow!"
              </p>
              <p className="mb-4 text-center">
                Keep pushing your limits — your creativity can change the world.
              </p>

      <div className="grid md:grid-cols-3 gap-6">
        {contests.map((contest) => (
          <div
            key={contest._id}
            className=" bg-base-100"
          >
            <figure>
              <img
                src={contest.winner.photo}
                alt={contest.winner.name}
                className="h-25 w-25 mx-auto  object-cover rounded-full"
              />
            </figure>
            <div className="card-body text-center">
              <h3 className="text-xl font-semibold mt-2">{contest.winner.name}</h3>
              <p className="text-sm text-gray-500">{contest.winner.email}</p>
              <p className="mt-2 font-bold text-blue-600">
                Winner of {contest.name}
              </p>

              
              
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WinnerAdvertise;
