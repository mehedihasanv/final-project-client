import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Banner = () => {
  const [search, setSearch] = useState("");
  const [selectedType, setSelectedType] = useState("all");
  const navigate = useNavigate();

  const handleSearch = () => {
    if (search.trim() !== "") {
      navigate(`/all-contests?search=${search}&type=${selectedType}`);

    }
  };
  

  return (
    <div
      className="hero min-h-[70vh] relative"
      style={{
        backgroundImage:
          "url('https://plus.unsplash.com/premium_photo-1681488007344-c75b0cf8b0cd?q=80&w=1200&auto=format&fit=crop')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      
      <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/40"></div>

      
      <div className="hero-content text-center text-neutral-content relative z-10">
        <div className="max-w-2xl">
          <h1 className="mb-5 text-5xl font-extrabold drop-shadow-lg">
            Discover Creative Contests & Showcase Your Talent
          </h1>

          <p className="mb-8 text-lg opacity-90">
            Search contests by category — design, writing, business ideas, gaming reviews, and more.
          </p>

          {/* Search Bar */}
          <div className="flex gap-2 justify-center">
            <input
              type="text"
              placeholder="Search contest type..."
              className="input input-bordered w-full max-w-xs text-black focus:outline-none focus:ring-2 focus:ring-primary"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            />

            <button
              onClick={handleSearch}
              className="btn btn-primary px-6 font-semibold shadow-lg hover:scale-105 transition-transform bg-blue-300 text-black border-0"
            >
              Search
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;

