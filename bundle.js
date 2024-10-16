'use strict';

const defaultOptions = {
  showHome: true,
  separator: ' &rsaquo; ',
  casing: 'capitalize',
  linkColor: 'var(--theme-color, #42b983)',
  size: 'small'
};

/**
 * Breadcrumb plugin for Docsify
 * 
 * @param {Function} hook - The hook function
 * @param {Object} vm - The Docsify VM object
 * @returns {void}
 * @see https://docsify.js.org/#/write-a-plugin
 */
function breadcrumbPlugin (hook, vm) {
  hook.afterEach(function (html, next) {
    const url = vm.route.path;
    const isHome = url.length < 2;
    const title = getPageTitle(vm.route, vm.compiler.cacheTOC);

    const urlParts = getUrlParts(url);
    const readableUrlParts = sanitizeUrlParts(urlParts);
    const homeLink = defaultOptions.showHome || !isHome ? getHomeLink(isHome) : '';

    const ul = generateAccessibleBreadcrumb(homeLink, getListItems(readableUrlParts, urlParts, title));

    next(ul + html);
  });
}

/**
 * Get the title of the current page
 * 
 * @param {Object} route - The current route object
 * @param {Object} cacheTOC - The cacheTOC object
 * @returns {String} The title of the current page
 */
const getPageTitle = (route, cacheTOC) =>
  cacheTOC[route.file].find(page => page.level === 1).title;

/**
 * Get the parts of the URL
 * 
 * @param {String} url - The current URL from the route object
 * @returns {Array} The parts of the URL
 * @sample articles/books-and-more/adventure.md => ['articles', 'books-and-more', 'adventure.md']
 */
const getUrlParts = (url) =>
  url.split('/').filter(str => ['#', '', 'README'].indexOf(str) === -1);

/**
 * Sanitize the URL parts
 * 
 * @param {Array} urlParts - The parts of the URL
 * @returns {Array} The plain language URL parts
 * @sample ['articles', 'books-and-more', 'adventure.md'] => ['articles', 'books and more', 'adventure md']
 */
const sanitizeUrlParts = (urlParts) =>
  urlParts.map(part => part.replace(/[._-]/g, ' '));

/**
 * Get the list items for the breadcrumb
 * 
 * @param {Array} readableUrlParts - The plain language URL parts
 * @param {Array} urlParts - The parts of the URL
 * @param {String} title - The title of the current page
 * @returns {String} The collection of <li> for the breadcrumb
 */
const getListItems = (readableUrlParts, urlParts, title) => readableUrlParts
  .reduce((acc, part, i) => {
    const link = getItemLink(urlParts, i + 1);
    const isLastLink = i === readableUrlParts.length - 1;

    const itemDom = !isLastLink
      ? `<li><a href=${link} style="color: ${defaultOptions.linkColor}">${part}</a>${defaultOptions.separator}</li>`
      : `<li class="active" aria-current="page">${title}</li>`;

    return acc + itemDom
  }, '');

/**
 * Get the link for the item
 * 
 * @param {Array} urlParts - The parts of the URL
 * @param {Number} end - The end index for the current item
 * @returns {String} The link for the item
 */
const getItemLink = (urlParts, end) => `#/${urlParts.slice(0, end).join('/')}/`;

/**
 * Get the home link
 * 
 * @param {Boolean} isHome - Whether the current page is the home page
 * @returns {String} The home link as a <li>
 */
const getHomeLink = (isHome) => {
  const color = isHome ? 'inherit' : defaultOptions.linkColor;
  const fontWeight = isHome ? `font-weight:inherit;` : '';
  const separator = isHome ? '' : defaultOptions.separator;

  return `<li><a href='#/' style="color: ${color}; ${fontWeight}}">Home</a>${separator}</li>`
};

/**
 * Generate the accessible breadcrumb
 * 
 * @param {String} homeLink - The home link as a <li>
 * @param {String} list - The list of items as <li>
 * @returns {String} The accessible breadcrumb
 */
const generateAccessibleBreadcrumb = (homeLink, list) => `
  <nav aria-label="Breadcrumb" class="breadcrumb">
    <ol
      class=' breadcrumb--${defaultOptions.size}'
      style="text-transform:${defaultOptions.casing}"
    >
      ${homeLink}
      ${list}
    </ol>
  </nav>
`;

if (typeof window !== 'undefined') {
  window.$docsify["breadcrumb"] = { ...window.$docsify, breadcrumb: defaultOptions };

  window.$docsify.plugins = [].concat(breadcrumbPlugin, window.$docsify.plugins);
}

exports.breadcrumbPlugin = breadcrumbPlugin;
exports.generateAccessibleBreadcrumb = generateAccessibleBreadcrumb;
exports.getHomeLink = getHomeLink;
exports.getItemLink = getItemLink;
exports.getListItems = getListItems;
exports.getPageTitle = getPageTitle;
exports.getUrlParts = getUrlParts;
exports.sanitizeUrlParts = sanitizeUrlParts;
