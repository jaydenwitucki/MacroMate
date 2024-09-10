const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cors = require('cors')
require('dotenv').config();

const app = express();
const PORT = 5001;

app.use(cors({
  origin: 'http://localhost:3000',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,  // Enable credentials (cookies, authorization headers, etc.)
}));

mongoose.connect(process.env.MONGODB_URI,
{ 
    useNewUrlParser: true, 
    useUnifiedTopology: true 
})
.then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running on http://localhost:${PORT}`);
    });
})
.catch(err => {
    console.error('MongoDB connection error:', err);
});





const userSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: String,
  password: String,
  goal: String,
});

const userMealSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  itemName: { type: String, required: true },
  itemDescription: String,
  servingType: String,
  servingUnit: {
    grams: { type: Boolean, default: false },
    milliliters: { type: Boolean, default: false },
  },
  protein: { type: Number, default: 0 },
  carb: { type: Number, default: 0 },
  fats: { type: Number, default: 0 },
  calories: { type: Number, default: 0 },
  // Add other fields as needed
});






const User = mongoose.model('User', userSchema);
const Meal = mongoose.model('Meal',userMealSchema)
app.use(express.json());

app.post('/api/logout', (req, res) => {
  const token = req.headers.authorization.split(' ')[1];

  // Add the token to the blacklist
  blacklistedTokens.add(token);

  res.status(200).json({ message: 'Logout successful' });
});


app.get('/api/get-user-info', async (req, res) => {
  try {
    const token = req.headers.authorization.split(' ')[1]; // Extract the token from the Authorization header
    const decoded = jwt.verify(token, '123'); // Verify the token


    // Use the user ID from the decoded token to find the user in the database
    const user = await User.findById(decoded.userId);

    if (user) {
      res.status(200).json({
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        goal: user.goal,
        // Add other user information as needed
      });
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    console.error('Error fetching user information:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// Register user
app.post('/api/register', async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const newUser = new User({ ...req.body, password: hashedPassword });
    await newUser.save();
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

app.post('/api/meals', async (req, res) => {
  try {
    const mealData = req.body;

    // Extract user information from the token in the Authorization header
    const token = req.headers.authorization.split(' ')[1];
    const decoded = jwt.verify(token, '123'); // Use your actual secret here

    // Use the user ID from the decoded token to find the user in the database
    const user = await User.findById(decoded.userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Create a new instance of the Meal model with the provided data and user information
    const newMeal = new Meal({
      user: user._id,  // Associate the meal with the user
      itemName: mealData.itemName,
      itemDescription: mealData.itemDescription,
      servingType: mealData.servingType,
      servingUnit: mealData.servingUnit,
      protein: mealData.protein,
      carb: mealData.carb,
      fats: mealData.fats,
      calories: mealData.calories,
      // Add other fields as needed
    });

    // Save the new meal to the database
    const savedMeal = await newMeal.save();

    res.status(201).json(savedMeal);
  } catch (error) {
    console.error('Error saving meal:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


app.get('/api/diary', async (req, res) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const decoded = jwt.verify(token, '123');
    const userId = decoded.userId;

    // Fetch diary items specific to the authenticated user
    const userItems = await Meal.find({ user: userId });

    res.status(200).json(userItems);
  } catch (error) {
    console.error('Error fetching user diary items:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.delete('/api/diary/:id', async (req, res) => {
  try {
    const diaryItemId = req.params.id;

    // Check if the diary item with the provided ID exists
    const existingItem = await Meal.findById(diaryItemId);

    if (!existingItem) {
      return res.status(404).json({ message: 'Diary item not found' });
    }

    // Ensure that the user making the request owns the diary item (optional)
    const token = req.headers.authorization.split(' ')[1];
    const decoded = jwt.verify(token, '123'); // Use your actual secret here

    // Check if the user making the request owns the diary item
    if (existingItem.user.toString() !== decoded.userId) {
      return res.status(403).json({ message: 'Unauthorized. User does not own this diary item.' });
    }

    // Perform the deletion
    await Meal.deleteOne({ _id: existingItem._id });

    res.status(200).json({ message: 'Diary item deleted successfully' });
  } catch (error) {
    console.error('Error deleting diary item:', error);

    res.status(500).json({ error: 'Internal Server Error', details: error.message });
  }
});

app.put('/api/diary/:id', async (req, res) => {
  try {
    const diaryItemId = req.params.id;
    const updatedData = req.body;
    console.log(updatedData);
    // Update the diary item
    const updatedItem = await Meal.findByIdAndUpdate(
      diaryItemId,
      updatedData,
      { new: true}
    );
    console.log(updatedItem);
    // Check if the item was not found
    if (!updatedItem) {
      return res.status(404).json({ message: 'Diary item not found' });
    }

    // Ensure that the user making the request owns the diary item (optional)
    const token = req.headers.authorization.split(' ')[1];
    const decoded = jwt.verify(token, '123'); // Use your actual secret here

    // Check if the user making the request owns the diary item
    if (updatedItem.user.toString() !== decoded.userId) {
      return res.status(403).json({ message: 'Unauthorized. User does not own this diary item.' });
    }

    // Send the updated item in the response
    res.status(200).json(updatedItem);
  } catch (error) {
    console.error('Error updating diary item:', error);
    res.status(500).json({ error: 'Internal Server Error', details: error.message });
  }
});

// Login user
app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;

  // Query the database to check if the user exists with the provided email
  const user = await User.findOne({ email });

  if (user) {
    // Compare the provided password with the hashed password in the database
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (isPasswordValid) {
      // User authenticated, generate a token
      const token = jwt.sign({ userId: user._id }, '123', { expiresIn: '1h' });

      // Send the token in the response
      res.status(200).json({ message: 'Login successful', token: token });
    } else {
      // Invalid password
      res.status(401).json({ message: 'Invalid credentials' });
    }
  } else {
    // User not found
    res.status(401).json({ message: 'Invalid credentials' });
  }
});
