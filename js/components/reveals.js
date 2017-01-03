module.exports = function() {
    var allReveals = [];
    return {
        add: function(params) {
            var _this     = this,
                container = (params.container) ? scrollMonitor.createContainer(params.container) : scrollMonitor,
                count     = allReveals.length;
            for(var i = 0; i < params.items.length; i++) {
                var element        = params.items[i],
                    elementWatcher = container.create(element, -225),
                    RevealElement  = new RevealFx(element, {revealSettings: params.effect});

                $(element).data('reveal-id', (count + i));
                allReveals.push({
                    fxElement: RevealElement,
                    scrollListener: null
                });

                //************************ Reveal on scroll ********************************\\
                if(params.scrollEvent === true) {
                    elementWatcher.enterViewport(function() {
                        var $element = $(this.watchItem);
                        if(($element.data('reveal-class') && $('body').hasClass($element.data('reveal-class'))) || !$element.data('reveal-class')) {
                            _this.reveal($element.data('reveal-id'));
                            this.destroy();
                        }
                    });
                    allReveals[(count + i)].scrollListener = elementWatcher;
                }
            }
            return allReveals;
        },
        // remove: function(id) {
        //     return allReveals.splice(id, 1);
        // },
        reveal: function(id) {
            return allReveals[id].fxElement.reveal();
        },
        destroyListener: function(id) {
            return allReveals[id].scrollListener.destroy();
        },
        isInViewport: function(id) {
            console.log(allReveals);
            console.log(allReveals[id]);
            return allReveals[id].scrollListener.isInViewport;
        }
    };
};