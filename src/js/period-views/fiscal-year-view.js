var t = require('../i18n-context').t,
    periods = require('../periods');

module.exports = Em.View.extend({
    template: require('../../templates/period-views/fiscal-year'),

    classNames: ['form'],

    initialValueDidChange: function() {
        var match = (this.get('initialValue.value') || '').match(/^fiscalyear:(.+)$/);
        if (match) {
            this.set('year', match[1]);
        } else {
            this.set('year', this.get('yearOptions.firstObject.value'));
        }
    }.observes('initialValue').on('init'),

    value: function() {
        return periods.FiscalYear.create({
            value: 'fiscalyear:'+this.get('year')
        });
    }.property('year'),

    yearOptions: function() {
        var d = moment().endOf('month').startOf('day'),
            end = this.container.lookup('route:organization').currentModel.get('firstFiscalYearStart').endOf('month'),
            options = Em.A();
        while (d.isAfterOrSame(end)) {
            options.pushObject(Em.Object.create({
                value: d.format('YYYY'),
                name: d.format('YYYY')
            }));
            d = moment(d).subtract(1, 'years').endOf('month').startOf('day');
        }
        return options;
    }.property(),

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