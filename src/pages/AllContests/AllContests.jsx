
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import ContestCard from "../../components/contests/ContestCard";
import ContestTabs from "../../components/contests/ContestTabs";
import { useLocation } from "react-router-dom";
import api from "../../services/apiClient";

const AllContests = () => {
  const location = useLocation();
  const searchQuery = new URLSearchParams(location.search).get("search") || "";
  const [selectedType, setSelectedType] = useState("all");
  
  const [page, setPage] = useState(1);
  const limit = 10;

  const { data = {}, isLoading, error } = useQuery({
    queryKey: ["all-contests", selectedType, searchQuery, page],
    queryFn: async () => {
      // ✅ backend এর সাথে search + type + pagination যুক্ত করা হলো
      const res = await api.get("/contests", {
        params: { type: selectedType, search: searchQuery, page, limit },
      });
      return res.data;
    },
    keepPreviousData: true, // pagination smoother হবে
  });

  const contests = data.contests || [];
  const total = data.total || contests.length;
  const totalPages = Math.ceil(total / limit);

  if (isLoading) {
    return <div className="text-center py-10">Loading contests...</div>;
  }

  if (error) {
    return (
      <div className="text-center py-10 text-red-500">
        Failed to load contests
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 my-16">
      <h2 className="text-3xl font-bold mb-6">All Contests</h2>

      {/* Tabs for filtering by type */}
      <ContestTabs selectedType={selectedType} setSelectedType={setSelectedType} />

      {/* Contest Grid */}
      <div className="grid md:grid-cols-3 gap-6 mt-8">
        {contests.length > 0 ? (
          contests.map((contest) => (
            <ContestCard key={contest._id} contest={contest} />
          ))
        ) : (
          <p className="text-center col-span-3">No contests found</p>
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center mt-10 gap-2">
          <button
            className="btn btn-sm"
            disabled={page === 1}
            onClick={() => setPage(page - 1)}
          >
            Previous
          </button>
          {[...Array(totalPages).keys()].map((num) => (
            <button
              key={num}
              onClick={() => setPage(num + 1)}
              className={`btn btn-sm ${
                page === num + 1 ? "btn-primary" : "btn-outline"
              }`}
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
      )}
    </div>
  );
};

export default AllContests;
