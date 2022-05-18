import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import React from 'react';
import AddIcon from '@mui/icons-material/Add';
import { useAuth } from '../contexts/AuthContext';
import { useAlerts } from '../contexts/AlertsContext';

export default function AddGiftButton({ categoryName }) {
  const { currentUser } = useAuth();
  const { setMessage } = useAlerts();
  return (
    <Button
      style={{ margin: '30px' }}
      variant="contained"
      component={Link}
      to={`/gift/${categoryName}`}
      startIcon={<AddIcon />}
      onClick={(e) => {
        if (!currentUser) {
          e.preventDefault();
          setMessage('You must be logged in to add a gift');
        }
      }}
    >
      Add Gift Idea
    </Button>
  );
}

AddGiftButton.propTypes = {
  categoryName: PropTypes.string,
};
