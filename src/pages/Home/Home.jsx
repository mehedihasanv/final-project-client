import Banner from "../../components/home/Banner";
import PopularContests from "../../components/home/PopularContests";
import WinnerSection from "../../components/home/WinnerSection";
import ExtraSection from "../../components/home/ExtraSection";

const Home = () => {
  return (
    <div>
      <Banner />
      <PopularContests />
      <WinnerSection />
      <ExtraSection />
    </div>
  );
};

export default Home;
