import React, { useState } from "react";
import { useSearch } from "../../context/search";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const SearchInput = () => {
  const [values, setValues] = useSearch();
  const navigate = useNavigate();
  const [inputValue, setInputValue] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/product/search/${values.keyword}`
      );
      setValues({ ...values, results: data });
      navigate("/search");
      setInputValue(""); // Clear input value after submission
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e) => {
    setInputValue(e.target.value);
    setValues({ ...values, keyword: e.target.value });
  };

  return (
    <div>
      <form className="form-search form-inline" onSubmit={handleSubmit}>
        <div style={{ position: "relative" }}>
          <input
            className="search-query search-input"
            type="text"
            placeholder="Search..."
            value={inputValue}
            onChange={handleChange}
            style={{ paddingLeft: "26px", borderRadius: "3rem" }}
          />
          <div
            style={{
              content: "''",
              display: "block",
              width: "14px",
              height: "14px",

              backgroundImage:
                "url(http://getbootstrap.com/2.3.2/assets/img/glyphicons-halflings.png)",
              backgroundPosition: "-48px 0",
              position: "absolute",
              top: "11px",
              left: "12px",
              opacity: "0.5",
              zIndex: "1000",
            }}
          ></div>
        </div>
      </form>
    </div>
  );
};

export default SearchInput;
