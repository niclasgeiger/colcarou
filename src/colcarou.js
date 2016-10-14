/**
 * Created by Niclas Geiger on 09.10.2016.
 *
 * The MIT License (MIT)
 Copyright (c) 2016 Niclas Geiger <colcarou@niclasgeiger.de>

 Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"),
 to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute,
 sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

 The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
 WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */
(function ( $ ) {
    var frame_width;
    var frame_height;
    var opts;
    var frame;
    var items;
    var num_elements;
    var expanded_width;
    var index=0;
    var old_index=0;
    var slide_width;
    var last_width;
    var responsive_width;
    var slide_height = 60;
    var autoSwitches = [];
    var window_height;
    var window_width;

    $.fn.colcarou = function(options) {
        //the colcarou frame
        frame = $(this);
        //set options
        opts = $.extend($.fn.colcarou.defaults, options);
        responsive_width = opts.responsive_width;
        //update window dimensions
        update_window_dimensions();
        last_width = window_width;
        //window is big enough for screen display
        if (window_width > responsive_width) {
            init_screen();
            screen_resize();
        }
        //show responsive view
        else {
            init_mobile();
            mobile_resize();
        }
        $(window).resize(function () {
            update_window_dimensions();
            //window is big enough for screen display
            if (window_width > responsive_width) {
                screen_resize();
                screen_switchPanel();
            }
            //show responsive view
            else {
                if(last_width >= responsive_width)
                    slide_height = frame_height - (num_elements-1)*opts.slide_width;
                mobile_resize();
                mobile_switchPanel();
            }
            last_width = window_width;
        });
    }

    //Default Values
    $.fn.colcarou.defaults = {
        slide_width:70,
        slide_height:450,
        auto_switch: false,
        switch_interval:3000,
        fullscreen : false,
        responsive_width : 800
    }
    //ClickHandler for the frame
    var clickHandler = function itemClick(e){
        index = parseInt($(this).attr('id').replace('colcarou-item-',''));
        responsive_width = opts.responsive_width;
        slide_width = opts.slide_width;
        if($(document).width()>responsive_width)
            screen_switchPanel();
        else
            mobile_switchPanel();
        return false;
    }

    /**
     * This function initializes the mobile (responsive) view
     */
    function init_mobile(){
        frame.toggleClass('colcarou-frame');
        if(opts.fullscreen){
            frame.width("100%");
            frame.height("100%");
        }else {
            frame.height(opts.slide_height);
        }
        frame_width = frame.width();
        frame_height = frame.height();
        slide_width = frame_width;
        //name all the items
        nameItems();
        //max_height - all other elements collapsed
        slide_height = frame_height - (num_elements-1)*opts.slide_width;
        mobile_resize();
        mobile_switchPanel();
        $('.colcarou-item.inactive').bind('click',clickHandler);
    }

    /**
     * This function initializes the screen view
     */
    function init_screen(){
        //get frame & dimensions
        frame.toggleClass('colcarou-frame');
        frame_width = frame.width();
        if(opts.fullscreen) {
            frame_height = window_height;
        }
        else {
            frame_height = opts.slide_height;
        }
        frame.height(frame_height);
        //name all the items
        nameItems();
        screen_resize();
        screen_switchPanel();
        $('.colcarou-item.inactive').bind('click',clickHandler);
    }

    /**
     * This function names all components of each colcarou frame
     */
    function nameItems(){
        items = frame.children('div');
        num_elements = items.size();
        items.each(function(i){
            var elem = $(this);
            elem.attr('id','colcarou-item-'+i);
            elem.toggleClass('colcarou-item');
            elem.children('img').toggleClass('colcarou-image');

            var textbox = elem.children('div');
            textbox.toggleClass('colcarou-textbox');
            textbox.children('h2').toggleClass('colcarou-title');
            textbox.children('p').toggleClass('colcarou-text');
            textbox.children('a').toggleClass('colcarou-button');
        });

    }

    /**
     * This function is called each time the window is resized, iff window.size < responsive_width.
     * This function will also be called on the first initialization.
     */
    function mobile_resize(){
        update_window_dimensions();
        frame_width = window_width;
        frame.css('height','')
        items.css('width',$('header').width());

        $('.colcarou-frame').css('display','block');
        $('.colcarou-item').css('float','left');
        $('.colcarou-item').width(frame_width);
        $('.colcarou-textbox').height("100%");
        $('.colcarou-textbox').toggleClass('colcarou-rotate',false);

        $('.colcarou-text').width('');
    }

    /**
     * This function is called each time the window is resized, iff window.size >= responsive_width.
     * This function will also be called on the first initialization.
     */
    function screen_resize(){
        //frame_width = frame.width();
        update_window_dimensions();

        frame.height(frame_height);
        frame.width(frame_width);

        slide_width = opts.slide_width;
        expanded_width = frame_width - ((num_elements-1)*slide_width);

        $('.colcarou-image').css('min-width',expanded_width);
    }

    /**
     * This function is called each time the panels are switched in mobile view.
     * Will also be called on the first initialization.
     */
    function mobile_switchPanel(){
        items.each(function( i) {
            var elem = $(this);
            var img = elem.children("img");
            var textbox = elem.find('div');
            var header = textbox.find('h2');
            var text = textbox.find('p');
            var link = textbox.find('a');

            if(i==index){
                mobile_maximize(elem,textbox,header,text,link,i);
            }else {
                mobile_minimize(elem,textbox,header,text,link,i);
            }


            //Reset screen stuff
            //img.width('100%');
            img.css('min-width','');
            //img.height('auto');
            textbox.css('top','');
            header.css('line-height','40px');
            header.css('width','');
        });
        //set last index to this index
        old_index = index;

    }


    /**
     * This function is called each time the panels are switched in screen view.
     * Will also be called on the first initialization.
     */
    function screen_switchPanel() {
        //clear all timeouts
        if(opts.auto_switch){
            if (autoSwitches.length > 0) {
                jQuery.each(autoSwitches, function (i) {
                    window.clearTimeout(autoSwitches[i]);
                });
            }
        }
        items.each(function( i) {
            var elem = $(this);
            var img = elem.children("img");
            var textbox = elem.find('div');
            var header = textbox.find('h2');
            var text = textbox.find('p');
            var link = textbox.find('a');

            if(i==index){
                screen_maximize(elem,textbox,header,text,link,i);
            }else {
                screen_minimize(elem,textbox,header,text,link,i);
            }

            //Reset mobile stuff
            elem.css('height','');
        });
    }

    /**
     * This function is called for the panel to be maximized in screen view
     * @param elem the panel to be maximized
     * @param textbox the textbox of this panel
     * @param header the header of this panel
     * @param text the text of this panel
     * @param link the link (button) of this panel
     * @param i the index of this panel in the items list
     */
    function screen_maximize(elem,textbox,header,text,link,i){
        textbox.css('height','');
        textbox.css('top','');
        header.css('line-height','');
        header.css('width','');

        textbox.toggleClass('colcarou-rotate',false);
        elem.css('border-left','').css('border-right','');
        //set this element to active
        elem.toggleClass('inactive',false);
        elem.toggleClass('active',true);

        //only for the first iteration
        if(old_index == index){
            items.eq(index).width(expanded_width);
        }else {
            header.hide();
            //animation for the resize of the frames
            header.fadeIn(500);
            text.fadeIn(500);
            link.fadeIn(500);

            items.eq(old_index).animate({width: slide_width - 1},500);
            items.eq(index).animate({width: expanded_width},500);
        }
        //rebind Click Handler for previous slide and unbind for this
        items.eq(old_index).bind('click',clickHandler);
        items.eq(index).unbind('click',clickHandler);
        //save this index as last index
        old_index = index;

        if(opts.auto_switch) {
            autoSwitches[index] = window.setTimeout(function () {
                index = (old_index + 1) % num_elements;
                screen_switchPanel();
            }, opts.switch_interval);
            elem.mouseover(function () {
                window.clearTimeout(autoSwitches[index]);
            }).mouseleave(function () {
                autoSwitches[index] = window.setTimeout(function () {
                    index = (old_index + 1) % num_elements;
                    screen_switchPanel();
                }, opts.switch_interval);
            });
        }
    }

    /**
     * This function is called for the panel to be minimized in screen view
     * @param elem the panel to be minimized
     * @param textbox the textbox of this panel
     * @param header the header of this panel
     * @param text the text of this panel
     * @param link the link (button) of this panel
     * @param i the index of this panel in the items list
     */
    function screen_minimize(elem,textbox,header,text,link,i){
        //rotate and move the textbox
        textbox.toggleClass('colcarou-rotate',true);
        textbox.css('height',slide_width);
        textbox.css('top',frame_height-20);
        //don't resize the last expanded frame yet
        if(i!=old_index) {
            elem.width(slide_width-1);
        }
        //set this element to inactive
        elem.toggleClass('inactive',true);
        elem.toggleClass('active',false);
        //hide the text and link
        text.hide();
        link.hide();
        //show border to the left or right
        elem.css('border-right',i<index?'white solid 1px':'')
            .css('border-left',i>index?'white solid 1px':'');

        elem.unbind("mouseover");
        elem.unbind("mouseleave");
    }

    /**
     * This function is called for the panel to be maximized in mobile view
     * @param elem the panel to be maximized
     * @param textbox the textbox of this panel
     * @param header the header of this panel
     * @param text the text of this panel
     * @param link the link (button) of this panel
     * @param i the index of this panel in the items list
     */
    function mobile_maximize(elem,textbox,header,text,link,i){
        //set this element to active
        elem.toggleClass('inactive',false);
        elem.toggleClass('active',true);
        elem.css('border-bottom','');
        text.fadeIn();
        link.fadeIn();

        header.css('padding-left','');

        items.eq(index).height(slide_height);

        //rebind Click Handler for previous slide and unbind for this
        items.eq(old_index).bind('click',clickHandler);
        items.eq(index).unbind('click',clickHandler);

    }


    /**
     * This function is called for the panel to be minimized in screen view
     * @param elem the panel to be minimized
     * @param textbox the textbox of this panel
     * @param header the header of this panel
     * @param text the text of this panel
     * @param link the link (button) of this panel
     * @param i the index of this panel in the items list
     */
    function mobile_minimize(elem,textbox,header,text,link,i) {

        //set this element to inactive
        elem.toggleClass('inactive',true);
        elem.toggleClass('active',false);
        elem.height(opts.slide_width);

        header.css('padding-left','20px');
        //hide the text and link
        text.hide();
        link.hide();
    }

    /**
     * updates the current window dimensions
     */
    function update_window_dimensions(){
        window_width = window.innerWidth ? window.innerWidth : $(window).width();
        window_height = window.innerHeight ? window.innerHeight : $(window).height();
    }


})(jQuery);