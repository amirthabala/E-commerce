import "./App.css";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Navbartop from "./components/navbar";
import ProductPage from "./components/Home/ProductPage";
import ProductDescription from "./components/Products/ProductDescription";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { GoogleOAuthProvider } from "@react-oauth/google";
import LoginModal from "./components/Login/LoginModal";
import { useState } from "react";
import Cart from "./components/Cart/Cart";

function App() {
  const clientId =
    "176237103269-87dpchtm9nugds3ol826f104pn8gtnv2.apps.googleusercontent.com";

  const [loginShow, setLoginShow] = useState(false);

  const loginModalComponent = () => {
    return <Navbartop loginShow={loginShow} setLoginShow={setLoginShow} />;
  };

  return (
    <div>
      <BrowserRouter>
        <GoogleOAuthProvider clientId={clientId}>
          <ToastContainer />
          <Routes>
            <Route exact path="/" element={<Navigate to="/products" />} />

            {/* Home Page */}
            <Route
              exact
              path="/products"
              element={
                <>
                  {loginModalComponent()}
                  <ProductPage />
                </>
              }
            />

            {/* Product Description Page */}
            <Route
              exact
              path="/products/:id"
              element={
                <>
                  {loginModalComponent()}
                  <ProductDescription setLoginShow={setLoginShow} />
                </>
              }
            />

            {/* Cart Page */}
            <Route
              exact
              path="/cart"
              element={
                <>
                  {loginModalComponent()}
                  <Cart />
                </>
              }
            />
          </Routes>
          <LoginModal show={loginShow} setShow={setLoginShow} />
        </GoogleOAuthProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
