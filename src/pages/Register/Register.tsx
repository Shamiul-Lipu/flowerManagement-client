import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  useCreateSalesmanOrManagerMutation,
  useLoginMutation,
  useRegisterMemberMutation,
} from "../../redux/features/auth/authApi";
import { jwtDecode } from "jwt-decode";
import { setUser, useCurrentUser } from "../../redux/features/auth/authSlice";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { toast } from "react-toastify";
import { TUser } from "../../types/global";

const Register = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    role: "member",
  });
  const user = useAppSelector(useCurrentUser) as TUser;
  const [registerMember] = useRegisterMemberMutation();
  const [createSalesmanOrManager] = useCreateSalesmanOrManagerMutation();
  const [login] = useLoginMutation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleOnChange = (e: { target: { name: any; value: any } }) => {
    const name = e.target.name;
    const value = e.target.value;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const onSubmit = async () => {
    const id = toast.loading("Please wait...", { theme: "dark" });
    if (formData.role === "manager" || formData.role === "salesman") {
      // console.log(formData);
      const res = await createSalesmanOrManager(formData).unwrap();
      if (res.statusCode === 201 && res.success === true) {
        try {
          toast.update(id, {
            render: "Register successful!",
            type: "success",
            isLoading: false,
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
          navigate("/");
        } catch (err) {
          toast.update(id, {
            render: "Rejected!",
            type: "error",
            isLoading: false,
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
        }
      }
    }

    if (formData.role === "member") {
      const res = await registerMember(formData).unwrap();
      if (res.statusCode === 201 && res.success === true) {
        try {
          const res = await login(formData).unwrap();
          // console.log(res);
          const user = jwtDecode(res.data.token);
          // console.log(user);
          dispatch(setUser({ user: user, token: res.data.token }));
          toast.update(id, {
            render: "Register successful!",
            type: "success",
            isLoading: false,
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
          navigate("/");
        } catch (err) {
          toast.update(id, {
            render: "Rejected!",
            type: "error",
            isLoading: false,
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
        }
      }
    }
  };

  return (
    <div className="h-screen w-full mx-auto bg-slate-200">
      <h3 className="text-center pt-10 font-bold text-2xl">Register</h3>
      <div className="flex justify-center items-center">
        <form
          onSubmit={(e) => {
            e.preventDefault(), onSubmit();
          }}
          className=" max-w-96 w-full"
        >
          <div>
            <label className="form-control w-full max-w-xs">
              <div className="label">
                <span className="label-text font-semibold">Username:</span>
              </div>
              <input
                name="username"
                value={formData.username}
                onChange={handleOnChange}
                type="text"
                placeholder="Username"
                required
                className="input input-bordered w-full max-w-xs"
              />
            </label>
          </div>
          <div>
            <label className="form-control w-full max-w-xs">
              <div className="label">
                <span className="label-text font-semibold">Email:</span>
              </div>
              <input
                name="email"
                value={formData.email}
                onChange={handleOnChange}
                type="email"
                placeholder="Email"
                required
                className="input input-bordered w-full max-w-xs"
              />
            </label>
          </div>
          <div>
            <label
              className={`form-control w-full max-w-xs ${
                user ? "block" : "hidden"
              }`}
            >
              <div className="label">
                <span className="label-text font-semibold">Role :</span>
              </div>
              <select
                className="block w-full cursor-pointer rounded-md px-3 py-2.5 border-gray-200 border-2"
                name="role"
                value={formData.role}
                onChange={handleOnChange}
              >
                <option value={""}>Select Role</option>
                <option value={"manager"}>Manager</option>
                <option value={"salesman"}>Seller</option>
              </select>
            </label>
          </div>
          <div>
            <label className="form-control w-full max-w-xs">
              <div className="label">
                <span className="label-text font-semibold">Password:</span>
              </div>
              <input
                name="password"
                value={formData.password}
                onChange={handleOnChange}
                type="password"
                placeholder="Password"
                required
                className="input input-bordered w-full max-w-xs"
              />
            </label>
          </div>
          <div className="">
            <NavLink
              to={"/login"}
              className="text-xs text-end text-blue-800 underline"
            >
              If you alredy Regirterd Please Login
            </NavLink>
            <button
              type="submit"
              className="text-sm px-3 py-2 text-gray-200 bg-black rounded-md my-5 ml-5"
            >
              Register
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
