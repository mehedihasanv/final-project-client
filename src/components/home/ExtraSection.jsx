const ExtraSection = () => {
  return (
    <div className="max-w-7xl mx-auto my-20 px-4">
      <h2 className="text-3xl font-bold mb-6">Why Join ContestHub?</h2>
      <div className="grid md:grid-cols-3 gap-6">
        <div className="p-6 bg-base-200 rounded-lg shadow">
          <h3 className="font-bold text-xl mb-2">Boost Your Skill</h3>
          <p>
            Participate in creative contests and improve your design, writing, and idea‑building skills.
          </p>
        </div>

        <div className="p-6 bg-base-200 rounded-lg shadow">
          <h3 className="font-bold text-xl mb-2">Win Exciting Prizes</h3>
          <p>
            Earn recognition and prize money by showcasing your talent.
          </p>
        </div>

        <div className="p-6 bg-base-200 rounded-lg shadow">
          <h3 className="font-bold text-xl mb-2">Build Your Portfolio</h3>
          <p>
            Every contest you join helps you build a strong creative portfolio.
          </p>
        </div>

      </div>
    </div>
  );
};

export default ExtraSection;
