import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../../styles/scss/_filmList.scss';

const Watchlater = () => {
    const [watchlaterList, setWatchlaterList] = useState([]);

    useEffect(() => {
        const storedWatchlater = JSON.parse(localStorage.getItem('watchlater')) || [];
        setWatchlaterList(storedWatchlater);
    }, []);

    const removeFromWatchlater = (id) => {
        const updatedWatchlaterList = watchlaterList.filter(movie => movie.id !== id);
        setWatchlaterList(updatedWatchlaterList);
        localStorage.setItem('watchlater', JSON.stringify(updatedWatchlaterList));
    };

    return (
        <div className='conteiner'>
            <div className="film__list-blocks">
                <h2 className='movie__list-title'>Watchlater</h2>
                <ul className='film__list-block'>
                    {watchlaterList.map(movie => (
                        <li key={movie.id} className='film__list-list'>
                            <img src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} alt={movie.title}  className='watchlater-img'/>
                            <h3 className='film__list-title'>{movie.title}</h3>
                            <p className='film__list-date'><span className='film__list-data'>Release Date:</span> {movie.release_date}</p>
                            <p className='film__list-rating'><span className='film__list-data'>Rating:</span> {movie.vote_average}</p>
                            <Link to={`/tvshow/${movie.video_url}`} className="watchlater__btns-look">Смотреть</Link>
                            <button onClick={() => removeFromWatchlater(movie.id)} className="watchlater__btns-del">Удалить</button>
                        </li>
                    ))}
                </ul>
                <Link to={`/MovieList`} className="discription__btns-watchlater">Назад</Link>
            </div>

        </div>
    )
}

export default Watchlater;





