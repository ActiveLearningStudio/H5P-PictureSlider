/*
 * 
 * Init a H5P object
 */
var H5P = H5P || {};

/**
 * 
 * @param object params
 *  The object defined in content.json
 * @param int contentId
 *  The nodes vid
 * @returns object
 *  The Picture Slider Object
 */
H5P.PictureSlider = function(params, contentId) {
    if(!(this instanceof H5P.PictureSlider))
        return H5P.PictureSlider(params, contentId);
    
  // Get the newest jquery from H5P
  var $ = H5P.jQuery;
  // Making a shorcut path to the content
  var cp = H5P.getContentPath(contentId);
  
  var $myDom;
  
  /**
   * Attach the Picture Slider html to a given target
   * 
   * @param {string|jquery} target
   *  Where the H5P html should be placed
   */
  this.attach = function(target) {
    // Make sure we have a jquery object
    var $target = typeof target == 'string' ? $('#' + target) : target;
    
    // Render own DOM into target.
    $myDom = $target;
    $myDom.html('<div class="picture-slider"></div>');
    $('.picture-slider', $myDom).css({
     // backgroundImage: 'url(' + cp + params.background + ')',
      width: params.width,
      height: params.height
    });

    // Set event listeners.
    // Add Slider
    var slide = new MakeSlider($myDom, params.Slider);
    
    return this;    
  };
  
  // An internal Object only available to Picture Slider
  function MakeSlider(dom, slider_params){
      var defaults = {
        "title": "Slider",
        "image": "",
        "action": ""
      }
            
      var params = $.extend({}, defaults, slider_params);
      
      // Render Slider DOM elements
      var $slider = $('<div class="'+slider_params[0].SliderType+'"></div>');
      if(slider_params[0].SliderType == "html_carousel"){
        var $slidercontainer = $('<div id="slidercontainer"></div>');
        $slider.append($slidercontainer);      
        for(var i=0; i<slider_params[0].Images.length; i++){
            $slidercontainer.append($('<div class="slide"><img src="' + cp+slider_params[0].Images[i].path + '" width="'+slider_params[0].Images[i].width+'"/><div><h4>'+slider_params[0].Images[i].header+'</h4><p>'+slider_params[0].Images[i].text+'</p></div></div>'));
        }
      } else if(slider_params[0].SliderType == "image_carousel"){
        var $slidercontainer = $('<div id="slidercontainer"></div>');
        $slider.append($slidercontainer);      
        for(var i=0; i<slider_params[0].Images.length; i++){
            $slidercontainer.append($('<img src="' + cp+slider_params[0].Images[i].path + '" width="'+slider_params[0].Images[i].width+'"/>'));
        }
      } else if(slider_params[0].SliderType == "list_carousel"){
        var $slidercontainer = $('<ul id="slidercontainer"></ul>');
        $slider.append($slidercontainer);      
        for(var i=0; i<slider_params[0].Images.length; i++){
            $slidercontainer.append($('<li><img src="' + cp+slider_params[0].Images[i].path + '" width="'+slider_params[0].Images[i].width+'"/><div></li>'));
        }
      }
      $slidercontainer.append($('<div class="clearfix"></div>'));
      
     // Insert DOM in Picture Slider
      $(".picture-slider", dom).append($slider);
      
      
     $(function(){
        $("#slidercontainer").carouFredSel({
	items 		: slider_params[0].items,
	direction	: slider_params[0].directions,
        circular        : slider_params[0].circular,
        width           : slider_params[0].width, 
        height          : slider_params[0].height,
        responsive      : slider_params[0].responsive,
        align           : slider_params[0].align,
        padding         : slider_params[0].padding,
        pagination      :slider_params[0].pagination,
	auto : {
		easing		: slider_params[0].auto.easing,
		duration	: slider_params[0].duration,
		timeoutDuration: slider_params[0].timeoutDuration,
		pauseOnHover: slider_params[0].pauseOnHover
	}
        }).find(".slide").hover(
                function() { $(this).find("div").slideDown(); },
                function() { $(this).find("div").slideUp();	}
        );
     });
            
      //TODO: add actions
      
          
  }
  
  
};