import Products from "../../pages/Products/Products";
import Container from "../Container/Container";
import Navbar from "../Navbar/Navbar";

const MainLayout = () => {
  return (
    <Container>
      <Navbar />
      <Products />
    </Container>
  );
};

export default MainLayout;
