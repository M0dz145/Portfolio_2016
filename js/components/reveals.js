module.exports = function() {
    var allReveals = [];
    function isNodeList(nodes) {
        var stringRepr = Object.prototype.toString.call(nodes);

        return typeof nodes === 'object' &&
            /^\[object (HTMLCollection|NodeList|Object)\]$/.test(stringRepr) &&
            (typeof nodes.length === 'number') &&
            (nodes.length === 0 || (typeof nodes[0] === "object" && nodes[0].nodeType > 0));
    }
    return {
        /**
         * Ajoute un Reveal
         * @param {} params - items, container, scrollEvent, effect
         * @returns {Array}
         */
        add: function(params) {
            var _this     = this,
                container = (params.container) ? scrollMonitor.createContainer(params.container) : scrollMonitor,
                count     = allReveals.length;

            function addReveal(element, index) {
                var elementWatcher = container.create(element, -225),
                    RevealElement  = new RevealFx(element, {revealSettings: params.effect});

                $(element).data('reveal-id', index);
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
                    allReveals[index].scrollListener = elementWatcher;
                }
            }

            if(isNodeList(params.items)) {
                for(var i = 0; i < params.items.length; i++) {
                    addReveal(params.items[i], (count + i));
                }
            } else if(params.items !== undefined) {
                addReveal(params.items, count);
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
            return allReveals[id].scrollListener.isInViewport;
        }
    };
};