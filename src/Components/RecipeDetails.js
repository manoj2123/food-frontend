import React, { useState } from 'react';
import Modal from '@mui/material/Modal';
import { Button, Typography } from '@mui/material';

function RecipeDetails({ recipe }) {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div className="modal">
      <Button onClick={handleOpen}>View Details</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="recipe-details-modal"
        aria-describedby="recipe-details"
      >
        <div  className="modal-content">
        <Typography variant="h5" className="modal-name"> 
          {recipe.name}
        </Typography>
        <img
          src={recipe.image}
          alt={recipe.title}
          className="modal-image" 
        />
        
        <Typography className="modal-title"> 
          Title: {recipe.title}
        </Typography>
          <Typography className="modal-description"> 
          Description: {recipe.description}
        </Typography>
        <Typography className="modal-ingredients"> 
          Ingredients: {recipe.ingredients}
        </Typography>
        <Typography className="modal-instructions"> 
          Instructions: {recipe.instructions}
        </Typography>
        <Button variant="contained" onClick={handleClose} className="modal-close-button"> 
          Close
        </Button>
        </div>
      </Modal>
    </div>
  );
}

export default RecipeDetails;
