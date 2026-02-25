import { useState } from 'react';

export default function Search({favorites, setFavorites}) {
  const [query, setQuery] = useState('')
  const [recipes, setRecipes] = useState([])
  const [loading, setLoading] = useState(false)
  const [hasSearched, setHasSearched] = useState(false)
  const [expanded, setExpanded] = useState(null)


  async function handleSearch(e) {
    e.preventDefault()

    if (!query.trim()) return //nothing in the query

    setLoading(true)
    setHasSearched(true)

    try {
      const response = await fetch(
        `https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`
      )
      const data = await response.json()

      setRecipes(data.meals || [])
    } catch (error) {
      console.error(error)
      setRecipes([])
    }
    setLoading(false)
  }




  return (
    //UI
    <div className="max-w-4xl mx-auto pt-16 space-y-12 animate-in fade-in duration-500">


      <div className="text-center space-y-3">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-(--text)"> What's in your <span className="text-(--accent)">pantry?</span></h1>
        <p className="text-(--muted) text-lg font-light">Enter ingredients or dish names to get started.</p>
      </div>

      <form onSubmit={handleSearch} className="relative group">
        <div className="flex flex-col md:flex-row gap-3 p-2 rounded-2xl bg-(--card) border border-white/5 shadow-xl">
          <div className="flex-1 flex items-center px-4">

            <i className="fa-solid fa-magnifying-glass"></i>

            <input type="text" placeholder="e.g. Garlic, Spinach, Pasta..." className="w-full bg-transparent px-4 py-3 text-(--text) placeholder-(--muted)/40 focus:outline-none"
              //Getting users query here 
              value = {query}
              onChange={(e) => setQuery(e.target.value)}
            />
            
          </div>

          <button className="bg-(--accent) text-(--bg) px-10 py-3 rounded-xl font-bold hover:brightness-110 active:scale-[0.98] transition-all"> Search </button>
        </div>
      </form>

      <div className="flex justify-center gap-8 text-xs font-medium uppercase tracking-widest text-(--muted) opacity-40"> <span>Healthy</span><span>•</span><span>Quick</span><span>•</span><span>Easy</span></div>



      {/* if setLoading == true */}
      {loading && (
        <p className="text-center text-(--muted)">Loading what you can cook today</p>
      )}

      {/* if setLoaing false, hasSearched is true, that is search is done, but the input is blank */}
      {!loading && hasSearched && recipes.length === 0 && (
        <p className="text-center text-(--muted)">No recipes found</p>
      )}

      {/* if setLoading is false and hasSearched is true*/}
      {!loading && recipes.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          {recipes.map(recipe => {
            const isFavorite = favorites.some(fav => fav.idMeal === recipe.idMeal)

            return(
            
            <div key={recipe.idMeal} className="bg-(--card) p-4 rounded-xl">



              <div className='relative'>
                <button className='absolute top-2.5 right-2.5 bg-(--accent) text-(--bg) px-3.5 py-1.5 rounded-lg hover:cursor-pointer'
                        onClick={() => setExpanded(expanded === recipe.idMeal ? null : recipe.idMeal)}>
                  {expanded === recipe.idMeal ? <i className="fa-solid fa-angle-up"></i> : <i className="fa-solid fa-angle-down"></i>}
                </button>

                <img src={recipe.strMealThumb} className="w-full h-48 object-cover rounded-lg mb-3"/>
              </div>


              <div className='relative'>
                <h2 className="text-lg font-semibold">{recipe.strMeal}
                  {expanded === recipe.idMeal && (
                    <div className="mt-3 p-3 bg-(--bg) rounded-lg transition-all duration-300">
                      <p className="text-sm">{recipe.strInstructions}</p>
                    </div>
                  )}
                </h2>

                <button className='absolute top-2.5 right-1.5 mx-0.5 -my-2.5 text-lg text-(--accent) hover:cursor-pointer'
                        onClick={(e) => {e.stopPropagation() //to stop from reloading
                          if (isFavorite){
                            setFavorites(favorites.filter(
                              fav => fav.idMeal !== recipe.idMeal
                            ))
                          } else {
                            setFavorites([...favorites, recipe])
                          }
                        }}>

                    {isFavorite ? <i className="fa-solid fa-heart"></i> : <i className="fa-regular fa-heart"></i>}
                </button>

              </div>


              
            </div>
          )})}
        </div>


      )}
    </div>
  );
}