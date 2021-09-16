import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import API_KEY from './secrets.js';
import questionRoutes from './routes/questions.js';

const app = express();
const CONNECTION_URL = API_KEY;
const PORT = process.env.PORT || 8080;

app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(express.urlencoded({limit: "30mb", extended: true}));
app.use(cors());

app.get('/', (req,res) =>{res.send("Working")});
app.use('/api', questionRoutes);


mongoose.connect(CONNECTION_URL, {
   useNewUrlParser: true, useUnifiedTopology: true
})
.then(() => {  
  app.listen(PORT, () => console.log(`Server is running on port: http://localhost:${PORT}`));
  })
.catch((error) =>  console.log(error.message));

mongoose.set('useFindAndModify', false);