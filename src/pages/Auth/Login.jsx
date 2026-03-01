

// import { Link, useLocation, useNavigate } from "react-router-dom";
// import { useAuth } from "../../hooks/useAuth";
// import { useForm } from "react-hook-form";
// import Swal from "sweetalert2";
// import api from "../../services/apiClient"; 

// const Login = () => {
//   const { loginUser, googleLogin } = useAuth();
//   const navigate = useNavigate();
//   const location = useLocation();
//   const from = location.state?.from?.pathname || "/";

//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//   } = useForm();

  
//   const onSubmit = (data) => {
//     loginUser(data.email, data.password)
//       .then(() => {
//         Swal.fire({
//           icon: "success",
//           title: "Login Successful",
//           timer: 1500,
//           showConfirmButton: false,
//         });
//         navigate(from, { replace: true });
//       })
//       .catch(() => {
//         Swal.fire({
//           icon: "error",
//           title: "Login Failed",
//           text: "Invalid email or password",
//         });
//       });
//   };

  
//   const handleGoogle = () => {
//     googleLogin()
//       .then((result) => {
//         const user = result.user;
//         const newUser = {
//           name: user.displayName,
//           email: user.email,
//           photo: user.photoURL,
//         };

        
//         api.post("/users", newUser)
//           .then((res) => {
//             console.log("✅ Backend response:", res.data);
//             Swal.fire({
//               icon: "success",
//               title: "Login Successful",
//               timer: 1500,
//               showConfirmButton: false,
//             });
//             navigate(from, { replace: true });
//           })
//           .catch((err) => {
//             console.error("❌ Error saving user:", err);
//             Swal.fire({
//               icon: "error",
//               title: "User Save Failed",
//             });
//           });
//       })
//       .catch(() => {
//         Swal.fire({
//           icon: "error",
//           title: "Google Login Failed",
//         });
//       });
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-base-200 px-4">
//       <div className="card w-full max-w-md shadow-xl bg-base-100 p-6">
//         <h2 className="text-2xl font-bold text-center mb-4">Login</h2>

//         <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
         
//           <div>
//             <label className="font-semibold">Email</label>
//             <input
//               type="email"
//               className="input input-bordered w-full"
//               {...register("email", { required: true })}
//             />
//             {errors.email && (
//               <p className="text-red-500 text-sm">Email is required</p>
//             )}
//           </div>

          
//           <div>
//             <label className="font-semibold">Password</label>
//             <input
//               type="password"
//               className="input input-bordered w-full"
//               {...register("password", { required: true })}
//             />
//             {errors.password && (
//               <p className="text-red-500 text-sm">Password is required</p>
//             )}
//           </div>

//           <button className="btn btn-primary w-full">Login</button>
//         </form>

//         <div className="divider">OR</div>

//         <button onClick={handleGoogle} className="btn btn-outline w-full">
//           Continue with Google
//         </button>

//         <p className="text-center mt-3">
//           New here?{" "}
//           <Link to="/register" className="text-blue-500 font-semibold">
//             Create an account
//           </Link>
//         </p>
//       </div>
//     </div>
//   );
// };

// export default Login;
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { useForm } from "react-hook-form";
import { FaRegEye } from "react-icons/fa";
import { FaRegEyeSlash } from "react-icons/fa";
import Swal from "sweetalert2";
import api from "../../services/apiClient"; 
import { useState } from "react";

const Login = () => {
  const { loginUser, googleLogin } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false); // ✅ toggle state

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    setLoading(true);
    loginUser(data.email, data.password)
      .then(() => {
        Swal.fire({
          icon: "success",
          title: "Login Successful",
          timer: 1500,
          showConfirmButton: false,
        });
        navigate(from, { replace: true });
      })
      .catch(() => {
        Swal.fire({
          icon: "error",
          title: "Login Failed",
          text: "Invalid email or password",
        });
      })
      .finally(() => setLoading(false));
  };

  const handleGoogle = () => {
    setLoading(true);
    googleLogin()
      .then((result) => {
        const user = result.user;
        const newUser = {
          name: user.displayName,
          email: user.email,
          photo: user.photoURL,
        };

        api.post("/users", newUser)
          .then((res) => {
            console.log("✅ Backend response:", res.data);
            Swal.fire({
              icon: "success",
              title: "Login Successful",
              timer: 1500,
              showConfirmButton: false,
            });
            navigate(from, { replace: true });
          })
          .catch((err) => {
            console.error("❌ Error saving user:", err);
            Swal.fire({
              icon: "error",
              title: "User Save Failed",
            });
          })
          .finally(() => setLoading(false));
      })
      .catch(() => {
        Swal.fire({
          icon: "error",
          title: "Google Login Failed",
        });
        setLoading(false);
      });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200 px-4">
      <div className="card w-full max-w-md shadow-xl bg-base-100 p-6">
        <h2 className="text-2xl font-bold text-center mb-4">Login</h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Email */}
          <div>
            <label className="font-semibold">Email</label>
            <input
              type="email"
              className="input input-bordered w-full"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Invalid email format",
                },
              })}
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email.message}</p>
            )}
          </div>

          {/* Password with Eye Toggle */}
          <div>
            <label className="font-semibold">Password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                className="input input-bordered w-full pr-10"
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters",
                  },
                })}
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaRegEyeSlash /> : <FaRegEye />}
              </button>
            </div>
            {errors.password && (
              <p className="text-red-500 text-sm">{errors.password.message}</p>
            )}
          </div>

          {/* Login Button with Spinner */}
          <button className="btn btn-primary w-full" disabled={loading}>
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <span className="loading loading-spinner"></span>
                Logging in...
              </span>
            ) : (
              "Login"
            )}
          </button>
        </form>

        <div className="divider">OR</div>

        {/* Google Login Button with Spinner */}
        <button
          onClick={handleGoogle}
          className="btn btn-outline w-full"
          disabled={loading}
        >
          {loading ? (
            <span className="flex items-center justify-center gap-2">
              <span className="loading loading-spinner"></span>
              Processing...
            </span>
          ) : (
            "Continue with Google"
          )}
        </button>

        <p className="text-center mt-3">
          New here?{" "}
          <Link to="/register" className="text-blue-500 font-semibold">
            Create an account
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;


