var numeral = require('numeral'),
    periods = require('../periods');

module.exports = Em.View.extend({
    template: require('../../templates/period-views/quarter'),

    classNames: ['form'],

    initialValueDidChange: function() {
        var match = (this.get('initialValue.value') || '').match(/^quarter:(\d{1,4})-(\d{1})$/);
        if (match) {
            this.set('year', match[1]);
            this.set('quarter', match[2]);
        } else {
            this.set('year', moment().format('YYYY'));
            this.set('quarter', ''+Math.ceil(moment().format('MM') / 3));
        }
    }.observes('initialValue').on('init'),

    value: function() {
        return periods.Quarter.create({
            value: 'quarter:'+this.get('year')+'-'+this.get('quarter')
        });
    }.property('year', 'quarter'),

    quarterOptions: function() {
        var options = [];
        for (var i = 1; i <= 4; i++) {
            options.push(Em.Object.create({
                value: ''+i,
                name: numeral(i).format('0o')+' quarter'
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
            if (!this.get('quarter')) {
                this.set('quarterError', t('required_field'))
                ok = false;
            }
            if (ok) {
                this.get('controller').send('select', this.get('value'));
            }
        }
    }
});