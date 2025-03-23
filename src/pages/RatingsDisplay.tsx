import { useState, useEffect } from "react";
import { supabase } from "../supabaseClient";  // Make sure to import your supabase client

const RatingsDisplay = ({ creatorEmail }) => {
  const [ratings, setRatings] = useState([]);
  const [averageRating, setAverageRating] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRatings = async () => {
      const { data, error } = await supabase
        .from("ratings")
        .select("rating, client_email")
        .eq("creator_email", creatorEmail);

      if (error) {
        setError("Failed to fetch ratings.");
      } else {
        setRatings(data);
        // Calculate average rating
        const average = data.reduce((sum, rating) => sum + rating.rating, 0) / data.length;
        setAverageRating(average.toFixed(1)); // Round to 1 decimal point
      }
    };

    if (creatorEmail) {
      fetchRatings();
    }
  }, [creatorEmail]);

  return (
    <div className="space-y-6 bg-gray-800 p-6 rounded-lg">
      <h3 className="text-2xl font-semibold">Ratings Given</h3>

      {error && <p className="text-red-500">{error}</p>}

      {/* Display Average Rating */}
      {averageRating ? (
        <div className="mb-6">
          <h4 className="text-xl font-medium">Average Rating</h4>
          <p className="text-lg">{averageRating} / 5</p>
        </div>
      ) : (
        <p className="text-lg">No ratings yet.</p>
      )}

      {/* Display Individual Ratings */}
      {ratings.length > 0 ? (
        ratings.map((rating, index) => (
          <div key={index} className="bg-gray-700 p-4 rounded-lg">
            <p className="text-lg"><strong>Client Email:</strong> {rating.client_email}</p>
            <p className="text-lg"><strong>Rating:</strong> {rating.rating} / 5</p>
          </div>
        ))
      ) : (
        <p>No ratings available.</p>
      )}
    </div>
  );
};

export default RatingsDisplay;
