import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { fetchMoviesAndTVShows } from '../CustomHook/apiKey';

const MovieList = () => {
    const [movies, setMovies] = useState([]);
    const [filteredMovies, setFilteredMovies] = useState([]);
    const [genres, setGenres] = useState([]);
    const [selectedGenre, setSelectedGenre] = useState('');
    const [selectedYear, setSelectedYear] = useState('');
    const [selectedRating, setSelectedRating] = useState([0, 10]); 

    useEffect(() => {
        const fetchMovies = async () => {
            try {
                const data = await fetchMoviesAndTVShows();
                setMovies(data);
                setFilteredMovies(data);
                const allGenres = data.reduce((acc, curr) => {
                    return [...acc, ...curr.genre_ids];
                }, []);
                setGenres([...new Set(allGenres)]);
            } catch (error) {
                console.error('Error fetching movies:', error);
            }
        };
        fetchMovies();
    }, []);

    const handleGenreChange = (event) => {
        const value = event.target.value;
        setSelectedGenre(value);
        filterMovies(value, selectedYear, selectedRating);
    };

    const handleYearChange = (event) => {
        const value = event.target.value;
        setSelectedYear(value);
        filterMovies(selectedGenre, value, selectedRating);
    };

    const handleRatingChange = (newValue) => {
        setSelectedRating(newValue);
        filterMovies(selectedGenre, selectedYear, newValue);
    };

    const filterMovies = (genre, year, rating) => {
        let filtered = movies;
        if (genre !== '') {
            filtered = filtered.filter(movie => movie.genre_ids.includes(parseInt(genre)));
        }
        if (year !== '') {
            filtered = filtered.filter(movie => {
                const releaseYear = new Date(movie.release_date).getFullYear();
                return releaseYear === parseInt(year);
            });
        }
        filtered = filtered.filter(movie => {
            const averageRating = movie.vote_average;
            return averageRating >= rating[0] && averageRating <= rating[1];
        });
        setFilteredMovies(filtered);
    };


    return (
        <div className='conteiner'>
            <div className="linc__block">
                <Link to={`/Watchlater`} className="linc__block-btn">Watchlater</Link>
                <h2 className='movie__list-title'>Movie List</h2>
                <Link to={`/viewed`}  className="linc__block-btn">viewed</Link>
            </div>

            <div className="search__block">
                <div className='search__block-gene'>
                    <label htmlFor="genre" className='block__gene-lable'>Filter by Genre:</label>
                    <select id="genre" value={selectedGenre} onChange={handleGenreChange} className='block__gene-select'>
                        <option value="" className='block__gene-option'>All Genres</option>
                        {genres.map(genreId => (
                            <option key={genreId} value={genreId} className='block__gene-option'>{genreId}</option>
                        ))}
                    </select>
                </div>
                <div className='search__block-year'>
                    <label htmlFor="year" className='block__year-lable'>Filter by Year:</label>
                    <select id="year" value={selectedYear} onChange={handleYearChange} className='block__year-select'>
                        <option value="" className='block__year-option'>All Years</option>
                        {[...new Set(movies.map(movie => new Date(movie.release_date).getFullYear()))].map(year => (
                            <option key={year} value={year} className='block__year-option'>{year}</option>
                        ))}
                    </select>
                </div>
                <div className='search__block-rating'>
                    <label htmlFor="rating" className='block__rating-lable'>Filter by Rating:</label>
                    <input 
                        className='block__rating-input'
                        type="range" 
                        id="rating" 
                        min={0} 
                        max={10} 
                        value={selectedRating[1]} 
                        onChange={(event) => handleRatingChange(event, [selectedRating[0], parseInt(event.target.value)])} 
                    />
                    <span>{selectedRating[0]} - {selectedRating[1]}</span>
                    
                    
                </div>
            </div>

            <div className="film__list-blocks">
                <ul className='film__list-block'>
                    {filteredMovies.map(movie => (
                        <li key={movie.id} className='film__list-list'>
                            <Link to={`/movie/${movie.id}`} className='film__list-linc'>
                                <img src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} alt={movie.title} className='film__list-img'/>
                                <div className='film__list-discription'>
                                    <h3 className='film__list-title'>{movie.title}</h3>
                                    <p className='film__list-date'><span className='film__list-data'>Release Date:</span> {movie.release_date}</p>
                                    <p className='film__list-rating'><span className='film__list-data'>Rating:</span> {movie.vote_average}</p>
                                </div>
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>

        </div>
    );
};

export default MovieList;















