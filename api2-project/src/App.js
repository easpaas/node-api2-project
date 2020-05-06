import React, { useState, useEffect } from "react";
import axios from 'axios';
import "./App.css";

function App() {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/posts")
      .then(response => {
        console.log(response.data);
        setData(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  return (
    <div className="App">
      <h1>Read all about it</h1>
      <div className="Blog">
        {
          data.map(post => {
            return(
              <div key={post.id} className="Post">
                <h2>{post.title}</h2>
                <p>{post.contents}</p>
              </div>
            )
          })
        }
      </div>
    </div>
  );
}

export default App;
