# Roneo

Roneo is a somewhat flexible but pretty opinionated admin area. It does some things for you by default, but also leaves it up to you to conform to the HTML it expects to exist.

## Usage

There are multiple parts to Roneo.

### HTML structure

The general structure of the admin should conform to the content in [`./html/shell.html`](). There’s also a [slim](http://slim-lang.com) version at [`./html/shell.slim`]().

### JavaScript

General JavaScript for the admin shell. This will handle any document `onready` bindings for setup. Simple import and call it:

```js
import roneo from 'roneo'
roneo()
```

There are also two separate components for bootstrapping the page. These are intended to be inlined in the `<head>` and just inside the `</body>` respectively.

`inline-header` asynchronously loads some custom fonts for the admin from Google Fonts. It also checks a `localStorage` value to see if the fonts _should_ already be cached, for example on subsequent page loads, and adds a `.fonts-loaded` class to the document:

```js
import inlineHeader from 'roneo/lib/inline-header'
let options = {}
inlineHeader(options)
```

`inline-footer` is there to perform any additional (non speed-critical) tasks. At the moment it checks the set of fonts that are expected to be loaded have actually loaded, and then sets the `localStorage` value used in `inline-header` so we can assume the fonts are cached.

```js
import inlineFooter from 'roneo/lib/inline-footer'
let options = {}
inlineFooter(options)
```

### Components




### CSS

```css
@import 'roneo/lib/index.css'
```
