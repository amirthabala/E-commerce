import React from "react";
import { Modal, Button, Form } from "react-bootstrap";
import "./LoginModal.css";
import Google from "../../assets/google-icon.svg";
import { loginController } from "../../api/login";
import { showNotification } from "../../utils/showNotification";
import { useGoogleLogin } from "@react-oauth/google";

function LoginModal({ show, setShow, refresh, setRefresh }) {
	const handleClose = () => {
		setShow(false);
	};

	const handleSignIn = () => {};

	const onSuccess = async (res) => {
		try {
			const result = await loginController.signIn({ code: res.code });

			if (result.success) {
				localStorage.setItem("meruwell_token", result.data.token);
				setRefresh(!refresh);
				showNotification(result.message, "success");
				handleClose();
			} else {
				showNotification(result.message, "error");
			}
		} catch (error) {
			showNotification(error.message, "error");
			localStorage.removeItem("meruwell_token");
		}
	};

	const onFailure = (res) => {
		console.log(res);
		showNotification("Sign In Failed", "error");
	};

	const signIn = useGoogleLogin({
		onSuccess: onSuccess,
		onError: onFailure,
		flow: "auth-code",
	});

	return (
		<Modal show={show} onHide={handleClose} backdrop="static">
			<Modal.Header closeButton className="px-3 py-2">
				<Modal.Title>Sign In</Modal.Title>
			</Modal.Header>
			<Modal.Body className="mb-4">
				<div className="d-flex justify-content-center">
					<div style={{ width: "90%" }}>
						<Form>
							<Form.Group className="mb-3" controlId="Mobile Number">
								<Form.Label className="mb-1">
									<b>Mobile Number</b>
								</Form.Label>
								<Form.Control type="tel" />
							</Form.Group>
							<Button variant="dark" onClick={handleSignIn} className="w-100">
								Continue
							</Button>
						</Form>
					</div>
				</div>
				<div className="d-flex justify-content-center my-4">
					<div style={{ width: "90%" }}>
						<p className="dividerText small">OR</p>
					</div>
				</div>
				<div className="d-flex justify-content-center my-4">
					<div style={{ width: "90%" }}>
						<Button
							variant="outline-dark"
							onClick={signIn}
							className="d-flex align-items-center justify-content-center w-100"
						>
							<img
								src={Google}
								width="20px"
								height="20px"
								className="me-2"
								alt="Google"
							/>
							<span className="align-middle">Login with Google</span>
						</Button>
					</div>
				</div>
			</Modal.Body>
			{/* <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={handleSignIn}>
          Save Changes
        </Button>
      </Modal.Footer> */}
		</Modal>
	);
}

export default LoginModal;
