import Header from "./components/Header";
import Footer from "./components/Footer";
import { Container, Toast } from "react-bootstrap";
import { Routes, Route, Navigate } from "react-router-dom";
import HomePage from "./pages/HomePage/HomePage";
import ProductPage from "./pages/ProductPage";
import LoginPage from "./pages/LoginPage";
import P404 from "./components/P404";
import UserPage from "./pages/UserPage";
import CartPage from "./pages/CartPage";
import { useSelector } from "react-redux";
import ShopPage from "./pages/ShopPage/ShopPage";
import CategoryPage from "./pages/CategoryPage";
import AddProductPage from "./pages/AddProductPage";
import ProfilePage from "./pages/ProfilePage";
import UpdateProductPage from "./pages/UpdateProductPage";

const App = () => {
  const isLogged = useSelector((state) => state?.auth.isLogged);
  // ------ usign redux-toolkit
  // console.log("logged? in App.js", isLogged);
  //------------

  return (
    <>
      <Header />
      <main className="position-relative overflow-hidden p-3 p-md-5 m-md-3 bg-light">
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route
            path="/checkout"
            element={isLogged ? <Navigate to="/" /> : <LoginPage />}
          />
          ;
          <Route path="/" element={<HomePage />} />
          <Route path="/shop" element={<ShopPage />} />
          <Route path="/product/:id" element={<ProductPage />} />
          <Route path="/add" element={<AddProductPage />} />
          <Route path="/update/:id" element={<UpdateProductPage />} />
          <Route path="/category/:cat" element={<CategoryPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/user/:id" element={<UserPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/register" element={<LoginPage />} />
          {/* to protect */}
          {/* <Route path='editor' element={<User />} /> */}
          {/* catch all */}
          <Route path="*" element={<P404 />} />
        </Routes>
      </main>
      <Footer />
    </>
  );
};

export default App;
