import AxiosInstance from './../util/axios-config'
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Search.css";

const Search = () => {
  const [query, setQuery] = useState("");
  const [images, setImages] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [listName, setListName] = useState("");
  const navigate = useNavigate();

  const handleSearch = async () => {
    if (!query) return;

    setError("");
    setLoading(true);
    setImages([]);

    try {
      const response = await AxiosInstance.get(`/${query}`);
    
      if(response.data.length>0) {
        setImages(response.data);
      }else {
        setError("Image for the Status is Not Present")
      }
      
    } catch (error) {
      console.error("Error fetching images:", error);
      setError("API error, please try again.");
    } finally {
      setLoading(false);
    }
  };
  
  const handleSave = async () => {
    if (!listName) {
      setError("Enter a list name before saving.");
      return;
    }
  
    const tokenData = localStorage.getItem("token"); 
    if (!tokenData) {
      setError("User not authenticated.");
      return;
    }
  
    try {
      await AxiosInstance.post(
        "/save",
        {
          name: listName,
          images,
        },
        {
          headers: {
            Authorization: `Bearer ${tokenData}`, 
          },
        }
      );
  
      navigate("/lists");
    } catch (error) {
      console.error("Error saving list:", error.response?.data || error);
      setError("Error saving list. Try again.");
    }
  };
  
  
  

  return (
    <div className="search-container">
      <h2> Search HTTP Status Codes</h2>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Enter status code (e.g., 203, 2xx, 20x)"
      />
      <button onClick={handleSearch} disabled={loading}>
        {loading ? "Searching..." : "Search"}
      </button>

      {images.length > 0 && (
        <>
          <input
            type="text"
            value={listName}
            onChange={(e) => setListName(e.target.value)}
            placeholder="Enter list name"
          />
          <button onClick={handleSave}>Save</button>
        </>
      )}

      {error && <p className="error-message">{error}</p>}

      <div className="results-grid">
        {images.map((img) => (
          <div key={img.status_code} className="result-item">
            <h3>{img.status_code}</h3>
            <img src={img.image.jpg} alt={img.title} className="result-image" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Search;

