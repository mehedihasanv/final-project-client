import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-blue-500 py-6 mt-10 text-white">
      <div className="max-w-7xl mx-auto text-center space-y-4">
        
        {/* Logo Section */}
        <div className="flex items-center justify-center gap-2">
          <Link to="/" className="text-2xl font-bold flex items-center gap-1">
            <span className="text-blue-300">Contest</span>Hub
          </Link>
          <img
            className="h-5"
            src="https://img.icons8.com/?size=100&id=52425&format=png&color=000000"
            alt="logo"
          />
        </div>

        {/* Social Links */}
        <div className="flex justify-center gap-6 mt-3">
          <Link
            to="https://www.facebook.com/"
            target="_blank"
            className="flex items-center gap-1 hover:text-blue-200 transition"
          >
            <img
              className="h-6"
              src="https://img.icons8.com/?size=100&id=uLWV5A9vXIPu&format=png&color=000000"
              alt="facebook"
            />
            Facebook
          </Link>
          <Link
            to="https://www.linkedin.com/"
            target="_blank"
            className="flex items-center gap-1 hover:text-blue-200 transition"
          >
            <img
              className="h-6"
              src="https://img.icons8.com/?size=100&id=xuvGCOXi8Wyg&format=png&color=000000"
              alt="linkedin"
            />
            LinkedIn
          </Link>
        </div>

        {/* Contact Info */}
        <div className="mt-3">
          <p className="font-semibold">📞 Contact: 01817236131</p>
        </div>

        {/* Copyright */}
        <p className="mt-4 text-sm">
          © 2025 ContestHub. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;

