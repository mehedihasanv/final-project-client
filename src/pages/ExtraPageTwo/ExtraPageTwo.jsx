import React from "react";

const testimonials = [
  {
    id: 1,
    name: "Ayesha Rahman",
    photo: "https://i.pravatar.cc/150?img=32",
    feedback:
      "This platform gave me the opportunity to showcase my creativity. Winning was an unforgettable experience!",
    designation: "Graphic Designer",
  },
  {
    id: 2,
    name: "Tanvir Hasan",
    photo: "https://i.pravatar.cc/150?img=12",
    feedback:
      "Participating in the contest taught me so much. This website truly inspired me to keep learning and growing.",
    designation: "Web Developer",
  },
  {
    id: 3,
    name: "Nusrat Jahan",
    photo: "https://i.pravatar.cc/150?img=45",
    feedback:
      "Joining here boosted my confidence. It motivated me to aim higher and dream bigger for the future.",
    designation: "Content Creator",
  },
];

const Testimonial = () => {
  return (
    <div className="my-16 max-w-7xl mx-auto px-4">
      <h2 className="text-3xl font-bold mb-8 text-center">Testimonials</h2>
      <p className="mt-4 italic text-center">
        "Your voice matters — every story inspires others!"
      </p>

      <div className="grid md:grid-cols-3 gap-6 mt-8">
        {testimonials.map((t) => (
          <div
            key={t.id}
            className="bg-base-100 shadow-md rounded-lg p-6 text-center"
          >
            <figure>
              <img
                src={t.photo}
                alt={t.name}
                className="h-24 w-24 mx-auto object-cover rounded-full border-2 border-blue-500"
              />
            </figure>
            <div className="mt-4">
              <h3 className="text-xl font-semibold">{t.name}</h3>
              <p className="text-sm text-gray-500">{t.designation}</p>
              <p className="mt-3 text-gray-700 italic">"{t.feedback}"</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Testimonial;
