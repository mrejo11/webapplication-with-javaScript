import { async } from "regenerator-runtime";
import { API_URL,RES_PER_PAGE } from "./views/config";
import { getJSON } from "./views/helper";
export const state = {
  recipe: {},
  serach:{
    query:'',
    result:[],
    page:1,
    resultPerPage:RES_PER_PAGE
  }
};

export const loadRecipe = async function (id) {
  try {
    const data = await getJSON(`${API_URL}/${id}`);

    const { recipe } = data.data;
    state.recipe = {
      id: recipe.id,
      title: recipe.title,
      publisher: recipe.publisher,
      sourceUrl: recipe.source_url,
      servings: recipe.servings,
      image: recipe.image_url,
      cookingTime: recipe.cooking_time,
      ingredients: recipe.ingredients,
    };
    console.log(state.recipe);
  } catch (err) {
    console.error(`${err}💥💥`);
  }
};

export const loadSearchResult = async function (query) {
  try {
    state.serach.query=query
    const data = await getJSON(`${API_URL}?search=${query}`);
    console.log(data);

    state.serach.result=data.data.recipes.map(rec=>{
      return{
        id: rec.id,
      title: rec.title,
      publisher: rec.publisher,
      image: rec.image_url,
      }
    })
    // console.log(state.serach.result);
  } catch (err) {
    console.error(`${err}💥💥`);
  }
};

export const getSearchResultsPage=function(page=state.serach.page){
  state.serach.page=page 
const start = (page-1)*state.serach.resultPerPage
const end = page*state.serach.resultPerPage
  return state.serach.result.slice(start,end)
}

export const updateServings=function(newServings){
  state.recipe.ingredients.forEach(ing => {
    ing.quantity=
    (ing.quantity*newServings)/state.recipe.servings;


    state.recipe.servings=newServings
  });
}