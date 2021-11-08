const express = require('express');
const app=express();
const axios = require('axios');

const mongoose = require ('mongoose');
const Movie = require('./connectdb');

const cors = require('cors');

app.use(cors());

const path = require('path');
const apikey = '296ec9fbd55de8df53a5a37b457a51b7';

const port = process.env.PORT || 5500;

if (process.env.NODE_ENV === 'production'){
  app.use(express.static('client/build'));
  app.get('*', (req, res) => {
      res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

var movieTitle, movieDate, movieOverview, movieImg;

app.get('/getthemovie',(req,res) => {
    const movieid = req.query.id;
    const querystr = `https://api.themoviedb.org/3/movie/${movieid}?api_key=${apikey}`;


   axios.get(querystr).then((response) =>{
       const movie = new Movie({
        movieTitle:response.data.title,
        movieDate:response.data.release_date,
        movieOverview:response.data.overview,
        movieImg:response.data.poster_path
       });
       if (!movie.movieTitle){
           res.status(200).json("Error");
           return
       }
       movie
       .save()
       .then(response => {
         res.status(200).json(response);
       })
       .catch(error => {
         res.status(400).json(error);
       });
   })
   .catch(error => {
     res.status(400).json(error);
   });

   })
   
   app.get('/getallthemovies', (req, res) => {
    Movie.find({})
      .then(response => {
        res.status(200).send(response);
      })
      .catch(error => {
        res.status(400).send(error);
      });
  });

 //localhost:5000/deletemovie?title=MovieTitle
app.get('/deletethemovie', (req, res) => {
  Movie.deleteOne({ movieTitle: req.query.original_title })
    .then(response => {
      res.status(200).json(response);
    })
    .catch(error => {
      res.status(400).json(error);
    });
});

app.listen(port, ()=>{
    console.log("Server is listening on port ${port}");
});