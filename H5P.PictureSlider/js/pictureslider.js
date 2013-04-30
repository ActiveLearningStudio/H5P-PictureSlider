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
    if (!(this instanceof H5P.PictureSlider))
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
            width: params.width,
            height: params.height
        });

       //Adding the Picture Slider
        var slide = new MakeSlider($myDom, params);

        return this;
    };

    // An internal Object only available to Picture Slider
    function MakeSlider(dom, slider_params) {
        var defaults = {
            "title": "Slider",
            "image": "",
            "action": ""
        }

        var params = $.extend({}, defaults, slider_params);

        // Render Picture Slider DOM elements
        
        //Set default values to SliderType in case it isn't defined
        var as_slidertype = slider_params.SliderType;
        if(as_slidertype == undefined) as_slidertype = "html_carousel";
        
        var $slider = $('<div class="' + as_slidertype + '"></div>');
        
        if (as_slidertype == "html_carousel") {
            var $slidercontainer = $('<div id="slidercontainer"></div>');
            $slider.append($slidercontainer);
            for (var i = 0; i < slider_params.images.length; i++) {
                $slidercontainer.append($('<div class="slide"><img src="' + cp + slider_params.images[i].image.path + '" alt="carousel '+i+'" width="' + slider_params.width + '" height="' + slider_params.height + '"/><div><h4>'+ slider_params.images[i].header +'</h4><p>' + slider_params.images[i].text + '</p></div></div>'));
            }
        } else if (as_slidertype == "image_carousel") {
            var $slidercontainer = $('<div id="slidercontainer"></div>');
            $slider.append($slidercontainer);
            for (var i = 0; i < slider_params.images.length; i++) {
                $slidercontainer.append($('<img src="' + cp + slider_params.images[i].image.path + '" width="' + slider_params.width + '" height="' + slider_params.height + '"/>'));
            }
        } else if (as_slidertype == "list_carousel") {
            var $slidercontainer = $('<ul id="slidercontainer"></ul>');
            $slider.append($slidercontainer);
            for (var i = 0; i < slider_params.images.length; i++) {
                $slidercontainer.append($('<li><img src="' + cp + slider_params.images[i].image.path + '" width="' + slider_params.width + '" height="' + slider_params.height + '"/><div></li>'));
            }
        }
        $slider.append($('<div class="clearfix"></div>'));

        // Insert DOM in Picture Slider
        $(".picture-slider", dom).append($slider);

        /*
         *  Set default values to setting for Picture Slider in case it isn't defined
         *  and add action to the Picture Slider based on the setting
         */
        $(function() {
            var as_circular = slider_params.settings.circular;
            if(as_circular == undefined) as_circular = true; 

            var as_infinite = slider_params.settings.infinite;
            if(as_infinite == undefined) as_infinite = true;
            
            var as_responsive = slider_params.settings.responsive;
            if(as_responsive == undefined) as_responsive = false;
            
            var as_direction = slider_params.settings.direction;
            if(as_direction == undefined) as_direction = "left";
            
            var as_align = slider_params.settings.align;
            if(as_align == undefined) as_align = "center";
            
            var as_padding = slider_params.settings.padding;
            if(as_padding == undefined) as_padding = null;
            
            var as_synchronise = slider_params.settings.synchronise;
            if(as_synchronise == undefined) as_synchronise = null;
            
            var as_cookie = slider_params.settings.cookie;
            if(as_cookie == undefined) as_cookie = false;
           
            var as_items = slider_params.settings.items;
            if(as_items == undefined) as_items = 1;

            var as_auto = slider_params.settings.auto;
            if(as_auto == undefined) as_auto = true;
            
            var as_scroll = slider_params.settings.scroll;
            if(as_scroll == undefined) as_scroll = 1;
            
            $("#slidercontainer").carouFredSel({
                circular: as_circular,
                infinite: as_infinite,
                responsive: as_responsive,
                direction: as_direction,
                align: as_align,
                padding: as_padding,
                synchronise: as_synchronise,
                cookie: as_cookie,
                items: as_items,
                scroll: as_scroll
//                auto : {
//        	        easing      : "elastic",
//        	        duration    : 1000,
//        	        timeoutDuration: 2000,
//        	        pauseOnHover: true
//        	    }
        	}).find(".slide").hover(
        	    function() { $(this).find("div").slideDown(); },
        	    function() { $(this).find("div").slideUp(); }
        	);
        });
    }


};