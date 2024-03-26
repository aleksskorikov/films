const apiKey = 'a34e5b3dbdd2ea6ab5890459f3a8c8fd';

export const fetchMoviesAndTVShows = async () => {
  const url = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1`;
  
  try {
    const response = await fetch(url);
    const data = await response.json();
    return data.results;
  } catch (error) {
    console.error('Error fetching movies and TV shows:', error);
    return [];
  }
};

// const apiKey = 'a34e5b3dbdd2ea6ab5890459f3a8c8fd';

// export const fetchMoviesAndTVShows = async () => {
//   const url = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1`;
  
//   try {
//     const response = await fetch(url);
//     const data = await response.json();
    
//     data.results.forEach(movie => {
//       console.log(movie.title, movie.id, `https://www.themoviedb.org/movie/${movie.id}`);
//     });
    
//     return data.results;
//   } catch (error) {
//     console.error('Error fetching movies and TV shows:', error);
//     return [];
//   }
// };



