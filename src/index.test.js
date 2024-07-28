import {
  getPageTitle,
  getUrlParts,
  sanitizeUrlParts,
  getListItems,
  getItemLink,
  getHomeLink,
  generateAccessibleBreadcrumb
} from './index'

describe('index.js', () => {
  describe('getPageTitle', () => {
    it('should get the title of the current page', () => {
      const route = {
        file: 'articles/books-and-more/adventure'
      }
      const cacheTOC = {
        'articles/books-and-more/adventure': [
          { level: 1, title: 'Books and More' }
        ]
      }
      expect(getPageTitle(route, cacheTOC)).toBe('Books and More')
    })
  })

  describe('getUrlParts', () => {
    it('should get the parts of the URL', () => {
      const url = 'articles/books-and-more/adventure'
      expect(getUrlParts(url)).toEqual(['articles', 'books-and-more', 'adventure'])
    })
  })

  describe('sanitizeUrlParts', () => {
    it('should sanitize the URL parts', () => {
      const urlParts = ['articles', 'books-and-more', 'adventure']
      expect(sanitizeUrlParts(urlParts)).toEqual(['articles', 'books and more', 'adventure'])
    })
  })

  describe('getListItems', () => {
    it('should get the list items for the breadcrumb', () => {
      const readableUrlParts = ['articles', 'books and more', 'adventure']
      const urlParts = ['articles', 'books-and-more', 'adventure']
      const title = 'Books and More'
      expect(getListItems(readableUrlParts, urlParts, title)).toBe(
        '<li><a href=#/articles/ style=\"color: var(--theme-color, #42b983)\">articles</a> &rsaquo; </li><li><a href=#/articles/books-and-more/ style=\"color: var(--theme-color, #42b983)\">books and more</a> &rsaquo; </li><li class=\"active\" aria-current=\"page\">Books and More</li>'
      )
    })
  })

  describe('getItemLink', () => {
    it('should get the link for the item', () => {
      const urlParts = ['articles', 'books-and-more', 'adventure']
      const end1 = 1
      expect(getItemLink(urlParts, end1)).toBe('#/articles/')

      const end2 = 3
      // the last item in the array is never clickable so we're not going to spend time
      // supporting route vs. file paths, we'll always pass the route path.
      expect(getItemLink(urlParts, end2)).toBe('#/articles/books-and-more/adventure/')
    })
  })

  describe('getHomeLink', () => {
    it('should get the home link with the correct properties if the current location is home', () => {
      expect(getHomeLink(true)).toBe("<li><a href='#/' style=\"color: inherit; font-weight:inherit;}\">Home</a></li>")
    })

    it('should get the home link with the correct properties if the current location is not home', () => {
      expect(getHomeLink()).toBe("<li><a href='#/' style=\"color: var(--theme-color, #42b983); }\">Home</a> &rsaquo; </li>")
    })
  })

  describe('generateAccessibleBreadcrumb', () => {
    it('should generate the accessible breadcrumb', () => {
      const homeLink = "<li><a href='#/' style=\"color: var(--theme-color, #42b983); }\">Home</a> &rsaquo; </li>"
      const listItems = '<li><a href=#/articles/ style=\"color: var(--theme-color, #42b983)\">articles</a> &rsaquo; </li><li><a href=#/articles/books-and-more/ style=\"color: var(--theme-color, #42b983)\">books and more</a> &rsaquo; </li><li class=\"active\" aria-current=\"page\">Books and More</li>'

      expect(generateAccessibleBreadcrumb(homeLink, listItems)).toBe(`
  <nav aria-label="Breadcrumb" class="breadcrumb">
    <ol
      class=' breadcrumb--small'
      style="text-transform:capitalize"
    >
      <li><a href='#/' style="color: var(--theme-color, #42b983); }">Home</a> &rsaquo; </li>
      <li><a href=#/articles/ style="color: var(--theme-color, #42b983)">articles</a> &rsaquo; </li><li><a href=#/articles/books-and-more/ style="color: var(--theme-color, #42b983)">books and more</a> &rsaquo; </li><li class="active" aria-current="page">Books and More</li>
    </ol>
  </nav>
`)
    })
  })
})


