const ContestTabs = ({ selectedType, setSelectedType }) => {
  const types = [
    "all",
    "Image Design",
    "Article Writing",
    "Business Idea",
    "Gaming Review",
    "Logo Design",
    "UI/UX",
  ];

  return (
    <div className="flex flex-wrap gap-3">
      {types.map((type) => (
        <button
          key={type}
          onClick={() => setSelectedType(type)}
          className={`btn btn-sm ${
            selectedType === type ? "btn-primary" : "btn-outline"
          }`}
        >
          {type}
        </button>
      ))}
    </div>
  );
};

export default ContestTabs;

