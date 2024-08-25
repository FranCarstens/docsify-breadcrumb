# Docsify Breadcrumb

<p align="center">
  <img src="https://docsify.js.org/_media/icon.svg" />
  <br />
  <code>docsify-breadcrumb</code>
</p>

This is a plugin for [Docsify](https://docsify.js.org/#/) that adds a breadcrumb to the top of each page.

## Features

`docsify-breadcrumb` adds a small, accessible breadcrumb to the top of each page. It supports a number of configuration options and can be styled to match your Docsify theme.

The breadcrumb is represented by human readable parts of the url combined using a configurable separator. Each part links to its section. The final breadcrumb reflects the title of the current page.

**For example:**

`/articles/books-and-more/adventure/`

![Breadcrumb Example](https://raw.githubusercontent.com/FranCarstens/docsify-breadcrumb/main/assets/example.png)


## Basic Usage

Add the following to your `index.html` below your Docsify script tag:

```html
<!-- Adds the breadcrumb JavaScript -->
<script src="https://cdn.jsdelivr.net/npm/docsify-breadcrumb@latest/dist/index.min.js"></script>
```

## Add default styling

Add the following to your `index.html` just before the closing `</head>` tag:

```html
<!-- Adds the default breadcrumb styling -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/docsify-breadcrumb@latest/dist/breadcrumb.min.css">
```

## Configuration

`docsify-breadcrumb` allows some customization through the `window.$docsify` object. Here are the available options:

| Option      | Type    | Default                         | Description                                                                                                                                                                                                                                                                 |
| ----------- | ------- | ------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `showHome`  | Boolean | `false`                         | Show the home link when you're on the home page.                                                                                                                                                                                                                            |
| `homeText`  | String  | `'Home'`                        | The text for the home link.                                                                                                                                                                                                                                                 |
| `separator` | String  | `' › '`                         | The separator between each breadcrumb item.                                                                                                                                                                                                                                 |
| `casing`    | String  | `'capitalize'`                  | The casing of the breadcrumb items. Options follow the CSS standard for `text-transform`. E.g., `'capitalize'`, `'uppercase'`, and `'lowercase'`. See [text-transform](https://developer.mozilla.org/en-US/docs/Web/CSS/text-transform) documentation for more information. |
| `linkColor` | String  | `'var(--theme-color, #42b983)'` | The color of the breadcrumb links. This can be any valid CSS color value.                                                                                                                                                                                                   |
| `size`      | String  | `'small'`                       | The size of the breadcrumb links. Options are `'small'` (`0.75em`), `'smaller'` (`0.83em`), and `'normal'` (`1em`). This can easily be overridden with custom CSS.                                                                                                          |

### Example

You do not have to include options where you want to use the default values.:

```html
<script>
  window.$docsify = {
    breadcrumb: {
      showHome: true,
      homeText: 'Home',
      separator: ' &rsaquo; ',
      casing: 'capitalize',
      linkColor: 'var(--theme-color, #42b983)',
      size: 'small'
    }
  }
</script>
```

---

Inspired by [the breadcrumb work](https://github.com/docsifyjs/docsify/issues/2016) of [Abhilash](https://github.com/abpanic)

[![](https://data.jsdelivr.com/v1/package/npm/docsify-breadcrumb/badge)](https://www.jsdelivr.com/package/npm/docsify-breadcrumb)
