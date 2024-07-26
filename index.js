const express = require('express');
const bodyParser = require('body-parser');
const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

// Initialize Supabase client
const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_ANON_KEY);

// Create an Express app
const app = express();
app.use(bodyParser.json());

// Define a route to test the server
app.get('/', (req, res) => {
  res.send('root: faculty-blog-backend');
});

// Signup route
app.post('/signup', async (req, res) => {
    const { email, password } = req.body;
  
    try {
      const { user, error } = await supabase.auth.signUp({
        email,
        password,
      });
  
      if (error) throw error;
  
      res.status(201).json({
        message: 'User created successfully'
      });
    } catch (error) {
      res.status(400).json({ error: error.message,
        result: true
      });
    }
  });
  
  // Login route
app.post('/login', async (req, res) => {
    const { email, password } = req.body;
  
    try {
      const { session, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
  
      if (error) throw error;
  
      res.status(200).json({
        message: 'Login successful',
        result: true
      });
    } catch (error) {
      res.status(401).json({ error: error.message,
        result: true
       });
    }
  });
  

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
