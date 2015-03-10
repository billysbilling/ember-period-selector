var Popover = require('ember-popover'),
    i18nContext = require('./i18n-context'),
    t = i18nContext.t,
    periods = require('./periods'),
    parsePeriod = require('./parse-period');

var types = [
    Em.Object.createWithMixins({
        key: 'all',
        name: function() {
            return t('all_time')
        }.property(),
        viewClass: null
    }),
    Em.Object.createWithMixins({
        key: 'month',
        name: function() {
            return t('month')
        }.property(),
        viewClass: require('./period-views/month-view')
    }),
    Em.Object.createWithMixins({
        key: 'quarter',
        name: function() {
            return t('quarter')
        }.property(),
        viewClass: require('./period-views/quarter-view')
    }),
    Em.Object.createWithMixins({
        key: 'year',
        name: function() {
            return t('year')
        }.property(),
        viewClass: require('./period-views/year-view')
    }),
    Em.Object.createWithMixins({
        key: 'dates',
        name: function() {
            return t('dates')
        }.property(),
        viewClass: require('./period-views/dates-view')
    })
];

module.exports = Popover.extend({
    layout: Popover.proto().layout,

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

module.exports.parsePeriod = parsePeriod;

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
