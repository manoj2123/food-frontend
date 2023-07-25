import React, { useEffect, useState } from "react";
import Base from "../Base/Base";
import { Button, Paper, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

const UserPage = ({ userData, setUserData }) => {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [tokenId, setTokenId] = useState("");

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/login", { replace: true });
    }
    let token = localStorage.getItem("token");
    setTokenId(token);

    const fetchUserData = async (token) => {
        try {
          const res = await fetch(`https://food-backend-qake.onrender.com/recipe/user`, {
            method: "GET",
            headers: {
              "x-auth-token": token,
            },
          });
     
          const data = await res.json();
     
          if (!data || !Array.isArray(data.data)) {
            setError("Data format error or no data received.");
          } else {
            setUserData(data.data);
          }
        } catch (error) {
          setError("An unexpected error occurred. Please try again later.");
        }
      };
    fetchUserData(token);
  }, [navigate,setUserData]);

  return (
    <Base>
      <div>
        <Button edge="end" color="inherit" aria-label="add recipe" onClick={() => navigate(`/add/${tokenId}`)} sx={{ mr: 2 }}>
          Add recipe
        </Button>
      </div>

      {userData && userData.length > 0 ? (
        <div>
          {userData.map((data,index) => (
            <Paper elevation={6} key={data._id}>
              <p>name: {data.name}</p>
              <p>title: {data.title}</p>
              <p>instructions: {data.instructions}</p>
              <p>description: {data.description}</p>
              <p>image: {data.image}</p>
              <p>ingredients: {data.ingredients}</p>
             
              <Button onClick={() => navigate(`/edit/${data._id}/${tokenId}`)}>Edit</Button>
              <Button>Delete</Button>
            </Paper>
          ))
          }
        </div>
      ) : (
        <Typography color="info">No data available</Typography>
      )}

      {error && <Typography color="error">{error}</Typography>}
    </Base>
  );
};

export default UserPage;
