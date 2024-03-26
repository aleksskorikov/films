import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../../styles/scss/_filmList.scss';

const viewed = () => {
    const [viewedList, setViewedList] = useState([]);

    useEffect(() => {
        const storedWatchlater = JSON.parse(localStorage.getItem('viewed')) || [];
        setViewedList(storedWatchlater);
    }, []);

    const removeFromViewed = (id) => {
        const updatedviewedList = viewedList.filter(movie => movie.id !== id);
        setViewedList(updatedviewedList);
        localStorage.setItem('viewed', JSON.stringify(updatedviewedList));
    };
    return (
        <div className='conteiner'>
            <h2 className='movie__list-title'>Viewed</h2>
            <ul  className='film__list-block'>
                {viewedList.map(movie => (
                    <li key={movie.id} className='film__list-list'>
                        <img src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} alt={movie.title} className='watchlater-img'/>
                        <h3 className='film__list-title'>{movie.title}</h3>
                        {/* <p>{movie.overview}</p> */}
                        <p className='film__list-date'><span className='film__list-data'>Release Date:</span> {movie.release_date}</p>
                            <p className='film__list-rating'><span className='film__list-data'>Rating:</span> {movie.vote_average}</p>
                        <Link to={`/tvshow/${movie.video_url}`} className="watchlater__btns-look">Смотреть</Link>
                        <button onClick={() => removeFromViewed(movie.id)} className="watchlater__btns-del">Удалить</button>
                    </li>
                ))}
            </ul>
            <Link to={`/MovieList`} className="discription__btns-watchlater">Назад</Link>
        </div>
    )
}

export default viewed