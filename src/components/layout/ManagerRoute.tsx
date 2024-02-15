import { ReactNode } from "react";
import { User, useCurrentToken } from "../../redux/features/auth/authSlice";
import { useAppSelector } from "../../redux/hooks";
import { Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

type ManagerRouteProp = {
  children: ReactNode;
  role: string;
};

const ManagerRoute = ({ children, role }: ManagerRouteProp) => {
  const token = useAppSelector(useCurrentToken);
  let user;

  if (token) {
    user = jwtDecode(token) as User;
  }
  //   console.log(user);

  if (role !== user?.role) {
    return <Navigate to={"/"} replace={true} />;
  }
  if (!token) {
    return <Navigate to={"/login"} replace={true} />;
  }
  return children;
};

export default ManagerRoute;
