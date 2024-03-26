import React from 'react';
import MovieList from './Components/MovieList';
import MovieDetailPage from './Components/pages/MovieDetailPage';
import TVShow from './Components/pages/TVShow';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './Components/Layout';
import Home from './Components/pages/Home';
import Watchlater from './Components/pages/Watchlater';
import Viewed from './Components/pages/viewed';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/MovieList" element={<MovieList />} />
          <Route path="/movie/:id" element={<MovieDetailPage />} />
          <Route path="/tvshow/:videoUrl" element={<TVShow />} />
          <Route path="/Watchlater" element={<Watchlater />} />
          <Route path="/viewed" element={<Viewed />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;



