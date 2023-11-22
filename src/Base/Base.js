import { AppBar, IconButton, Toolbar, Typography } from '@mui/material'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '@mui/material';

function Base({title, description, children}) {
//const history = useHistory() v5
const navigate = useNavigate()
let tokenId = localStorage.getItem("token");


function handleAuthentication() {
  if (tokenId) {
    // User is logged in, perform logout
    localStorage.removeItem("token");
    navigate("/login");
  } else {
    // User is not logged in, navigate to login page
    navigate("/login");
  }
}


  return (
    <div className='main-container'>
      <header>
      <nav>
      <AppBar position="static">
  <Toolbar variant="dense">
    
<Typography sx={{ mr: 2, fontSize: '24px', fontWeight: 'bold', color: '#333' }}>
  Food recipe blog
</Typography>



  

<Button
  edge="end"
  color="inherit"
  aria-label="add recipe"
  onClick={() => navigate(`/add/${tokenId}`)}
  sx={{
    marginRight: 2,
    backgroundColor: 'warning.main', 
    color: 'pink', 
    '&:hover': {
      backgroundColor: 'success.main',
    },
  }}
>
  Add recipe
</Button>





        

    <IconButton 
    edge="end"
     color="inherit"
     onClick={()=>navigate("/")}
      aria-label="dashboard" sx={{ mr: 2 }}>  
     Dashboard
    </IconButton>





    {/* <IconButton 
    edge="end" 
    color="inherit"
     aria-label="recipe"
     onClick={()=>navigate("/user")}
      sx={{ mr: 2 }}>  
       Add Recipe
    </IconButton> */}

   


  <IconButton
               edge="end"
                color="inherit"
                aria-label={tokenId ? "logout" : "login"}
                onClick={handleAuthentication}
                sx={{ mr: 2 }}
              >
                {tokenId ? "Logout" : "Login"}
              </IconButton>

    

   <IconButton 
    edge="end" 
    color="inherit" 
    aria-label="add recipe" 
    onClick={()=>navigate("/signup")}
    sx={{ mr: 2 }}>  
     Signup
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