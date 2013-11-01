var i18n = require('./i18n'),
    t = i18n.t;

module.exports = require('ember-popover').extend({
    template: require('../templates/period-selector'),

    classNames: ['period-selector'],

    value: null,
    
    currentType: null,
    
    matchWidth: false,
    
    types: function() {
        return [
            Em.O({
                key: 'all',
                name: t('all_time'),
                viewClass: null
            }),
            Em.O({
                key: 'month',
                name: t('month'),
                viewClass: require('./period-views/month-view')
            }),
            Em.O({
                key: 'quarter',
                name: t('quarter'),
                viewClass: require('./period-views/quarter-view')
            }),
            Em.O({
                key: 'year',
                name: t('year'),
                viewClass: require('./period-views/year-view')
            }),
            Em.O({
                key: 'fiscalyear',
                name: t('fiscalyear'),
                viewClass: require('./period-views/fiscal-year-view')
            }),
            Em.O({
                key: 'dates',
                name: t('dates'),
                viewClass: require('./period-views/dates-view')
            })
        ];
    }.property(),

    actions: {
        select: function(value) {
            this.trigger('select', value);
        }
    },
    
    itemViewClass: require('./item-view')
});

module.exports.periods = require('./periods');

module.exports.lang = i18n.lang;