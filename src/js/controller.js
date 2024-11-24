import * as model from "./model.js";
import recipeView from "./views/recipeView.js";
import searchView from "./views/searchView.js";
import resultView from "./views/resultView.js";
import paginationView from "./views/paginationView.js";
import { async } from "regenerator-runtime";
// import icons from '../img/icons.svg' //parcel 1
// import icons from "url:../img/icons.svg"; //parcel 2
import "core-js/stable";
import "regenerator-runtime/runtime";
// import view from "./views/view.js";
 if(module.hot){
   module.hot.accept()
 }
// const recipeContainer = document.querySelector(".recipe");

// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////

//loading recipes

const showRecepie = async function () {
  try {
    const id = window.location.hash.slice(1);
    console.log(id);
    if (!id) return;
    recipeView.renderSpiner();

    //1.loading recepie
    await model.loadRecipe(id);
    recipeView.clearSpiner();
    //rendering recepie
    recipeView.render(model.state.recipe);


  } catch (err) {
    recipeView.renderError();
  }
};

const controllSearchResult = async function () {
  try {
    const query = searchView.getquery();
    if (!query) return;
    resultView.renderSpiner();

    await model.loadSearchResult(query);
    recipeView.clearSpiner();
    //render result
    // console.log(model.state.serach.result);
    // resultView.render(model.state.serach.result)
    resultView.render(model.getSearchResultsPage(3));

    //render initial pagination buttons
    paginationView.render(model.state.serach);
  } catch (err) {
    console.log(err);
  }
};

const controlPagination = function (goToPage) {
  //1.render new results
  resultView.render(model.getSearchResultsPage(goToPage));

  //render new pagination buttons
  paginationView.render(model.state.serach);
};

const controlServing = function (newservings) {
  //update the rcipe servings(in state)
  model.updateServings(newservings);
  //update the recipe view
  recipeView.render(model.state.recipe);
};
// controllSearchResult();
const init = function () {
  recipeView.addHandlerRender(showRecepie);
  recipeView.addHandlerupdateServings(controlServing);
  searchView.addhandlerSearch(controllSearchResult);
  paginationView.addhandlerClick(controlPagination);
};
init();
