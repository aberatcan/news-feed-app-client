import React, { useEffect, useState } from "react";
import axios from "axios";
import Articles from "./Articles";

const PreferredFeed = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    const preferencesResponse = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5001/api/news/preferred-feed/${userId}`,
        );
        setArticles(response.data);
        console.log(response.data);
      } catch (err) {
        console.error("Error fetching preferences", err);
      }
    };
    preferencesResponse();
  }, []);

  useEffect(() => {
    if (articles) setLoading(false);
  }, [articles]);

  if (loading) {
    return <div>Loading</div>;
  }

  return (
    <div>
      <h2>Preferred Feed</h2>
      {articles.length === 0 ? (
        <p>No articles found</p>
      ) : (
        <Articles articles={articles} />
      )}
    </div>
  );
};

export default PreferredFeed;
