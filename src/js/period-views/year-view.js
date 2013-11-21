var t = require('../i18n-context').t,
    periods = require('../periods');

module.exports = Em.View.extend({
    template: require('../../templates/period-views/year'),

    classNames: ['form'],

    initialValueDidChange: function() {
        var match = (this.get('initialValue.value') || '').match(/^year:(\d{1,4})$/);
        if (match) {
            this.set('year', match[1]);
        } else {
            this.set('year', moment().format('YYYY'));
        }
    }.observes('initialValue').on('init'),

    value: function() {
        return periods.Year.create({
            value: 'year:'+this.get('year')
        });
    }.property('year'),

    actions: {
        select: function() {
            var ok = true;
            if (!this.get('year')) {
                this.set('yearError', t('required_field'))
                ok = false;
            }
            if (ok) {
                this.get('controller').send('select', this.get('value'));
            }
        }
    }
});