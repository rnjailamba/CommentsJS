/*
 *  CommentsJS - v0.0.1
 *
 *  Made by Rnjai Lamba
 *  Under MIT License
 */
// the semi-colon before function invocation is a safety net against concatenated
// scripts and/or other plugins which may not be closed properly.
;( function( $, window, document, undefined ) {

	"use strict";

		// Create the defaults once
		var pluginName = "CommentsJS",
			defaults = {
				propertyName: "value"
			};
		var className = 'anchor';
		var idcache = {};
		var count = 0;

		function doDashes(str) {
		    var re = /[^a-z0-9]+/gi; // global and case insensitive matching of non-char/non-numeric
		    var re2 = /^-*|-*$/g;     // get rid of any leading/trailing dashes
		    str = str.replace(re, '-');  // perform the 1st regexp
		    return str.replace(re2, '').toLowerCase(); // ..aaand the second + return lowercased result
		}				

		function injectStyles() {
		var css = ['.anchor {',
		  'height: 20px;',
		  'width: 20px;',
		  'display: block;',
		  'padding-right: 6px;',
		  'padding-left: 30px;',
		  'margin-left: -30px;',
		  'cursor: pointer;',
		  'position: absolute;',
		  'top: 0;',
		  'left: 0;',
		  'text-decoration: none;',
		  'height: 100%;',
		  'background: transparent;',
		  'color: #3C4342;',
		'}',
		'',
		'.octicon {',
		 'visibility: hidden',
		'}',
		'h1:hover .octicon{',
		 'visibility: visible',
		'}',
		'h2:hover .octicon{',
		 'visibility: visible',
		'}',
		'h3:hover .octicon{',
		 'visibility: visible',
		'}',
		'h4:hover .octicon{',
		 'visibility: visible',
		'}',
		'h5:hover .octicon{',
		 'visibility: visible',
		'}',								
		'h6:hover .octicon{',
		 'visibility: visible',
		'}',	
		'p:hover .octicon{',
		 'visibility: visible',
		'}',	
		'a:hover .octicon{',
		 'visibility: visible',
		'}',		
		'blockquote:hover .octicon{',
		 'visibility: visible',
		'}',		
		'footer:hover .octicon{',
		 'visibility: visible',
		'}',		
		'header:hover .octicon{',
		 'visibility: visible',
		'}',		
		'ol:hover .octicon{',
		 'visibility: visible',
		'}',		
		'ul:hover .octicon{',
		 'visibility: visible',
		'}',																		
		'path{',
		'    fill:none;',
		'    stroke:black;',
		'    pointer-events:all;',
		'}',
		'.anchor:hover {',
		 'color: #3C4342;',
		'}',
		'h1,h2,h3,h4,h5,h6,p,a,blockquote,header,footer,ul,ol { position: relative; }',
		'',
		'h1:hover .anchor span:before,',
		'h2:hover .anchor span:before,',
		'h3:hover .anchor span:before,',
		'h4:hover .anchor span:before,',
		'h5:hover .anchor span:before,',
		'h6:hover .anchor span:before,',
		'.anchor  {',
		  'content: "¶";',
		  'position: absolute;',
		  'left: -15px;',
		  'top: 0;',
		'}'		


		].join('').replace(/\.anchor/g, '.' + className);

		var style = document.createElement('style');
		style.innerHTML = css;
		document.head.appendChild(style);
		}

		// The actual plugin constructor
		function Plugin ( element, options ) {
			this.element = element;
			this.settings = $.extend( {}, defaults, options );
			this._defaults = defaults;
			this._name = pluginName;
			this.init(options,element);
		}

		$.extend( Plugin.prototype, {
			init: function(options,element) {
				console.log(options.tags);

				this.addPermalinks(options.tags,element);
				this.addCSS();
				this.addScrollToTop();
			},
			addPermalinks: function(options,element){
				var anchor = document.createElement('a');
			    anchor.className = className;
			    anchor.innerHTML = '<svg aria-hidden="true" class="octicon octicon-link" height="16" role="img" version="1.1" viewBox="0 0 16 16" width="16"><path d="M4 9h1v1h-1c-1.5 0-3-1.69-3-3.5s1.55-3.5 3-3.5h4c1.45 0 3 1.69 3 3.5 0 1.41-0.91 2.72-2 3.25v-1.16c0.58-0.45 1-1.27 1-2.09 0-1.28-1.02-2.5-2-2.5H4c-0.98 0-2 1.22-2 2.5s1 2.5 2 2.5z m9-3h-1v1h1c1 0 2 1.22 2 2.5s-1.02 2.5-2 2.5H9c-0.98 0-2-1.22-2-2.5 0-0.83 0.42-1.64 1-2.09v-1.16c-1.09 0.53-2 1.84-2 3.25 0 1.81 1.55 3.5 3 3.5h4c1.45 0 3-1.69 3-3.5s-1.5-3.5-3-3.5z"></path></svg>';

				var x = $(element).children(options).each(function () {
				    if (!this.id) {
						var id = doDashes(this.textContent||this.innerText);
						if (idcache[id]) {
						  	id = id + '-' + count;
						}
						this.id = id;
						idcache[id] = 1;
					}
					var clone = anchor.cloneNode(true);
					clone.href = '#' + this.id;
					this.insertBefore(clone, this.firstChild);
					count = count + 1;					
				});
			},
			addCSS: function( text ) {
				// add the css to the page	
				injectStyles(); 				
			},
			addScrollToTop: function( text ) {
				// on anchor click to to top
				$(".anchor").click(function() {
				    $('html, body').animate({
				        scrollTop: $(this).offset().top
				    }, 0);
				});						
			}			
		} );

		// A really lightweight plugin wrapper around the constructor,
		// preventing against multiple instantiations
		$.fn[ pluginName ] = function( options ) {
			return this.each( function() {
				if ( !$.data( this, "plugin_" + pluginName ) ) {
					$.data( this, "plugin_" +
						pluginName, new Plugin( this, options ) );
				}
			} );
		};

} )( jQuery, window, document );

