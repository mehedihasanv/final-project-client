// import { useForm } from "react-hook-form";
// import { useAuth } from "../../../hooks/useAuth";
// import api from "../../../services/apiClient";
// import Swal from "sweetalert2";
// import DatePicker from "react-datepicker";
// import "react-datepicker/dist/react-datepicker.css";
// import { useState } from "react";

// const AddContest = () => {
//   const { user } = useAuth();
//   const [deadline, setDeadline] = useState(new Date());

//   const { register, handleSubmit, reset } = useForm();

//   const onSubmit = async (data) => {
//     const contestData = {
//       ...data,
//       creatorEmail: user.email,
//       deadline,
//       participantsCount: 0,
//       status: "pending",
//     };

//     try {
//       const res = await api.post("/contests", contestData);

//       if (res.data.insertedId) {
//         Swal.fire({
//           icon: "success",
//           title: "Contest Added Successfully",
//           timer: 1500,
//           showConfirmButton: false,
//         });
//         reset();
//       }
//     } catch {
//       Swal.fire({
//         icon: "error",
//         title: "Failed to Add Contest",
//       });
//     }
//   };

//   return (
//     <div className="p-6 max-w-3xl">
//       <h2 className="text-3xl font-bold mb-6">Add New Contest</h2>

//       <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

//         <div>
//           <label className="font-semibold">Contest Name</label>
//           <input
//             type="text"
//             className="input input-bordered w-full"
//             {...register("name", { required: true })}
//           />
//         </div>

//         <div>
//           <label className="font-semibold">Image URL</label>
//           <input
//             type="text"
//             className="input input-bordered w-full"
//             {...register("image", { required: true })}
//           />
//         </div>

//         <div>
//           <label className="font-semibold">Description</label>
//           <textarea
//             className="textarea textarea-bordered w-full"
//             {...register("description", { required: true })}
//           ></textarea>
//         </div>

//         <div>
//           <label className="font-semibold">Task Instructions</label>
//           <textarea
//             className="textarea textarea-bordered w-full"
//             {...register("task", { required: true })}
//           ></textarea>
//         </div>

//         <div>
//           <label className="font-semibold">Contest Type</label>
//           <select
//             className="select select-bordered w-full"
//             {...register("type", { required: true })}
//           >
//             <option>Image Design</option>
//             <option>Article Writing</option>
//             <option>Business Idea</option>
//             <option>Gaming Review</option>
//             <option>Logo Design</option>
//             <option>UI/UX</option>
//           </select>
//         </div>

//         <div>
//           <label className="font-semibold">Entry Price ($)</label>
//           <input
//             type="number"
//             className="input input-bordered w-full"
//             {...register("price", { required: true })}
//           />
//         </div>

//         <div>
//           <label className="font-semibold">Prize Money ($)</label>
//           <input
//             type="number"
//             className="input input-bordered w-full"
//             {...register("prize", { required: true })}
//           />
//         </div>

//         <div>
//           <label className="font-semibold">Deadline</label>
//           <DatePicker
//             selected={deadline}
//             onChange={(date) => setDeadline(date)}
//             className="input input-bordered w-full"
//           />
//         </div>

//         <button className="btn btn-primary w-full">Add Contest</button>
//       </form>
//     </div>
//   );
// };

// export default AddContest;

import { useForm, Controller } from "react-hook-form";
import { useAuth } from "../../../hooks/useAuth";
import api from "../../../services/apiClient";
import Swal from "sweetalert2";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const AddContest = () => {
  const { user } = useAuth();

  // 🔹 useForm setup
  const { register, handleSubmit, reset, control } = useForm({
    defaultValues: {
      deadline: new Date(), // default deadline value
    },
  });

  const onSubmit = async (data) => {
    const contestData = {
      ...data,
      creatorEmail: user.email,
      participantsCount: 0,
      status: "pending",
    };

    try {
      const res = await api.post("/contests", contestData);

      if (res.data.insertedId) {
        Swal.fire({
          icon: "success",
          title: "Contest Added Successfully",
          timer: 1500,
          showConfirmButton: false,
        });
        reset();
      }
    } catch {
      Swal.fire({
        icon: "error",
        title: "Failed to Add Contest",
      });
    }
  };

  return (
    <div className="p-6 max-w-3xl">
      <h2 className="text-3xl font-bold mb-6">Add New Contest</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

        <div>
          <label className="font-semibold">Contest Name</label>
          <input
            type="text"
            className="input input-bordered w-full"
            {...register("name", { required: true })}
          />
        </div>

        <div>
          <label className="font-semibold">Image URL</label>
          <input
            type="text"
            className="input input-bordered w-full"
            {...register("image", { required: true })}
          />
        </div>

        <div>
          <label className="font-semibold">Description</label>
          <textarea
            className="textarea textarea-bordered w-full"
            {...register("description", { required: true })}
          ></textarea>
        </div>

        <div>
          <label className="font-semibold">Task Instructions</label>
          <textarea
            className="textarea textarea-bordered w-full"
            {...register("task", { required: true })}
          ></textarea>
        </div>

        <div>
          <label className="font-semibold">Contest Type</label>
          <select
            className="select select-bordered w-full"
            {...register("type", { required: true })}
          >
            <option>Image Design</option>
            <option>Article Writing</option>
            <option>Business Idea</option>
            <option>Gaming Review</option>
            <option>Logo Design</option>
            <option>UI/UX</option>
          </select>
        </div>

        <div>
          <label className="font-semibold">Entry Price ($)</label>
          <input
            type="number"
            className="input input-bordered w-full"
            {...register("price", { required: true })}
          />
        </div>

        <div>
          <label className="font-semibold">Prize Money ($)</label>
          <input
            type="number"
            className="input input-bordered w-full"
            {...register("prize", { required: true })}
          />
        </div>

        <div>
          <label className="font-semibold">Deadline</label>
          {/* 🔹 Deadline এখন React Hook Form এর অংশ */}
          <Controller
            control={control}
            name="deadline"
            rules={{ required: true }}
            render={({ field }) => (
              <DatePicker
                selected={field.value}
                onChange={(date) => field.onChange(date)}
                className="input input-bordered w-full"
              />
            )}
          />
        </div>

        <button className="btn btn-primary w-full">Add Contest</button>
      </form>
    </div>
  );
};

export default AddContest;
