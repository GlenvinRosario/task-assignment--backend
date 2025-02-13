import AxiosInstance from "./../util/axios-config";
import { useEffect, useState } from "react";
import "../styles/Lists.css";
import axios from "axios";
import Navbar from "../components/Navbar";

const Lists = () => {
  const [lists, setLists] = useState([]);
  const [editTitle, setEditTitle] = useState({ id: null, title: "" });

  useEffect(() => {
    fetchLists();
  }, []);

  const fetchLists = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await AxiosInstance.get("/api/lists", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setLists(response?.data);
    } catch (error) {
      console.error("Error fetching lists:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem("token");
      const result = await AxiosInstance.delete(`/api/lists/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      
      setLists((prevLists) => prevLists.filter((list) => list._id !== id));
    } catch (error) {
      console.error("Error deleting list:", error);
    }
  };

  const editTitleName = async (listId, newName) => {
    try {
      const token = localStorage.getItem("token");
      const res = await AxiosInstance.put(`/api/lists/${listId}`,
        { name: newName },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setLists(
        lists.map((list) =>
          list._id === listId ? { ...list, name: newName } : list
        )
      );

      setEditTitle({ id: null, title: "" });
    } catch (error) {
      console.error("Error updating list name:", error);
    }
  };

  return (
    <>
    <div className="lists-container">
      <h2 className="lists-heading">📜 Saved Lists</h2>

      {lists.length === 0 ? <p className="no-lists">No lists found.</p> : null}

      {lists.map((list) => (
        <div key={list._id} className="list-card">
          <h3 className="list-title">
            {editTitle.id === list._id ? (
              <input
                type="text"
                value={editTitle.title}
                onChange={(e) =>
                  setEditTitle({ ...editTitle, title: e.target.value })
                }
              />
            ) : (
              list.name
            )}
            {editTitle.id === list._id ? (
              <button onClick={() => editTitleName(list._id, editTitle.title)}>
                ✅
              </button>
            ) : (
              <button
                className="edit-btn"
                onClick={() => setEditTitle({ id: list._id, title: list.name })}
              >
                ✏️
              </button>
            )}
            <button
              className="delete-btn"
              onClick={() => handleDelete(list._id)}
            >
              ❌
            </button>
          </h3>
          <p className="list-date">
            Created on: {new Date(list.created_at).toLocaleString()}
          </p>

          {list.images && list.images.length > 0 ? (
            <div className="image-grid">
              {list.images.map((img) => (
                <div key={img._id} className="image-item">
                  <img src={`${img.url}.jpg`} alt={img.title} className="image" />
                </div>
              ))}
            </div>
          ) : (
            <p className="no-images">No images available.</p>
          )}
        </div>
      ))}
    </div>
    </>
  );
};

export default Lists;
