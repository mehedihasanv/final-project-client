import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-blue-500 py-6 mt-10">
      <div className="max-w-7xl mx-auto text-center">
        <div className="flex items-center justify-center">
            <Link to="/" className="text-2xl font-bold"><span className="text-blue-300">Contest</span>Hub</Link>
          <img className="h-5" src="https://img.icons8.com/?size=100&id=52425&format=png&color=000000" alt="" />
        </div>
        
        <div className="flex justify-center gap-4 mt-3">
         <Link to="https://www.facebook.com/" className="flex items-center "><img className="h-6" src="https://img.icons8.com/?size=100&id=uLWV5A9vXIPu&format=png&color=000000" alt="" />Facebook</Link>
         <Link to="https://www.linkedin.com/" className="flex items-center "><img className="h-6"  src="https://img.icons8.com/?size=100&id=xuvGCOXi8Wyg&format=png&color=000000" alt="" />Linkein</Link>
        </div>
          
       <p className="mt-5">Copyright © 2025 ContestHub</p>
      </div>
    </footer>
  );
};

export default Footer;
