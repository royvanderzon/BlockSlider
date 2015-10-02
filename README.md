# BlockSlider
Yet another slider.. yet this one your slides are dictated by CSS or your grid system.

This slider does not come with any controls, it autoslides based on the supplied timing values, or the plugins default timing.

It's main use is for grouping company logos onto a single row, as the screen size reduces the logos do not stack, instead the grid dictates how many items to show on the screen at any given moment.  The cycle resets upon an screen resize event.

* IE9+ compatible as it uses CSS transforms. On IE9 there is no animation between slide transitions due to lack of CSS transition support on IE9.
* Library agnostic.  If jQuery is present it will register itself as a plugin
* Only 2.2k minified.
* API allows for timing adjustments to transition, and slide interval.
* Number of items in view controlled by CSS / whatever grid system you are using.
* Built with performance in mind, uses minimal DOM lookups and caches values wherever possible.
* Written in ES6/ES2015 and transpiled into ES5 via Babel

##Useage
HTML markup - This example is using the Twitter Bootstrap grid, and for large screens displays 6 items with no sliding, smaller screens it displays 4 items, and 3 items on the smallest screens.  You may use any grid system you like, or roll with your own.
You are not restricted to use with `<div>` you can use any block-level elements that suit your purpose.  You can also nest anything inside of the individual items.
```html
<div id="block-slider">
    <div class="js-block-slider__container">
        <div class="row js-block-slider__items">
            <div class="col-md-2 col-sm-3 col-xs-4">
               ...
            </div>
            <div class="col-md-2 col-sm-3 col-xs-4">
               ...
            </div>
            <div class="col-md-2 col-sm-3 col-xs-4">
               ...
            </div>
            <div class="col-md-2 col-sm-3 col-xs-4">
               ...
            </div>
            <div class="col-md-2 col-sm-3 col-xs-4">
               ...
            </div>
            <div class="col-md-2 col-sm-3 col-xs-4">
               ...
            </div>
        </div>                    
    </div>                    
</div>
```

JavaScript
```javascript
BlockSlider(document.getElementById('Block-slider'));
```

Or JavaScript + jQuery
```javascript
$('#Block-slider').BlockSlider();
```

##Settings
The Block Slider can take an optional second parameter (First when using jQuery).  
Default settings:
```javascript
{
    //Interval time between slides, ms
    slideInterval: 2000,
    
    //Transition time when sliding, ms
    slideTransition: 400,
    
    //Container class
    containerClass: '.js-block-slider__container',
    
    //Items class
    itemsClass: 'js-block-slider__items'
}
```

##Examples

JavaScript
```javascript
BlockSlider(document.getElementById('Block-slider'), {
    slideInterval: 1000,
    slideTransition: 200
});
```

JavaScript + jQuery
```javascript
$('#Block-slider').BlockSlider({
    slideInterval: 1000,
    slideTransition: 200
});
```

##License
[MIT License](http://opensource.org/licenses/MIT)
