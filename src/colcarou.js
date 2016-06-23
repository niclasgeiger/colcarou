/**
 * Created by Niclas Geiger on 23.06.2016.
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

    $.fn.colcarou = function(options){
        frame = $(this);
        opts = $.extend($.fn.colcarou.defaults, options );
        init();
        //on click
        $('.colcarou-item').click(function(){
            if($(this).hasClass('active')){
                return false;
            }
            index = parseInt($(this).attr('id').replace('colcarou-item-',''));
            switchPanel();
            return false;
        });
    }

    $.fn.colcarou.defaults = {
        slide_width:70,
        frame_width:965,
        frame_height:450
    }

    function init(){
        slide_width = opts.slide_width;
        //get frame & dimensions
        frame_width = opts.frame_width;
        frame_height = opts.frame_height;
        frame.width(frame_width);
        frame.height(frame_height);
        frame.toggleClass('colcarou-frame');
        //name all the items
        items = frame.children('div');
        num_elements = items.size();
        items.width(slide_width);
        items.find('img').width(frame_width/num_elements);
        items.first().toggleClass('active');
        expanded_width = frame_width - ((num_elements-1)*slide_width);
        items.toggleClass('colcarou-item').height(frame_height);
        items.each(function(i){
            var elem = $(this);
            elem.attr('id','colcarou-item-'+i)
                .children('img').toggleClass('colcarou-image')
                .css('min-width',expanded_width).css('min-height',frame_height);
            var textbox = elem.children('div');
            textbox.toggleClass('colcarou-textbox');
            textbox.children('h1').toggleClass('colcarou-title');
            textbox.children('p').toggleClass('colcarou-text');
            textbox.children('a').toggleClass('colcarou-button');
            textbox.css('width',expanded_width *.8);
        });
        switchPanel();
    }

    function switchPanel(){
        items.each(function( i) {
            var elem = $(this);
            var img = elem.children("img");
            var textbox = elem.find('div');
            var header = textbox.find('h1');
            var text = textbox.find('p');
            var link = textbox.find('a');

            if(i==index){
                //move the textbox
                textbox.css('top',frame_height *.1);
                textbox.css('left',expanded_width *.1);
                textbox.toggleClass('colcarou-rotate',false);
                //remove the border
                elem.css('border-left','').css('border-right','');
                //set this element active
                elem.toggleClass('inactive').toggleClass('active');
                //fade text in
                text.fadeIn();
                link.fadeIn();
            }else {
                //minimize everything else
                minimize(elem,textbox,header,text,link,i);
            }
        });
        //only for the first iteration
        if(old_index == index){
            items.eq(old_index).width(slide_width-1);
            items.eq(index).width(expanded_width);
        }else {
            //animation for the resize of the frames
            items.eq(old_index).animate({width: slide_width - 1});
            items.eq(index).animate({width: expanded_width});
        }
        old_index = index;
    }
    function minimize(elem,textbox,header,text,link,i){
        //rotate and move the textbox
        textbox.toggleClass('colcarou-rotate',true);
        var pos_left = parseInt((slide_width/2)-(header.height()/2));
        textbox.css('left',pos_left);
        textbox.css('position','relative');
        textbox.css('top',frame_height *.7);
        //change the header size
        header.width(frame_height);
        //dont resize the last expanded frame yet
        if(i!=old_index) {
            elem.width(slide_width-1);
        }
        //set this element to inactive
        elem.toggleClass('inactive',true).toggleClass('active',false);
        //hide the text and link
        text.hide();
        link.hide();
        //show border to the left or right
        elem.css('border-right',i<index?'white solid 1px':'')
        .css('border-left',i>index?'white solid 1px':'');
    }
})(jQuery);