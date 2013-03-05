/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
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
      var $slider = $('<div id="slides"></div>');
      var $slidercontainer = $('<div class="slides_container"></div>');
      $slider.append($slidercontainer);      
      for(var i=0; i<slider_params.length; i++){
        $slidercontainer.append($('<div class="slides_img"><img src="' + cp+slider_params[i].path + '" width="300"/></div>'));
      }
      
     // Insert DOM in Picture Slider
      $(".picture-slider", dom).append($slider);
            
      $("#slides").slides();     
      
      //TODO: add actions
      
          
  }
  
  
};