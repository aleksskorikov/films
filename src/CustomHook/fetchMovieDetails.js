
const fetchMovieDetails = async (movieId) => {
    const apiKey = 'a34e5b3dbdd2ea6ab5890459f3a8c8fd'; 
    const url = `https://api.themoviedb.org/3/movie/${movieId}?api_key=${apiKey}&language=en-US`;

    try {
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error('Failed to fetch movie details');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching movie details:', error);
        throw error;
    }
};

export default fetchMovieDetails;

