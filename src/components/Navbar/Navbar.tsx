import { NavLink } from "react-router-dom";
import mainLogo from "../../assets/shop.png";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { logout, useCurrentUser } from "../../redux/features/auth/authSlice";
import { TUser } from "../../types/global";

const Navbar = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(useCurrentUser) as TUser;

  return (
    <div className="navbar bg-neutral text-neutral-content flex-col justify-center gap-2 md:flex-row md:justify-between py-5 px-2 rounded-b-lg">
      <NavLink
        to={"/"}
        className="flex justify-center items-center font-bold text-xl text-lime-100"
      >
        <img className="btn btn-ghost text-xl" src={mainLogo} />
        <h3>Flower Management</h3>
      </NavLink>
      <div className="">
        <ul className="flex justify-center items-center gap-1 font-semibold md:gap-6">
          {user?.role === "salesman" && (
            <li>
              <NavLink
                to={"/user/dashboard"}
                className="btn btn-active hover:bg-lime-100"
              >
                Dashboard
              </NavLink>
            </li>
          )}
          {user?.role === "manager" ? (
            <>
              <li className="border-b-2 hover:text-lime-100 hover:border-b-lime-300">
                <NavLink to={"/user/addFlower"} className="btn btn-ghost">
                  Add Flower
                </NavLink>
              </li>

              <li>
                <NavLink
                  to={"/user/dashboard"}
                  className="btn btn-active hover:bg-lime-100"
                >
                  Dashboard
                </NavLink>
              </li>
              <li>
                <NavLink
                  to={"/register"}
                  className="btn btn-outline text text-gray-300 border-gray-400"
                >
                  <small>
                    Create <br /> Seller/Manager
                  </small>
                </NavLink>
              </li>
            </>
          ) : (
            <></>
          )}
          {user ? (
            <li>
              <button
                onClick={() => dispatch(logout())}
                className="btn btn-outline text text-gray-300 border-gray-400"
              >
                Logout
              </button>
            </li>
          ) : (
            <>
              <li>
                <NavLink
                  to={"/register"}
                  className="btn btn-outline text text-gray-300 border-gray-400"
                >
                  Become a Member
                  <div className="badge badge-accent">Redeem Discount %</div>
                </NavLink>
              </li>
              <li>
                <NavLink to={"/login"} className="btn btn-active ">
                  Login
                </NavLink>
              </li>
            </>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
