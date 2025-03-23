import { useState, useEffect } from "react";
import { supabase } from "../supabaseClient";

const ClientDashboard = () => {
  const [creators, setCreators] = useState([]);
  const [ratings, setRatings] = useState({});
  const [error, setError] = useState("null");

  useEffect(() => {
    const fetchCreators = async () => {
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("user_type", "creator");

      if (error) {
        setError("Failed to fetch creators");
      } else {
        setCreators(data);
      }
    };

    fetchCreators();
  }, []);

  const handleRatingChange = (creatorEmail, rating) => {
    setRatings((prevRatings) => {
      // Creating a new object to ensure no mutations and proper update
      const newRatings = { ...prevRatings, [creatorEmail]: rating };
      return newRatings;
    });
  };

  const handleSubmitRating = async (creatorEmail) => {
    const clientEmail = JSON.parse(localStorage.getItem("user")).email; // Get the logged-in client's email

    try {
      const { data, error } = await supabase.from("ratings").upsert([
        {
          client_email: clientEmail,
          creator_email: creatorEmail,
          rating: ratings[creatorEmail], // Using the correct creator's rating
        },
      ]);

      if (error) {
        setError("Failed to submit rating.");
        console.error(error);
      } else {
        alert("Rating submitted successfully!");
      }
    } catch (err) {
      console.error("Error submitting rating:", err);
      setError("Failed to save rating.");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white">
      <h1 className="text-4xl font-bold mb-4">Client Dashboard</h1>
      <p>Welcome, explore and manage your digital projects.</p>
      <div className="mt-8 w-full max-w-4xl">
        <h2 className="text-3xl font-semibold text-center mb-6">Creators</h2>
        {creators.length === 0 ? (
          <p>No creators found.</p>
        ) : (
          <div className="space-y-4">
            {creators.map((creator) => (
              <div key={creator.email} className="bg-gray-800 p-4 rounded-lg">
                <h3 className="text-2xl">{creator.name}</h3>
                <h3 className="my-2">{creator.bio}</h3>
                <h3 className="my-2">{creator.portfolioLink}</h3>
                <div className="flex items-center space-x-2 mt-2">
                  <label className="text-lg">Rate this creator:</label>
                  <select
                    value={ratings[creator.email] || 0}
                    onChange={(e) => handleRatingChange(creator.email, parseInt(e.target.value))}
                    className="bg-gray-700 p-2 rounded"
                  >
                    <option value="0" disabled>
                      Select Rating
                    </option>
                    {[1, 2, 3, 4, 5].map((rate) => (
                      <option key={rate} value={rate}>
                        {rate}
                      </option>
                    ))}
                  </select>
                  <button
                    onClick={() => handleSubmitRating(creator.email)}
                    className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded"
                  >
                    Submit Rating
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ClientDashboard;
