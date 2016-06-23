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

You also need to load either the minified or not minified versions of the javascript-file and css-file
```html
<script src="/PATH/TO/JS/colcarou.min.js" type="text/javascript"></script>
<link href="/PATH/TO/CSS/colcarou.min.css" type="text/css" rel="stylesheet"/>
```

## HTML ##

The Structure is very simple. You can create a new carousel in html like this:
```html
<div id="slide">
    <div>
        <div>
            <h1>header-text 1</h1>
            <p>Lorem ipsum dolor sit amet, consectetur adipisici elit, 
            sed eiusmod tempor incidunt ut labore et dolore magna aliqua. 
            Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.</p>
            <a  href="#">More</a>
        </div>
        <img src="/URL/TO/YOUR/IMAGE" alt="ALTTEXT"/>
    </div>
    <div>
        <div>
            <h1>header-text 2</h1>
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
| slide_width  | integer (70) | the width of each collapsed slide |
| frame_width  | integer (965) | the width of the carousel frame |
| frame_height | integer (450) | the height of the carousel frame |

Options can be set like this:
```javascript
$(document).ready(function(){
  $('#slide').colcarou({
    slide_width:100,
    frame_width:800,
    frame_height:400
  });
});
```

## Future Tasks ##

- [ ] Implement responsive layout
- [ ] Implement JQuery UI events

## Example ##

An example can be viewed [here](http://colcarou.niclas-geiger.de/)

