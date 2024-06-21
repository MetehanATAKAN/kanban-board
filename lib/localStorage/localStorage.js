const VISITED_PAGES_KEY = "visited_pages";

export const addVisitedPage = (page) => {
  let pages = JSON.parse(localStorage.getItem(VISITED_PAGES_KEY)) || [];
  pages = [page, ...pages.filter((p) => p !== page)];
  if (pages.length > 5) {
    pages.pop(); // En fazla 5 sayfa sakla
  }
  localStorage.setItem(VISITED_PAGES_KEY, JSON.stringify(pages));
};

export const getVisitedPages = () => {
  return JSON.parse(localStorage.getItem(VISITED_PAGES_KEY)) || [];
};
