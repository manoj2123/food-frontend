import React, { useEffect, useState } from "react"
import Base from "../Base/Base"
import { useNavigate } from "react-router-dom"
import { Paper, Typography } from "@mui/material";
import RecipeDetails from './RecipeDetails';

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
              {/* Display the recipe image */}
              <div className="recipe-image">
                <img src={data.data.image} alt={data.data.title} />
              </div>
              {/* Integrate RecipeDetails to show full details */}
              <RecipeDetails recipe={data.data} />
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