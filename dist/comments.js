/*
 *  CommentsJS - v0.0.1
 *
 *  Made by Rnjai Lamba
 *  Under MIT License
 */
// the semi-colon before function invocation is a safety net against concatenated
// scripts and/or other plugins which may not be closed properly.
;( function( $, window, document, undefined ) {

		// Create the defaults once
		var pluginName = "comments",
			defaults = {
				propertyName: "value"
			};
		var className = 'anchor';
		var idcache = {};
		var count = 0;

		// The actual plugin constructor
		function Plugin ( element, options ) {
			this.element = element;
			this.settings = $.extend( {}, defaults, options );
			this._defaults = defaults;
			this._name = pluginName;
			this.init(options,element);
		}

		// Replace element with initial html
		function addBasicHTML ( element ) {
			element = $(element);
			var className = element.attr('class');
			var idName = element.attr('id');
			console.log(className,idName);
			if(typeof className != 'undefined')
				$('.'+className).append('<div class = "container"> <div class="leave-a-reply"> <span class="title">Leave a Comment</span> <div class="row"> <div class="col-md-12"> <textarea name="comment" id="comment" class="form-control" rows="8" placeholder="Message"></textarea> </div> <div class="col-md-12"> <button type="submit" class="btn-black">Publish Comment</button> </div> </div> </div> <!-- End .leave-a-reply --> <div class="comment"> <span class="title blog-comments">All Comments ( Write something above and click publish to see it here )</span> </div> <!-- End .commnet --></div> <!-- End .container -->');
			if(typeof idName != 'undefined')
				$('#'+idName).append('<div class = "container"> <div class="leave-a-reply"> <span class="title">Leave a Comment</span> <div class="row"> <div class="col-md-12"> <textarea name="comment" id="comment" class="form-control" rows="8" placeholder="Message"></textarea> </div> <div class="col-md-12"> <button type="submit" class="btn-black">Publish Comment</button> </div> </div> </div> <!-- End .leave-a-reply --> <div class="comment"> <span class="title blog-comments">All Comments ( Write something above and click publish to see it here )</span> </div> <!-- End .commnet --></div> <!-- End .container -->');

		}

		// Literally get ready for comments
		function getReadyForComments ( ) {

			/* ======================================
			     IS ELEMENT OF TYPE 
			   ====================================== */

			   function isElementType(element,type){
			      return $(element).is(type);
			   }


			/* ======================================
			     GET DATE FORMATTED
			   ====================================== */

			   function getDateFormatted(d){

			    var month = d.getMonth()+1;
			    var day = d.getDate();

			    return output = d.getFullYear() + '/' +
			        (month<10 ? '0' : '') + month + '/' +
			        (day<10 ? '0' : '') + day; 
			  }  


			/* ======================================
			     CREATE COMMENT REPLY
			   ====================================== */
			    function createCommentReply(){

			      var outerMostDiv = $('<div>')
			                              .attr("class", "leave-a-reply-to-comment");      
			      var outerDiv = $('<div>')
			                          .attr("class", "row");
			      var form = $('<form>')
			                        .attr({ action:"#", method:"POST" });
			      var textArea = $('<textarea>')
			                          .attr({ name:"comment", id:"comment" , class:"form-control" , rows:"8" , placeholder:"message" });
			      var button = $('<button>')
			                          .attr({ type:"submit", id:"class" , class:"btn-black" })
			                          .text('Reply to Comment');
			      var divButtonText =  $('<div>')
			                                .attr("class", "col-md-12");

			      form.append(divButtonText.append(textArea));                                             
			      form.append(divButtonText.append(button));  
			      return outerMostDiv.append(outerDiv.append(form));                                          

			    }

			    
			/* ======================================
			     CREATE COMMENT WITH MARGIN
			   ====================================== */
			    function createCommentWithMargin(data){
			      var marginLeft = parseInt($( data.aboveElement ).css( "margin-left" ));   
			      var isElementSpan = isElementType(data.aboveElement,"span"); //true or false
			      if(isElementSpan)
			        marginLeft = -60;
			      var params = {};
			      params.marginLeft = marginLeft;
			      return createComment(data,params);

			    }    


			/* ======================================
			     CREATE COMMENT 
			   ====================================== */
			    function createComment(data,params){

			      var outerMostDiv = $('<div>')
			                              .attr("class", "comment-wrap")   
			                              .css("margin-left",params.marginLeft+60);                                             

			      var commentDiv = $('<div>')
			                              .attr("class", "full-comment");
			      var commentHeading = $('<h5>');
			      var commentHeadingLink = $('<a>')
			                                  .attr("href", "#")
			                                  .text("Your Comment");   
			      var commentSpan = $('<a>')
			                            .attr("class", "date")
			                            .text(getDateFormatted(new Date()));     
			      var commentParagraph = $('<p>')
			                            .text(String(data.commentText));  
			      var commentReplyDiv = $('<div>')
			                                .attr("class", "reply");
			      var commentReplyLink = $('<a>')
			                                  .attr({ class:"btn-white-sm", href:"#" })
			                                  .text("Reply");  
			      var showMoreReplyDiv = $('<div>')
			                                .attr("class", "show-reply");                                  
			      var showMoreReplyLink = $('<a>')
			                                  .attr({ class:"btn-white-sm", href:"#" })
			                                  .text("Show replies");                                    

			      commentHeadingLink.css("color","red"); // Just to show dynamically that it is new

			      commentReplyDiv.append(commentReplyLink);    
			      commentDiv.append(commentHeading.append(commentHeadingLink));    
			      commentDiv.append(commentSpan);    
			      commentDiv.append(commentParagraph);    
			      commentDiv.append(commentReplyDiv);    
			    
			      outerMostDiv.append(commentDiv);

			      return outerMostDiv;                                          

			    }    

			    //CHECK INPUT TEXT FIELD EMPTY
			    // ==============================================
			    function checkInputTextFieldEmpty(element){
			      var myfield = $(element).val();
			      if(myfield.length == 0){
			        return true;  
			      }
			      else{
			        return false; 
			      }

			    }


			  /* ======================================
			       REMOVE THE COMMENT BOX
			     ====================================== */
			      function removeCommentBox(){

			        $( ".comment .leave-a-reply-to-comment" ).remove( );                                     

			      }


			  /* ======================================
			       REMOVE TOP LEVEL PUBLISH COMMENT TEXT
			     ====================================== */
			      function removeTextTopLevel(){

			        var x = $('.leave-a-reply').find('#comment').val('');                          

			      }  


			  /* ======================================
			       CHECK BLOGID = PARENTID
			     ====================================== */
			      function checkBlogidParentid(data){

			        if( data.blogId == data.parentId) return true;
			        else return false                      

			      }      


			  /* ======================================
			       ADD ELEMENT DYNAMICALLY - AFTER CLICK CALL
			     ====================================== */
			      function addCommentDynamically(data){
			        var comment =  createCommentWithMargin(data);
			        $( comment ).insertAfter(data.aboveElement);
			        removeCommentBox();
			        removeTextTopLevel();
			        $('html, body').animate({
			          scrollTop: (data.aboveElement).offset().top -85
			        }, 500);
			      }    
			$( document ).ready(function() {


			/* ======================================
			     ON CLICKING TOP LEVEL PUBLISH COMMENT
			   ====================================== */
			   $(document).on('click','div.leave-a-reply .btn-black',function(){

			    event.preventDefault();
			    var textAreaElement = $(this).parents('.leave-a-reply').find('#comment');
			    var checkComment = checkInputTextFieldEmpty(textAreaElement);
			    if( !checkComment ){
			      var commentData = {};
			      commentData.commentText =textAreaElement.val();
			      commentData.aboveElement = $('.blog-comments');
			      addCommentDynamically(commentData);
			    }
			    else{
			      alert("enter something")
			      
			    }     

			  });


			/* ======================================
			     ON CLICKING OTHER LEVEL PUBLISH COMMENT
			   ====================================== */
			   $(document).on('click','div.comment .btn-black',function(){

			    event.preventDefault();
			    var textAreaElement = $(this).parents('.leave-a-reply-to-comment').find('#comment');
			    var checkComment = checkInputTextFieldEmpty(textAreaElement);
			    if( !checkComment ){
			      var commentData = {};
			      commentData.commentText = textAreaElement.val();
			      commentData.aboveElement = $(this).parents('.leave-a-reply-to-comment')
			                                        .prevAll(".comment-wrap:first"); 
			      commentData.parentId = commentData.aboveElement.attr("data-commentId");                                        
			      addCommentDynamically(commentData);
			    }
			    else{
			      alert("nothing written");
			    }

			  });


			/* ======================================
			     ON CLICKING OTHER REPLIES - ONLY THE INTENT - SO THIS WILL CREATE THE REPLY BOX
			   ====================================== */
			   $(document).on('click','div.comment-wrap .reply',function(){
			    event.preventDefault();
			    var topCommentDiv = $(this).parents('.comment-wrap');
			    var commentReply = createCommentReply();
			    var isCommentBoxOpen = $( ".comment" ).has( ".leave-a-reply-to-comment" ).length;
			    var isCommentBoxOpenAfterCurrentElement = $( topCommentDiv ).next().hasClass("leave-a-reply-to-comment");
			    if( isCommentBoxOpen > 0 ){
			      removeCommentBox();
			    }
			    if( isCommentBoxOpen == 0 || isCommentBoxOpenAfterCurrentElement == 0 ){
			      $( commentReply ).insertAfter(topCommentDiv);
			      $( commentReply ).find("#comment").focus();
			    }
			    $('html, body').animate({
			          scrollTop: topCommentDiv.offset().top -85
			        }, 500);
			  });      

			});


		}				

		$.extend( Plugin.prototype, {
			init: function(options,element) {
				addBasicHTML(element);
				getReadyForComments();
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

