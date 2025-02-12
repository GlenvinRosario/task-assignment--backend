import AxiosInstance from './../util/axios-config'
import { useEffect, useState } from "react";
import "../styles/Lists.css"; 

const Lists = () => {
  const [lists, setLists] = useState([]);
  

  useEffect(() => {
    const fetchLists = async () => {
      try {
        const token = localStorage.getItem("token"); 

        const response = await AxiosInstance.get("api/lists", {
          headers: {
            Authorization: `Bearer ${token}`, 
          },
        });

       
        setLists(response?.data);
      
      } catch (error) {
        console.error("Error fetching lists:", error);
      }
    };

    fetchLists();
  }, []);


  return (
    <div className="lists-container">
      <h2 className="lists-heading">📜 Saved Lists</h2>

      {lists.length === 0 ? <p className="no-lists">No lists found.</p> : null}

      {lists.map((list) => (
        <div key={list._id} className="list-card">
          <h3 className="list-title">{list.name}</h3>
          
          
          <p className="list-date">
            Created on: {new Date(list.created_at).toLocaleString()}
          </p>


          {list.images && list.images.length > 0 ? (
            <div className="image-grid">
              {list.images.map((img) => (
                <div key={img._id} className="image-item">
                  <img src={`${img.url}.jpg`} alt={img.title} className="image" />
                  <p className="image-caption">{img.title}</p>
                </div>
              ))}
            </div>
          ) : (
            <p className="no-images">No images available.</p>
          )}
        </div>
      ))}
    </div>
  );
};

export default Lists;
