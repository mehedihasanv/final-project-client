import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import api from "../../services/apiClient"; 

const Register = () => {
  const { registerUser, updateUserProfile } = useAuth();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = (data) => {
    registerUser(data.email, data.password)
      .then((result) =>{
        
        updateUserProfile(data.name, data.photo)
          .then(() => {
            
            const newUser = {
              name: data.name,
              email: data.email,
              photo: data.photo,
            };
            api.post("/users", newUser).finally(() => {
              Swal.fire({
                icon: "success",
                title: "Account Created Successfully",
                timer: 1500,
                showConfirmButton: false,
              });
              reset();
              navigate("/login");
            });
          })
          .catch(() => {
            Swal.fire({
              icon: "error",
              title: "Profile Update Failed",
            });
          });
      })
      .catch(() => {
        Swal.fire({
          icon: "error",
          title: "Registration Failed",
        });
      });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200 px-4">
      <div className="card w-full max-w-md shadow-xl bg-base-100 p-6">
        <h2 className="text-2xl font-bold text-center mb-4">Create Account</h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
         
          <div>
            <label className="font-semibold">Full Name</label>
            <input
              type="text"
              className="input input-bordered w-full"
              {...register("name", { required: true })}
            />
            {errors.name && (
              <p className="text-red-500 text-sm">Name is required</p>
            )}
          </div>

          
          <div>
            <label className="font-semibold">Photo URL</label>
            <input
              type="text"
              className="input input-bordered w-full"
              {...register("photo", { required: true })}
            />
            {errors.photo && (
              <p className="text-red-500 text-sm">Photo URL is required</p>
            )}
          </div>

        
          <div>
            <label className="font-semibold">Email</label>
            <input
              type="email"
              className="input input-bordered w-full"
              {...register("email", { required: true })}
            />
            {errors.email && (
              <p className="text-red-500 text-sm">Email is required</p>
            )}
          </div>

          
          <div>
            <label className="font-semibold">Password</label>
            <input
              type="password"
              className="input input-bordered w-full"
              {...register("password", {
                required: true,
                minLength: 6,
              })}
            />
            {errors.password?.type === "required" && (
              <p className="text-red-500 text-sm">Password is required</p>
            )}
            {errors.password?.type === "minLength" && (
              <p className="text-red-500 text-sm">
                Password must be at least 6 characters
              </p>
            )}
          </div>

          <button className="btn btn-primary w-full">Register</button>
        </form>

        <p className="text-center mt-3">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-500 font-semibold">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
