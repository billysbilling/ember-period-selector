var t = require('../i18n-context').t,
    periods = require('../periods');

module.exports = Em.View.extend({
    template: require('../../templates/period-views/fiscal-year'),

    classNames: ['form'],

    initialValueDidChange: function() {
        var match = (this.get('initialValue.value') || '').match(/^fiscalyear:(.+),(.+)$/);
        if (match) {
            this.set('year', match[2]);
        } else {
            this.set('year', this.get('yearOptions.firstObject.value'));
        }
    }.observes('initialValue').on('init'),

    value: function() {
        return periods.FiscalYear.create({
            value: 'fiscalyear:'+this.container.lookup('controller:user').get('activeOrganization.id')+','+this.get('year')
        });
    }.property('year'),

    yearOptions: function() {
        var organization = this.container.lookup('controller:user').get('activeOrganization'),
            firstFiscalYear = organization.get('firstFiscalYearEnd').format('YYYY'),
            options = Em.A();
        for (var y = organization.get('currentFiscalYear'); y >= firstFiscalYear; y--) {
            options.pushObject(Em.Object.create({
                value: y,
                name: y
            }));
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