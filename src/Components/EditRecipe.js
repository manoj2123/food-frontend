import React, { useEffect, useState } from "react"
import Base from "../Base/Base"
import { useNavigate, useParams } from "react-router-dom"
import { Button, TextField, Typography } from "@mui/material"
const EditRecipe = ({userData, setUserData}) =>{
    const [name, setname] = useState("")
    const [image, setimage] = useState("")
    const [title, settitle] = useState("")
    const [description, setdescription] = useState("")
    const [ingredients, setingredients] = useState("")
    const [instructions, setinstructions] = useState("")
    const [error, setError] = useState("")
    const [sucessMsg, setSucessMessage] = useState("")
    const {id, token} = useParams();
    const navigate = useNavigate()
    console.log()
    useEffect(()=>{
       const data = userData?.find((data)=>data._id === id)
       if(data){
        setname(data.name)
        setimage(data.image)
        settitle(data.title)
        setdescription(data.description)
        setingredients(data.ingredients)
        setinstructions(data.instructions)
       }
    }, [id, userData])

    async function handleEditrecipe(){

        const editedrecipe = {
            name,
            image,
            title,
            description,
            ingredients,
            instructions
        }

        const res = await fetch(`https://food-backend-qake.onrender.com/recipe/edit/${id}`, {
            method:"PUT",
            body:JSON.stringify(editedrecipe),
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
         const userindex = userData?.findIndex((data, idx)=>data._id === id);
         userData[userindex] = data.data;
          await setUserData([...userData])
          setSucessMessage(data.message)
    }

    return (
        <Base>
                  <form>
          <TextField label="name" variant="outlined" fullWidth sx={{ m: 1 }}
        placeholder="Enter the name"
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
        type="submit"        variant ="contained"
        onClick={handleEditrecipe}
        >Edit recipe</Button>


       <Button
        type="submit"        variant ="contained"
        onClick={()=>navigate("/user")}
        >Home</Button>

       {error? 
        <Typography color={"danger"}>
           {error}
        </Typography> : "" }

        {sucessMsg? 
        <Typography color={"success"}>
           {sucessMsg}
        </Typography> : "" }
          </form>
        
        </Base>
    )
}

export default EditRecipe