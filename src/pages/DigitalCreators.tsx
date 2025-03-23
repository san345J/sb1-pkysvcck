import { useState, useEffect } from "react";
import { supabase } from "../supabaseClient";

export const DigitalCreators = () => {
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

  return (
    <div className="min-h-screen dark:bg-gray-900 text-white">
      <div className="text-center py-16">
        <h1 className="text-5xl font-bold text-transparent leading-tight bg-clip-text bg-gradient-to-r from-primary-500 to-indigo-500 mb-4">
          Explore Digital Creators
        </h1>
        <p className="text-xl mt-8 max-w-3xl mx-auto mb-8 text-black dark:text-white">
          Discover talented creators who can bring your ideas to life with their
          creative expertise and innovative solutions.
        </p>
      </div>

      <div className="max-w-6xl mx-auto px-6">
        {creators.length === 0 ? (
          <p className="text-center text-lg">No creators found.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {creators.map((creator) => (
              <div
                key={creator.email}
                className="dark:bg-gray-800 p-6 rounded-xl shadow-xl hover:shadow-2xl transition-all transform hover:scale-105"
              >
                <div className="text-center">
                  <h3 className="text-2xl font-semibold text-indigo-400 mb-2">
                    {creator.name}
                  </h3>
                  <p className="text-gray-300 mb-4">{creator.bio}</p>
                  <a
                    href={creator.portfolioLink}
                    className="text-indigo-400 hover:underline"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Visit Portfolio
                  </a>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default DigitalCreators;
