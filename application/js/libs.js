/**
 * Template class shortcut for Mooml templates
 */
Template = new Class({
    'Extends': Mooml.Template,

    'initialize': function(code) {
        this.name = null;
        this.code = code;
        this.prepared = false;
    }
});

/**
 * Mixin for implemenation in Mootools classes
 */
Templates = new Class({
    'Implements': [Mooml.Templates],

    'renderSection': function(name, data, bind) {
        var template = this.sections[name];
        return (template)? template.render(data, [bind, this].pick()) : null;
    }
});

String.implement({
    'htmlEntities': function() {
        return this.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
    }
});

Element.implement({
    'toObject': function() {
        var str = this.toQueryString();

        if (str == '') {
            return {};
        } else {
            return str.parseQueryString();
        }
    },

    'toObjectNoPairs': function() {
        var obj = this.toObject();

        delete obj.key;
        delete obj.value;

        return obj;
    },

    'getPairs': function(name) {
        var keys = this.getElements('.pairs.' + name + ' input[name="key"]:not([value=""])').get('value');
        var values = this.getElements('.pairs.' + name + ' input[name="value"]:not([value=""])').get('value');

        // remove the last one because its always empty
        keys.pop();

        return values.associate(keys);
    },

    'getPadding': function() {
        var size = [
            this.getStyle('padding-left'),
            this.getStyle('padding-left'),
            this.getStyle('border-left-width'),
            this.getStyle('border-right-width')
        ];

        size.each(function(px, index) {
            size[index] = parseInt(px);
        });

        return size.sum();
    }
});

var Storage = new Class({
    'name': false,

    'initialize': function(item) {
        this.item = item;
        this.data = JSON.decode(localStorage.getItem(this.item));

        if (this.data == null) {
            this.data = {};
        }
    },

    'save': function() {
        localStorage.setItem(this.item, JSON.encode(this.data));
    },

    'get': function(key) {
        return this.data[key];
    },

    'set': function(key, value) {
        this.data[key] = value;
        this.save();
    },

    'remove': function(key) {
        delete this.data[key];
        this.save();
    }
});

FakeEvent = new Class({
    'initialize': function(target) {
        var event = new DOMEvent(document.createEvent('CustomEvent'));

        if (target) {
            event.target = target;
        }

        return event;
    }
});
