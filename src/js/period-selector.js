var i18nContext = require('./i18n-context'),
    t = i18nContext.t,
    periods = require('./periods');

var types = [
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
        key: 'dates',
        name: t('dates'),
        viewClass: require('./period-views/dates-view')
    })
];

module.exports = require('ember-popover').extend({
    template: require('../templates/period-selector'),

    classNames: ['period-selector'],

    value: null,

    currentType: null,

    matchWidth: false,

    types: function() {
        return types;
    }.property(),

    actions: {
        select: function(value) {
            this.trigger('select', value);
        }
    },

    itemViewClass: require('./item-view')
});

module.exports.periods = periods;

module.exports.locale = i18nContext.locale;

module.exports.lang = function() {
    console.warn('.lang() is deprecated. Use .locale() instead');
    return i18nContext.locale.apply(null, arguments);
};

module.exports.add = function(before, key, name, period, viewClass) {
    var insertIdx;
    for (insertIdx = 0; insertIdx < types.length; insertIdx++) {
        if (types[insertIdx].get('key') === before) {
            break;
        }
    }
    types.insertAt(insertIdx, Em.O({
        key: key,
        name: name,
        viewClass: viewClass
    }));
    periods[Em.String.classify(key)] = period;
};

module.exports.remove = function(key) {
    types.removeObject(types.findBy('key', key));
    delete periods[Em.String.classify(key)];
};