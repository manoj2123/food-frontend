import React, { useState } from "react"
import Base from "../Base/Base"
import { Button, TextField, Typography } from "@mui/material"
import { useNavigate, useParams } from "react-router-dom"
const Addrecipe = ({userData, setUserData}) =>{
     const {token} = useParams();
    const [name, setname] = useState("")
    const [image, setimage] = useState("")
    const [title, settitle] = useState("")
    const [description, setdescription] = useState("")
    const [ingredients, setingredients] = useState("")
    const [instructions, setinstructions] = useState("")
    const [error, setError] = useState("")
    const [sucessMsg, setSucessMessage] = useState("")
    const navigate = useNavigate()
    



 
  let tokenId = localStorage.getItem("token");


// const handleImageChange = (e) => {
//     setImage(e.target.value);
//   };
    async function postNewrecipe(){
        const newrecipe = {
            name,
            image :image,
            title,
            description,
            ingredients,
            instructions
        }
        const res = await fetch(`https://food-backend-qake.onrender.com/recipe/add`, {
            method:"POST",
            body:JSON.stringify(newrecipe),
            headers: {
                "Content-Type":"application/json",
                "x-auth-token": token,
            }
        });

        const data = await res.json();
       if(!data.data){
          setError(data.message)
          setSucessMessage("")
       }
       setUserData([...userData, data.data])
       setSucessMessage(data.message)
       navigate("/")
    }

    return (
        <Base>
        <div className="box-part">
          <div className="forms">
             {/* <img src={Image} alt="recipe" style={{ width: "200px", height: "200px", marginBottom: "10px" }} /> */}
          <TextField label="Name" variant="outlined" fullWidth sx={{ m: 1 }}
        placeholder="Enter the Name"
        value={name}
        onChange={(e)=>setname(e.target.value)}
        type="text"/>




        <TextField label="image" variant="outlined" fullWidth sx={{ m: 1 }}
        placeholder="Enter the image"
        type="text"
        value={image}
        onChange={(e)=>setimage(e.target.value)}
        />



             <TextField label="title" variant="outlined" fullWidth sx={{ m: 1 }}
        placeholder="Enter the title"
        type="text"
        value={title}
        onChange={(e)=>settitle(e.target.value)}
        />


             <TextField label="description" variant="outlined" fullWidth sx={{ m: 1 }}
        placeholder="Enter the description"
        type="text"
        value={description}
        onChange={(e)=>setdescription(e.target.value)}
        />



        <TextField label="ingredients" variant="outlined" fullWidth sx={{ m: 1 }}
        placeholder="Enter the ingredients"
        type="text"
        value={ingredients}
        onChange={(e)=>setingredients(e.target.value)}
        />


       <TextField label="instructions" 
       variant="outlined" fullWidth sx={{ m: 1}}
       inputProps={{sx:{height: 100}}}
        placeholder="Enter the instructions"
        type="text"
        value={instructions}
        onChange={(e)=>setinstructions(e.target.value)}
        />

        <Button
        type="submit"  variant ="contained"
        onClick={postNewrecipe}
        >Add recipe</Button>

{/* <Button edge="end" color="inherit" aria-label="add recipe" onClick={() => navigate(`/add/${tokenId}`)} sx={{ mr: 2 }}>
          Add recipe
        </Button> */}


       {error? 
        <Typography color={"danger"}>
           {error}
        </Typography> : "" }

        {sucessMsg? 
        <Typography color={"danger"}>
           {sucessMsg}
        </Typography> : "" }
          </div>
        </div>
        </Base>
    )
}

export default Addrecipe