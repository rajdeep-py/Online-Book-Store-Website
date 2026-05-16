/**
 * BookHeaven Bookstore - Search Module
 */

const Search = {
  // Filter list of books by search term
  query(books, term) {
    if (!term) return books;
    
    const cleanTerm = term.trim().toLowerCase();
    if (cleanTerm === '') return books;

    return books.filter(book => {
      const matchTitle = book.title.toLowerCase().includes(cleanTerm);
      const matchAuthor = book.author.toLowerCase().includes(cleanTerm);
      const matchCategory = book.category.toLowerCase().includes(cleanTerm);
      const matchDesc = book.description && book.description.toLowerCase().includes(cleanTerm);
      
      return matchTitle || matchAuthor || matchCategory || matchDesc;
    });
  },

  // Read URL search params
  getUrlParam() {
    const params = new URLSearchParams(window.location.search);
    return params.get('search') || '';
  }
};

window.Search = Search;
