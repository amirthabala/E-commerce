/*eslint-disable react-hooks/exhaustive-deps */

import React, { useEffect, useState } from "react";
import { productsController } from "../../api/products";
import { showNotification } from "../../utils/showNotification";
import { useNavigate } from "react-router-dom";
import "./ProductPage.css";

function ProductPage() {
  const [products, setProducts] = useState();
  const history = useNavigate();

  useEffect(async () => {
    try {
      const result = await productsController.getAllProducts();
      if (result.success) {
        setProducts(result.productsList);
      }
    } catch (error) {
      showNotification(error.message, "error");
    }
  }, []);

  return (
    <div className="container my-5">
      <div className="row">
        {products?.map((prod) => {
          return (
            <div className="col-12 col-md-4 col-lg-3 mb-5" key={prod.id}>
              <div
                className="card"
                onClick={() => history(`/products/${prod.id}`)}
                style={{ cursor: "pointer" }}
              >
                <div className="d-flex justify-content-center">
                  <img
                    src={require(`../../assets/${prod.product_image}`).default}
                    className="card-img-top"
                    alt="Shirt"
                    style={{ maxHeight: "250px", maxWidth: "220px" }}
                  />
                </div>
                <div className="card-body">
                  <div className="card-text text-center">
                    <h5 style={{ color: "gray", fontWeight: "700" }}>
                      {prod.product_brand}
                    </h5>
                    <p className="text-muted">{prod.product_name}</p>
                    <h6>
                      ₹
                      {Math.round(
                        prod.unit_price -
                          (prod.unit_price * prod.discount) / 100
                      ).toFixed(2)}
                    </h6>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default ProductPage;
