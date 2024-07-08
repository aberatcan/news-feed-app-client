import React from "react";
import axios from "axios";
import { Input } from "antd";
const { Search } = Input;
const SearchButton = ({ setArticles }) => {
  const handleSearch = async (value) => {
    try {
      const res = await axios.get("http://localhost:5001/api/news/search", {
        params: { query: value },
      });
      setArticles(res.data.articles);
    } catch (err) {
      alert("Error fetching articles");
    }
  };

  return (
    <div style={{ marginBottom: "10px" }}>
      <Search
        placeholder="input search text"
        allowClear
        onSearch={handleSearch}
        style={{
          width: 200,
        }}
      />
    </div>
  );
};

export default SearchButton;
