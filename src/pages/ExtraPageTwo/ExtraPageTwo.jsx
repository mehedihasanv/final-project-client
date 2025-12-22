const ExtraPageTwo = () => {
  const testimonials = [
    {
      name: "Sarah Ahmed",
      role: "Graphic Designer",
      image: "https://plus.unsplash.com/premium_photo-1683133405779-081b5e4311e1?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8aGlqYWJpJTIwZ2lybHxlbnwwfHwwfHx8MA%3D%3D",
      feedback:
        "ContestHub gave me the chance to showcase my creativity. Winning the design contest boosted my confidence and career opportunities!",
    },
    {
      name: "James Lee",
      role: "Content Writer",
      image: "https://images.unsplash.com/photo-1589234217365-08d3e0e5cf42?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mjh8fHBob3Rvc2hvcHxlbnwwfHwwfHx8MA%3D%3D",
      feedback:
        "I participated in an article writing contest and not only won but also connected with amazing people. Truly inspiring!",
    },
    {
      name: "Maria Khan",
      role: "Entrepreneur",
      image: "https://images.unsplash.com/photo-1703563743084-aecf82c0d0ee?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mzh8fGhpamFiaSUyMGdpcmx8ZW58MHx8MHx8fDA%3D",
      feedback:
        "Launching my own contest was so easy. The platform is user‑friendly and helped me find innovative business ideas.",
    },
  ];

  return (
    <section className="bg-gray-50 py-12">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-4xl font-bold text-center mb-10">
          Success Stories from Our Community
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((t, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-lg p-6 text-center hover:scale-105 transition-transform"
            >
              <img
                src={t.image}
                alt={t.name}
                className="w-20 h-20 rounded-full mx-auto mb-4 object-cover"
              />
              <h3 className="text-xl font-semibold">{t.name}</h3>
              <p className="text-sm text-gray-500 mb-3">{t.role}</p>
              <p className="text-gray-700 italic">“{t.feedback}”</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ExtraPageTwo;

