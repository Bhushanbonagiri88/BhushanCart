// // import React, { useState, useEffect } from "react";
// // import { useNavigate } from "react-router-dom";
// // import { useDispatch, useSelector } from "react-redux";
// // import { loginUser } from "./Store"; // ✅ import action from your store

// // function Login() {
// //   const [formData, setFormData] = useState({ username: "", password: "" });
// //   const [errors, setErrors] = useState({});
// //   const [message, setMessage] = useState("");

// //   const navigate = useNavigate();
// //   const dispatch = useDispatch();

// //   // ✅ Redux state
// //   const { isAuthenticated, currentUsername } = useSelector(
// //     (state) => state.registerUser
// //   );

// //   const handleChange = (e) => {
// //     setFormData((prev) => ({
// //       ...prev,
// //       [e.target.name]: e.target.value,
// //     }));
// //   };

// //   const validate = () => {
// //     let tempErrors = {};
// //     if (!formData.username.trim()) tempErrors.username = "Username is required";
// //     if (!formData.password.trim()) tempErrors.password = "Password is required";
// //     return tempErrors;
// //   };

// //   const handleSubmit = (e) => {
// //     e.preventDefault();
// //     const tempErrors = validate();
// //     if (Object.keys(tempErrors).length > 0) {
// //       setErrors(tempErrors);
// //       return;
// //     }

// //     setErrors({});
// //     dispatch(loginUser(formData)); // ✅ check against Redux users
// //   };

// //   useEffect(() => {
// //     if (isAuthenticated) {
// //       alert(`✅ Login successful. Welcome ${currentUsername}!`);
// //       navigate("/Orders");
// //     } else if (isAuthenticated === false && formData.username && formData.password) {
// //       setMessage("❌ Invalid username or password");
// //     }
// //   }, [isAuthenticated, currentUsername, navigate, formData]);

// //   return (
// //     <div
// //       className="d-flex justify-content-center align-items-center"
// //       style={{ minHeight: "100vh", background: "#f8f9fa" }}
// //     >
// //       <div className="card shadow p-4" style={{ width: "350px", borderRadius: "12px" }}>
// //         <h3 className="text-center mb-4 text-primary">Login</h3>
// //         {message && <div className="alert alert-danger text-center">{message}</div>}
// //         <form onSubmit={handleSubmit}>
// //           <div className="mb-3">
// //             <label className="form-label">Username</label>
// //             <input
// //               type="text"
// //               name="username"
// //               value={formData.username}
// //               onChange={handleChange}
// //               className="form-control"
// //               placeholder="Enter username"
// //             />
// //             {errors.username && <small className="text-danger">{errors.username}</small>}
// //           </div>
// //           <div className="mb-3">
// //             <label className="form-label">Password</label>
// //             <input
// //               type="password"
// //               name="password"
// //               value={formData.password}
// //               onChange={handleChange}
// //               className="form-control"
// //               placeholder="Enter password"
// //             />
// //             {errors.password && <small className="text-danger">{errors.password}</small>}
// //           </div>
// //           <button type="submit" className="btn btn-primary w-100">
// //             Login
// //           </button>
// //         </form>
// //         <p className="text-center mt-3">
// //           Don't have an account?{" "}
// //           <a href="/register" className="text-decoration-none text-primary">
// //             Register here
// //           </a>
// //         </p>
// //       </div>
// //     </div>
// //   );
// // }

// // export default Login;




// // Login.js
// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import { loginUser } from "./Store";

// function Login() {
//   const [formData, setFormData] = useState({ username: "", password: "" });
//   const [errors, setErrors] = useState({});
//   const [message, setMessage] = useState("");

//   const navigate = useNavigate();
//   const dispatch = useDispatch();

//   const { isAuthenticated, currentUsername } = useSelector(
//     (state) => state.registerUser
//   );

//   const handleChange = (e) => {
//     setFormData((prev) => ({
//       ...prev,
//       [e.target.name]: e.target.value,
//     }));
//     setMessage(""); // Reset message on input change
//   };

//   const validate = () => {
//     let tempErrors = {};
//     if (!formData.username.trim()) tempErrors.username = "Username is required";
//     if (!formData.password.trim()) tempErrors.password = "Password is required";
//     return tempErrors;
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     const tempErrors = validate();
//     if (Object.keys(tempErrors).length > 0) {
//       setErrors(tempErrors);
//       return;
//     }
//     setErrors({});
//     dispatch(loginUser(formData));
//   };

//    useEffect(() => {
//     if (isAuthenticated === true) {
//       alert(`✅ Login successful. Welcome ${currentUsername}!`);
//       navigate("/orders");
//     } else if (isAuthenticated === false) {
//       setMessage("❌ Invalid username or password");
//     }
//   }, [isAuthenticated, currentUsername, navigate]);

//   return (
//     <div
//       className="d-flex justify-content-center align-items-center"
//       style={{ minHeight: "100vh", background: "#f8f9fa" }}
//     >
//       <div className="card shadow p-4" style={{ width: "350px", borderRadius: "12px" }}>
//         <h3 className="text-center mb-4 text-primary">Login</h3>
//         {message && <div className="alert alert-danger text-center">{message}</div>}
//         <form onSubmit={handleSubmit}>
//           <div className="mb-3">
//             <label className="form-label">Username</label>
//             <input
//               type="text"
//               name="username"
//               value={formData.username}
//               onChange={handleChange}
//               className="form-control"
//               placeholder="Enter username"
//             />
//             {errors.username && <small className="text-danger">{errors.username}</small>}
//           </div>
//           <div className="mb-3">
//             <label className="form-label">Password</label>
//             <input
//               type="password"
//               name="password"
//               value={formData.password}
//               onChange={handleChange}
//               className="form-control"
//               placeholder="Enter password"
//             />
//             {errors.password && <small className="text-danger">{errors.password}</small>}
//           </div>
//           <button type="submit" className="btn btn-primary w-100">
//             Login
//           </button>
//         </form>
//         <p className="text-center mt-3">
//           Don't have an account?{" "}
//           <a href="/register" className="text-decoration-none text-primary">
//             Register here
//           </a>
//         </p>
//       </div>
//     </div>
//   );
// }

// export default Login;



import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "./Store";

function Login() {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState("");
  const [hasSubmitted, setHasSubmitted] = useState(false); // ✅ track submit

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { isAuthenticated, currentUsername } = useSelector(
    (state) => state.registerUser
  );

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
    setMessage(""); // reset message while typing
  };

  const validate = () => {
    let tempErrors = {};
    if (!formData.username.trim()) tempErrors.username = "Username is required";
    if (!formData.password.trim()) tempErrors.password = "Password is required";
    return tempErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const tempErrors = validate();
    if (Object.keys(tempErrors).length > 0) {
      setErrors(tempErrors);
      return;
    }
    setErrors({});
    setHasSubmitted(true); // ✅ mark submit
    dispatch(loginUser(formData));
  };

  useEffect(() => {
    if (isAuthenticated === true) {
      alert(`✅ Login successful. Welcome ${currentUsername}!`);
      navigate("/orders");
    } else if (isAuthenticated === false && hasSubmitted) {
      setMessage("❌ Invalid username or password");
    }
  }, [isAuthenticated, currentUsername, navigate, hasSubmitted]);

  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{ minHeight: "100vh", background: "#f8f9fa" }}
    >
      <div
        className="card shadow p-4"
        style={{ width: "350px", borderRadius: "12px" }}
      >
        <h3 className="text-center mb-4 text-primary">Login</h3>

        {message && (
          <div className="alert alert-danger text-center">{message}</div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Username</label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              className="form-control"
              placeholder="Enter username"
            />
            {errors.username && (
              <small className="text-danger">{errors.username}</small>
            )}
          </div>

          <div className="mb-3">
            <label className="form-label">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="form-control"
              placeholder="Enter password"
            />
            {errors.password && (
              <small className="text-danger">{errors.password}</small>
            )}
          </div>

          <button type="submit" className="btn btn-primary w-100">
            Login
          </button>
        </form>

        <p className="text-center mt-3">
          Don't have an account?{" "}
          <a href="/register" className="text-decoration-none text-primary">
            Register here
          </a>
        </p>
      </div>
    </div>
  );
}

export default Login;

