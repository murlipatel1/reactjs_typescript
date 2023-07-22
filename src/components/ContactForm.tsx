import React, { useState } from 'react';
import { TextField, Button, Grid } from '@mui/material';
import { Person, Phone, Email } from '@mui/icons-material';
import {useNavigate} from 'react-router-dom';

const ContactForm: React.FC = () => {
    
    let history = useNavigate()
  // State to hold the user input values
  const [name, setName] = useState<string>('');
  const [phoneNumber, setPhoneNumber] = useState<string>('');
  const [email, setEmail] = useState<string>('');

  // Handle form submission
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    // Handle the data here (e.g., send it to the server or perform some action)
    console.log({ name, phoneNumber, email });
    history("/table")
  };

  return (
    <>
    <h1>Welcome to Login </h1>
    <form onSubmit={handleSubmit}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <TextField
            required
            fullWidth
            label="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            variant="outlined"
            InputProps={{
              startAdornment: <Person />,
            }}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            required
            fullWidth
            label="Phone Number"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            variant="outlined"
            InputProps={{
              startAdornment: <Phone />,
            }}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            required
            fullWidth
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            variant="outlined"
            InputProps={{
              startAdornment: <Email />,
            }}
          />
        </Grid>
        <Grid item xs={12} >
          <Button type="submit" variant="contained" color="primary">
            Submit
          </Button>
        </Grid>
      </Grid>
    </form>
    </>
  );
};

export default ContactForm;
