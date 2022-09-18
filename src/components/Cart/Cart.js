import React, { useEffect, useState } from "react";
import { cartContoller } from "../../api/cart";
import { showNotification } from "../../utils/showNotification";
import "./Cart.css";

function Cart() {
  const [cartItems, setCartItems] = useState();

  useEffect(async () => {
    if (localStorage.getItem("meruwell_token")) {
      try {
        const result = await cartContoller.getCartItemsByUserId(1);
        if (result.success) {
          setCartItems(result?.cartItems);
        } else {
          showNotification(result.message, "error");
        }
      } catch (error) {
        showNotification(error.message, "error");
      }
    } else {
      showNotification("Please Login to add items to Cart!", "warning");
    }
  }, []);

  return (
    <div className="container cart-container">
      <h2>My Bag</h2>
      <div className="row mt-5">
        <div className="col-lg-9">
          {cartItems ? (
            <>
              {cartItems.map((item) => {
                return (
                  <div className="card mb-3">
                    <div className="row g-0">
                      <div className="col-4 col-md-3 col-lg-2">
                        <img
                          src={
                            item?.product_image
                              ? require(`../../assets/${item?.product_image}`)
                                  .default
                              : ""
                          }
                          className="img-fluid rounded-start img-container"
                          alt={item?.product_name}
                        />
                      </div>
                      <div className="col-8 col-md-9 col-lg-10">
                        <div className="card-body">
                          <h5 className="card-title">Card title</h5>
                          <p className="card-text">
                            This is a wider card with supporting text below as a
                            natural lead-in to additional content. This content
                            is a little bit longer.
                          </p>
                          <p className="card-text">
                            <small className="text-muted">
                              Last updated 3 mins ago
                            </small>
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </>
          ) : (
            <></>
          )}
        </div>
      </div>
    </div>
  );
}

export default Cart;
