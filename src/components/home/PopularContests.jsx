import { useQuery } from "@tanstack/react-query";

import ContestCard from "../contests/ContestCard";
import { Link } from "react-router-dom";
import api from "../../services/apiClient";

const PopularContests = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["popular-contests"],
    queryFn: async () => {
      const res = await api.get("/contests/popular");
      
      return res.data;
    },
  });

  const contests = data?.contests || [];

  if (isLoading) return <div className="text-center py-10">Loading...</div>;

  return (
    <div className="max-w-7xl mx-auto my-16 px-4">
      <h2 className="text-3xl font-bold mb-6">Popular Contests</h2>

      <div className="grid md:grid-cols-3 gap-6">
        {contests.slice(0, 5).map((contest) => (
          <ContestCard key={contest._id} contest={contest} />
        ))}
      </div>

      <div className="text-center mt-8">
        <Link to="/all-contests" className="btn btn-outline bg-blue-300">
          Show All
        </Link>
      </div>
    </div>
  );
};

export default PopularContests;
