import { useState } from "react";
import { supabase } from "../supabaseClient";
import { useNavigate } from "react-router-dom";

const AuthPage = ({ isRegister }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState("digital creator");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (isRegister && password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
        if (isRegister) {
          const { data, error } = await supabase
            .from("users")
            .insert([{ email, password, role, created_at: new Date() }]);
  
          if (error) throw error;

          navigate("/login");
        } else {
          const { data, error } = await supabase
            .from("users")
            .select("*")
            .eq("email", email)
            .single();
  
          if (error || !data) throw new Error("Invalid credentials");
  
          const userRole = data.role;
  
          localStorage.setItem('user', JSON.stringify(data));
  
          navigate(userRole === "digital creator" ? "/dashboard/creator" : "/dashboard/client");
        }
      } catch (err) {
        setError(err.message);
      }
    };

  return (
    <div className="flex items-center justify-center min-h-screen text-white dark:bg-gray-900">
      <div className="bg-gray-900 dark:bg-gray-800 p-8 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-bold mb-6 text-center">
          {isRegister ? "Create Account" : "Login"}
        </h2>
        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 rounded bg-gray-800 text-white dark:bg-gray-700"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 rounded bg-gray-800 text-white dark:bg-gray-700"
            required
          />
          {isRegister && (
            <>
              <input
                type="password"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full p-3 rounded bg-gray-800 text-white dark:bg-gray-700"
                required
              />
              <select
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="w-full p-3 rounded bg-gray-800 text-white dark:bg-gray-700"
              >
                <option value="digital creator">Digital Creator</option>
                <option value="client">Client</option>
              </select>
            </>
          )}
          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-600 p-3 rounded font-bold transition dark:bg-blue-600 dark:hover:bg-blue-700"
          >
            {isRegister ? "Sign Up" : "Login"}
          </button>
        </form>
        <p className="text-center mt-4 text-sm">
          {isRegister ? (
            <span>
              Already have an account? <a href="/login" className="text-blue-400">Login</a>
            </span>
          ) : (
            <span>
              Don't have an account? <a href="/register" className="text-blue-400">Sign Up</a>
            </span>
          )}
        </p>
      </div>
    </div>
  );
};

export default AuthPage;
