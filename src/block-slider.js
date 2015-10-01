function BlockSlider(collection, options) {
    'use strict';
   
    const sliders = [];
    
    // if collection not found, return.
    if(!collection) {
        return;
    }
    if (!collection.length && !collection.querySelector) {
        return;
    }
    
    options = options || {};
    options.slideInterval = options.slideInterval || 500;
    options.slideTransition = options.slideTransition || 100;
    options.sliderWrapClass = options.sliderWrapClass || '.js-block-slider__outer-wrapper';
    options.sliderContainerClass = options.sliderContainerClass || '.js-block-slider__container';
    options.sliderItemsClass = options.sliderItemsClass || '.js-block-slider__items';
    
    (function cacheSliders() {
        function cache(slider) {
            const outerWrapper = slider.querySelector(options.sliderWrapClass),
                container = outerWrapper.querySelector(options.sliderContainerClass),
                items = [].slice.call(container.querySelector(options.sliderItemsClass).children, 0),
                slideTransition = options.slideTransition / 1000;
            outerWrapper.style.overflow = 'hidden';
            container.style.webkitTransition = slideTransition + 's';
            container.style.MozTransition = slideTransition + 's';
            container.style.msTransition = slideTransition + 's';
            container.style.transition = slideTransition + 's';
            container.style.webkitBackfaceVisibility = 'hidden';
            container.style.MozBackfaceVisibility = 'hidden';
            container.style.msBackfaceVisibility = 'hidden';
            container.style.backfaceVisibility = 'hidden';
            sliders.push({
                outerWrapper,
                container,
                items,
                slidePosition: 0,
                itemsPerSlide: 0,
                itemWidth: 0,
                containerWidth: 0,
                outerWrapperWidth: 0
            });
        }
        if (collection.length) {
            [].forEach.call(collection,slider => {
                cache(slider); 
            });
        } else {
            cache(collection);
        }
    })();

    function hasReachedEnd(slider) {
        return -(slider.slidePosition + 1) > slider.containerWidth - slider.outerWrapperWidth;
    }

    function slide() {
        sliders.forEach(slider => {
            const container = slider.container;
            container.style.webkitTransform = 'translateX(' + slider.slidePosition + 'px)';
            container.style.MozTransform = 'translateX(' + slider.slidePosition + 'px)';
            container.style.msTransform = 'translateX(' + slider.slidePosition + 'px)';
            container.style.transform = 'translateX(' + slider.slidePosition + 'px)';
            slider.slidePosition -= slider.itemWidth;
            if (hasReachedEnd(slider)) {
                slider.slidePosition = 0;
            }
        });
    }

    function setWidths() {
        sliders.forEach(slider => {
            let itemWidth = 0,
                totalWidth = 0;
            slider.container.style.removeProperty('width');
            slider.items.forEach((item, i, arr) => {
                item.style.removeProperty('width');
                if (!i) {
                    itemWidth = item.offsetWidth;
                }
                item.style.width = itemWidth + 'px';
            });
            totalWidth = itemWidth * slider.items.length;
            slider.container.style.width = totalWidth + 'px';
            slider.itemsPerSlide = Math.round(slider.outerWrapper.offsetWidth / itemWidth);
            slider.itemWidth = itemWidth;
            slider.slidePosition = 0;
            slider.containerWidth = slider.container.offsetWidth;
            slider.outerWrapperWidth = slider.outerWrapper.offsetWidth;
        });
    }
    setWidths();

    window.addEventListener('resize', () => {
        window.requestAnimationFrame(WW.debounce(() => {
            setWidths();
            slide();
        }, 300));
    });

    setInterval(() => {
        slide(sliders);
    }, options.slideInterval);
}

// if jQuery is present, create a plugin.
if (jQuery) {
    (($) => {
        $.fn.BlockSlider = function(options) {
            BlockSlider(this, options);
            return this;
        };
    })(jQuery);
}