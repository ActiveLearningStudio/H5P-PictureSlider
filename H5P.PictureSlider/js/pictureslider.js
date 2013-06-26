/*
 *	H5P Picture Slider 1.0.0
 *	Demo's and documentation:
 *	griffwith.com/drupal
 *
 *	Copyright (c) 2013 griffen
 *	www.griffwith.com
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
        "title": "Picture Slider",
        "SliderType": "html_carousel",
        "image": "",
        "action": "",
        "width": "600",
        "height": "400",
        "settings": {
            "infinite": true,
            "responsive": false,
            "circular": "true",
            "direction": "up",
            "align": "center",
            "padding": null,
            "synchronise": null,
            "cookie": false,
            "items": 1,
            "pagination": "true",
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

        $myDom.html('<div class="picture-slider"></div>');

       //Adding the Picture Slider
       // Render Picture Slider DOM elements
        var $slider = $('<div class="' + params.SliderType + '"></div>');
        
        //Setting image with and height
        var as_imagewidth = params.width; 
        var as_imageheight = params.height-35;
                
        if (params.SliderType === "html_carousel") {
            var $slidercontainer = $('<div id="slidercontainer"></div>');
            $slider.append($slidercontainer);
            for (var i = 0; i < params.images.length; i++) {
                if((!params.images[i].header)&&(!params.images[i].text)){
                    $slidercontainer.append($('<div class="slide"><img src="' + cp + params.images[i].image.path + '" alt="carousel '+i+'" width="' + as_imagewidth + '" height="' + as_imageheight + '"/><div></div></div>'));
                } else if((!params.images[i].header)&&(params.images[i].text)){
                    $slidercontainer.append($('<div class="slide"><img src="' + cp + params.images[i].image.path + '" alt="carousel '+i+'" width="' + as_imagewidth + '" height="' + as_imageheight + '"/><div class="imageinfo"><h4></h4><p>' + params.images[i].text + '</p></div></div>'));
                } else if((params.images[i].header)&&(!params.images[i].text)){ 
                    $slidercontainer.append($('<div class="slide"><img src="' + cp + params.images[i].image.path + '" alt="carousel '+i+'" width="' + as_imagewidth + '" height="' + as_imageheight + '"/><div class="imageinfo"><h4>'+ params.images[i].header +'</h4><p></p></div></div>'));
                } else{
                    $slidercontainer.append($('<div class="slide"><img src="' + cp + params.images[i].image.path + '" alt="carousel '+i+'" width="' + as_imagewidth + '" height="' + as_imageheight + '"/><div class="imageinfo"><h4>'+ params.images[i].header +'</h4><p>' + params.images[i].text + '</p></div></div>'));
                }
            }
        } else if (params.SliderType === "image_carousel") {
            var $slidercontainer = $('<div id="slidercontainer"></div>');
            $slider.append($slidercontainer);
            for (var i = 0; i < params.images.length; i++) {
                $slidercontainer.append($('<img src="' + cp + params.images[i].image.path + '" width="' + as_imagewidth + '" height="' + as_imageheight + '"/>'));
            }
        } else if (params.SliderType === "list_carousel") {
            var $slidercontainer = $('<ul id="slidercontainer"></ul>');
            $slider.append($slidercontainer);
            for (var i = 0; i < params.images.length; i++) {
                $slidercontainer.append($('<li><img src="' + cp + params.images[i].image.path + '" width="' + as_imagewidth + '" height="' + as_imageheight + '"/><div></li>'));
            }
        }
        $slider.append($('<div class="clearfix"></div>'));

        if(params.settings.pagination){
            $slider.append($('<div id="pager"></div>'));
        }

        // Insert DOM in Picture Slider
        //$(".picture-slider", dom).append($slider);

        $myDom.append($slider);
        
        //Setting Picture Slider properties
        $(function() {
            $("#slidercontainer").carouFredSel({
                circular: params.settings.circular,
                infinite: params.settings.infinite,
                responsive: params.settings.responsive,
                direction: params.settings.direction,
                align: params.settings.align,
                padding: params.settings.padding,
                synchronise: params.settings.synchronise,
                cookie: params.settings.cookie,
                items: params.settings.items,
                scroll: {
                    fx : params.settings.scroll.fx,
                    items: params.settings.scroll.items,
                    duration: params.settings.scroll.duration
                },
                pagination  : {
                   container: '#pager',
                   anchorBuilder: params.settings.pagination
                },
                auto : {
        	        play: params.settings.auto.play,
        	        itema: params.settings.auto.items,
        	        duration: params.settings.auto.duration,
        	        pauseOnHover: params.settings.auto.pauseOnHover
        	}
        	}).find(".slide").hover(
                    function() { $(this).find("div").slideDown(); },
        	    function() { $(this).find("div").slideUp(); }
        	);                
        });

        return this;
    };


};