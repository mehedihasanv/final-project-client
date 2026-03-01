import React from "react";

const About = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      {/* Heading */}
      <h1 className="text-4xl font-bold text-center mb-6">About ContestHub</h1>
      <p className="text-lg text-gray-600 dark:text-gray-300 text-center mb-12">
        ContestHub is your ultimate platform to explore, participate, and shine in exciting contests.
        We aim to create a fair, transparent, and engaging environment for all users.
      </p>

      {/* Mission Section */}
      <div className="grid md:grid-cols-2 gap-8 mb-12">
        <div>
          <h2 className="text-2xl font-semibold mb-4">Our Mission</h2>
          <p className="text-gray-700 dark:text-gray-300">
            We believe in empowering individuals by providing opportunities to showcase their talent
            through contests. Our mission is to build a community where creativity, skill, and
            innovation are celebrated.
          </p>
        </div>
       
      </div>

      {/* How It Works Section */}
      <div className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">How It Works</h2>
        <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-2">
          <li>Browse contests from different categories.</li>
          <li>Register and submit your entries easily.</li>
          <li>Track your progress on the leaderboard.</li>
          <li>Win exciting rewards and recognition.</li>
        </ul>
      </div>

      {/* Values Section */}
      <div className="grid md:grid-cols-3 gap-6">
        <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-xl shadow-md">
          <h3 className="text-xl font-semibold mb-2">Transparency</h3>
          <p className="text-gray-700 dark:text-gray-300">
            Fair rules and clear evaluation for all participants.
          </p>
        </div>
        <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-xl shadow-md">
          <h3 className="text-xl font-semibold mb-2">Community</h3>
          <p className="text-gray-700 dark:text-gray-300">
            A supportive space to connect and grow together.
          </p>
        </div>
        <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-xl shadow-md">
          <h3 className="text-xl font-semibold mb-2">Innovation</h3>
          <p className="text-gray-700 dark:text-gray-300">
            Encouraging creativity and new ideas through contests.
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
