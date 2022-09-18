/*eslint-disable react-hooks/exhaustive-deps*/

import React, { useEffect, useState } from "react";
import "./ProductDescription.css";
import { Nav, Tab } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { productsController } from "../../api/products";
import { showNotification } from "../../utils/showNotification";
import parse from "react-html-parser";
import { cartContoller } from "../../api/cart";

function ProductDescription(props) {
	const { id } = useParams();
	const [productDetails, setProductDetails] = useState();

	useEffect(async () => {
		try {
			const result = await productsController.getProductById(id);
			if (result.success) {
				setProductDetails(result.productDetails);
			} else {
				showNotification(result.message, "error");
			}
		} catch (error) {
			showNotification(error.message, "error");
		}
	}, [id]);

	useEffect(() => {}, [productDetails]);

	const checkLogin = async () => {
		if (localStorage.getItem("meruwell_token")) {
			try {
				const result = await cartContoller.addProductToCart(id);
				if (result.success) {
					showNotification(result.message, "success");
				} else {
					showNotification(result.message, "error");
				}
			} catch (error) {
				showNotification(error.message, "error");
			}
		} else {
			showNotification("Please Login to add items to Cart!", "warning");
			props.setLoginShow(true);
		}
	};

	return (
		<div className="container product-container">
			{productDetails ? (
				<div className="row">
					<div className="col-12 col-lg-7 mb-5">
						<div className="row">
							<div className="col-3 d-flex align-items-center justify-content-center">
								<div>
									<div className="vstack gap-3">
										<div className="d-flex justify-content-center">
											<img
												src={
													productDetails?.product_image
														? require(`../../assets/${productDetails?.product_image}`)
																.default
														: ""
												}
												alt="Shirt"
												style={{ maxWidth: "100px", maxHeight: "110px" }}
											/>
										</div>
										<div className="d-flex justify-content-center">
											<img
												src={
													productDetails?.product_image
														? require(`../../assets/${productDetails?.product_image}`)
																.default
														: ""
												}
												alt="Shirt"
												style={{ maxWidth: "100px", maxHeight: "110px" }}
											/>
										</div>
									</div>
								</div>
							</div>
							<div className="col-9">
								<div>
									<div className="d-flex align-items-center justify-content-center">
										<img
											src={
												productDetails?.product_image
													? require(`../../assets/${productDetails?.product_image}`)
															.default
													: ""
											}
											alt="Shirt"
											style={{ objectFit: "contain", minWidth: "200px" }}
										/>
									</div>
								</div>
							</div>
						</div>
						<div className="row">
							<div className="col-lg-9 offset-lg-3 mt-5">
								<Tab.Container defaultActiveKey="returns">
									<Nav variant="tabs">
										<Nav.Item>
											<Nav.Link
												eventKey="returns"
												style={{ cursor: "pointer" }}
											>
												RETURNS
											</Nav.Link>
										</Nav.Item>
										<Nav.Item>
											<Nav.Link
												eventKey="promise"
												style={{ cursor: "pointer" }}
											>
												OUR PROMISE
											</Nav.Link>
										</Nav.Item>
									</Nav>
									<Tab.Content>
										<Tab.Pane eventKey="returns">
											<p className="p-3">
												Easy 15 days return and exchange. Return Policies may
												vary based on products and promotions.
											</p>
										</Tab.Pane>
										<Tab.Pane eventKey="promise">
											<p className="p-3">
												We assure the authenticity and quality of our products
											</p>
										</Tab.Pane>
									</Tab.Content>
								</Tab.Container>
							</div>
						</div>
					</div>
					<div className="col-12 col-lg-5 mb-5">
						<div className="text-center">
							<h3 style={{ color: "gray", fontWeight: "700" }}>
								{productDetails?.product_brand}
							</h3>
							<h4 className="text-muted mb-5" style={{ fontWeight: "normal" }}>
								{productDetails?.product_name}
							</h4>
							<h2>
								₹
								{Math.round(
									productDetails?.unit_price -
										(productDetails?.unit_price * productDetails?.discount) /
											100
								).toFixed(2)}
							</h2>
							<h6 className="text-muted mt-3" style={{ fontWeight: "normal" }}>
								MRP <s>₹{productDetails?.unit_price.toFixed(2)}</s>{" "}
								<b>({productDetails?.discount}% OFF)</b>
							</h6>
							<p className="text-muted" style={{ fontSize: "12px" }}>
								Price inclusive of all taxes
							</p>
						</div>
						<div className="text-center d-flex justify-content-center">
							<div
								className="coupon-container border row py-2"
								style={{ backgroundColor: "#A8A8A8" }}
							>
								<div
									className="col-4 border-end"
									style={{ wordWrap: "break-word" }}
								>
									<p
										className="text-wrap"
										style={{ fontSize: "11px", marginBottom: "0px" }}
									>
										Use Code <br />
										VANDEMATRAM
									</p>
								</div>
								<div className="col d-flex align-items-center">
									<p style={{ fontSize: "12px", marginBottom: "0px" }}>
										Get Flat 75% Off on 2490 and Above
									</p>
								</div>
							</div>
						</div>
						<div className="mt-5 d-flex justify-content-center">
							{productDetails?.cart_entry ? (
								<button className="btn btn-warning btn-container" disabled>
									<i className="fas fa-shopping-cart me-3"></i>
									ADDED TO CART
								</button>
							) : (
								<button
									className="btn btn-warning btn-container"
									onClick={() => checkLogin()}
								>
									<i className="fas fa-shopping-cart me-3"></i>
									ADD TO CART
								</button>
							)}
						</div>
						<div className="mt-5 px-5">
							<h5>Product Details</h5>
							{parse(productDetails?.product_details)}
						</div>
					</div>
				</div>
			) : (
				<></>
			)}
		</div>
	);
}

export default ProductDescription;
