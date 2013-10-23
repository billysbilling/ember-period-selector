var periods = require('../src/js/periods');

var eventDispatcher,
    container,
    organization,
    target,
    selector,
    selectedValue,
    selectEventCounter;

QUnit.module('period-selector component', {
    setup: function() {
        eventDispatcher = Ember.EventDispatcher.create();
        eventDispatcher.setup({
            tap: 'click',
            click: null
        }, '#ember-testing');
        
        container = buildTestContainer();
        
        Em.run(function() {
            organization = Billy.Organization.load({
                firstFiscalYearStart: '2011-10-01'
            });
        });
        
        container.register('view:test-target', Em.View.extend({
            attributeBindings: ['style'],
            
            style: 'width:20px; height:20px; background-color:#999; position:absolute; top:20px; left:20px;'
        }));
        target = container.lookup('view:test-target');
        Ember.run(function() {
            target.appendTo('#ember-testing');
        });

        selectedValue = null;
        selectEventCounter = 0;
    },
    teardown: function() {
        Em.run(function() {
            eventDispatcher.destroy();
            organization.unload();
            if (selector) {
                selector.destroy();
            }
            if (target) {
                target.destroy();
            }
            if (container) {
                container.destroy();
            }
        });
        selector = target = container = null;
    }
});

function createSelector() {
    selector = container.lookup('component:period-selector');
    selector.on('select', function(value) {
        selectEventCounter++;
        selectedValue = value;
    })
}

function showSelector() {
    Ember.run(function() {
        selector.show(target)
    });
}

function setupSelector() {
    createSelector();
    showSelector();
}

test('Clicking all time selects instantly', function() {
    setupSelector();
    click('.selector-item .name', t('period_selector.all'));
    equal(selectEventCounter, 1);
    equal(selectedValue, null);
});

test('Clicking Month, applies .active class', function() {
    setupSelector();
    click('.selector-item:eq(1) .name', t('period_selector.month'));
    ok(findWithAssert('.selector-item:eq(1)').hasClass('active'))
});

test('Month default', function() {
    setupSelector();
    Em.run(function() {
        selector.set('value', periods.Month.create({value: 'month:2012-04'}));
    })
    click('.selector-item .name', t('period_selector.month'));
    click('.selector-item.active .tool');
    equal(selectEventCounter, 1);
    ok(selectedValue instanceof periods.Month);
    equal(selectedValue.get('value'), 'month:2012-04');
});

test('Quarter default', function() {
    setupSelector();
    Em.run(function() {
        selector.set('value', periods.Quarter.create({value: 'quarter:2012-2'}));
    })
    click('.selector-item .name', t('period_selector.quarter'));
    click('.selector-item.active .tool');
    equal(selectEventCounter, 1);
    ok(selectedValue instanceof periods.Quarter);
    equal(selectedValue.get('value'), 'quarter:2012-2');
});

test('Year default', function() {
    setupSelector();
    Em.run(function() {
        selector.set('value', periods.Year.create({value: 'year:2012'}));
    })
    click('.selector-item .name', t('period_selector.year'));
    click('.selector-item.active .tool');
    equal(selectEventCounter, 1);
    ok(selectedValue instanceof periods.Year);
    equal(selectedValue.get('value'), 'year:2012');
});

test('Fiscal year default', function() {
    setupSelector();
    Em.run(function() {
        selector.set('value', periods.FiscalYear.create({value: 'fiscalyear:2012'}));
    })
    click('.selector-item .name', t('period_selector.fiscalyear'));
    click('.selector-item.active .tool');
    equal(selectEventCounter, 1);
    ok(selectedValue instanceof periods.FiscalYear);
    equal(selectedValue.get('value'), 'fiscalyear:2012');
});

test('Dates default', function() {
    setupSelector();
    Em.run(function() {
        selector.set('value', periods.Dates.create({value: 'dates:2012-04-01...2012-04-30'}));
    })
    click('.selector-item .name', t('period_selector.dates'));
    click('.selector-item.active .tool');
    equal(selectEventCounter, 1);
    ok(selectedValue instanceof periods.Dates);
    equal(selectedValue.get('value'), 'dates:2012-04-01...2012-04-30');
});