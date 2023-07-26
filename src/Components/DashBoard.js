import React, { useEffect, useState } from "react"
import Base from "../Base/Base"
import { useNavigate } from "react-router-dom"
import { Paper, Typography } from "@mui/material";

const Dashboard = () => {
    const [recipe, setrecipe] = useState([]);
    const [error, setError] = useState("");
    const navigate = useNavigate()
    useEffect(() => {
        if (!localStorage.getItem("token")) {
            navigate("/", { replace: true })
        }
        let token = localStorage.getItem("token")
        const fetchAllData = async () => {
            const res = await fetch(`https://food-backend-qake.onrender.com/recipe/all`, {
                method: "GET",
                headers: {
                    "x-auth-token": token
                }
            });
            const data = await res.json()
            if (!data.data) {
                setError(data.message)

            }
            setrecipe(data.data)
            console.log(recipe)
        }
        fetchAllData()
    }, [navigate, recipe])



    return (
        <Base>
          <Typography className="recipe-heading">Recipes</Typography>
          {recipe && (
            <div className="container">
              {recipe?.map((data, index) => (
                <Paper elevation={6} key={data._id} className="recipe-card">
                 <p className="recipe-name"> {data.data.name}</p>
                  <div className="recipe-image">
                    <img src={data.data.image} alt={data.data.title} />
                  </div>
                  <div className="recipe-details">
                    <p className="recipe-title">Title: {data.data.title}</p>
                    <p className="recipe-description">Description: {data.data.description}</p>
                    <p className="recipe-ingredients">Ingredients: {data.data.ingredients}</p>
                    <p className="recipe-instructions">Instructions: {data.data.instructions}</p>
                  </div>
                </Paper>
              ))}
            </div>
          )}
          {error ? (
            <Typography className="error-message" color={"danger"}>
              {error}
            </Typography>
          ) : (
            ""
          )}
        </Base>
      );
    };
export default Dashboard