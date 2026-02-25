import React from 'react';
import { useState } from 'react';
import { useEffect } from "react"
import { BrowserRouter, Routes, Route, Navigate, HashRouter } from "react-router-dom";
import NavBar from "./components/NavBar";
import Search from './components/Search';
import Favorites from './components/Favorites';

function App() {
  const [favorites, setFavorites] = useState(() => {
  const stored = localStorage.getItem("favorites")
  return stored ? JSON.parse(stored) : []
})
//Local 
useEffect(() => {
  localStorage.setItem("favorites", JSON.stringify(favorites))
}, [favorites])


  return (
    <HashRouter>
      <NavBar />
      <main className="max-w-7xl mx-auto p-6">
        <Routes>
          <Route path="/" element={<Navigate to="/search" replace />} />
          <Route path="/search" element={<Search favorites={favorites} setFavorites={setFavorites}/>} />
          <Route path="/favorites" element={<Favorites favorites={favorites} setFavorites={setFavorites}/>} />
        </Routes>
      </main>
    </HashRouter>
  );
}

export default App;