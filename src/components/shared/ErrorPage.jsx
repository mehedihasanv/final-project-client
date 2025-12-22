import { Link } from "react-router-dom";

const ErrorPage = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-base-200 px-4 text-center">

      <h1 className="text-8xl font-bold text-primary">404</h1>

      <h2 className="text-3xl font-semibold mt-4">Page Not Found</h2>

      <p className="mt-3 max-w-md">
        The page you are looking for doesn’t exist or has been moved.
      </p>

      <Link to="/" className="btn btn-primary mt-6">
        Go Back Home
      </Link>

    </div>
  );
};

export default ErrorPage;
