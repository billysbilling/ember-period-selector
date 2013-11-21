var t = require('../i18n-context').t,
    periods = require('../periods');

module.exports = Em.View.extend({
    template: require('../../templates/period-views/dates'),

    classNames: ['form'],

    initialValueDidChange: function() {
        var match = (this.get('initialValue.value') || '').match(/^dates:(\d{4}-\d{2}-\d{2})\.\.\.(\d{4}-\d{2}-\d{2})$/);
        if (match) {
            this.set('startDate', moment(match[1]));
            this.set('endDate', moment(match[2]));
        } else {
            this.set('startDate', moment().subtract(1, 'months'));
            this.set('endDate', moment());
        }
    }.observes('initialValue').on('init'),

    value: function() {
        return periods.Dates.create({
            value: 'dates:'+this.get('startDate').format('YYYY-MM-DD')+'...'+this.get('endDate').format('YYYY-MM-DD')
        });
    }.property('startDate', 'endDate'),

    actions: {
        select: function() {
            var ok = true,
                startDate = this.get('startDate'),
                endDate = this.get('startDate');
            if (!startDate) {
                this.set('startDateError', t('required_field'))
                ok = false;
            }
            if (!endDate) {
                this.set('endDateError', t('required_field'))
                ok = false;
            }
            if (startDate && endDate && endDate.isBefore(startDate)) {
                this.set('endDateError', t('end_date_must_be_after_start_date'))
                ok = false;
            }
            if (ok) {
                this.get('controller').send('select', this.get('value'));
            }
        }
    }
});