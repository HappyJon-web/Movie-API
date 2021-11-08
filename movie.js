const axios = require ('axios');

const apikey = '296ec9fbd55de8df53a5a37b457a51b7';
const language='en-US';
// const movie = 'Fight Club';

const querystr = `https://api.themoviedb.org/3/movie/550?api_key=${apikey}&language=${language}`;

output = '<h2>Movie title:</h2>'
axios.get(querystr).then( (response) => {
    console.log("Movie title: ");
    console.log(response.data);
    console.log(response.data.genres[0])
    console.log(response.data.vote_average);
});