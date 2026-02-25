import { Link } from 'react-router-dom';
import { useState } from 'react';

export default function Favorites({ favorites, setFavorites }) {
  const hasFavorites = favorites.length > 0
  const [expanded, setExpanded] = useState(null)

  return (
    <div className="max-w-3xl mx-auto pt-12 animate-in fade-in duration-300">

      <div className="flex items-end justify-between border-b border-white/5 pb-4 mb-8">

        <h1 className="text-3xl font-bold tracking-tight text-(--text)"> Saved <span className="text-(--accent)">Recipes</span></h1>
        <span className="text-(--muted) text-sm font-medium"> {favorites.length} saved </span>


      </div>



      {!hasFavorites ? (
        <div className="text-center py-14 space-y-4 bg-(--card) rounded-2xl border border-dashed border-white/10">


          <h2 className="text-lg font-semibold text-(--text)"> Nothing saved yet </h2>
          <p className="text-(--muted) text-sm max-w-sm mx-auto">Save recipes you like so you can quickly find them later.</p>

          <Link to="/search" className="inline-block bg-(--accent) text-(--bg) px-6 py-2.5 rounded-lg text-sm font-semibold hover:brightness-110 transition-all"> Browse recipes </Link>


        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">


          {favorites.map(recipe => (

            <div key={recipe.idMeal} className="bg-(--card) p-4 rounded-xl relative">


              <div className='relative'>
                 <button className='absolute top-2.5 right-2.5 bg-(--accent) text-(--bg) px-3.5 py-1.5 rounded-lg hover:cursor-pointer' 
                        onClick={() => setExpanded(expanded === recipe.idMeal ? null : recipe.idMeal)}>
                  {expanded === recipe.idMeal ? <i className="fa-solid fa-angle-up"></i> : <i className="fa-solid fa-angle-down"></i>}
                </button>

                <img src={recipe.strMealThumb} className="w-full h-48 object-cover rounded-lg mb-3" />

              </div>


              <h2 className="text-lg font-semibold">{recipe.strMeal}
                {expanded === recipe.idMeal && (
                  <div className="mt-3 p-3 bg-(--bg) rounded-lg"> <p className="text-sm"> {recipe.strInstructions} </p> </div>
                )}
              </h2>

              <button onClick={() => setFavorites(favorites.filter( fav => fav.idMeal !== recipe.idMeal))}
                      className="mt-1 mr-1 text-[#B24C4C] absolute right-2.5 bottom-4.5 hover:cursor-pointer">
                <i className="fa-solid fa-trash"></i>
              </button>


            </div>
          ))}


        </div>
      )}

    </div>
  );
}