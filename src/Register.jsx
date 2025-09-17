import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { registerUser } from "./Store";  // ✅ use the renamed export
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Register() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const password = watch("password");

  // -------- FORM SUBMIT --------
  const onSubmit = (data) => {
  dispatch(
    registerUser({
      username: data.username,
      email: data.email,
      password: data.password,
    })
  );


    // 2️⃣ Show success message
    toast.success("✅ Registered Successfully!", {
      position: "top-right",
    });

    // 3️⃣ Redirect to login page
    navigate("/login");
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{ minHeight: "100vh" }}
    >
      <div
        className="card shadow-lg p-4"
        style={{ width: "400px", borderRadius: "15px" }}
      >
        <h2 className="text-center mb-4 text-success">📝 Register</h2>

        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Username */}
          <div className="mb-3">
            <label className="form-label fw-bold">Username</label>
            <input
              type="text"
              className="form-control"
              {...register("username", { required: "Username is required" })}
            />
            {errors.username && (
              <small className="text-danger">{errors.username.message}</small>
            )}
          </div>

          {/* Email */}
          <div className="mb-3">
            <label className="form-label fw-bold">Email</label>
            <input
              type="email"
              className="form-control"
              {...register("email", { required: "Email is required" })}
            />
            {errors.email && (
              <small className="text-danger">{errors.email.message}</small>
            )}
          </div>

          {/* Password */}
          <div className="mb-3">
            <label className="form-label fw-bold">Password</label>
            <input
              type="password"
              className="form-control"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters",
                },
              })}
            />
            {errors.password && (
              <small className="text-danger">{errors.password.message}</small>
            )}
          </div>

          {/* Confirm Password */}
          <div className="mb-3">
            <label className="form-label fw-bold">Confirm Password</label>
            <input
              type="password"
              className="form-control"
              {...register("confirmPassword", {
                required: "Confirm password is required",
                validate: (value) =>
                  value === password || "Passwords do not match",
              })}
            />
            {errors.confirmPassword && (
              <small className="text-danger">
                {errors.confirmPassword.message}
              </small>
            )}
          </div>

          {/* Submit Button */}
          <button type="submit" className="btn btn-success w-100 fw-bold">
            Register
          </button>
        </form>
      </div>
    </div>
  );
}

export default Register;
