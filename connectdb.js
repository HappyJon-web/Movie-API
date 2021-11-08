const mongoose = require('mongoose');

const db = "mongodb+srv://YiLerk_Ang_4978:Jayl4978@cluster0.oopjg.mongodb.net/Movie?retryWrites=true&w=majority";

mongoose
.connect(db)
.then(()=>{
  console.log("Connected to database");
}
)
.catch(()=> {
  console.log ("Error connecting to database");
}
)


const movieSchema = new mongoose.Schema({
    movieTitle:{type:String},
    movieDate:{type:String},
    movieOverview:{type:String},
    movieImg:{type:String}
  }
);

const Movie = mongoose.model('Data', movieSchema, 'datas');
module.exports = Movie;