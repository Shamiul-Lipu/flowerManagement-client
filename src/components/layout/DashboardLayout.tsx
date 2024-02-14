import Container from "../Container/Container";
import Navbar from "../Navbar/Navbar";
import { Outlet } from "react-router-dom";

const DashboardLayout = () => {
  return (
    <>
      <Container>
        <Navbar />
        <Outlet />
      </Container>
    </>
  );
};

export default DashboardLayout;
