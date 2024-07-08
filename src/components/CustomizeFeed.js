import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button, Select } from "antd";

// Sources
const sourceOptions = [
  { label: "ABC News", value: "abc-news" },
  {
    label: "BBC News",
    value: "bbc-news",
  },
  {
    label: "BBC Sport",
    value: "bbc-sport",
  },
  {
    label: "CNN",
    value: "cnn",
  },
  {
    label: "Google News",
    value: "google-news",
  },
  {
    label: "Reuters",
    value: "reuters",
  },
  {
    label: "Bloomberg",
    value: "bloomberg",
  },
  {
    label: "Business Insider",
    value: "business-insider",
  },
];

// Possible options: business entertainment general health science sports technology. Default: all categories.
const categoryOptions = [
  {
    label: "Business",
    value: "business",
  },
  {
    label: "Entertainment",
    value: "entertainment",
  },
  {
    label: "General",
    value: "general",
  },
  {
    label: "Health",
    value: "health",
  },
  {
    label: "Science",
    value: "science",
  },
  {
    label: "Sports",
    value: "sports",
  },
  {
    label: "Technology",
    value: "technology",
  },
];

// Authors
const authorOptions = [
  {
    label: "Theron Mohamed",
    value: "Theron-Mohamed",
  },
  {
    label: "Richard Lawler",
    value: "Richard-Lawler",
  },
  {
    label: "Dua Rashid",
    value: "Dua-Rashid",
  },
  {
    label: "Mat Smith",
    value: "Mat-Smith",
  },
];

const CustomizeFeed = () => {
  const [userPreferences, setUserPreferences] = useState({
    sources: [],
    categories: [],
    authors: [],
  });
  const userId = localStorage.getItem("userId");

  // Fetch user preferences
  useEffect(() => {
    const fetchPreferences = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5001/api/news/preferences/${userId}`,
        );
        setUserPreferences(response.data);
      } catch (err) {
        console.error("Error fetching preferences", err);
      }
    };
    fetchPreferences().catch((e) => console.error(e));
  }, [userId]);

  // Save user preferences
  const handleSavePreferences = async () => {
    try {
      await axios.post(`http://localhost:5001/api/news/preferences`, {
        userId,
        sources: userPreferences.sources,
        categories: userPreferences.categories,
        authors: userPreferences.authors,
      });
      alert("Preferences saved");
    } catch (err) {
      alert("Error saving preferences");
    }
  };

  const handleInputChange = (type, value) => {
    setUserPreferences({
      ...userPreferences,
      [type]: value,
    });
  };
  console.log(userPreferences);
  return (
    <div>
      <h2>Customize Your News Feed</h2>
      <div style={{ marginBottom: "15px" }}>
        <label>Preferred Sources:</label>
        <Select
          mode="multiple"
          style={{
            width: "100%",
          }}
          value={userPreferences.sources}
          placeholder="Select one or more source"
          onChange={(value) => handleInputChange("sources", value)}
          options={sourceOptions}
        />
      </div>
      <div style={{ marginBottom: "15px" }}>
        <label>Preferred Categories:</label>
        <Select
          mode="multiple"
          style={{
            width: "100%",
          }}
          value={userPreferences.categories}
          placeholder="Select one or more category"
          onChange={(value) => handleInputChange("categories", value)}
          options={categoryOptions}
        />
      </div>
      <div style={{ marginBottom: "15px" }}>
        <label>Preferred Authors:</label>
        <Select
          mode="multiple"
          style={{
            width: "100%",
          }}
          value={userPreferences.authors}
          placeholder="Select one or more author"
          onChange={(value) => handleInputChange("authors", value)}
          options={authorOptions}
        />
      </div>
      <Button type="primary" onClick={handleSavePreferences}>
        Save Preferences
      </Button>
    </div>
  );
};

export default CustomizeFeed;
