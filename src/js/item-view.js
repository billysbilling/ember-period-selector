module.exports = Em.View.extend({
    template: require('../templates/item'),
    
    classNames: ['selector-item'],
    
    classNameBindings: ['isActive:active'],

    type: null,

    value: null,
    
    isActive: function() {
        return this.get('type') === this.get('parentView.currentType');
    }.property('type', 'parentView.currentType'),
    
    actions: {
        didClickName: function() {
            var type = this.get('type');
            if (type.get('viewClass')) {
                this.set('parentView.currentType', type);
            } else {
                this.get('parentView').send('select', null);
            }
        },

        select: function() {
            this.get('parentView').send('select', this.get('value'));
        }
    }
});