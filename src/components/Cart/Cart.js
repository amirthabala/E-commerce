/*eslint-disable react-hooks/exhaustive-deps*/

import React, { useEffect, useState } from "react";
import { cartContoller } from "../../api/cart";
import { showNotification } from "../../utils/showNotification";
import "./Cart.css";

function Cart(props) {
	const [cartItems, setCartItems] = useState([]);
	const [localRefresh, setLocalRefresh] = useState(false);
	const [isLoggedIn, setIsLoggedIn] = useState(false);

	const deleteItem = async (id) => {
		try {
			const result = await cartContoller.deleteCartItem(id);
			if (result.success) {
				setLocalRefresh(!localRefresh);
			} else {
				showNotification(result.message, "error");
			}
		} catch (error) {
			showNotification(error.message, "error");
		}
	};

	useEffect(async () => {
		if (localStorage.getItem("meruwell_token")) {
			try {
				setIsLoggedIn(true);
				const result = await cartContoller.getCartItemsByUserId();
				if (result.success) {
					setCartItems(result?.cartItems);
				} else {
					showNotification(result.message, "error");
				}
			} catch (error) {
				showNotification(error.message, "error");
			}
		} else {
			setIsLoggedIn(false);
			// showNotification("Please Login to add items to Cart!", "warning");
			setCartItems([]);
		}
	}, [props, localRefresh]);

	useEffect(() => {}, [isLoggedIn]);

	return (
		<div className="container cart-container">
			<h2>My Bag</h2>
			{isLoggedIn ? (
				cartItems.length ? (
					<div className="row mt-5">
						<div className="col-lg-9">
							{cartItems.map((item) => {
								return (
									<div className="card mb-3" key={item.id}>
										<div className="row g-0">
											<div className="col-4 col-md-3 col-lg-3 col-xl-2">
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
												<div className="d-block d-md-none m-2">
													<div className="row">
														<label
															htmlFor="Qty"
															className="col-4 col-form-label pe-0"
														>
															Qty
														</label>
														<div className="col-6 p-0">
															<input
																type="number"
																className="form-control"
																id="Qty"
																value={item?.quantity}
																onChange={() => {}}
															/>
														</div>
													</div>
												</div>
											</div>
											<div className="col-8 col-md-9 col-lg-9 col-xl-10">
												<div className="card-body">
													<div className="card-text row">
														<p className="col-md-6 col-lg-7 col-xl-5">
															{item.product_brand + " - " + item.product_name}
														</p>
														<div className="d-none d-md-block offset-md-1 offset-lg-1 offset-xl-0 col-md-5 col-lg-3">
															<div className="row">
																<label
																	htmlFor="Qty"
																	className="col-4 col-form-label pe-0"
																>
																	Qty
																</label>
																<div className="col-6 p-0">
																	<input
																		type="number"
																		className="form-control"
																		id="Qty"
																		value={item?.quantity}
																		onChange={() => {}}
																	/>
																</div>
															</div>
														</div>
														<p className="offset-md-6 offset-lg-6 offset-xl-0 col-md-6 col-lg-6 col-xl-4 d-flex align-items-center justify-content-end">
															<>
																<s>Rs. {item?.unit_price?.toFixed(2)}</s>
																&nbsp;(
																{item?.discount ? item.discount : 0}%)
																<span className="ms-2 bg-info p-1 pe-2 border-start border-5 border-primary">
																	₹&nbsp;
																	{Math.round(
																		item?.unit_price -
																			(item?.unit_price * item?.discount) / 100
																	).toFixed(2)}
																</span>
															</>
														</p>
													</div>
													<div className="d-flex justify-content-end">
														<div>
															<button
																className="btn"
																style={{ backgroundColor: "#AEAEAE" }}
																onClick={() => deleteItem(item?.id)}
															>
																Delete
															</button>
														</div>
													</div>
												</div>
											</div>
										</div>
									</div>
								);
							})}
						</div>
					</div>
				) : (
					<div
						className="d-flex justify-content-center align-items-center"
						style={{ height: "50vh" }}
					>
						<div>
							<p className="text-center">
								<i
									className="fas fa-shopping-bag fa-4x"
									style={{ color: "rgba(0,0,0,0.2)" }}
								></i>
							</p>
							<h3>Your Bag is Empty!</h3>
						</div>
					</div>
				)
			) : (
				<div
					className="d-flex justify-content-center align-items-center"
					style={{ height: "50vh" }}
				>
					<div>
						<p className="text-center">
							<i
								className="fas fa-power-off fa-4x"
								style={{ color: "rgba(0,0,0,0.2)" }}
							></i>
						</p>
						<h3>Please Login to add Items to Your Bag!</h3>
					</div>
				</div>
			)}
		</div>
	);
}

export default Cart;
