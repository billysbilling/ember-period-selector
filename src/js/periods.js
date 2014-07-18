var t = require('./i18n-context').t,
    numeral = require('numeral');

module.exports.Month = Em.Object.extend({
    name: function() {
        var value = this.get('value'),
            match = value.match(/^month:(.+)$/);
        if (!match) {
            return '?';
        }
        return moment(match[1]+'-01').format('MMMM YYYY');
    }.property('value')
});

module.exports.Quarter = Em.Object.extend({
    name: function() {
        var value = this.get('value'),
            match = value.match(/^quarter:(.+)-(.+)$/);
        if (!match) {
            return '?';
        }
        return t('period.formatted.quarter', {quarter: numeral(match[2]).format('0o'), year: match[1]});
    }.property('value')
});

module.exports.Year = Em.Object.extend({
    name: function() {
        var value = this.get('value'),
            match = value.match(/^year:(.+)$/);
        if (!match) {
            return '?';
        }
        return t('period.formatted.year', {year: match[1]});
    }.property('value')
});

module.exports.Dates = Em.Object.extend({
    name: function() {
        var value = this.get('value'),
            match = value.match(/^dates:(.+)\.\.\.(.+)$/);
        if (!match) {
            return '?';
        }
        return moment(match[1]).format('LL') + ' - ' + moment(match[2]).format('LL');
    }.property('value')
});