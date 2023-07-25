import { AppBar, IconButton, Toolbar, Typography } from '@mui/material'
import React from 'react'
import { useNavigate } from 'react-router-dom'

function Base({title, description, children}) {
//const history = useHistory() v5
const navigate = useNavigate()
function handleLogut(){
    localStorage.removeItem("token")
    navigate("/login")
}
  return (
    <div className='main-container'>
      <header>
      <nav>
      <AppBar position="static">
  <Toolbar variant="dense">
    <Typography sx={{ mr: 2 }}>  
     Food recipe
    </Typography>


    <IconButton 
    edge="end"
     color="inherit"
     onClick={()=>navigate("/")}
      aria-label="dashboard" sx={{ mr: 2 }}>  
     Dashboard
    </IconButton>

    <IconButton 
    edge="end" 
    color="inherit"
     aria-label="recipe"
     onClick={()=>navigate("/user")}
      sx={{ mr: 2 }}>  
       MyAccount
    </IconButton>

   

    <IconButton 
    edge="end" 
    color="inherit" 
    aria-label="add recipe" 
    onClick={()=>navigate("/login")}
    sx={{ mr: 2 }}>  
     Login
    </IconButton>

   <IconButton 
    edge="end" 
    color="inherit" 
    aria-label="add recipe" 
    onClick={()=>navigate("/signup")}
    sx={{ mr: 2 }}>  
     Signup
    </IconButton>

    <IconButton 
    edge="end" 
    color="inherit" 
    aria-label="add recipe" 
    onClick={handleLogut}
    sx={{ mr: 2 }}>  
     logout
    </IconButton>

  </Toolbar>
</AppBar>
        </nav>
      </header>
      <main>
          <h1>{title}</h1> 
          <h4>{description}</h4>
          <div className='contents'>
                {children}
          </div>
      </main>
    </div>
  )
}

export default Base