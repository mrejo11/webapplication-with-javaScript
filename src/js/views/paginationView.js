// import { state } from "../model.js";
// import { RES_PER_PAGE } from "./config.js";
import view from "./view.js";
import icons from "url:../../img/icons.svg";

class paginationView extends view {
  _parentElement = document.querySelector(".pagination");
  
  addhandlerClick(handler) {
    this._parentElement.addEventListener("click", function (e) {
      const btn = e.target.closest(".btn--inline");
      if(!btn) return;
      console.log(btn);

      const goToPage=+btn.dataset.goto
      handler(goToPage);
      
    });
  }

  _generateMarkup() {
    
    const curPage = this._data.page;
    const numPages = Math.ceil(
      this._data.result.length / this._data.resultPerPage
    );
    console.log(numPages);
    // page1 there are other pages
    if (this._data.page === 1 && numPages > 1)
      return `
          <button data-goto="${
            curPage + 1
          }"class="btn--inline pagination__btn--next">
            <span> page ${curPage + 1}</span>
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-right"></use>
            </svg>
          </button> `;

    //last page
    if (this._data.page === numPages && numPages > 1)
      return `
          <button data-goto="${
            curPage - 1
          }" class="btn--inline pagination__btn--prev">
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-left"></use>
            </svg>
            <span>page ${curPage - 1}</span>
          </button>`;

    //other pages
    if (this._data.page < numPages)
      return `
          <button data-goto="${
            curPage - 1
          }" class="btn--inline pagination__btn--prev">
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-left"></use>
            </svg>
            <span> page ${curPage - 1}</span>
          </button>
          <button data-goto="${
            curPage + 1
          }"class="btn--inline pagination__btn--next">
            <span> page ${curPage + 1}</span>
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-right"></use>
            </svg>
          </button>`;

    // page1 there are NO other pages
    return " ";
  }
}

export default new paginationView();

//refactoring
/*
import { state } from "../model.js";
import { RES_PER_PAGE } from "./config.js";
import view from "./view.js";
import icons from "url:../../img/icons.svg";

class PaginationView extends view {
  _parentElement = document.querySelector(".pagination");

  /**
   * Generates markup for pagination buttons
   * @returns {string} - HTML string for pagination buttons
   */
/*
  _generateMarkup() {
    const curPage = this._data.page;
    const numPages = Math.ceil(this._data.result.length / this._data.resultPerPage);

    // Single-page scenario
    if (numPages <= 1) return "";

    // Determine the required buttons
    const prevButton = curPage > 1 ? this._createButton(curPage - 1, "prev") : "";
    const nextButton = curPage < numPages ? this._createButton(curPage + 1, "next") : "";

    return `${prevButton}${nextButton}`;
  }

  /**
   * Creates a pagination button
   * @param {number} page - The page number for the button
   * @param {string} type - The type of button ('prev' or 'next')
   * @returns {string} - HTML string for a single button
   */
/* _createButton(page, type) {
    const arrowIcon = type === "prev" ? "arrow-left" : "arrow-right";
    const buttonText = type === "prev" ? "previous" : "next";

    return `
      <button class="btn--inline pagination__btn--${type}" data-goto="${page}">
        ${type === "prev" ? this._generateIcon(arrowIcon) : ""}
        <span>${buttonText}</span>
        ${type === "next" ? this._generateIcon(arrowIcon) : ""}
      </button>
    `;
  }

  /**
   * Generates SVG icon markup
   * @param {string} iconName - The icon name
   * @returns {string} - HTML string for an SVG icon
   */
/* _generateIcon(iconName) {
    return `
      <svg class="search__icon">
        <use href="${icons}#icon-${iconName}"></use>
      </svg>
    `;
  }
}

export default new PaginationView();
*/
