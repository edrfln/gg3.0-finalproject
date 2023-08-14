import { Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Home from '../pages/Home';
import Detail from '../pages/Detail';
// import { videos } from '../pages/videos';

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/detail/:id" element={<Detail />} />
    </Routes>
  );
};

export default Router;
