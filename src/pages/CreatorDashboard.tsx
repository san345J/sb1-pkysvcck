import { useState, useEffect } from "react";
import { supabase } from "../supabaseClient";
import { useNavigate } from "react-router-dom";
import RatingsDisplay from "./RatingsDisplay";

const CreatorDashboard = () => {
  const [profileData, setProfileData] = useState({
    name: "",
    bio: "",
    email: "",
    portfolioLink: "",
    user_type: "creator", // default user type
    created_at: "",
    user_id: "",
  });
  const [ratings, setRatings] = useState([]);
  const [averageRating, setAverageRating] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const userData = JSON.parse(localStorage.getItem("user"));
  useEffect(() => {
    
    if (!userData) {
      navigate("/login"); // Redirect to login if no user data found
      return;
    }

    const fetchProfile = async () => {
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("email", userData.email)
        .single();

      if (error) {
        setProfileData({
          name: "Your Name",
          bio: "This is your bio.",
          portfolioLink: "https://yourportfolio.com",
          user_type: "creator",
          created_at: new Date().toISOString(),
          user_id: userData.id,
          email: userData.email,
        });
      } else {
        setProfileData({
          name: data.name,
          bio: data.bio,

          email: userData.email,
          portfolioLink: data.portfolioLink,
          user_type: data.user_type,
          created_at: data.created_at,
          user_id: userData.id,
        });
      }
    };

    const fetchRatings = async () => {
      const userData = JSON.parse(localStorage.getItem("user"));

      if (userData) {
        const { data, error } = await supabase
          .from("ratings")
          .select("rating, client_email")
          .eq("creator_email", userData.email);

        if (error) {
          setError("Failed to fetch ratings.");
        } else {
          setRatings(data);
          // Calculate the average rating
          const average =
            data.reduce((sum, rating) => sum + rating.rating, 0) / data.length;
          setAverageRating(average.toFixed(1));
        }
      }
    };
    fetchRatings();
    fetchProfile();
  }, [navigate]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setProfileData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      // Check if the email in userData matches the profileData email
      if (userData.email === profileData.email) {
        // First, delete the profile that matches the userData.email
        const { data: deleteData, error: deleteError } = await supabase
          .from("profiles")
          .delete()
          .eq("email", userData.email);

        if (deleteError) {
          setError("Error deleting existing profile.");
          return;
        }
      }

      const { data, error } = await supabase
        .from("profiles")
        .upsert([profileData]);

      if (error) {
        setError("Error saving profile data.");
      } else {
        setEditMode(false);
        alert("Profile updated successfully!");
      }
    } catch (err) {
      setError("Failed to save profile.");
    }
  };

  return (
    <div className="min-h-screen flex  text-white  dark:bg-gray-900">
      <div className="flex-1 p-8  ">
        <h1 className="text-4xl font-bold mb-6 text-center text-black dark:text-white">
          Digital Creator Dashboard
        </h1>

        {error && <p className="text-red-500 mb-4 text-center">{error}</p>}

        {editMode ? (
          <form
            onSubmit={handleSubmit}
            className="space-y-6 max-w-lg mx-auto bg-gray-800 p-6 rounded-xl shadow-md dark:bg-gray-700 mb-10"
          >
            <h2 className="text-3xl font-bold mb-4">Edit Profile</h2>
            <input
              type="text"
              name="name"
              value={profileData.name}
              onChange={handleChange}
              placeholder="Full Name"
              className="w-full p-4 rounded-lg bg-gray-700 text-white shadow-md dark:bg-gray-600"
            />
            <textarea
              name="bio"
              value={profileData.bio}
              onChange={handleChange}
              placeholder="Bio"
              className="w-full p-4 rounded-lg bg-gray-700 text-white shadow-md dark:bg-gray-600"
            />
            <input
              type="url"
              name="portfolioLink"
              value={profileData.portfolioLink}
              onChange={handleChange}
              placeholder="Portfolio Link"
              className="w-full p-4 rounded-lg bg-gray-700 text-white shadow-md dark:bg-gray-600"
            />
            <input
              type="text"
              name="user_type"
              value={profileData.user_type}
              onChange={handleChange}
              placeholder="User Type"
              className="w-full p-4 rounded-lg bg-gray-700 text-white shadow-md dark:bg-gray-600"
            />
            <button
              type="submit"
              className="w-full bg-primary hover:bg-primary-dark p-4 rounded-lg font-bold transition dark:bg-primary dark:hover:bg-primary-dark"
            >
              Save Changes
            </button>
          </form>
        ) : (
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg max-w-lg mx-auto dark:bg-gray-700 mb-10">
            {profileData.name ? (
              <>
                <h2 className="text-3xl font-bold mb-4">View Profile</h2>
                <p className="text-lg mb-2">
                  <strong>Name:</strong> {profileData.name}
                </p>
                <p className="text-lg mb-2">
                  <strong>Bio:</strong> {profileData.bio}
                </p>
                <p className="text-lg mb-2">
                  <strong>Portfolio:</strong>
                  <a
                    href={profileData.portfolioLink}
                    className="text-blue-400"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {profileData.portfolioLink}
                  </a>
                </p>
                <p className="text-lg mb-2">
                  <strong>User Type:</strong> {profileData.user_type}
                </p>
                <p className="text-lg mb-2">
                  <strong>Account Created:</strong>{" "}
                  {new Date(profileData.created_at).toLocaleDateString()}
                </p>
                <button
                  onClick={() => setEditMode(true)}
                  className="mt-4 w-full bg-primary hover:bg-primary-dark p-4 rounded-lg font-bold transition dark:bg-primary dark:hover:bg-primary-dark"
                >
                  Edit Profile
                </button>
              </>
            ) : (
              <div className="text-center">
                <h2 className="text-2xl font-bold mb-4">
                  No profile data found.
                </h2>
                <button
                  onClick={() => setEditMode(true)}
                  className="w-full bg-primary hover:bg-primary-dark p-4 rounded-lg font-bold transition dark:bg-primary dark:hover:bg-primary-dark"
                >
                  Create Profile
                </button>
              </div>
            )}
          </div>
        )}

        {profileData.email && (
          <RatingsDisplay creatorEmail={profileData.email} />
        )}
      </div>
    </div>
  );
};

export default CreatorDashboard;
