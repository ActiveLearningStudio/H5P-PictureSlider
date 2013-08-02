/*
 *	H5P Picture Slider 1.0.0
 *	Demo's and documentation:
 *	griffwith.com/drupal
 *
 *	Copyright (c) 2013 griffen
 *	griffwith.com
 *
 *	Licensed under MIT licenses.
 *	http://en.wikipedia.org/wiki/MIT_License
 */

/*
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
  var that = this;
  if (!(this instanceof H5P.PictureSlider))
    return H5P.PictureSlider(params, contentId);
  // Get the newest jquery from H5P
  var $ = H5P.jQuery;
  // Making a shorcut path to the content
  var cp = H5P.getContentPath(contentId);
  //Setting default values
  var defaults = {
    "SliderType": "html_carousel",
    "image": "",
    "action": "",
    "width": "600",
    "height": "400",
    "items": "variable",
    "settings": {
      "infinite": true,
      "responsive": false,
      "circular": true,
      "direction": "up",
      "align": "center",
      "padding": null,
      "synchronise": null,
      "cookie": false,
      "items": 1,
      "pagination": false,
      "scroll": {
        "fx": "crossfade",
        "items": "1",
        "duration": 3000
      },
      "auto": {
        "play": true,
        "items": "1",
        "duration": 1000,
        "pauseOnHover": true
      }
    },
  };
  // setting all the paramters into one variable
  var params = $.extend({}, defaults, params);
  var $myDom;
  /**
   * Attach the Picture Slider html to a given target
   * 
   * @param {string|jquery} target
   *  Where the H5P html should be placed
   */
  this.attach = function(target) {
    var that = this;
    // Make sure we have a jquery object
    $myDom = typeof target === 'string' ? $('#' + target) : target;
    // $myDom.html('<div class="h5p-picture-slider"></div>');

    //Adding the Picture Slider
    // Render Picture Slider DOM elements
    var $slider = $('<div class="h5p-ps-' + params.SliderType + '"></div>');
    //Setting image with and height
    var asImageWidth = params.width;
    var asImageHeight = params.height - 35;
    // creating fom dom for a html_carousel
    if (params.SliderType === "html_carousel") {
      var $slidercontainer = $('<div id="h5p-ps-slidercontainer"></div>');
      $slider.append($slidercontainer);
      for (var i = 0; i < params.images.length; i++) {
        if ((!params.images[i].header) && (!params.images[i].text)) {
          $slidercontainer.append($('<div class="h5p-ps-slide"><img src="' + cp + params.images[i].image.path + '" alt="carousel ' + i + '" width="' + asImageWidth + '" height="' + asImageHeight + '"/><div></div></div>'));
        } else if ((!params.images[i].header) && (params.images[i].text)) {
          $slidercontainer.append($('<div class="h5p-ps-slide"><img src="' + cp + params.images[i].image.path + '" alt="carousel ' + i + '" width="' + asImageWidth + '" height="' + asImageHeight + '"/><div class="h5p-ps-imageinfo"><h4 class="h5p-ps-h4"></h4><p class="h5p-ps-p">' + params.images[i].text + '</p></div></div>'));
        } else if ((params.images[i].header) && (!params.images[i].text)) {
          $slidercontainer.append($('<div class="h5p-ps-slide"><img src="' + cp + params.images[i].image.path + '" alt="carousel ' + i + '" width="' + asImageWidth + '" height="' + asImageHeight + '"/><div class="h5p-ps-imageinfo"><h4 class="h5p-ps-h4">' + params.images[i].header + '</h4><p class="h5p-ps-p"></p></div></div>'));
        } else {
          $slidercontainer.append($('<div class="h5p-ps-slide"><img src="' + cp + params.images[i].image.path + '" alt="carousel ' + i + '" width="' + asImageWidth + '" height="' + asImageHeight + '"/><div class="h5p-ps-imageinfo"><h4 class="h5p-ps-h4">' + params.images[i].header + '</h4><p class="h5p-ps-p">' + params.images[i].text + '</p></div></div>'));
        }
      }
    }
// TODO: NOT IMPLEMENTED IN H5P EDITOR YET
// creating fom dom for a imageCarousel
    else if (params.SliderType === "imageCarousel") {
      var $slidercontainer = $('<div id="h5p-ps-slidercontainer"></div>');
      $slider.append($slidercontainer);
      for (var i = 0; i < params.images.length; i++) {
        $slidercontainer.append($('<img src="' + cp + params.images[i].image.path + '" width="' + asImageWidth + '" height="' + asImageHeight + '"/>'));
      }
    }
// TODO: NOT IMPLEMENTED IN H5P EDITOR YET
// creating fom dom for a listCarousel
    else if (params.SliderType === "listCarousel") {
      var $slidercontainer = $('<ul id="h5p-ps-slidercontainer"></ul>');
      $slider.append($slidercontainer);
      for (var i = 0; i < params.images.length; i++) {
        $slidercontainer.append($('<li><img src="' + cp + params.images[i].image.path + '" width="' + asImageWidth + '" height="' + asImageHeight + '"/><div></li>'));
      }
    }
    $slider.append($('<div class="h5p-ps-clearfix"></div>'));
    // check if pagination is set
    if (params.settings.pagination) {
//creating paginationbar
      $slider.append($('<div id="h5p-ps-pager"></div>'));
    }

    $myDom.append($slider);
    //Setting Picture Slider properties
    $(function() {
      $("#h5p-ps-slidercontainer").carouFredSel({
        circular: params.settings.circular,
        infinite: params.settings.infinite,
        responsive: params.settings.responsive,
        direction: params.settings.direction,
        align: params.settings.align,
        padding: params.settings.padding,
        synchronise: params.settings.synchronise,
        cookie: params.settings.cookie,
        items: "variable",
        scroll: {
          fx: params.settings.scroll.fx,
          items: params.settings.scroll.items,
          duration: params.settings.scroll.duration
        },
        pagination: {
          container: '#h5p-ps-pager',
          duration: 0,
          anchorBuilder: params.settings.pagination,
          keys: true,
          deviation: -1
        },
        auto: {
          play: params.settings.auto.play,
          itema: params.settings.auto.items,
          duration: params.settings.auto.duration,
          pauseOnHover: params.settings.auto.pauseOnHover
        }
      }).find(".h5p-ps-slide").hover(
              function() {
                $(this).find("div").slideDown();
              },
              function() {
                $(this).find("div").slideUp();
              }
      );
    });
    return this;
  };
};