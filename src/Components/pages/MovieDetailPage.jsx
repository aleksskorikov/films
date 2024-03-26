import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ReactPlayer from 'react-player';
import fetchMovieDetails from '../../CustomHook/fetchMovieDetails';
import { Link } from 'react-router-dom';


const MovieDetailPage = () => {
    const { id } = useParams();
    const [movie, setMovie] = useState(null);

    useEffect(() => {
        const fetchMovie = async () => {
            try {
                const movieData = await fetchMovieDetails(id);
                setMovie(movieData);
            } catch (error) {
                console.error('Error fetching movie details:', error);
            }
        };

        fetchMovie();
    }, [id]);

    const addToWatchlater = () => {
    const watchlaterList = JSON.parse(localStorage.getItem('watchlater')) || [];
    if (!watchlaterList.find(item => item.id === id)) {
        watchlaterList.push(movie);
        localStorage.setItem('watchlater', JSON.stringify(watchlaterList));
        } 
    };

    const addToViewed = () => {
    const watchlaterList = JSON.parse(localStorage.getItem('viewed')) || [];
    if (!watchlaterList.find(item => item.id === id)) {
        watchlaterList.push(movie);
        localStorage.setItem('viewed', JSON.stringify(watchlaterList));
        } 
    };

    if (!movie) return <div>Loading...</div>;

    return (
        <div className='conteiner'>
            <div className="detail__block">
                <div className="detail__image">
                    <img src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} alt={movie.title} />
                </div>
                <div className="detail__discription">
                    <h2 className="detail__discription-title">{movie.title}</h2>
                    <p className="detail__discription-text">{movie.overview}</p>
                    <p className="detail__discription-dete"><span className='data'>Release Date:</span> {movie.release_date}</p>
                    <p className="detail__discription-genres"><span className='data'>Genres:</span> {movie.genres.map(genre => genre.name).join(', ')}</p>
                    <p className="detail__discription-duration"><span className='data'>Duration:</span> {movie.runtime} minutes</p>
                    <p className="detail__discription-rating"><span className='data'>Rating:</span> {movie.vote_average}</p>
                    {movie.video_url && (
                        <ReactPlayer url={movie.video_url} playing controls />
                    )}
                    <div className="discription__btns">
                        <Link to={`/tvshow/${movie.video_url}`} className="discription__btns-look">look</Link>
                        <Link to={`/MovieList`} className="discription__btns-look">back</Link>
                        <Link to={`/Watchlater`} onClick={addToWatchlater} className="discription__btns-look">Watchlater</Link>
                        <Link to={`/viewed`} onClick={addToViewed} className="discription__btns-look">viewed</Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MovieDetailPage;










