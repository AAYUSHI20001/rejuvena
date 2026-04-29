import { useState } from "react";
import { supabase } from "../supabaseClient";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";
 import './UpdatePassword.css';
function UpdatePassword() {
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleUpdatePassword = async (e) => {
    e.preventDefault();

    const { error } = await supabase.auth.updateUser({
      password: password,
    });

    if (error) {
      toast.error(error.message);
    } else {
      toast.success("Password updated successfully!");

      setTimeout(() => {
        navigate("/login");
      }, 1500);
    }
  };
 

  return (
    <div className="update-page">
      <ToastContainer position="top-right" autoClose={2000} />
      <div className="update-box">
        <h2>Update Password</h2>

        <form onSubmit={handleUpdatePassword}>
          <input
            type="password"
            placeholder="New Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button type="submit">Update Password</button>
        </form>
      </div>
    </div>
  );
}

export default UpdatePassword;