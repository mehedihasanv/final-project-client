import { Link } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

const ContestCard = ({ contest }) => {
  const { user } = useAuth();

  return (
    <div className="card bg-base-100 shadow-xl hover:scale-105 transition ease-in-out">
      <figure>
        <img src={contest.image} alt={contest.name} className="h-48 w-full object-cover" />
      </figure>

      <div className="card-body">
        <h2 className="card-title">{contest.name}</h2>

        <p>{contest.description.slice(0, 80)}...</p>

        <p className="font-semibold">
          Participants: {contest.participantsCount}
        </p>

        <div className="card-actions justify-end">
          <Link
            to={user ? `/contest/${contest._id}` : "/login"}
            className="btn btn-primary btn-sm bg-blue-300 border-0 text-black font-semibold "
          >
            Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ContestCard;
