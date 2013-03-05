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
      var $slider = $('<div id="s3slider"></div>');
      var $slidercontainer = $('<ul id="s3sliderContent"></ul>');
      $slider.append($slidercontainer);      
      for(var i=0; i<slider_params.length; i++){
        $slidercontainer.append($('<li class="s3sliderImage"><img src="' + cp+slider_params[i].path + '" width="300"/><span>Your text comes here</span></li>'));
      }
      $slidercontainer.append($('<div class="clear s3sliderImage"></div>'));
      
     // Insert DOM in Picture Slider
      $(".picture-slider", dom).append($slider);
      
      /*
       * S3Slider
       * 
       *  timeOut: Set the duration of how long will one picture be shown on the page (value is in miliseconds)
       */
      $('#s3slider').s3Slider({
        timeOut: 4000
      });   
      
      //TODO: add actions
      
          
  }
  
  
};