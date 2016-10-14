# ColCarou
Collapsing Carousel JQuery Plugin 

This Plugin creates a collapsing carousel via jquery

Author: Niclas Geiger

## Requirements ##
JQuery needs to be loaded either via CDN or direct link in the header

Example: 
```html
<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.12.2/jquery.min.js"></script>
```

You also need to load either the minified or not-minified versions of the javascript-file and css-file
```html
<script src="/PATH/TO/JS/colcarou.min.js" type="text/javascript"></script>
<link href="/PATH/TO/CSS/colcarou.min.css" type="text/css" rel="stylesheet"/>
<link href="/PATH/TO/CSS/colcarou.theme.min.css" type="text/css" rel="stylesheet"/>
```

## HTML ##

The Structure is very simple. You can create a new carousel in html like this:
```html
<div id="slide">
    <div>
        <div>
            <h2>header-text 1</h2>
            <p>Lorem ipsum dolor sit amet, consectetur adipisici elit, 
            sed eiusmod tempor incidunt ut labore et dolore magna aliqua. 
            Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.</p>
            <a  href="#">More</a>
        </div>
        <img src="/URL/TO/YOUR/IMAGE" alt="ALTTEXT"/>
    </div>
    <div>
        <div>
            <h2>header-text 2</h2>
            <p>Lorem ipsum dolor sit amet, consectetur adipisici elit, 
            sed eiusmod tempor incidunt ut labore et dolore magna aliqua. 
            Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.</p>
            <a  href="#">More</a>
        </div>
        <img src="/URL/TO/YOUR/IMAGE" alt="ALTTEXT"/>
    </div>
    
    ...
    
  </div>
  ```
What you choose as id for the first slide does not matter. You are only required to use the same structure as shown

## JQuery ##

You can instantiate your carousel with:

```javascript
$(document).ready(function(){
  $('#slide').colcarou();
});
```

## Options ##

The available options are:

| option       |value (default)| description  |
| -------------|:-------------:| -------------------------------:|
| slide_height | integer (450) | the (max) height of each carousel frame |
| slide_width  | integer (70) | the width of each collapsed slide |
| auto_switch  | boolean (false) | turn autoswitch on/off |
| switch_interval  | integer (3000) | the interval for the autoswitch in ms |
| fullscreen  | boolean (false) | if this frame should fill the whole screen or not (experimental!) |
| responsive_width  | integer (800) | the minimun window width to display the carousel in responsive view |

Options can be set like this:
```javascript
$(document).ready(function(){
  $('#slide').colcarou({
    slide_width:80,
    slide_height:400,
    autoswitch : true,
    switch_interval : 5000
  });
});
```

## Future Tasks ##

- [ ] Implement JQuery UI events

## Example ##

An example can be viewed [here](http://colcarou.niclas-geiger.de/)

### Update Version 1.1 (14.10.2016) ###

- added responsive view
- added autoswitch panels
- added new parameters

