define([
    'jquery',
], function ($) {
    'use strict';

    return function (widget) {
        $.widget('mage.SwatchRenderer', widget, {
            options: {
                selectorProductItemDetails: '.product-item-details',
                selectorProductItemLink: '.product-item-link',
                selectorProductItemInfo: '.product-item-info',
                selectorProductItemPhoto: '.product-item-photo',
            },

            _toggleCheckedAttributes: function ($option, $wrapper) {
                this._super($option, $wrapper);

                this._updateProductUrl($option);
            },

            _updateProductUrl: function ($option) {
                var $widget = this;

                if ($widget.inProductList) {
                    var $parent = $option.parents('.' + $widget.options.classes.attributeClass),
                        attributeId = $parent.data('attribute-id'),
                        swatchAttributeCode = $widget._getAttributeCodeById(attributeId),
                        swatchAttributeOptionId = $option.data('option-id'),
                        url = $widget.element.parents($widget.options.selectorProductItemDetails).find($widget.options.selectorProductItemLink).attr('href');

                    url = $widget._buildUrl(url, swatchAttributeCode, swatchAttributeOptionId);

                    $widget.element.parents($widget.options.selectorProductItemDetails).find($widget.options.selectorProductItemLink).attr('href', url);
                    $widget.element.parents($widget.options.selectorProductItemInfo).find($widget.options.selectorProductItemPhoto).attr('href', url);
                }
            },

            _buildUrl: function (url, attribute, value) {
                if (url === undefined) {
                    return;
                } else {
                    url = new URL(url);
                    url.searchParams.set(attribute, value);

                    return url.href;
                }
            },
        });

        return $.mage.SwatchRenderer;
    }
});
