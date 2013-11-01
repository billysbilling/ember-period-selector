var t = require('../i18n').t,
    periods = require('../periods');

module.exports = Em.View.extend({
    template: require('../../templates/period-views/month'),
    
    classNames: ['form'],

    initialValueDidChange: function() {
        var match = (this.get('initialValue.value') || '').match(/^month:(\d{1,4})-(\d{1,2})$/);
        if (match) {
            this.set('year', match[1]);
            this.set('month', match[2]);
        } else {
            this.set('year', moment().format('YYYY'));
            this.set('month', moment().format('MM'));
        }
    }.observes('initialValue').on('init'),
    
    value: function() {
        return periods.Month.create({
            value: 'month:'+this.get('year')+'-'+this.get('month')
        });
    }.property('year', 'month'),

    monthOptions: function() {
        var options = [];
        for (var i = 1; i <= 12; i++) {
            options.push(Em.Object.create({
                value: i < 10 ? '0'+i : ''+i,
                name: moment(i+'', 'M').format('MMMM')
            }));
        }
        return options;
    }.property(),
    
    actions: {
        select: function() {
            var ok = true;
            if (!this.get('month')) {
                this.set('monthError', t('required_field'))
                ok = false;
            }
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