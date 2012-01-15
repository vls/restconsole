/**
 * Template class for Mooml templates
 */
Template = new Class({
    'Extends': Mooml.Template,

    'initialize': function(code) {
        this.name = null;
        this.code = code;
        this.prepared = false;
    }
});

Templates = new Class({
    'Implements': [Mooml.Templates],

    'renderSection': function(name, data, bind) {
        var template = this.sections[name];
        return (template)? template.render(data, [bind, this].pick()) : null;
    }
});

DOMEvent.definePseudo('input', function(split, fn, args) {
    // args[0] is the Event instance
    var char = args[0].code;

    if (char < 16 ||                // non printables
        (char == 16) ||             // avoid shift
        (char > 32 && char < 41) || // navigation keys
        char == 46)                 // Delete Key (Add to these if you need)
    {
        return;
    }

    fn.apply(this, args);
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
        var keys = this.getElements('.pairs[name="' + name + '"] input[name="key"]:not([value=""])').get('value');
        var values = this.getElements('.pairs[name="' + name + '"] input[name="value"]:not([value=""])').get('value');

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

Storage = new Class({
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

/**
 * Main App logic
 */
App = new Class({
    'Implements': [Events, Templates],

    // autocomplete values
    'datalists': {
        'mimetypes': [
            '*/*',
            'application/atom+xml',
            'application/docbook+xml',
            'application/ecmascript',
            'application/http',
            'application/javascript',
            'application/json',
            'application/octet-stream',
            'application/ogg',
            'application/pdf',
            'application/rar',
            'application/rdf+xml',
            'application/rss+xml',
            'application/rtf',
            'application/sgml',
            'application/xhtml+xml',
            'application/xml',
            'application/xml-dtd',
            'application/zip',
            'application/vnd.android.package-archive',
            'application/vnd.google-earth.kml+xml',
            'application/vnd.google-earth.kmz',
            'application/vnd.mozilla.xul+xml',
            'application/vnd.wap.wbxml',
            'application/x-7z-compressed',
            'application/x-bittorrent',
            'application/x-cab',
            'application/x-cbr',
            'application/x-cbz',
            'application/x-font',
            'application/x-freemind',
            'application/x-httpd-php',
            'application/x-httpd-php-source',
            'application/x-httpd-php3',
            'application/x-httpd-php3-preprocessed',
            'application/x-httpd-php4',
            'application/x-httpd-php5',
            'application/x-ruby',
            'application/x-shockwave-flash',
            'application/x-silverlight',
            'application/x-tar',
            'application/x-www-form-urlencoded',
            'audio/3gpp',
            'audio/amr',
            'audio/basic',
            'audio/flac',
            'audio/g.722.1',
            'audio/midi',
            'audio/mp4a-latm',
            'audio/mpa-robust',
            'audio/mpeg',
            'audio/mpegurl',
            'audio/ogg',
            'audio/tone',
            'audio/x-aiff',
            'audio/x-gsm',
            'audio/x-mpegurl',
            'audio/x-ms-wma',
            'audio/x-ms-wax',
            'audio/x-realaudio',
            'audio/x-wav',
            'image/gif',
            'image/jpeg',
            'image/png',
            'image/svg+xml',
            'image/tiff',
            'image/x-canon-cr2',
            'image/x-canon-crw',
            'image/x-icon',
            'image/x-photoshop',
            'image/x-rgb',
            'multipart/alternative',
            'multipart/digest',
            'multipart/encrypted',
            'multipart/form-data',
            'multipart/header-set',
            'multipart/mixed',
            'multipart/parallel',
            'multipart/related',
            'multipart/report',
            'multipart/signed',
            'text/cache-manifest',
            'text/calendar',
            'text/css',
            'text/csv',
            'text/directory',
            'text/html',
            'text/mathml',
            'text/plain',
            'text/rfc822-headers',
            'text/richtext',
            'text/rtf',
            'text/tab-separated-values',
            'text/uri-list',
            'text/x-java',
            'text/x-vcalendar',
            'text/x-vcard',
            'text/xml',
            'video/3gpp',
            'video/fli',
            'video/mpeg',
            'video/mp4',
            'video/quicktime',
            'video/mp4v-es',
            'video/ogg',
            'video/x-flv',
            'video/x-ms-asf',
            'video/x-ms-wm',
            'video/x-ms-wmv',
            'video/x-ms-wmx',
            'video/x-ms-wvx',
            'video/x-msvideo'
        ],

        'charset': ["*",
            "Big5",
            "EUC-JP",
            "EUC-KR",
            "GB2312",
            "ISO-2022-JP",
            "ISO-2022-JP-2",
            "ISO-2022-KR",
            "ISO-8859-1",
            "ISO-8859-2",
            "ISO-8859-3",
            "ISO-8859-4",
            "ISO-8859-5",
            "ISO-8859-6",
            "ISO-8859-6-E",
            "ISO-8859-6-I",
            "ISO-8859-7",
            "ISO-8859-8",
            "ISO-8859-8-E",
            "ISO-8859-8-I",
            "ISO-8859-9",
            "ISO-8859-10",
            "ISO-8859-11",
            "ISO-8859-12",
            "ISO-8859-13",
            "ISO-8859-14",
            "ISO-8859-15",
            "ISO-8859-16",
            "KOI7",
            "KOI8-R",
            "KOI8-U",
            "Shift_JIS",
            "US-ASCII",
            "UTF-8",
            "UTF-16",
            "UTF-32",
            "Windows-1250",
            "Windows-1251",
            "Windows-1252",
            "Windows-1253",
            "Windows-1254",
            "Windows-1255",
            "Windows-1256",
            "Windows-1257",
            "Windows-1258"
        ],

        'encoding': [
            'compress',
            'deflate',
            'exi',
            'gzip',
            'identity',
            'pack200-gzip',
            'sdch',
            'bzip2',
            'peerdist'
        ],

        'methods': [
            'HEAD',
            'GET',
            'POST',
            'PUT',
            'DELETE',
            'TRACE',
            'OPTIONS',
            'LINK',
            'UNLINK',
            'CONNET',
            'PATCH'
        ],

        'languages': [
            ['aa', 'Afar'],
            ['ab', 'Abkhazian'],
            ['af', 'Afrikaans'],
            ['am', 'Amharic'],
            ['ar', 'Arabic'],
            ['as', 'Assamese'],
            ['ay', 'Aymara'],
            ['az', 'Azerbaijani'],
            ['ba', 'Bashkir'],
            ['be', 'Byelorussian'],
            ['bg', 'Bulgarian'],
            ['bh', 'Bihari'],
            ['bi', 'Bislama'],
            ['bn', 'Bengali; Bangla'],
            ['bo', 'Tibetan'],
            ['br', 'Breton'],
            ['ca', 'Catalan'],
            ['co', 'Corsican'],
            ['cs', 'Czech'],
            ['cy', 'Welsh'],
            ['da', 'Danish'],
            ['de', 'German'],
            ['dz', 'Bhutani'],
            ['el', 'Greek'],
            ['en', 'English'],
            ['eo', 'Esperanto'],
            ['es', 'Spanish'],
            ['et', 'Estonian'],
            ['eu', 'Basque'],
            ['fa', 'Persian'],
            ['fi', 'Finnish'],
            ['fj', 'Fiji'],
            ['fo', 'Faroese'],
            ['fr', 'French'],
            ['fy', 'Frisian'],
            ['ga', 'Irish'],
            ['gd', 'Scots Gaelic'],
            ['gl', 'Galician'],
            ['gn', 'Guarani'],
            ['gu', 'Gujarati'],
            ['ha', 'Hausa'],
            ['he', 'Hebrew (formerly iw)'],
            ['hi', 'Hindi'],
            ['hr', 'Croatian'],
            ['hu', 'Hungarian'],
            ['hy', 'Armenian'],
            ['ia', 'Interlingua'],
            ['id', 'Indonesian'],
            ['ie', 'Interlingue'],
            ['ik', 'Inupiak'],
            ['is', 'Icelandic'],
            ['it', 'Italian'],
            ['iu', 'Inuktitut'],
            ['ja', 'Japanese'],
            ['jw', 'Javanese'],
            ['ka', 'Georgian'],
            ['kk', 'Kazakh'],
            ['kl', 'Greenlandic'],
            ['km', 'Cambodian'],
            ['kn', 'Kannada'],
            ['ko', 'Korean'],
            ['ks', 'Kashmiri'],
            ['ku', 'Kurdish'],
            ['ky', 'Kirghiz'],
            ['la', 'Latin'],
            ['ln', 'Lingala'],
            ['lo', 'Laothian'],
            ['lt', 'Lithuanian'],
            ['lv', 'Latvian, Lettish'],
            ['mg', 'Malagasy'],
            ['mi', 'Maori'],
            ['mk', 'Macedonian'],
            ['ml', 'Malayalam'],
            ['mn', 'Mongolian'],
            ['mo', 'Moldavian'],
            ['mr', 'Marathi'],
            ['ms', 'Malay'],
            ['mt', 'Maltese'],
            ['my', 'Burmese'],
            ['na', 'Nauru'],
            ['ne', 'Nepali'],
            ['nl', 'Dutch'],
            ['no', 'Norwegian'],
            ['oc', 'Occitan'],
            ['om', 'Oromo'],
            ['or', 'Oriya'],
            ['pa', 'Punjabi'],
            ['pl', 'Polish'],
            ['ps', 'Pashto, Pushto'],
            ['pt', 'Portuguese'],
            ['qu', 'Quechua'],
            ['rm', 'Rhaeto-Romance'],
            ['rn', 'Kirundi'],
            ['ro', 'Romanian'],
            ['ru', 'Russian'],
            ['rw', 'Kinyarwanda'],
            ['sa', 'Sanskrit'],
            ['sd', 'Sindhi'],
            ['sg', 'Sangho'],
            ['sh', 'Serbo-Croatian'],
            ['si', 'Sinhalese'],
            ['sk', 'Slovak'],
            ['sl', 'Slovenian'],
            ['sm', 'Samoan'],
            ['sn', 'Shona'],
            ['so', 'Somali'],
            ['sq', 'Albanian'],
            ['sr', 'Serbian'],
            ['ss', 'Siswati'],
            ['st', 'Sesotho'],
            ['su', 'Sundanese'],
            ['sv', 'Swedish'],
            ['sw', 'Swahili'],
            ['ta', 'Tamil'],
            ['te', 'Telugu'],
            ['tg', 'Tajik'],
            ['th', 'Thai'],
            ['ti', 'Tigrinya'],
            ['tk', 'Turkmen'],
            ['tl', 'Tagalog'],
            ['tn', 'Setswana'],
            ['to', 'Tonga'],
            ['tr', 'Turkish'],
            ['ts', 'Tsonga'],
            ['tt', 'Tatar'],
            ['tw', 'Twi'],
            ['ug', 'Uighur'],
            ['uk', 'Ukrainian'],
            ['ur', 'Urdu'],
            ['uz', 'Uzbek'],
            ['vi', 'Vietnamese'],
            ['vo', 'Volapuk'],
            ['wo', 'Wolof'],
            ['xh', 'Xhosa'],
            ['yi', 'Yiddish'],
            ['yo', 'Yoruba'],
            ['za', 'Zhuang'],
            ['zh', 'Chinese'],
            ['zu', 'Zulu']
        ]
    },

    'events': {
        // loads panels
        // TODO: its ugly, replace with modals + iframes
        'click:relay(a[data-type="panel"])': function(event) {
            event.preventDefault();

            var width = 800;
            var height = 600;
            var top = ((window.getSize().y - height) / 2).round();
            var left = ((window.getSize().x - width) / 2).round();

            chrome.windows.create({
                'url': this.get('href'),
                'left': left,
                'top': top,
                'width': width,
                'height': height,
                'focused': true,
                'type': 'panel'
            });
        }
    },

    'templates': {
        'datalist': new Template(function(data) {
            datalist({'id': data.id}, this.renderTemplate('option', data.values))
        }),

        'option': new Template(function(data) {
            data = Array.from(data);
            option({'value': data[0]}, [data[1], data[0]].pick())
        }),

        'section-header': new Template(function(data) {
            header(
                a({
                    'events': {
                        'click': function(event) {
                            var section = this.getParent('section');

                            // change class
                            section.toggleClass('minimize')

                            // store status
                            new Storage('sections').set(section.get('id'), !section.hasClass('minimize'));

                            // fire resize event to trigger hidden elements resize
                            window.fireEvent('resize');
                        }
                    }
                }),
                h2(data)
            )
        }),

        'rfc-link': new Template(function(data) {
            if (data) {
                section = data.split('.')[0];

                a({'data-type': 'panel', 'href': 'http://www.w3.org/Protocols/rfc2616/rfc2616-sec{0}.html#sec{1}'.substitute([section, data])})
            }
        }),

        'pairs': new Template(function(data) {
            fieldset({
                'class': 'control-group span6 pairs',
                'name': data.name,
                'events': {
                    'save': function(event) {
                        var data = this.toObject();

                        var storage = {};

                        // is there any?
                        if (data.key.length) {
                            // loop through
                            data.key.each(function(key, index) {
                                // only store ones with keys
                                if (key.length > 0) {
                                    storage[key] = data.value[index];
                                }
                            });
                        }

                        new Storage('pairs').set(this.get('name'), storage);
                    },

                    // clear error highlight on pairs
                    'keyup:relay(.controls.error input[type="text"]:first-child)': function(event) {
                        event.target.getParent('.controls').removeClass('error');
                    },

                    // check for empty keys on pairs
                    'blur:relay(.controls:not(:last-child) input[type="text"]:first-child)': function(event) {
                        var value = this.get('value').trim();

                        if (value == '') {
                            this.getParent('.controls').addClass('error');
                        } else {
                            this.set('value', value);
                        }
                    },

                    'focus:relay(.controls:last-of-type input[type="text"])': function(event) {
                        this.getNext('.add-on.add').fireEvent('click');
                    }
                }},

                label({'for': data.name}, data.label),

                div({
                    'class': 'controls',
                    'events': {
                        'change:relay(input[type="text"])': function(event) {
                            this.getParent('.control-group').fireEvent('save');
                        },

                        'click:relay(.btn.add)': function(event) {
                            var row = this.getParent('.controls');
                            var previous = row.getPrevious('.controls');

                            if (previous && previous.getElement('input').get('value') == '') {
                                previous.addClass('error').getElement('input').focus();
                            } else {
                                var clone = row.clone().cloneEvents(row);
                                clone.inject(row, 'before');
                                clone.getElement('input').focus();
                            }
                        },

                        'click:relay(.btn.remove)': function(event) {
                            var row = this.getParent('.controls');
                            var group = this.getParent('.control-group');
                            var next = row.getNext();

                            // don't focus on the next row if its the last
                            // otherwise you get stuck in a loop
                            if (next != group.getLast()) {
                                next.getElement('input').focus();
                            } else if (row.getPrevious('.controls')) {
                                row.getPrevious('.controls').getElement('input').focus();
                            }
                            row.destroy();

                            group.fireEvent('save');
                        }
                    }},

                    div({'class': 'input-append'},
                        input({'class': 'span2', 'type': 'text', 'name': 'key', 'data-type': data['data-type'], 'tabindex': data.tabindex, 'autocomplete': false, 'value': null, 'placeholder': 'ex: key'}),
                        input({'class': 'span3', 'type': 'text', 'name': 'value', 'data-type': data['data-type'], 'tabindex': data.tabindex, 'autocomplete': false, 'value': null, 'placeholder': 'ex: value'}),

                        span({'class': 'add-on btn add success'}),
                        span({'class': 'add-on btn remove danger'})
                    )
                )
            )
        }),

        'input': new Template(function(attributes) {
            // speech
            attributes['x-webkit-speech'] = true;

            // init events object
            if (!attributes.events) attributes.events = {};

            // default change event
            if (!attributes.events.change) {
                attributes.events.change = function(event) {
                    this.fireEvent('save');
                }
            }

            // save event
            attributes.events.save = function(event) {
                console.log('saving ' + this.get('name'));

                new Storage('input-values').set(this.get('name'), this.get('value'));

                // trigger highlight
                this.fireEvent('highlight');
            }

            // highlight event
            attributes.events.highlight = function(event) {
                var group = this.getParent('.control-group');
                var value = this.get('value');

                // reset classes
                group.removeClass('success').removeClass('error').removeClass('warning');

                // empty check
                if (value == '') {
                    if (this.get('required')) {
                        group.addClass('error');
                    } else {
                        group.addClass('warning');
                    }
                } else {
                    group.addClass('success');
                }
            }

            input(attributes)
        }),

        'standard-input': new Template(function(data) {
            fieldset({'class': 'control-group'},
                label({'class': 'control-label', 'for': data.attributes.name}, this.renderTemplate('rfc-link', data.rfc ? data.rfc : false), data.label),
                div({'class': 'controls'},
                    this.renderTemplate('input', data.attributes),
                    p({'class': 'help-text'}, data.help)
                )
            )
        }),

        'optional-input': new Template(function(data) {
            fieldset({'class': 'control-group'},
                label({'class': 'control-label', 'for': data.attributes.name}, this.renderTemplate('rfc-link', data.rfc ? data.rfc : false), data.label),
                div({'class': 'controls'},
                    div({'class': 'input-prepend'},
                        label({'class': 'add-on'},
                            input({
                                'type': 'checkbox',
                                'events': {
                                    'change': function(event) {
                                        var input = this.getParent('.input-prepend').getElement('input[type="text"], input[type="password"], input[type="number"]');
                                        var disabled = input.get('disabled');

                                        if (disabled) {
                                            input.set('disabled', false).fireEvent('highlight').fireEvent('focus').focus();

                                            // prevent autoComplete
                                            event.stopPropagation();
                                        } else {
                                            input.set('disabled', true);
                                            this.getParent('.control-group').removeClass('success').removeClass('error').removeClass('warning');
                                        }

                                        new Storage('input-status').set(input.get('name'), disabled);
                                    }
                                }
                            })
                        ),

                        this.renderTemplate('input', data.attributes),

                        p({'class': 'help-text'}, data.help)
                    )
                )
            )
        }),

        'header': new Template(function(data) {
            header({'class': 'navbar navbar-fixed'},
                div({'class': 'navbar-inner'},
                    div({'class': 'fluid-container'},
                        div({'class': 'brand'},
                            img({'src': '/images/logo/32.png', 'align': 'left'}), span('REST Console'), small('version 4.1.0')
                        ),

                        ul({
                            'class': 'nav',
                            'events': {
                                'click:relay(a)': function(event) {
                                    event.preventDefault();

                                    document.getElement('[data-screen]').dataset.screen = this.dataset.target;

                                    this.getParent('ul').getElement('.active').removeClass('active');
                                    this.getParent('li').addClass('active');
                                }
                            }},

                            li({'class': 'active'}, a({'data-target': 'main'}, i({'class': 'home'}), span('M'), 'ain')),
                            li(a({'data-target': 'settings'}, i({'class': 'settings'}), span('S'), 'ettings')),
                            li(a({'data-target': 'help'}, i({'class': 'question'}), span('H'), 'elp')),
                            li(a({'data-target': 'about'}, i({'class': 'info'}), span('A'), 'bout'))
                        )
                    )
                )
            )
        }),

        'container': new Template(function(data) {
            div({
                'class': 'main fluid-container sidebar-left',
                'data-screen': 'main',
                'events': {
                    'scroll': function() {
                        var position = this.getScroll().y;

                        document.getElements('a[data-spy="scroll"]').each(function(link) {
                            var target = link.get('href');
                            var targetPosition = document.getElement(target).getCoordinates(this).top;

                            if (targetPosition - 20 <= 0) {
                                link.getParent('ul').getElement('.active').removeClass('active');
                                link.getParent('li').addClass('active');
                            }
                        }.bind(this));
                    }
                }},

                div({'class': 'fluid-sidebar'},
                    div({'class': 'well'},
                        h3('Navigation'),

                        ul({'class': 'nav list navigation', 'data-screen-name': 'main'},
                            li({'class': 'active'}, a({'href': '#target', 'data-scroll': 'smooth', 'data-spy': 'scroll'}, i({'class': 'chevron-right'}), 'Target')),
                            li(a({'href': '#payload', 'data-scroll': 'smooth', 'data-spy': 'scroll'}, i({'class': 'chevron-right'}), 'Payload')),
                            li(a({'href': '#authorization', 'data-scroll': 'smooth', 'data-spy': 'scroll'}, i({'class': 'chevron-right'}), 'Authorization')),
                            li(a({'href': '#headers', 'data-scroll': 'smooth', 'data-spy': 'scroll'}, i({'class': 'chevron-right'}), 'Headers')),
                            li(a({'href': '#response', 'data-scroll': 'smooth', 'data-spy': 'scroll'}, i({'class': 'chevron-right'}), 'Response'))
                        )
                    ),

                    div({'class': 'tabbable', 'data-screen-name': 'main'},
                        ul({'class': 'nav tabs'},
                            li({'class': 'active'}, a({'data-toggle': 'tab'}, i({'class': 'star'}), 'Presets')),
                            li(a({'data-toggle': 'tab'}, i({'class': 'history'}), 'History'))
                        ),

                        div({'class': 'tab-content'},
                            div({'class': 'tab-pane active'},
                                ul({'class': 'nav list services'},
                                    li({'class': 'nav-header'}, 'User'),
                                    li(a({'href': '#'}, i({'class': 'plus'}), 'Add WADL')),

                                    li({'class': 'nav-header'}, 'Defaults'),
                                    li(a({'href': '#'}, i({'class': 'facebook'}), 'Facebook')),
                                    li(a({'href': '#'}, i({'class': 'flickr'}), 'Flickr')),
                                    li(a({'href': '#'}, i({'class': 'foursquare'}), 'Four Square')),
                                    li(a({'href': '#'}, i({'class': 'googleplus'}), 'Goolge+')),
                                    li(a({'href': '#'}, i({'class': 'linkedin'}), 'LinkedIn')),
                                    li(a({'href': '#'}, i({'class': 'quora'}), 'Quora')),
                                    li(a({'href': '#'}, i({'class': 'twitter'}), 'Twitter')),
                                    li(a({'href': '#'}, i({'class': 'youtube'}), 'YouTube'))
                                )
                            ),

                            div({'class': 'tab-pane'},
                                ul({'class': 'nav list history'},
                                    li(a({'href': '#'}, i({'class': 'time'}), 'GET www.domain.com/api/sasgasg/asgas')),
                                    li(a({'href': '#'}, i({'class': 'time'}), 'GET www.domain.com/api/sasgasg/asgas')),
                                    li(a({'href': '#'}, i({'class': 'time'}), 'GET www.domain.com/api/sasgasg/asgas')),
                                    li(a({'href': '#'}, i({'class': 'time'}), 'GET www.domain.com/api/sasgasg/asgas')),
                                    li(a({'href': '#'}, i({'class': 'time'}), 'GET www.domain.com/api/sasgasg/asgas')),
                                    li(a({'href': '#'}, i({'class': 'time'}), 'GET www.domain.com/api/sasgasg/asgas')),
                                    li(a({'href': '#'}, i({'class': 'time'}), 'GET www.domain.com/api/sasgasg/asgas')),
                                    li(a({'href': '#'}, i({'class': 'time'}), 'GET www.domain.com/api/sasgasg/asgas')),
                                    li(a({'href': '#'}, i({'class': 'time'}), 'GET www.domain.com/api/sasgasg/asgas')),
                                    li(a({'href': '#'}, i({'class': 'time'}), 'GET www.domain.com/api/sasgasg/asgas')),
                                    li(a({'href': '#'}, i({'class': 'time'}), 'GET www.domain.com/api/sasgasg/asgas'))
                                )
                            )
                        )
                    ),

                    div({'class': 'tabbable tabs-below'},
                        div({'class': 'tab-content'},
                            div({'class': 'tab-pane active'},
                                ul({'class': 'nav list'},
                                    li(a({'href': 'https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=UJ2B2BTK9VLRS', 'target': '_blank'}, i({'class': 'star-empty'}), 'Paypal')),
                                    li(a({'href': 'https://flattr.com/thing/156628/REST-Console', 'target': '_blank'}, i({'class': 'star-empty'}), 'Flattr')),
                                    li(a({'href': 'http://utip.it/codeinchaos', 'target': '_blank'}, i({'class': 'star-empty'}), 'TipIt'))
                                )
                            ),

                            div({'class': 'tab-pane'},
                                ul({'class': 'nav list'},
                                    li(a({'href': 'http://www.codeinchaos.com', 'target': '_blank'}, i({'class': 'star'}), 'Code in Chaos Inc.')),
                                    li(a({'href': 'https://github.com/codeinchaos/restconsole', 'target': '_blank'}, i({'class': 'cog'}), 'GitHub')),
                                    li(a({'shref': 'https://raw.github.com/codeinchaos/restconsole/master/LICENSE', 'target': '_blank', 'data-type': 'panel'}, i({'class': 'book'}), 'License'))
                                )
                            )
                        ),

                        ul({'class': 'nav tabs'},
                            li({'class': 'active'}, a({'data-toggle': 'tab'}, i({'class': 'star'}), 'Donate')),
                            li(a({'data-toggle': 'tab'}, i({'class': 'time'}), 'About'))
                        )
                    )
                ),

                div({'class': 'fluid-content'},
                    div({'data-screen-name': 'main'},
                        this.renderSection('target'),
                        this.renderSection('payload'),
                        this.renderSection('authorization'),
                        this.renderSection('headers'),
                        this.renderSection('response')
                    ),

                    div({'data-screen-name': 'settings'},
                        this.renderTemplate('settings')
                    ),

                    div({'data-screen-name': 'help'},
                        this.renderTemplate('help')
                    ),

                    div({'data-screen-name': 'about'},
                        this.renderTemplate('about')
                    )
                )
            )
        }),

        'settings': new Template(function(data) {
            section({'id': 'settings'},
                this.renderTemplate('section-header', 'Settings'),

                a({'events': {
                    'click': function(event) {
                        event.preventDefault();
                        chrome.webstore.install('https://chrome.google.com/webstore/detail/faceofpmfclkengnkgkgjkcibdbhemoc');
                    }
                }}, 'Install Extension'),

                form({
                    'name': 'options',
                    'class': 'form-stacked',
                    'novalidate': true,
                    'events': {
                        'init': function() {
                            var options = new Storage('options');

                            this.getElements('input[type="checkbox"]').each(function(checkbox) {
                                var data = options.get(checkbox.get('name'));

                                if (data != null) {
                                    if (data == true) {
                                        checkbox.set('checked', true);
                                    } else {
                                        checkbox.set('checked', false);
                                    }
                                }

                                checkbox.fireEvent('change');
                            });
                        }
                    }},

                    div({'class': 'row'},
                        div({'class': 'span6'},
                            fieldset({'class': 'control-group'},
                                label({'class': 'control-label'}, 'General'),
                                div({'class': 'controls'},
                                    div({'class': 'control-list'},
                                        label({'class': 'checkbox'},
                                            input({
                                                'type': 'checkbox',
                                                'name': 'help',
                                                'events': {
                                                    'change': function(event) {
                                                        if (this.get('checked')) {
                                                            document.body.addClass('no-help');
                                                        } else {
                                                            document.body.removeClass('no-help');
                                                        }
                                                    }
                                                }
                                            }),

                                            'Hide Help Lines'
                                        ),
                                        label({'class': 'checkbox'},
                                            input({'type': 'checkbox', 'name': 'lines'}), 'Hide Line Numbers *'
                                        )
                                    ),

                                    p({'class': 'help-text'}, '* will affect next request.')
                                )
                            )
                        ),

                        div({'class': 'span'},
                            fieldset({'class': 'control-group'},
                                label({'class': 'control-label'}, 'Color Theme'),
                                div({'class': 'controls'},
                                    div({
                                        'class': 'control-list',
                                        'events': {
                                            'change:relay(input)': function(event) {
                                                if (this.get('checked')) {
                                                    document.id('theme').set('href', 'css/prettify/{0}.css'.substitute([this.get('value')]));
                                                }
                                            }
                                        }},

                                        label({'class': 'checkbox'},
                                            input({'type': 'radio', 'name': 'theme', 'value': 'default'}), 'Default'
                                        ),

                                        label({'class': 'checkbox'},
                                            input({'type': 'radio', 'name': 'theme', 'value': 'bootstrap', 'checked': true}), 'Bootstrap'
                                        ),

                                        label({'class': 'checkbox'},
                                            input({'type': 'radio', 'name': 'theme', 'value': 'bootstrap-dark'}), 'Bootstrap Dark'
                                        ),

                                        label({'class': 'checkbox'},
                                            input({'type': 'radio', 'name': 'theme', 'value': 'desert'}), 'Desert'
                                        ),

                                        label({'class': 'checkbox'},
                                            input({'type': 'radio', 'name': 'theme', 'value': 'sunburst'}), 'Sunburst'
                                        ),

                                        label({'class': 'checkbox'},
                                            input({'type': 'radio', 'name': 'theme', 'value': 'sons-of-obsidian'}), 'Sons of Obsidian'
                                        )
                                    ),

                                    p({'class': 'help-text'}, 'Syntax highlighting default color theme')
                                )
                            )
                        )
                    )
                ).fireEvent('init')
            )
        }),

        'help': new Template(function(data) {
            section({'id': 'help'},
                this.renderTemplate('section-header', 'Help')
            )
        }),

        'about': new Template(function(data) {
            section({'id': 'about'},
                this.renderTemplate('section-header', 'About')
            )
        }),

        'controls': new Template(function(data) {
            footer({'class': 'navbar navbar-fixed'},
                div({'class': 'navbar-inner'},
                    div({'class': 'fluid-container sidebar-left'},
                        div({
                            'class': 'fluid-content controls',
                            'events': {
                                'click:relay(button)': function(event) {
                                    this.send();
                                }.bind(this)
                            }},

                            button({'data-action': 'submit', 'class': 'btn primary'}, 'Send'),
                            button({'data-action': 'get', 'class': 'btn'}, 'GET'),
                            button({'data-action': 'post', 'class': 'btn'}, 'POST'),
                            button({'data-action': 'put', 'class': 'btn'}, 'PUT'),
                            button({'data-action': 'delete', 'class': 'btn'}, 'DELETE'),

                            div({'class': 'pull-right'},
                                button({'data-action': 'stop', 'class': 'btn danger'}, 'Stop'),
                                button({'data-action': 'save', 'class': 'btn success'}, 'Save Request')
                            )
                        )
                    )
                )
            )
        })
    },

    'sections': {
        'target': new Template(function(data) {
            section({'id': 'target'},
                this.renderTemplate('section-header', 'Target'),

                form({'name': 'target', 'class': 'form-stacked', 'novalidate': true},
                    div({'class': 'row'},
                        div({'class': 'span2'},
                            this.renderTemplate('standard-input', {
                                'rfc': '5.1.1',
                                'label': 'Method',
                                'help': 'HTTP Verb',
                                'attributes': {
                                    'class': 'span2',
                                    'type': 'text',
                                    'name': 'method',
                                    'tabindex': 2,
                                    'autocomplete': true,
                                    'placeholder': 'ex: POST',
                                    'list': 'methods',
                                    'required': true
                                }
                            })
                        ),

                        div({'class': 'span9'},
                            this.renderTemplate('standard-input', {
                                'rfc': '3.2',
                                'label': 'URI',
                                'help': 'Universal Resource Identifier. ex: https://www.sample.com:9000',
                                'attributes': {
                                    'class': 'span9',
                                    'type': 'text',
                                    'name': 'uri',
                                    'tabindex': 2,
                                    'autocomplete': true,
                                    'placeholder': 'ex: http://example.com/resources/ef7d-xj36p',
                                    'required': true,
                                    'events': {
                                        'change': function(event) {
                                            var value = this.get('value');

                                            if (value.length && value.substr(0, 4) != 'http') {
                                                this.set('value', 'http://' + value);
                                            }

                                            this.fireEvent('save');
                                        }
                                    }
                                }
                            })
                        ),

                        div({'class': 'span1'},
                            this.renderTemplate('standard-input', {
                                'label': 'Timeout',
                                'help': 'seconds',
                                'attributes': {
                                    'class': 'span1',
                                    'type': 'number',
                                    'name': 'timeout',
                                    'value': 60,
                                    'tabindex': 2,
                                    'min': 1,
                                    'step': 1,
                                    'required': true
                                }
                            })
                        )
                    ),

                    div({'class': 'row'},
                        this.renderTemplate('pairs', [
                            {
                                'name': 'headers',
                                'label': 'Headers',
                                'data-type': 'header',
                                'tabindex': 3
                            },

                            {
                                'name': 'query',
                                'label': 'Query String',
                                'data-type': 'query',
                                'tabindex': 3
                            }
                        ])
                    )
                )
            )
        }),

        'payload': new Template(function(data) {
            section({'id': 'payload', 'class': 'minimize'},
                this.renderTemplate('section-header', 'Payload'),

                form({'name': 'payload', 'class': 'form-stacked', 'novalidate': true},
                    div({'class': 'row'},
                        div({'class': 'span6'},
                            this.renderTemplate('optional-input', [
                                {
                                    'label': 'Content-Type',
                                    'help': 'The mime type of the body of the request',
                                    'attributes': {
                                        'class': 'span6',
                                        'type': 'text',
                                        'name': 'Content-Type',
                                        'tabindex': 4,
                                        'autocomplete': true,
                                        'placeholder': 'ex: application/x-www-form-urlencoded',
                                        'list': 'mimetypes',
                                        'disabled': true,
                                        'events': {
                                            'change': function(event) {
                                                var form = this.getParent('form');
                                                var tab = form.getElement('.tab-pane.urlencoded');
                                                var textarea = form.getElement('textarea');

                                                if (this.get('value').toLowerCase() == 'application/x-www-form-urlencoded') {
                                                    tab.addClass('true');
                                                    textarea.fireEvent('change');
                                                } else {
                                                    tab.removeClass('true');
                                                }

                                                this.fireEvent('save');
                                            }
                                        }
                                    }
                                },

                                {
                                    'label': 'Content-Type Encoding',
                                    'help': 'Acceptable encodings',
                                    'attributes': {
                                        'class': 'span6',
                                        'type': 'text',
                                        'name': 'content-encoding',
                                        'tabindex': 4,
                                        'autocomplete': true,
                                        'placeholder': 'ex: utf-8',
                                        'list': 'charset',
                                        'disabled': true
                                    }
                                },

                                {
                                    'label': 'Content-Length',
                                    'help': 'The length of the request body in octets (8-bit bytes).',
                                    'attributes': {
                                        'class': 'span6',
                                        'type': 'text',
                                        'name': 'Content-Length',
                                        'tabindex': 4,
                                        'autocomplete': true,
                                        'placeholder': 'ex: 348',
                                        'disabled': true
                                    }
                                },

                                {
                                    'label': 'Content-MD5',
                                    'help': 'A Base64-encoded binary MD5 sum of the content of the request body.',
                                    'attributes': {
                                        'class': 'span6',
                                        'type': 'text',
                                        'name': 'Content-MD5',
                                        'tabindex': 4,
                                        'autocomplete': true,
                                        'placeholder': 'ex: Q2hlY2sgSW50ZWdyaXR5IQ==',
                                        'disabled': true
                                    }
                                }
                            ])
                        ),

                        div({'class': 'span6'},
                            div({'class': 'tabbable', 'data-name': 'payload'},
                                ul({'class': 'nav tabs'},
                                    li({'class': 'active'}, a({'data-toggle': 'tab'}, 'RAW Body')),
                                    li(a({'data-toggle': 'tab'}, 'Form Data')),
                                    li(a({'data-toggle': 'tab'}, 'Attachments'))
                                ),

                                div({'class': 'tab-content'},
                                    div({'class': 'tab-pane active'},
                                        fieldset({'class': 'control-group'},
                                            div({'class': 'controls'},
                                                textarea({
                                                    'class': 'span6',
                                                    'name': 'payload',
                                                    'rows': 5,
                                                    'tabindex': 5,
                                                    'placeholder': 'ex: XML, JSON, etc ...',
                                                    'events': {
                                                        'change': function(event) {
                                                            var form = this.getParent('form');
                                                            var type = form.getElement('input[name="Content-Type"]').get('value').toLowerCase();

                                                            form.getElements('.pairs .controls:nth-last-of-type(n+2)').destroy();

                                                            if (type == 'application/x-www-form-urlencoded') {
                                                                var payload = this.get('value');

                                                                if (payload != '') {
                                                                    payload = payload.parseQueryString();

                                                                    Object.each(payload, function(value, key) {
                                                                        // construct fake event object
                                                                        var event = new FakeEvent(form.getElement('.pairs .controls:last-of-type .add-on'));

                                                                        // trigger focus event to insert more rows
                                                                        document.fireEvent('click', event);

                                                                        var last = form.getElement('.pairs .controls:nth-last-child(-n+2)');

                                                                        last.getElement('input[type="text"]:first-of-type').set('value', key);
                                                                        last.getElement('input[type="text"]:last-of-type').set('value', value);
                                                                    }.bind(this));
                                                                }
                                                            }
                                                        }
                                                    }
                                                }),

                                                p({'class': 'help-text'}, 'Remember to set the Content-Type header.')
                                            )
                                        )
                                    ),

                                    div({'class': 'tab-pane urlencoded'},
                                        p({'class': 'help-text'}, 'Only Enabled for Content-Type: application/x-www-form-urlencoded'),

                                        fieldset({
                                            'class': 'control-group pairs',
                                            'name': 'payload',
                                            'ignore': true,
                                            'events': {
                                                'change:relay(input[type="text"])': function(event) {
                                                    var form = this.getParent('form');
                                                    var data = form.getPairs('payload');
                                                    var type = form.getElement('input[name="Content-Type"]').get('value').toLowerCase();
                                                    var textarea = form.getElement('textarea[name="payload"]');

                                                    if (type == 'application/x-www-form-urlencoded') {
                                                        textarea.set('value', Object.toQueryString(data));

                                                        // trigger change event to store the resutls
                                                        document.fireEvent('change', new FakeEvent(textarea));
                                                    }
                                                }
                                            }},

                                            div({'class': 'controls'},
                                                div({'class': 'input-append'},
                                                    input({'class': 'span2 smaller', 'type': 'text', 'name': 'key', 'tabindex': 3, 'autocomplete': true, 'value': null, 'placeholder': 'ex: key'}),
                                                    input({'class': 'span3', 'type': 'text', 'name': 'value', 'tabindex': 3, 'autocomplete': true, 'value': null, 'placeholder': 'ex: value'}),
                                                    span({'class': 'add-on btn success'})
                                                )
                                            )
                                        )
                                    ),

                                    div({'class': 'tab-pane'},
                                        fieldset({'class': 'control-group pairs'},
                                            div({'class': 'controls'},
                                                div({'class': 'input-append'},
                                                    input({'class': 'span3', 'name': 'file', 'type': 'file', 'multiple': false}),
                                                    input({'class': 'span2 smaller', 'type': 'text', 'name': 'name', 'tabindex': 5, 'autocomplete': true, 'placeholder': 'ex: file, Files[]'}),
                                                    span({'class': 'add-on btn success'})
                                                )
                                            )
                                        )
                                    )
                                )
                            )
                        )
                    )
                )
            )
        }),

        'authorization': new Template(function(data) {
            section({'id': 'authorization', 'class': 'minimize'},
                this.renderTemplate('section-header', 'Authorization'),

                form({
                    'name': 'authorization',
                    'class': 'form-stacked',
                    'novalidate': true
                    },

                    div({'class': 'tabbable', 'data-name': 'authorization'},
                        ul({
                            'class': 'nav tabs',
                            'events': {
                                'click:relay(li a)': function(event) {
                                    var tabbable = this.getParent('.tabbable');
                                    var tabs = tabbable.getElement('.tabs');
                                    var content = tabbable.getElements('.tab-content .tab-pane');
                                    var index = tabs.getChildren().indexOf(this.getParent('li'));

                                    content.getElements('input[name="Authorization"], input[type="text"]:not([disabled]), input[type="password"]:not([disabled]), input[type="hidden"], select').each(function(elements) {
                                        elements.set('disabled', true);
                                    });

                                    content[index].getElements('input[name="Authorization"], input[type="hidden"], select').set('disabled', false);

                                    content[index].getElements('input[type="checkbox"]').each(function(checkbox) {
                                        if (checkbox.get('checked')) {
                                            var input = checkbox.getParent('.input-prepend').getElement('input[type="text"], input[type="password"], input[type="number"]');

                                            input.set('disabled', false);

                                            document.fireEvent('keyup', new FakeEvent(input));
                                        }
                                    });

                                    // trigger the Authorization value
                                    var firstInput = content[index].getElement('input[type="text"]')
                                    content[index].fireEvent('keyup', new FakeEvent(firstInput));
                                }
                            }},

                            li({'class': 'active'}, a({'data-toggle': 'tab'}, 'Custom')),
                            li(a({'data-toggle': 'tab'}, 'Basic')),
                            //li(a({'data-toggle': 'tab'}, 'Digest')),
                            li(a({'data-toggle': 'tab'}, 'oAuth'))
                        ),

                        div({'class': 'tab-content'},
                            div({'class': 'tab-pane active'},
                                this.renderTemplate('optional-input', [
                                    {
                                        'label': 'Authorization',
                                        'help': 'Authentication credentials for HTTP authentication.',
                                        'attributes': {
                                            'class': 'span12',
                                            'type': 'text',
                                            'name': 'Authorization',
                                            'tabindex': 7,
                                            'autocomplete': true,
                                            'placeholder': 'ex: Basic QWxhZGRpbjpvcGVuIHNlc2FtZQ==',
                                            'disabled': true
                                        }
                                    },

                                    {
                                        'rfc': '14.34',
                                        'label': 'Proxy-Authorization',
                                        'help': 'Authorization credentials for connecting to a proxy.',
                                        'attributes': {
                                            'class': 'span12',
                                            'type': 'text',
                                            'name': 'Proxy-Authorization',
                                            'tabindex': 5,
                                            'autocomplete': false,
                                            'placeholder': 'ex: Basic QWxhZGRpbjpvcGVuIHNlc2FtZQ==',
                                            'disabled': true
                                        }
                                    }
                                ])
                            ),

                            div({
                                'class': 'tab-pane',
                                'events': {
                                    'keyup:relay(input[type="text"], input[type="password"])': function(event) {
                                        var pane = this.getParent('.tab-pane');
                                        var data = pane.toObject();

                                        var str = data['basic-username'] + ':';

                                        if (data['basic-password']) {
                                            str += data['basic-password'];
                                        }

                                        pane.getElement('input[name="Authorization"]').set('value', 'Basic ' + btoa(str));
                                    }
                                }},

                                input({'name': 'Authorization', 'type': 'hidden', 'disabled': true}),

                                this.renderTemplate('optional-input', [
                                    {
                                        'label': 'Username',
                                        'help': '',
                                        'attributes': {
                                            'class': 'span12',
                                            'type': 'text',
                                            'name': 'basic-username',
                                            'tabindex': 7,
                                            'autocomplete': true,
                                            'placeholder': 'ex: username',
                                            'required': true,
                                            'disabled': true
                                        }
                                    },

                                    {
                                        'label': 'Password',
                                        'help': '',
                                        'attributes': {
                                            'class': 'span12',
                                            'type': 'password',
                                            'name': 'basic-password',
                                            'tabindex': 5,
                                            'autocomplete': false,
                                            'placeholder': 'ex: password',
                                            'disabled': true
                                        }
                                    }
                                ])
                            ),
/*
                            div({'class': 'tab-pane'},
                                input({'name': 'Authorization', 'type': 'hidden', 'disabled': true}),

                                this.renderTemplate('optional-input', [
                                    {
                                        'label': 'Username',
                                        'help': '',
                                        'attributes': {
                                            'class': 'span12',
                                            'type': 'text',
                                            'name': 'digest-username',
                                            'tabindex': 7,
                                            'autocomplete': true,
                                            'placeholder': 'ex: username',
                                            'required': true,
                                            'disabled': true
                                        }
                                    },

                                    {
                                        'label': 'Password',
                                        'help': '',
                                        'attributes': {
                                            'class': 'span12',
                                            'type': 'password',
                                            'name': 'digest-password',
                                            'tabindex': 5,
                                            'autocomplete': false,
                                            'placeholder': 'ex: password',
                                            'disabled': true
                                        }
                                    }
                                ])
                            ),
*/
                            div({
                                'class': 'tab-pane oauth',
                                'events': {
                                    'keyup:relay(input[type="text"], input[type="number"])': this.signOAuth
                                }},

                                div({'class': 'row'},
                                    div({'class': 'span12'},
                                        this.renderTemplate('standard-input', {
                                            'label': 'Authorization Header',
                                            'help': '',
                                            'attributes': {
                                                'class': 'span12',
                                                'type': 'text',
                                                'name': 'Authorization',
                                                'tabindex': 7,
                                                'autocomplete': false,
                                                'placeholder': 'ex: ',
                                                'required': false,
                                                'disabled': false,
                                                'readonly': true
                                            }
                                        })
                                    )
                                ),

                                div({'class': 'row'},
                                    div({'class': 'span2'},
                                        this.renderTemplate('optional-input', {
                                            'label': 'Version',
                                            'help': '',
                                            'attributes': {
                                                'class': 'span2',
                                                'type': 'number',
                                                'name': 'version',
                                                'tabindex': 7,
                                                'autocomplete': true,
                                                'placeholder': 'ex: 1.0',
                                                'required': true,
                                                'disabled': true,
                                                'events': {
                                                    'change': function(event) {
                                                        this.set('value', parseInt(this.get('value')).toFixed(1));

                                                        this.fireEvent('save');
                                                    }
                                                }
                                            }
                                        })
                                    ),

                                    div({'class': 'span2'},
                                        fieldset({'class': 'control-group'},
                                            label({'class': 'control-label', 'for': 'signature'}, 'Signature Method'),
                                            div({'class': 'controls'},
                                                select({'class': 'span2', 'name': 'signature', 'tabindex': 4, 'disabled': true},
                                                    option({'value': 'HMAC-SHA1', 'selected': true},'HMAC-SHA1'),
                                                    option({'value': 'PLAINTEXT'}, 'PLAINTEXT')
                                                ),
                                                p({'class': 'help-text'}, '')
                                            )
                                        )
                                    ),

                                    div({'class': 'span2'},
                                        fieldset({'class': 'control-group'},
                                            label({'class': 'control-label', 'for': 'method'}, 'Preferred Method'),
                                            div({'class': 'controls'},
                                                select({'class': 'span2', 'name': 'method', 'tabindex': 4, 'disabled': true},
                                                    option({'value': 'header', 'selected': true}, 'Header'),
                                                    option({'value': 'query'},'Query String')
                                                ),
                                                p({'class': 'help-text'}, '')
                                            )
                                        )
                                    )
                                ),

                                div({'class': 'row'},
                                    div({'class': 'span6'},
                                        this.renderTemplate('optional-input', [
                                            {
                                                'label': 'Consumer Key',
                                                'help': '',
                                                'attributes': {
                                                    'class': 'span6',
                                                    'type': 'text',
                                                    'name': 'consumer_key',
                                                    'tabindex': 7,
                                                    'autocomplete': true,
                                                    'placeholder': 'ex: 737060cd8c284d8af7ad3082f209582d',
                                                    'required': true,
                                                    'disabled': true
                                                }
                                            },

                                            {
                                                'label': 'Consumer Secret',
                                                'help': '',
                                                'attributes': {
                                                    'class': 'span6',
                                                    'type': 'text',
                                                    'name': 'consumer_secret',
                                                    'tabindex': 7,
                                                    'autocomplete': true,
                                                    'placeholder': 'ex: 737060cd8c284d8af7ad3082f209582d',
                                                    'required': true,
                                                    'disabled': true
                                                }
                                            },

                                            {
                                                'label': 'Token Key',
                                                'help': '',
                                                'attributes': {
                                                    'class': 'span6',
                                                    'type': 'text',
                                                    'name': 'token_key',
                                                    'tabindex': 7,
                                                    'autocomplete': true,
                                                    'placeholder': 'ex: 737060cd8c284d8af7ad3082f209582d',
                                                    'disabled': true
                                                }
                                            },

                                            {
                                                'label': 'Token Secret',
                                                'help': '',
                                                'attributes': {
                                                    'class': 'span6',
                                                    'type': 'text',
                                                    'name': 'token_secret',
                                                    'tabindex': 7,
                                                    'autocomplete': true,
                                                    'placeholder': 'ex: 737060cd8c284d8af7ad3082f209582d',
                                                    'disabled': true
                                                }
                                            },

                                            {
                                                'label': 'Scope',
                                                'help': '',
                                                'attributes': {
                                                    'class': 'span6',
                                                    'type': 'text',
                                                    'name': 'scope',
                                                    'tabindex': 7,
                                                    'autocomplete': true,
                                                    'placeholder': 'ex: ',
                                                    'disabled': true
                                                }
                                            },

                                            {
                                                'label': 'Realm',
                                                'help': '',
                                                'attributes': {
                                                    'class': 'span6',
                                                    'type': 'text',
                                                    'name': 'realm',
                                                    'tabindex': 7,
                                                    'autocomplete': true,
                                                    'placeholder': 'ex: ',
                                                    'disabled': true
                                                }
                                            }
                                        ])
                                    ),

                                    div({'class': 'span6'},
                                        this.renderTemplate('optional-input', [
                                            {
                                                'label': 'Request token URL',
                                                'help': '',
                                                'attributes': {
                                                    'class': 'span6',
                                                    'type': 'text',
                                                    'name': 'request_url',
                                                    'tabindex': 7,
                                                    'autocomplete': true,
                                                    'placeholder': 'ex: https://api.provider.com/oauth/request_token',
                                                    'disabled': true
                                                }
                                            },

                                            {
                                                'label': 'Access token URL',
                                                'help': '',
                                                'attributes': {
                                                    'class': 'span6',
                                                    'type': 'text',
                                                    'name': 'access_url',
                                                    'tabindex': 7,
                                                    'autocomplete': true,
                                                    'placeholder': 'ex: https://api.provider.com/oauth/access_token',
                                                    'disabled': true
                                                }
                                            },

                                            {
                                                'label': 'Authorize URL',
                                                'help': '',
                                                'attributes': {
                                                    'class': 'span6',
                                                    'type': 'text',
                                                    'name': 'authorize_url',
                                                    'tabindex': 7,
                                                    'autocomplete': true,
                                                    'placeholder': 'ex: https://api.provider.com/oauth/authorize',
                                                    'disabled': true
                                                }
                                            },

                                            {
                                                'label': 'Oauth Callback',
                                                'help': '',
                                                'attributes': {
                                                    'class': 'span6',
                                                    'type': 'text',
                                                    'name': 'oauth_callback',
                                                    'tabindex': 7,
                                                    'autocomplete': true,
                                                    'placeholder': 'ex: https://www.domain.com',
                                                    'disabled': true
                                                }
                                            },

                                            {
                                                'label': 'Oauth Verifier',
                                                'help': '',
                                                'attributes': {
                                                    'class': 'span6',
                                                    'type': 'text',
                                                    'name': 'oauth_verifier',
                                                    'tabindex': 7,
                                                    'autocomplete': true,
                                                    'placeholder': 'ex: 737060cd8c284d8af7ad3082f209582d',
                                                    'disabled': true
                                                }
                                            }
                                        ])
                                    )
                                )
                            )
                        )
                    )
                )
            )
        }),

        'headers': new Template(function(data) {
            section({'id': 'headers', 'class': 'minimize'},
                this.renderTemplate('section-header', 'Headers'),

                form({
                    'name': 'headers',
                    'class': 'form-stacked',
                    'novalidate': true
                    },

                    div({'class': 'tabbable'},
                        ul({'class': 'nav tabs'},
                            li({'class': 'active'}, a({'data-toggle': 'tab'}, 'Standard Headers')),
                            li(a({'data-toggle': 'tab'}, 'Cache')),
                            li(a({'data-toggle': 'tab'}, 'Common non-standard headers'))
                        ),

                        div({'class': 'tab-content'},
                            div({'class': 'tab-pane active'},
                                this.renderTemplate('optional-input', [
                                    {
                                        'rfc': '14.1',
                                        'label': 'Accept',
                                        'help': 'Content-Types that are acceptable.',
                                        'attributes': {
                                            'class': 'span12',
                                            'type': 'text',
                                            'name': 'Accept',
                                            'tabindex': 3,
                                            'autocomplete': true,
                                            'placeholder': 'ex: text/plain',
                                            'list': 'mimetypes',
                                            'disabled': true
                                        }
                                    },

                                    {
                                        'rfc': '14.2',
                                        'label': 'Accept Charset',
                                        'help': 'Character sets that are acceptable.',
                                        'attributes': {
                                            'class': 'span12',
                                            'type': 'text',
                                            'name': 'Accept-Charset',
                                            'tabindex': 3,
                                            'autocomplete': true,
                                            'placeholder': 'ex: utf-8',
                                            'list': 'charset',
                                            'disabled': true
                                        }
                                    },

                                    {
                                        'rfc': '14.3',
                                        'label': 'Accept Encoding',
                                        'help': 'Acceptable encodings.',
                                        'attributes': {
                                            'class': 'span12',
                                            'type': 'text',
                                            'name': 'Accept-Encoding',
                                            'tabindex': 3,
                                            'autocomplete': true,
                                            'placeholder': 'ex: identity',
                                            'list': 'encoding',
                                            'disabled': true
                                        }
                                    },

                                    {
                                        'rfc': '14.4',
                                        'label': 'Accept Language',
                                        'help': 'Acceptable languages for response.',
                                        'attributes': {
                                            'class': 'span12',
                                            'type': 'text',
                                            'name': 'Accept-Language',
                                            'tabindex': 3,
                                            'autocomplete': true,
                                            'placeholder': 'ex: en-US',
                                            'list': 'languages',
                                            'disabled': true
                                        }
                                    },

                                    {
                                        'rfc': '14.10',
                                        'label': 'Connection',
                                        'help': 'What type of connection the user-agent would prefer',
                                        'attributes': {
                                            'class': 'span12',
                                            'type': 'text',
                                            'name': 'Connection',
                                            'tabindex': 5,
                                            'autocomplete': false,
                                            'placeholder': 'ex: keep-alive',
                                            'disabled': true
                                        }
                                    },

                                    {
                                        'label': 'Cookie',
                                        'help': 'an HTTP cookie previously sent by the server',
                                        'attributes': {
                                            'class': 'span12',
                                            'type': 'text',
                                            'name': 'Cookie',
                                            'tabindex': 4,
                                            'autocomplete': true,
                                            'placeholder': 'ex: UserID=JohnDoe; Max-Age=3600; Version=1',
                                            'disabled': true
                                        }
                                    },

                                    {
                                        'rfc': '14.18',
                                        'label': 'Date',
                                        'help': 'The date and time that the message was sent',
                                        'attributes': {
                                            'class': 'span12',
                                            'type': 'text',
                                            'name': 'Date',
                                            'tabindex': 5,
                                            'autocomplete': false,
                                            'placeholder': 'ex: Tue, 15 Nov 1994 08:12:31 GMT',
                                            'disabled': true
                                        }
                                    },

                                    {
                                        'rfc': '14.20',
                                        'label': 'Expect',
                                        'help': 'Indicates that particular server behaviors are by the client',
                                        'attributes': {
                                            'class': 'span12',
                                            'type': 'text',
                                            'name': 'Expect',
                                            'tabindex': 5,
                                            'autocomplete': false,
                                            'placeholder': 'ex: 100-continue',
                                            'disabled': true
                                        }
                                    },

                                    {
                                        'rfc': '14.22',
                                        'label': 'From',
                                        'help': 'The email address of the user making the request.',
                                        'attributes': {
                                            'class': 'span12',
                                            'type': 'text',
                                            'name': 'From',
                                            'tabindex': 5,
                                            'autocomplete': false,
                                            'placeholder': 'ex: user@example.com',
                                            'disabled': true
                                        }
                                    },

                                    {
                                        'rfc': '14.31',
                                        'label': 'Max-Forwards',
                                        'help': 'Limit the number of times the message can be forwarded through proxies or gateways.',
                                        'attributes': {
                                            'class': 'span12',
                                            'type': 'text',
                                            'name': 'Max-Forwards',
                                            'tabindex': 5,
                                            'autocomplete': false,
                                            'placeholder': 'ex: 10',
                                            'disabled': true
                                        }
                                    },

                                    {
                                        'rfc': '14.32',
                                        'label': 'Pragma',
                                        'help': 'Implementation-specific headers that may have various effects anywhere along the request-response chain.',
                                        'attributes': {
                                            'class': 'span12',
                                            'type': 'text',
                                            'name': 'Pragma',
                                            'tabindex': 6,
                                            'autocomplete': false,
                                            'placeholder': 'ex: no-cache',
                                            'disabled': true
                                        }
                                    },

                                    {
                                        'rfc': '14.35',
                                        'label': 'Range',
                                        'help': 'Request only part of an entity. Bytes are numbered from 0.',
                                        'attributes': {
                                            'class': 'span12',
                                            'type': 'text',
                                            'name': 'Range',
                                            'tabindex': 5,
                                            'autocomplete': false,
                                            'placeholder': 'ex: bytes=500-999',
                                            'disabled': true
                                        }
                                    },

                                    {
                                        'rfc': '14.36',
                                        'label': 'Referer',
                                        'help': 'This address of the previous web page from which a link to the currently requested page was followed.',
                                        'attributes': {
                                            'class': 'span12',
                                            'type': 'text',
                                            'name': 'Referer',
                                            'tabindex': 5,
                                            'autocomplete': false,
                                            'placeholder': 'ex: http://www.restconsole.com/',
                                            'disabled': true
                                        }
                                    },

                                    {
                                        'rfc': '14.41',
                                        'label': 'Transfer-Encoding',
                                        'help': 'The transfer encodings the user agent is willing to accept.',
                                        'attributes': {
                                            'class': 'span12',
                                            'type': 'text',
                                            'name': 'TE',
                                            'tabindex': 5,
                                            'autocomplete': false,
                                            'placeholder': 'ex: trailers, deflate',
                                            'disabled': true
                                        }
                                    },

                                    {
                                        'rfc': '14.42',
                                        'label': 'Upgrade',
                                        'help': 'Ask the server to upgrade to another protocol.',
                                        'attributes': {
                                            'class': 'span12',
                                            'type': 'text',
                                            'name': 'Upgrade',
                                            'tabindex': 5,
                                            'autocomplete': false,
                                            'placeholder': 'ex: HTTP/2.0, SHTTP/1.3, IRC/6.9, RTA/x11',
                                            'disabled': true
                                        }
                                    },

                                    {
                                        'rfc': '14.43',
                                        'label': 'User-Agent',
                                        'help': 'The user agent string of the user agent.',
                                        'attributes': {
                                            'class': 'span12',
                                            'type': 'text',
                                            'name': 'User-Agent',
                                            'tabindex': 5,
                                            'autocomplete': false,
                                            'placeholder': 'ex: Mozilla/5.0 (compatible; MSIE 9.0; Windows NT 6.1; WOW64; Trident/5.0)',
                                            'disabled': true
                                        }
                                    },

                                    {
                                        'rfc': '14.45',
                                        'label': 'Via',
                                        'help': 'Informs the server of proxies through which the request was sent.',
                                        'attributes': {
                                            'class': 'span12',
                                            'type': 'text',
                                            'name': 'Via',
                                            'tabindex': 5,
                                            'autocomplete': false,
                                            'placeholder': 'ex: 1.0 fred, 1.1 nowhere.com (Apache/1.1)',
                                            'disabled': true
                                        }
                                    },

                                    {
                                        'rfc': '14.64',
                                        'label': 'Warning',
                                        'help': 'A general warning about possible problems with the entity body.',
                                        'attributes': {
                                            'class': 'span12',
                                            'type': 'text',
                                            'name': 'Warning',
                                            'tabindex': 5,
                                            'autocomplete': false,
                                            'placeholder': 'ex: 199 Miscellaneous warning',
                                            'disabled': true
                                        }
                                    }
                                ])
                            ),

                            div({'class': 'tab-pane'},
                                this.renderTemplate('optional-input', [

                                    {
                                        'rfc': '14.9',
                                        'label': 'Cache-Control',
                                        'help': 'Used to specify caching mechanisms along the request/response chain',
                                        'attributes': {
                                            'class': 'span6',
                                            'type': 'text',
                                            'name': 'Cache-Control',
                                            'tabindex': 6,
                                            'autocomplete': false,
                                            'placeholder': 'ex: no-cache',
                                            'disabled': true
                                        }
                                    },

                                    {
                                        'rfc': '14.24',
                                        'label': 'If-Match',
                                        'help': 'Only perform the action if the client supplied entity matches the same entity on the server.',
                                        'attributes': {
                                            'class': 'span6',
                                            'type': 'text',
                                            'name': 'If-Match',
                                            'tabindex': 6,
                                            'autocomplete': false,
                                            'placeholder': 'ex: 737060cd8c284d8af7ad3082f209582d',
                                            'disabled': true
                                        }
                                    },

                                    {
                                        'rfc': '14.25',
                                        'label': 'If-Modified-Since',
                                        'help': 'Allows a 304 Not Modified to be returned if content is unchanged',
                                        'attributes': {
                                            'class': 'span6',
                                            'type': 'text',
                                            'name': 'If-Modified-Since',
                                            'tabindex': 6,
                                            'autocomplete': false,
                                            'placeholder': 'ex: Sat, 29 Oct 1994 19:43:31 GMT',
                                            'disabled': true
                                        }
                                    },

                                    {
                                        'rfc': '14.26',
                                        'label': 'If-None-Match',
                                        'help': 'Allows a 304 Not Modified to be returned if content is unchanged',
                                        'attributes': {
                                            'class': 'span6',
                                            'type': 'text',
                                            'name': 'If-None-Match',
                                            'tabindex': 6,
                                            'autocomplete': false,
                                            'placeholder': 'ex: 737060cd8c284d8af7ad3082f209582d',
                                            'disabled': true
                                        }
                                    },

                                    {
                                        'rfc': '14.27',
                                        'label': 'If-Range',
                                        'help': 'If the entity is unchanged, send the missing part(s); otherwise, send the entire new entity',
                                        'attributes': {
                                            'class': 'span6',
                                            'type': 'text',
                                            'name': 'If-Range',
                                            'tabindex': 6,
                                            'autocomplete': false,
                                            'placeholder': 'ex: 737060cd8c284d8af7ad3082f209582d',
                                            'disabled': true
                                        }
                                    },

                                    {
                                        'rfc': '14.28',
                                        'label': 'If-Unmodified-Since',
                                        'help': 'Only send the response if the entity has not been modified since a specific time.',
                                        'attributes': {
                                            'class': 'span6',
                                            'type': 'text',
                                            'name': 'If-Unmodified-Since',
                                            'tabindex': 6,
                                            'autocomplete': false,
                                            'placeholder': 'ex: Sat, 29 Oct 1994 19:43:31 GMT',
                                            'disabled': true
                                        }
                                    }
                                ])
                            ),

                            div({'class': 'tab-pane'},
                                this.renderTemplate('optional-input', [
                                    {
                                        'label': 'Origin',
                                        'help': '',
                                        'attributes': {
                                            'class': 'span6',
                                            'type': 'text',
                                            'name': 'Origin',
                                            'tabindex': 5,
                                            'autocomplete': false,
                                            'placeholder': 'ex: chrome-extension',
                                            'disabled': true
                                        }
                                    },

                                    {
                                        'label': 'X-HTTP-Method-Override',
                                        'help': 'mainly used bypass firewalls and browsers limitations.',
                                        'attributes': {
                                            'class': 'span6',
                                            'type': 'text',
                                            'name': 'X-HTTP-Method-Override',
                                            'tabindex': 7,
                                            'autocomplete': false,
                                            'placeholder': 'ex: PUT',
                                            'disabled': true
                                        }
                                    },

                                    {
                                        'label': 'X-Requested-With',
                                        'help': 'mainly used to identify Ajax requests.',
                                        'attributes': {
                                            'class': 'span6',
                                            'type': 'text',
                                            'name': 'X-Requested-With',
                                            'tabindex': 7,
                                            'autocomplete': false,
                                            'placeholder': 'ex: XMLHttpRequest',
                                            'disabled': true
                                        }
                                    },

                                    {
                                        'label': 'X-Forwarded-For',
                                        'help': '',
                                        'attributes': {
                                            'class': 'span6',
                                            'type': 'text',
                                            'name': 'X-Forwarded-For',
                                            'tabindex': 7,
                                            'autocomplete': false,
                                            'placeholder': 'ex: ',
                                            'disabled': true
                                        }
                                    },

                                    {
                                        'label': 'X-Do-Not-Track',
                                        'help': 'Requests a web application to disable their tracking of a user.',
                                        'attributes': {
                                            'class': 'span6',
                                            'type': 'text',
                                            'name': 'X-Do-Not-Track',
                                            'tabindex': 7,
                                            'autocomplete': false,
                                            'placeholder': 'ex: 1',
                                            'disabled': true
                                        }
                                    },

                                    {
                                        'label': 'DNT',
                                        'help': 'Requests a web application to disable their tracking of a user. (This is Mozilla\'s version of the X-Do-Not-Track header',
                                        'attributes': {
                                            'class': 'span6',
                                            'type': 'text',
                                            'name': 'DNT',
                                            'tabindex': 7,
                                            'autocomplete': false,
                                            'placeholder': 'ex: 1',
                                            'disabled': true
                                        }
                                    }
                                ])
                            )
                        )
                    )
                )
            )
        }),

        'response': new Template(function(data) {
            section({'id': 'response'},
                this.renderTemplate('section-header', 'Response'),

                ul({'class': 'tabbable', 'data-name': 'response'},
                    ul({'class': 'nav tabs'},
                        li({'class': 'active'}, a({'data-toggle': 'tab'}, 'Response Body')),
                        li(a({'data-toggle': 'tab'}, 'RAW Response')),
                        li(a({'data-toggle': 'tab'}, 'Response Preview')),
                        li(a({'data-toggle': 'tab'}, 'RAW Request')),
                        li(a({'data-toggle': 'tab'}, 'HTTP Archive (HAR)'))
                    ),

                    div({'class': 'tab-content'},
                        div({'class': 'tab-pane active'},
                            pre({
                                'id': 'response-body',
                                'class': 'prettyprint',
                                'events': {
                                    // clicks within the response body
                                    'click:relay(a[href])': function(event) {
                                        event.preventDefault();

                                        document.getElement('input[name="uri"]').set('value', this.get('href'));
                                        document.getElement('input[name="method"]').set('value', 'GET');
                                        //document.getElement('form[name="request"]').fireEvent('submit', new DOMEvent);
                                    }
                                }
                            })
                        ),

                        div({'class': 'tab-pane'},
                            pre({'class': 'prettyprint'})
                        ),

                        div({'class': 'tab-pane'}),

                        div({'class': 'tab-pane'},
                            pre({'class': 'prettyprint'})
                        ),

                        div({'class': 'tab-pane'},
                            pre({'id': 'har', 'class': 'prettyprint lang-json'})
                        )
                    )
                )
            )
        })
    },

    'resizeEvent': function(event) {
        document.getElement('.fluid-container.main').setStyle('height', window.getHeight() - 80);
        document.getElement('.fluid-sidebar').setStyle('height', window.getHeight() - 140);
        document.getElement('#response').setStyle('min-height', window.getHeight() - 140);
    },

    'signOAuth': function() {
        var tab = document.getElement('.tab-pane.oauth');
        var data = tab.toObject();

        var request = {
            'query': document.getElement('form[name="target"]').getPairs('query'),
            'target': document.getElement('form[name="target"]').toObjectNoPairs(),
            'payload': document.getElement('form[name="payload"]').toObjectNoPairs()
        };

        // start oauth
        var accessor = {
            'consumerKey': data.consumer_key,
            'consumerSecret': data.consumer_secret
        };

        var message = {
            'action': request.target.uri,
            'method': request.target.method,
            'parameters': [
                ['oauth_version', data.version],
                ['oauth_signature_method', data.signature]
            ]
        };

        // optional params
        if (data.token_key) {
            accessor.token = data.token_key;
        }

        if (data.token_secret) {
            accessor.tokenSecret = data.token_secret;
        }

        if (data.scope) {
            oauth.parameters.push(['scope', data.scope]);
        }

        if (data.oauth_verifier) {
            oauth.parameters.push(['oauth_verifier', data.oauth_verifier]);
        }

        // query string params
        Object.each(request.query, function(value, key) {
            message.parameters.push([key, value]);
        });

        if (request.payload['Content-Type'] == 'application/x-www-form-urlencoded' && request.payload.payload.length) {
            // payload body
            Object.each(request.payload.payload.parseQueryString(), function(value, key) {
                message.parameters.push([key, value]);
            });
        };

        // sign
        OAuth.completeRequest(message, accessor);

        // debug
        //console.log(OAuth.SignatureMethod.getBaseString(message));

        if (data.method == 'header') {
            var header = OAuth.getAuthorizationHeader(data.realm, message.parameters);

            var input = tab.getElement('input[name="Authorization"]').set('value', header);
        } else {
            OAuth.formEncode(OAuth.getParameterList(message.parameters));
            /*
            var input = this.getParent('.tab-pane').getElement('input[name="Authorization"]').set('value', '');

            var oauth_params = oauth.signed_url.replace(request.uri + '?', '').parseQueryString();

            Object.each(oauth_params, function(value, key) {
                row = container.getElement('li:last-of-type').clone();
                row.dataset.oauth = true;
                row.getElement('input[name="key"]').set('value', key);
                row.getElement('input[name="value"]').set('value', value);
                row.getElements('input').set('disabled', false);
                row.inject(container, 'top');
            });
            */
        }
/*
        if (data.oauth_callback && data.oauth_callback.length > 0) {
            row = container.getElement('li:last-of-type').clone();
            row.dataset.oauth = true;
            row.getElement('input[name="key"]').set('value', 'oauth_callback');
            row.getElement('input[name="value"]').set('value', data.oauth_callback);
            row.getElements('input').set('disabled', false);
            row.inject(container, 'top');
        }
        */
    },

    'setProgress': function(progress) {
        //document.body.getElement('.progress .bar').setStyle('width', progress + '%');
    },

    'initialize': function() {
        var body = document.body.empty();

        // render the body templates
        body.adopt(this.renderTemplate('header'));
        body.adopt(this.renderTemplate('container'));
        body.adopt(this.renderTemplate('controls'));

        // assign global events
        document.addEvents(this.events);

        // add the datalists
        Object.each(this.datalists, function(datalist, id) {
            datalist.sort();
            body.adopt(this.renderTemplate('datalist', {'id': id, 'values': datalist}));
        }.bind(this));

        // load default values
        this.loadDefaults();

        // fix sizing
        window.addEvent('resize', this.resizeEvent).fireEvent('resize');

        // setup autocomplete
        if ('options' in document.createElement('datalist') == false) {
            new AutoComplete();
        }
    },

    'loadDefaults': function() {
        var tabs        = new Storage('tabs');
        var pairs       = new Storage('pairs');
        var values      = new Storage('input-values');
        var sections    = new Storage('sections');
        var statuses    = new Storage('input-status');

        // input fields and textareas
        document.getElements('.control-group:not(.pairs) input[type="text"], .control-group input[type="number"], .control-group input[type="password"], .control-group textarea').each(function(input) {
            // construct fake event event object
            var event = new FakeEvent(input);

            input.set('value', values.get(input.get('name')))

            if (input.getParent('.input-prepend')) {
                var checkbox = input.getParent('.input-prepend').getElement('input[type="checkbox"]');
                var enabled = statuses.get(input.get('name'));

                if (enabled) {
                    input.set('disabled', !enabled);
                    checkbox.set('checked', enabled);

                    input.fireEvent('highlight');
                }
            } else {
                input.fireEvent('highlight');
            }
        });

        // process pairs
        document.getElements('.control-group.pairs[name]').each(function(group) {
            var storage = pairs.get(group.get('name'));

            Object.each(storage, function(value, key) {
                // construct fake event object
                var event = new FakeEvent(group.getElement('.controls:last-of-type .add-on'));

                // trigger focus event on document to insert more rows
                document.fireEvent('click', event);

                // get the newly inserted row
                var row = group.getElement('.controls:nth-last-child(-n+2)');

                // finally, assign the values to the row input fields
                row.getElement('input[type="text"]:first-of-type').set('value', key);
                row.getElement('input[type="text"]:last-of-type').set('value', value);
            }.bind(this));
        }.bind(this));

        // sections
        document.getElements('section').each(function(section) {
            var data = sections.get(section.get('id'));

            if (data != null) {
                section.removeClass('minimize');

                if (data == false) {
                    section.addClass('minimize');
                }
            }
        });

        // tabs
        document.getElements('.tabbable .tabs').each(function(tab) {
            var index = tabs.get(tab.getParent('.tabbable').dataset.name);

            var link = tab.getElement('li:nth-of-type({0}) a'.substitute([index + 1]));

            document.fireEvent('click', new FakeEvent(link));

            tab.fireEvent('click', new FakeEvent(link));
        });
    },

    'send': function() {
        var error = false;

        this.signOAuth();

        var data = {
            'query': document.getElement('form[name="target"]').getPairs('query'),
            'target': document.getElement('form[name="target"]').toObjectNoPairs(),
            'payload': document.getElement('form[name="payload"]').toObjectNoPairs(),
            'headers': document.getElement('form[name="headers"]').toObject(),
            'custom_headers': document.getElement('form[name="target"]').getPairs('headers'),
            'authorization': document.getElement('form[name="authorization"]').toObject()
        };

        //console.log('plain data', data);

        // auth
        /*
         *

            this.getParent('.modals').getElement('.modal-backdrop').fireEvent('click');
            *
            * // authorize
            *         'authorize': function(event) {
            var oAuth = chrome.extension.getBackgroundPage().oAuth;

            var data = this.toQueryString().parseQueryString();

            var missing = false;

            this.getElements('*[required], *[required-authorize]').each(function(element) {
                if (element.get('value') == '') {
                    Error('Missing Data', 'Please Fill out all the required fields', element);
                    missing = true;
                }
            }.bind(this));

            if (missing) {
                return;
            } else {
                oAuth.initialize({
                    'request_url': data.request_url,
                    'authorize_url': data.authorize_url,
                    'access_url': data.access_url,
                    'consumer_key': data.consumer_key,
                    'consumer_secret': data.consumer_secret,
                    'scope' : data.scope,
                    'app_name' : 'REST Console'
                });
                oAuth.authorize();
            }
        }
        *
        * //// disable the authorize button when an access token is present
    document.getElements('form.authorization.oauth input[name="token_key"], form.authorization.oauth input[name="token_secret"]').addEvent('change', function(event) {
        var form = this.getParent('form');
        var token_key = form.getElement('input[name="token_key"]').get('value');
        var token_secret = form.getElement('input[name="token_secret"]').get('value');

        if (token_key.length > 0 && token_secret.length > 0) {
            form.getElement('input[data-action="authorize"]').set('disabled', true);
        } else {
            form.getElement('input[data-action="authorize"]').set('disabled', false);
        }
    })
        */

        var options = {
            'url': data.target.uri,
            'query': data.query,
            'payload': {},
            'files': {},
            'headers': Object.merge({}, data.payload, data.headers, data.custom_headers),
            'async': true,
            'method': data.target.method,
            'link': 'ignore',
            'isSuccess': null,
            'emulation': false,
            'evalScripts': false,
            'evalResponse': false,
            'timeout': data.target.timeout * 1000,
            'noCache': false,

            'onRequest': function() {
                // replace buttons with animation
                //document.id('controls').addClass('progress');
            },

            'onProgress': function(event, xhr) {
                //var loaded = event.loaded, total = event.total;
            },

            'onTimeout': function() {
                // TODO replace with notice
                Error('Error', 'Connection Timed-out');

                // remove loading animation
                //document.id('controls').removeClass('progress');
            },

            'onCancel': function() {
                //this.fireEvent('stop');
            }.bind(this),

            'onComplete': this.processResponse
        };

        // modify Content-Type header based on encoding charset
        // TODO: shouldn't this be done as a rule in the REQUEST object?
        if (data.payload['content-encoding'] != '') {
            options.encoding = data.payload['content-encoding'],
            options.headers['Content-Type'] = data.payload['Content-Type'] + '; charset=' + options.encoding;
        }

        // cleanup
        delete options.headers.payload;
        delete options.headers.name;
        delete options.headers.files;
        delete options.headers['content-encoding'];

        if (data.authorization.Authorization && data.authorization.Authorization != '') {
            if (data.authorization.Authorization.substring(0, 5) == 'OAuth') {
                //this.signOAuth();
            }

            options.headers.Authorization = data.authorization.Authorization;
        }

        // set payload
        if (data.payload['Content-Type'] == 'application/x-www-form-urlencoded') {
            options.payload = (data.payload.payload.length) ? data.payload.payload.parseQueryString() : {};
        } else {
            options.payload = data.payload.payload;
        };
/*
        // check for required fields
        document.getElements('*[required]').each(function(element) {
            if (element.get('value').length == 0) {
                Error('Missing Data', 'Please Fill out all the required fields', element);
                error = true;
            }
        });
*/
        //console.log('request options', options);

        if (error) {
            // stop on error
            return false;
        } else {
            if (options.files.length) {
                //delete options.headers['Content-Type'];
            }

            window.XHR = new Request(options).send();
        }
    },

    'processResponse': function() {
        var defaults = {
            'Accept': '*/\*',
            //'Accept-Charset': 'ISO-8859-1,utf-8;q=0.7,*;q=0.3',
            //'Accept-Encoding': 'gzip,deflate,sdch',
            //'Accept-Language': 'en-US,en;q=0.8',
            'Connection': 'keep-alive',
            //'Content-Length': '34',
            'Content-Type': 'application/xml',
            //'Cookie': '__qca=P0-2074128619-1316995740016; __utma=71985868.1147819601.1316995740.1317068965.1317073948.4; __utmc=71985868; __utmz=71985868.1316995740.1.1.utmcsr=(direct)|utmccn=(direct)|utmcmd=(none)',
            'Origin': 'chrome-extension://bjdlekdiiieofkpjfhpcmlhalmbnpjnh',
            'User-Agent': navigator.userAgent
        };

        var exp = /\b(https?|ftp):\/\/([-A-Z0-9.]+)(\/[-A-Z0-9+&@#\/%=~_|!:,.;]*)?(\?[-A-Z0-9+&@#\/%=~_|!:,.;]*)?/i;
        var parts = exp.exec(this.options.url);

        if (parts[3] == undefined) {
            parts[3] = '/';
        }

        if (Object.getLength(this.options.query)) {
            parts[4] = '?' + Object.toQueryString(this.options.query);
        }

        var request = [
            this.options.method + ' {3}{4} HTTP/1.1'.substitute(parts),
            'HOST: ' + parts[2],
        ];

        var response = ['HTTP/1.0 ' + this.xhr.status + ' ' + this.xhr.statusText];

        response.push(this.xhr.getAllResponseHeaders());

        // headers
        Object.each(this.options.headers, function(value, key) {
            request.push(key + ': ' + value);
        });

        // loop through default headers and assign them only if applicable
        Object.each(defaults, function(value, key) {
            if (this.options.headers[key] == undefined) {
                request.push(key + ': ' + value);
            }
        }.bind(this));

        // payload
        switch (typeOf(this.options.payload)) {
            case 'string':
                request.push('\n' + this.options.payload);
                break;

            case 'object':
                request.push('\n' + Object.toQueryString(this.options.payload));
                break;
        }

        // uploaded files?
        if (this.options.files.length > 0) {
            //requestText += 'Attachments: {0}\n'.substitute([beautify.js(JSON.encode(this.options.files))]);
        }

        var contentType = this.xhr.getResponseHeader('Content-Type');

        if (contentType != null) {
            var index = contentType.indexOf(';');

            if (index > 1) {
                contentType = contentType.slice(0, index);
            }
        }

        var style = 'auto';

        switch (contentType) {
            case 'text/css':
                style = 'css';

                this.xhr.responseText = beautify.css(this.xhr.responseText);
                break;

            case 'application/ecmascript':
            case 'application/javascript':
            case 'application/json':
                style = 'js';

                this.xhr.responseText = beautify.js(this.xhr.responseText);
                break;

            case 'application/atom+xml':
            case 'application/atomcat+xml':
            case 'application/atomserv+xml':
            case 'application/beep+xml':
            case 'application/davmount+xml':
            case 'application/docbook+xml':
            case 'application/rdf+xml':
            case 'application/rss+xml':
            case 'application/xml':
            case 'application/xspf+xml':
            case 'application/vnd.google-earth.kml+xml':
            case 'application/vnd.mozilla.xul+xml':
            case 'image/svg+xml':
            case 'text/xml':
                style = 'xml';

                var declaration = this.xhr.responseText.match(/^(\s*)(<\?xml.+?\?>)/i);

                this.xhr.responseText = declaration[2] + "\n" + beautify.xml(this.xhr.responseXML).firstChild.nodeValue;
                break;

            case 'text/html':
            case 'application/xhtml+xml':
                style = 'html';

                //document.getElement('input[name="highlight"][value="html"]').fireEvent('click');

                // create and inject the iframe object
                var iframe = new IFrame();
                document.id('response-preview').adopt(iframe);

                // start writing
                var doc = iframe.contentWindow.document;
                doc.open();
                doc.write(this.xhr.responseText);
                doc.close();
                break;
/*
* requires xhr.responseType to be set BEFORE the request is sent
* this.xhr.responseType = 'blob' or this.xhr.responseType = 'arraybuffer'

            case 'image/jpeg':
                // create and inject the iframe object
                var iframe = new IFrame();
                document.id('responsePreview').adopt(iframe);

                // render the image blob
                var bb = new window.WebKitBlobBuilder();
                bb.append(this.xhr.response);

                // if using arraybuffer do this
                // other wise just use blob method
                // but its not currently implemented in chrome
                var blob = bb.getBlob('image/png');

                //~ var img = document.createElement('img');
                //~ img.onload = function(e) {
                  //~ window.webkitURL.revokeObjectURL(img.src); // Clean up after yourself.
                //~ };
                var src = window.webkitURL.createObjectURL(blob);

                // start writing
                var doc = iframe.contentWindow.document;
                doc.open();
                doc.write('<img src="' + src + '"/>');
                doc.close();
                break;
*/
        }

        // setup response area
        response = response.join("\n") + "\n" + this.xhr.responseText;
        request = request.join("\n");

        document.id('response-body').set('text', this.xhr.responseText)
        document.id('response-raw').set('text', response);
        document.id('request-raw').set('text', request);

        // init google prettify
        prettyPrint();

        $App.goTo('response');

        //document.id('controls').removeClass('progress');
return;

        if (this.xhr.status == 0) {
            Error('Connection Failed!', 'Check your connectivity and try again');

            //document.getElement('form[name="request"]').fireEvent('stop');
        } else {


            // store the text for later use
            document.id('responseBody').store('unstyled', responseText);

            // trigger syntax highlighting
            document.getElement('input[name="highlight"][value="' + style + '"]').fireEvent('click');

            // scroll to the response area
            document.getElement('a[href="#response"]').fireEvent('click', new FakeEvent());

            // remove loading animation
            document.getElement('form[name="request"] .actions').removeClass('progress');
        }
    },

    'goTo': function(target) {
        var event = new FakeEvent(document.getElement('a[href="#' + target + '"]'));
        event.target.fireEvent('click', event);
    }
});

/*
// add events
window.addEvent('domready', function() {
    return;

    // show/hide line numbers
    document.getElement('form[name="options"] input[name="lines"]').addEvent('change', function(event) {
        if (this.get('checked')) {
            document.getElements('.prettyprint').removeClass('linenums');
        } else {
            document.getElements('.prettyprint').addClass('linenums');
        }
    });

    // theme changer
    document.getElements('form[name="options"] input[name="theme"]').addEvent('change', function(event) {
        if (this.get('checked')) {
            var theme = this.get('value');
            document.getElement('select[name="theme"] option[value="' + theme + '"]').set('selected', true);
            document.head.getElementById('theme').set('href', 'style/prettify/' + theme + '.css');

            _gaq.push(['_trackEvent', 'Theme', theme]);
        }
    }).fireEvent('change');

    document.getElements('select[name="theme"]').addEvent('change', function(event) {
        document.head.getElementById('theme').set('href', 'style/prettify/' + this.get('value') + '.css');

        _gaq.push(['_trackEvent', 'Theme Swap', this.get('value')]);
    });




    // syntax highlighting
    document.getElements('input[name="highlight"]').addEvents({
        'change': function(event) {
            document.getElements('.prettyprint').each(function (element) {
                element.set('text', element.retrieve('unstyled'));
            });

            if (this.get('checked')) {
                var value = this.get('value');

                var responseBody = document.id('responseBody');

                responseBody.set('class', 'prettyprint lang-' + value);

                document.getElement('form[name="options"] input[name="lines"]').fireEvent('change');

                // init google prettify
                prettyPrint();

                // find links
                // TODO parse query string params into fields
                var body = responseBody.get('html');
                var exp = new RegExp('\\b((https?|ftp|file)://[-A-Z0-9+&@#/%?=~_|!:,.;]*[-A-Z0-9+&@#/%=~_|])', 'gim');
                body = body.replace(exp, '<a target="_blank" href="$1">$1</a>');
                responseBody.set('html', body);
                responseBody.scrollTo(0, 0);
            }
        },

        'click': function(event) {
            this.set('checked', true);
            this.fireEvent('change', event);
        }
    });
*/
