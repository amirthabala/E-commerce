// import React from "react";
// import Google from "../../assets/google-icon.svg";
// import { useGoogleLogin } from "@react-oauth/google";
// import { showNotification } from "../../utils/showNotification";
// import { loginController } from "../../api/login";
// import { useNavigate } from "react-router-dom";

// function Login() {
//   const history = useNavigate();
//   const onSuccess = async (res) => {
//     try {
//       const result = await loginController.signIn({ code: res.code });
//       if (result.success) {
//         localStorage.setItem("meruwell_token", result.data.code);
//         showNotification(result.message, "success");
//         history("/products");
//       }
//     } catch (error) {
//       showNotification(error.message, "error");
//       localStorage.removeItem("meruwell_token");
//     }
//   };

//   const onFailure = (res) => {
//     console.log(res);
//     showNotification("Sign In Failed", "error");
//   };

//   const signIn = useGoogleLogin({
//     onSuccess: onSuccess,
//     onError: onFailure,
//     flow: "auth-code",
//   });

//   return (
//     <div>
//       <button
//         onClick={signIn}
//         className="btn border border-dark d-flex align-items-center"
//       >
//         <img
//           src={Google}
//           width="20px"
//           height="20px"
//           className="me-2"
//           alt="Google"
//         />
//         <span className="align-middle">Login with Google</span>
//       </button>
//     </div>
//   );
// }

// export default Login;
