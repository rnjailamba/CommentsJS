[![NPM](https://nodei.co/npm/permalinkjs.png?downloads=true&downloadRank=true&stars=true)](https://www.npmjs.com/package/permalinkjs)
[![npm version](https://badge.fury.io/js/permalinkjs.svg)](https://www.npmjs.com/package/permalinkjs)
<a href="https://www.npmjs.com/package/permalinkjs">
    <img src="https://img.shields.io/travis/badges/shields.svg"
         alt="build status">
</a>
[![npm downloads](https://img.shields.io/npm/dm/permalinkjs.svg?style=flat)](https://www.npmjs.com/package/permalinkjs)
<a href="http://bower.io/search/?q=permalinkjs">
<img src="http://benschwarz.github.io/bower-badges/badge@2x.png" width="130" height="30">
</a>       

Permalinks for your html page
=======================================

Easy creation of permalinks on your html page! [**DEMOS** - http://goo.gl/Qnkn0N http://goo.gl/zEbKel] 

## Requirements

Just any html page with h1/h2/h3/h4/h5/h6/p/a/blockquote/header/footer/ul/ol tags and PermalinkJS will add permalinks!

## Installation

```shell
  npm install permalinkjs --save
```

## After Installation

You will find the permalink.js file in node_modules/permalinkjs/dist/permalink.js.      
Please include the permalink.js file after including **jQuery**.     
Please check node_modules/permalinkjs/demo/index.html for a very easy example.    
Or just copy stuff from here -> https://goo.gl/LDfvWJ
  
## Usage - Example 1

Just include the following script tag on your HTML page.( after jquery and permalink.js )        
All h1,h2,h3,h4,h5,h6,p,a,blockquote,header,footer,ul,ol elements that are direct children of the div with id="element" will get permalinks now.

```
<script>
	$(document).ready( function() {
		$( "#element" ).permalink( {
			tags: "h1,h2,h3,h4,h5,h6,p,a,blockquote,header,footer,ul,ol"
		} );
		
	} );
</script>

```

## Usage - Example 2

Only h1 elements that are direct children of the div with id="element" will get permalinks now.

```
<script>
	$(document).ready( function() {
		$( "#element" ).permalink( {
			tags: "h1"
		} );
		
	} );
</script>

```

## Tests

```shell
   npm test
```

## Contributing

In lieu of a formal styleguide, take care to maintain the existing coding style.
Add unit tests for any new or changed functionality. Lint and test your code.

## Release History

* 0.0.0 Initial release
* 0.0.1 Initial release
* 0.0.2 Initial release
* 0.0.3 Initial release
* 0.0.4 Initial release
* 0.0.5 Initial release
* 0.0.6 Initial release
* 0.0.7 Initial release
* 0.0.8 Initial release
