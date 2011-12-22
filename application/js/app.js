/**
 * Template class for Mooml templates
 */
var Template = new Class({
    'Extends': Mooml.Template,

    'initialize': function(code) {
        this.name = null;
        this.code = code;
        this.prepared = false;
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

/**
 * Main App logic
 */
var App = new Class({
    'Implements': [Events, Mooml.Templates],

    // unsecure headers:
    'unsafe': [
        'accept-charset',
        'accept-encoding',
        'content-length',
        'cookie',
        'date',
        'origin',
        'connection',
        'expect',
        'referer',
        'user-agent',
        'via',
        'proxy-authorization',
        'te',
        'upgrade'
    ],

    // autocomplete values
    'datalists': {
        'mimetypes': [
            '*/*',
            'application/atom+xml',
            'application/docbook+xml',
            'application/ecmascript',
            'application/hta',
            'application/http',
            'application/javascript',
            'application/json',
            'application/octet-stream',
            'application/ogg',
            'application/pdf',
            'application/pgp-encrypted',
            'application/pgp-keys',
            'application/pgp-signature',
            'application/postscript',
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
            'application/x-debian-package',
            'application/x-executable',
            'application/x-font',
            'application/x-freemind',
            'application/x-httpd-php',
            'application/x-httpd-php-source',
            'application/x-httpd-php3',
            'application/x-httpd-php3-preprocessed',
            'application/x-httpd-php4',
            'application/x-httpd-php5',
            'application/x-quicktimeplayer',
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
            'audio/x-scpls',
            'audio/x-sd2',
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
            'text/x-makefile',
            'text/x-perl',
            'text/x-python',
            'text/x-scala',
            'text/x-server-parsed-html',
            'text/x-setext',
            'text/x-sh',
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

        'charset': ['*',
            'UTF-8',
            'ISO-8859-1',
            'ISO-8859-2',
            'ISO-8859-3',
            'ISO-8859-4',
            'ISO-8859-5',
            'ISO-8859-6',
            'ISO-8859-7',
            'ISO-8859-8',
            'ISO-8859-9',
            'ISO-8859-10',
            'ISO-8859-11',
            'ISO-8859-12',
            'ISO-8859-13',
            'ISO-8859-14',
            'ISO-8859-15',
            'ISO-8859-16',
            'ISO-2022-JP',
            'ISO-2022-JP-2',
            'ISO-2022-KR',
            'ISO-8859-6-E',
            'ISO-8859-6-I',
            'ISO-8859-8-E',
            'ISO-8859-8-I'
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
                a(),
                h2(data)
            )
        }),

        'rfc-link': new Template(function(data) {
            if (data) {
                section = data.split('.')[0];

                a({
                    'href': 'http://www.w3.org/Protocols/rfc2616/rfc2616-sec{0}.html#sec{1}'.substitute([section, data])
                })
            }
        }),

        'input': new Template(function(data) {
            fieldset({'class': 'control-group'},
                label({'class': 'control-label', 'for': data.attributes.name}, this.renderTemplate('rfc-link', data.rfc ? data.rfc : false), data.label),
                div({'class': 'controls'},
                    input(data.attributes),
                    span({'class': 'help-block'}, data.help)
                )
            )
        }),

        'optional-input': new Template(function(data) {
            fieldset({'class': 'control-group'},
                label({'class': 'control-label', 'for': data.attributes.name}, this.renderTemplate('rfc-link', data.rfc ? data.rfc : false), data.label),
                div({'class': 'controls'},
                    div({'class': 'input-prepend'},
                        label({'class': 'add-on'}, input({'type': 'checkbox'})),
                        input(data.attributes)
                    ),
                    span({'class': 'help-block'}, data.help)
                )
            )
        }),

        'header': new Template(function(data) {
            header({'class': 'navbar navbar-fixed'},
                div({'class': 'navbar-inner'},
                    div({'class': 'fluid-container'},
                        div({'class': 'brand'},
                            img({'src': 'images/logo/32.png', 'align': 'left'}), 'REST Console', small('version 4.1.0')
                        ),

                        ul({'class': 'nav'},
                            li(a({'href': '#options'}, span('O'), 'ptions')),
                            li(a({'href': '#target'}, span('T'), 'arget')),
                            li(a({'href': '#payload'}, span('P'), 'ayload')),
                            li(a({'href': '#headers'}, span('H'), 'eaders')),
                            li(a({'href': '#response'}, span('R'), 'esponse'))
                        )
                    )
                )
            )
        }),

        'container': new Template(function(data) {
            div({
                'id': 'container',
                'class': 'fluid-container',
                'events': {
                    'click:relay(.control-group .control-label a)': function(event) {
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
                    },

                    // global enable / disable action on input fields
                    'click:relay(.input-prepend input[type="checkbox"])': function(event) {
                        var input = this.getParent('.input-prepend').getElement('input[type="text"]');
                        var disabled = input.get('disabled');

                        if (disabled) {
                            input.set('disabled', false).fireEvent('focus').focus();
                            event.stopPropagation();
                        } else {
                            input.set('disabled', true);
                        }

                        new Storage('input-status').set(input.get('name'), disabled);
                    },

                    // store input values
                    'change:relay(.input:not(.pairs) input[type="text"], .input input[type="number"], textarea)': function(event) {
                        new Storage('input-values').set(this.get('name'), this.get('value'));
                    },

                    // section hide toggle
                    'click:relay(section header a)': function(event) {
                        var section = this.getParent('section');
                        section.toggleClass('minimize')
                        new Storage('sections').set(section.get('id'), !section.hasClass('minimize'));
                    },

                    // store pairs values
                    'change:relay(form[name="target"] .pairs input[type="text"], form[name="headers"] .pairs input[type="text"])': function(event) {
                        var form = this.getParent('form');
                        var data = form.toQueryString().parseQueryString();

                        var storage = {};

                        if (data.key.length) {
                            data.key.each(function(key, index) {
                                if (key.length > 0) {
                                    storage[key] = data.value[index];
                                }
                            });
                        }

                        new Storage('pairs').set(form.get('name'), storage);
                    },

                    // pairs delete button
                    'click:relay(.pairs button)': function(event) {
                        var row = this.getParent('li');
                        var next = row.getNext();

                        // don't focus on the next row if its the last
                        // otherwise you get stuck in a loop
                        if (next != row.getParent('ul').getLast()) {
                            next.getFirst().focus();
                        } else if (row.getPrevious()) {
                            row.getPrevious().getFirst().focus();
                        }

                        row.destroy();

                        var event = new DOMEvent;
                        event.target = next.getFirst();
                        document.id('container').fireEvent('change', event);
                    },

                    // clear error highlight on pairs
                    'keyup:input:relay(.pairs li.error input[type="text"]:first-child)': function(event) {
                        event.target.getParent('li').removeClass('error');
                    },

                    // check for empty keys on pairs
                    'blur:relay(.pairs li:not(:last-child) input[type="text"]:first-child)': function(event) {
                        var value = this.get('value').trim();

                        if (value == '') {
                            this.getParent('li').addClass('error');
                        } else {
                            this.set('value', value);
                        }
                    },

                    // focus jump on pairs
                    'focus:relay(.pairs li:last-of-type input[type="text"])': function(event) {
                        var row = this.getParent('li');
                        var previous = row.getPrevious();
                        var index = row.getChildren().indexOf(event.target);

                        if (previous && previous.getChildren()[0].get('value') == '') {
                            previous.addClass('error').getFirst().focus();
                        } else {
                            var clone = row.clone();
                            clone.inject(row, 'before');
                            clone.getElement('input').focus();
                        }
                    },

                    // tabs navigation
                    'click:relay(ul.tabs li a)': function(event) {
                        event.preventDefault();

                        var tabs = event.target.getParent('ul');
                        var content = tabs.getNext('.tabs-content');
                        var index = tabs.getChildren().indexOf(event.target.getParent('li'));

                        // switch tabs
                        tabs.getElement('.active').removeClass('active');
                        event.target.getParent('li').addClass('active');

                        content.getElement('.active').removeClass('active');
                        content.getChildren()[index].addClass('active');

                        this.goTo('response');
                    }.bind(this),

                    // prevent enter key from triggering any buttons on the page
                    'keydown:keys(enter):relay(form)': function(event) {
                        event.stop();

                        // TODO fire send event
                    }
                }},

                this.renderTemplate('sidebar'),
                this.renderTemplate('content')
            )
        }),

        'sidebar': new Template(function(data) {
            section({'class': 'fluid-sidebar-left'},
                div({'class': 'page'},
                    h5('Services'),

                    a({'events': {
                        'click': function(event) {
                            event.preventDefault();

                            chrome.webstore.install('https://chrome.google.com/webstore/detail/faceofpmfclkengnkgkgjkcibdbhemoc');
                        }
                    }}, 'Install Extension'),

                    select({'class': 'span3'},
                        option('Twitter'),
                        option('Facebook'),
                        option('LinkedIn')
                    ),

                    h5('History'),
                    p('Coming Soon...'),

                    br()
                ),
                a('license')
            )
        }),

        'content': new Template(function(data) {
            div({'class': 'fluid-content'},
                this.renderTemplate('options'),
                this.renderTemplate('target'),
                this.renderTemplate('payload'),
                this.renderTemplate('headers'),
                this.renderTemplate('response')
            )
        }),

        'options': new Template(function(data) {
            section({'id': 'options', 'class': 'minimize'},
                this.renderTemplate('section-header', 'Options'),

                form({
                    'name': 'options',
                    'class': 'form-stacked',
                    'novalidate': true,
                    'events': {
                        'change:relay(input[type="checkbox"])': function(event) {
                            new Storage('options').set(this.get('name'), this.get('checked'));
                        },

                        'init': function() {
                            this.getElements('input[type="checkbox"]').each(function(checkbox) {
                                var data = new Storage('options').get(checkbox.get('name'));

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

                                    span({'class': 'help-block'}, '* will affect next request.')
                                )
                            )
                        ),

                        div({'class': 'span'},
                            fieldset({'class': 'control-group'},
                                label({'class': 'control-label'}, 'Color Theme'),
                                div({'class': 'controls'},
                                    div({'class': 'control-list'},
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

                                    span({'class': 'help-block'}, 'Syntax highlighting default color theme')
                                )
                            )
                        )
                    )
                ).fireEvent('init')
            )
        }),

        'target': new Template(function(data) {
            section({'id': 'target'},
                this.renderTemplate('section-header', 'Target'),

                form({'name': 'target', 'class': 'form-stacked', 'novalidate': true},
                    div({'class': 'row'},
                        div({'class': 'span2'},
                            this.renderTemplate('input', {
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
                            this.renderTemplate('input', {
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
                                        }
                                    }
                                }
                            })
                        ),


                        div({'class': 'span1'},
                            this.renderTemplate('input', {
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
                        div({'class': 'span6'},
                            label({'for': 'query'}, 'Query String'),

                            div({'class': 'input pairs'},
                                ul({'class': 'query'},
                                    li({'class': 'control-group row'},
                                        input({'class': 'span2', 'type': 'text', 'name': 'key', 'tabindex': 3, 'autocomplete': true, 'value': null, 'placeholder': 'ex: key'}),
                                        input({'class': 'span2', 'type': 'text', 'name': 'value', 'tabindex': 3, 'autocomplete': true, 'value': null, 'placeholder': 'ex: value'}),
                                        button({'class': 'span2 btn danger'})
                                    )
                                )
                            )
                        ),

                        div({'class': 'span6'},
                            label('Authorization Scheme'),

                            div({'class': 'input row auth'},
                                button({'class': 'span2 btn info', 'data-action': 'basic-auth'}, img({'src': '/images/settings.png'}), 'Basic'),
                                button({'class': 'span2 btn info', 'data-action': 'basic-digest'}, img({'src': '/images/settings.png'}), 'Digest'),
                                button({'class': 'span2 btn info', 'data-action': 'basic-oauth'}, img({'src': '/images/settings.png'}), 'oAuth')
                            ),

                            this.renderTemplate('optional-input', [
                                {
                                    'label': 'Authorization',
                                    'help': 'Authentication credentials for HTTP authentication.',
                                    'attributes': {
                                        'class': 'span6',
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
                                        'class': 'span6',
                                        'type': 'text',
                                        'name': 'Proxy-Authorization',
                                        'tabindex': 5,
                                        'autocomplete': false,
                                        'placeholder': 'ex: Basic QWxhZGRpbjpvcGVuIHNlc2FtZQ==',
                                        'disabled': true
                                    }
                                }
                            ])
                        )
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
                                                var tab = this.getParent('form').getElement('li.urlencoded');
                                                var textarea = this.getParent('form').getElement('textarea');

                                                if (this.get('value').toLowerCase() == 'application/x-www-form-urlencoded') {
                                                    tab.addClass('true');
                                                    textarea.fireEvent('change');
                                                } else {
                                                    tab.removeClass('true');
                                                }
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
                                'attributes': {'class': 'span6', 'type': 'text', 'name': 'Content-MD5', 'tabindex': 4, 'autocomplete': true, 'placeholder': 'ex: Q2hlY2sgSW50ZWdyaXR5IQ==', 'disabled': true}
                                }
                            ])
                        ),

                        div({'class': 'span6 clearfix'},
                            ul({'class': 'tabs'},
                                li({'class': 'active'}, a('RAW Body')),
                                li(a('Form Data')),
                                li(a('Attachments'))
                            ),

                            ul({
                                'class': 'tabs-content',
                                'events': {
                                    'change:relay(input[type="text"])': function(event) {
                                        var form = this.getParent('form');
                                        var data = form.toQueryString().parseQueryString();
                                        var textarea = form.getElement('textarea[name="payload"]')

                                        if (data['Content-Type'] && data['Content-Type'].toLowerCase() == 'application/x-www-form-urlencoded') {
                                            var payload = {};

                                            // set payload params
                                            Array.from(data.key).each(function(key, index) {
                                                if (key.length > 0) {
                                                    payload[key] = Array.from(data.value)[index];
                                                }
                                            });

                                            textarea.set('value', Object.toQueryString(payload));

                                            // construct fake event object
                                            var event = DOMEvent;
                                            event.target = textarea

                                            // trigger change event to store the resutls
                                            document.id('container').fireEvent('change', event);
                                        }
                                    }
                                }},

                                li({'class': 'active'},
                                    div({'class': 'clearfix'},
                                        div({'class': 'input'},
                                            textarea({
                                                'class': 'span6',
                                                'name': 'payload',
                                                'rows': 5,
                                                'tabindex': 5,
                                                'placeholder': 'ex: XML, JSON, etc ...',
                                                'events': {
                                                    'change': function(event) {
                                                        var form = this.getParent('form');
                                                        var type = form.getElement('input[name="Content-Type"]').get('value');

                                                        this.getParent('form').getElements('.pairs li:nth-last-of-type(n+2)').destroy();

                                                        if (type.toLowerCase() == 'application/x-www-form-urlencoded') {
                                                            var payload = this.get('value');

                                                            if (payload != '') {

                                                                payload = payload.parseQueryString();

                                                                Object.each(payload, function(value, key) {
                                                                    // construct fake event object
                                                                    var event = DOMEvent;
                                                                    event.target = form.getElement('.pairs li:last-of-type input[type="text"]:first-child');

                                                                    // trigger focus event to insert more rows
                                                                    document.id('container').fireEvent('focus', event);

                                                                    var last = form.getElement('.pairs li:nth-last-child(-n+2)');

                                                                    last.getElement('input[type="text"]:first-of-type').set('value', key);
                                                                    last.getElement('input[type="text"]:last-of-type').set('value', value);
                                                                }.bind(this));
                                                            }
                                                        }
                                                    }
                                                }
                                            }),

                                            span({'class': 'help-block'}, 'Remember to set the Content-Type header.')
                                        )
                                    )
                                ),

                                li({'class': 'urlencoded'},
                                    div({'class': 'info'}, 'blah blah blah'),

                                    div({'class': 'input pairs'},
                                        ul({'class': 'query'},
                                            li({'class': 'clearfix row'},
                                                input({'class': 'span4', 'type': 'text', 'name': 'key', 'tabindex': 3, 'autocomplete': true, 'value': null, 'placeholder': 'ex: key'}),
                                                input({'class': 'span5', 'type': 'text', 'name': 'value', 'tabindex': 3, 'autocomplete': true, 'value': null, 'placeholder': 'ex: value'}),
                                                button({'class': 'span1 btn danger'})
                                            )
                                        )
                                    ),

                                    span({'class': 'help-block'},  'Remember to set the Content-Type header.')
                                ),

                                li(
                                    div({'class': 'clearfix'},
                                        div({'class': 'input pairs'},
                                            ul({'class': 'query'},
                                                li({'class': 'clearfix row'},
                                                    input({'class': 'span4', 'type': 'text', 'name': 'name', 'tabindex': 5, 'autocomplete': true, 'placeholder': 'ex: file, Files[]'}),
                                                    input({'class': 'span5', 'name': 'file', 'type': 'file', 'multiple': false}),
                                                    button({'class': 'span1 btn danger'})
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

        'headers': new Template(function(data) {
            section({'id': 'headers', 'class': 'minimize'},
                this.renderTemplate('section-header', 'Headers'),

                form({
                    'name': 'headers',
                    'class': 'form-stacked',
                    'novalidate': true
                    },

                    div({'class': 'row'},
                        div({'class': 'span6'},
                            h3('Standard Headers'),

                            this.renderTemplate('optional-input', [
                                {
                                    'rfc': '14.1',
                                    'label': 'Accept',
                                    'help': 'Content-Types that are acceptable.',
                                    'attributes': {
                                        'class': 'span6',
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
                                        'class': 'span6',
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
                                        'class': 'span6',
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
                                        'class': 'span6',
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
                                        'class': 'span6',
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
                                        'class': 'span6',
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
                                        'class': 'span6',
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
                                        'class': 'span6',
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
                                        'class': 'span6',
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
                                        'class': 'span6',
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
                                        'class': 'span6',
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
                                        'class': 'span6',
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
                                        'class': 'span6',
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
                                        'class': 'span6',
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
                                        'class': 'span6',
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
                                        'class': 'span6',
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
                                        'class': 'span6',
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
                                        'class': 'span6',
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

                        div({'class': 'span6'},
                            h3('Cache'),

                            this.renderTemplate('optional-input', [

                                {
                                    'rfc': '14.9',
                                    'label': 'Cache-Control',
                                    'help': 'Used to specify directives that MUST be obeyed by all caching mechanisms along the request/response chain',
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
                                    'help': 'If the entity is unchanged, send me the part(s) that I am missing; otherwise, send me the entire new entity',
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
                            ]),

                            h3('Common non-standard request headers'),

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
                            ]),

                            h3('Custom Headers'),

                            label({'for': 'headers'}, 'Key => Value pairs'),

                            div({'class': 'clearfix'},
                                div({'class': 'input pairs'},
                                    ul({'class': 'query'},
                                        li({'class': 'clearfix row'},
                                            input({'class': 'span3', 'type': 'text', 'name': 'key', 'tabindex': 3, 'autocomplete': true, 'value': null, 'placeholder': 'ex: key'}),
                                            input({'class': 'span3', 'type': 'text', 'name': 'value', 'tabindex': 3, 'autocomplete': true, 'value': null, 'placeholder': 'ex: value'}),
                                            button({'class': 'span1 btn danger'})
                                        )
                                    )
                                )
                            )
                        )
                    )
                )
            )
        }),

        'response': new Template(function(data) {
            section({'id': 'response'},
                this.renderTemplate('section-header', 'Response'),

                ul({'class': 'tabs'},
                    li({'class': 'active'}, a({'data-target': 'body'}, 'Response Body')),
                    li(a('RAW Response')),
                    li(a('Response Preview')),
                    li(a('RAW Request')),
                    li(a('HTTP Archive (HAR)'))
                ),

                ul({'class': 'tabs-content'},
                    li({'class': 'active'},
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
                    li(pre({'id': 'response-raw', 'class': 'prettyprint'})),
                    li(div({'id': 'response-preview'})),
                    li(pre({'id': 'request-raw', 'class': 'prettyprint'})),
                    li(pre({'id': 'har', 'class': 'prettyprint lang-json'}))
                )
            )
        }),

        'controls': new Template(function(data) {
            div({'id': 'controls'},
                section({'events': {
                        'click:relay(button)': function(event) {
                            this.send();
                        }.bind(this)
                    }},

                    img({'src': '/images/loading.gif'}),

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
        })
    },

    'initialize': function() {
        var body = document.body;

        // render the body templates
        body.adopt(this.renderTemplate('header'));
        body.adopt(this.renderTemplate('container'));
        body.adopt(this.renderTemplate('controls'));

        // add the datalists
        Object.each(this.datalists, function(datalist, id) {
            datalist.sort();
            body.adopt(this.renderTemplate('datalist', {'id': id, 'values': datalist}));
        }.bind(this));

        // enable smooth scrolling
        new Fx.SmoothScroll({
            'offset': {'y': -60},
            'links': '.topbar a[href^="#"]',
            'wheelStops': true
        });

        // load default values
        this.loadDefaults();

        // display the page
        body.set('class', 'loaded');

        // setup autocomplete
        if ('options' in document.createElement('datalist') == false) {
            new AutoComplete();
        }
    },

    'loadDefaults': function() {
        var pairs       = new Storage('pairs');
        var values      = new Storage('input-values');
        var sections    = new Storage('sections');
        var statuses    = new Storage('input-status');
        var container   = document.id('container');

        // input fields and textareas
        document.getElements('.input:not(.pairs) input[type="text"], .input input[type="number"], textarea').each(function(input) {
            input.set('value', values.get(input.get('name'))).fireEvent('change');
        });

        // input fields with checkboxes
        document.getElements('.input-prepend input[type="text"]').each(function(input) {
            var checkbox = input.getParent('.input-prepend').getElement('input[type="checkbox"]');
            var enabled = statuses.get(input.get('name'));

            if (enabled) {
                input.set('disabled', !enabled);
                checkbox.set('checked', enabled);
            }
        });

        // process pairs
        document.getElements('.pairs').getParent('form').each(function(form) {
            var storage = pairs.get(form.get('name'));

            Object.each(storage, function(value, key) {
                // construct fake event object
                var event = DOMEvent;
                event.target = form.getElement('.pairs li:last-of-type input[type="text"]:first-child');

                // trigger focus event on container to insert more rows
                container.fireEvent('focus', event);

                // get the newly inserted row
                var row = form.getElement('.pairs li:nth-last-child(-n+2)');

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
    },

    'send': function() {
        var error = false;

        var data = {
            'target': {},
            'payload': {},
            'headers': {}
        };

        var forms = document.getElements('form[name="target"], form[name="payload"], form[name="headers"]');

        forms.each(function(form) {
            data[form.get('name')] = {};

            var string = form.toQueryString();

            // sanity check
            if (string != '') {
                data[form.get('name')] = string.parseQueryString()
            }
        });

        // ensure the following are all arrays
        data.target.key = Array.from(data.target.key);
        data.target.value = Array.from(data.target.value);

        data.headers.key = Array.from(data.headers.key);
        data.headers.value = Array.from(data.headers.value);

        console.log('plain data', data);

        var options = {
            'url': data.target.uri,
            'query': {},
            'payload': {},
            'files': {},
            'headers': Object.merge({}, data.target, data.payload, data.headers),
            'async': true,
            'method': data.target.method,
            'link': 'ignore',
            'isSuccess': null,
            'emulation': false,
            'encoding': data.payload['content-encoding'],
            'evalScripts': false,
            'evalResponse': false,
            'timeout': data.target.timeout * 1000,
            'noCache': false,

            'onRequest': function() {
                // replace buttons with animation
                document.id('controls').addClass('progress');
            },

            'onProgress': function(event, xhr){
                //var loaded = event.loaded, total = event.total;
            },

            'onTimeout': function() {
                // TODO replace with notice
                Error('Error', 'Connection Timed-out');

                // remove loading animation
                document.id('controls').removeClass('progress');
            },

            'onCancel': function() {
                //this.fireEvent('stop');
            }.bind(this),

            'onComplete': this.processResponse
        };

        // modify Content-Type header based on encoding charset
        if (options.headers['content-encoding'] != '') {
            options.headers['Content-Type'] = options.headers['Content-Type'] + '; charset=' + options.headers['content-encoding'];
        }

        // cleanup
        delete options.headers.uri;
        delete options.headers.method;
        delete options.headers.timeout;
        delete options.headers.key;
        delete options.headers.value;
        delete options.headers.payload;
        delete options.headers.name;
        delete options.headers.files;
        delete options.headers['content-encoding'];

        // set query string params
        data.target.key.each(function(key, index) {
            if (key.length > 0) {
                options.query[key] = data.target.value[index];
            }
        });

        // set payload
        if (data.payload['Content-Type'] == 'application/x-www-form-urlencoded') {
            options.payload = data.payload.payload.parseQueryString();
        } else {
            options.payload = data.payload.payload;
        };

        // set custom headers
        if (data.headers.key) {
            data.headers.key.each(function(key, index) {
                //validate header
                if (this.unsafe.contains(key.toLowerCase())) {
                    Error('Unsafe Header', 'Refused to set unsafe header "' + key + '"', this.getElement('ul.headers input[name="key"]:nth-of-type(' + (index + 1) + ')'));
                    error = true;
                } else if (key.length > 0) {
                    options.headers[key] = data.headers.value[index];
                }
            }.bind(this));
        }

        // check for required fields
        document.getElements('*[required]').each(function(element) {
            if (element.get('value').length == 0) {
                Error('Missing Data', 'Please Fill out all the required fields', element);
                error = true;
            }
        });

        console.log('request options', options);

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

        document.id('controls').removeClass('progress');
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
            document.getElement('a[href="#response"]').fireEvent('click', new DOMEvent());

            // remove loading animation
            document.getElement('form[name="request"] .actions').removeClass('progress');
        }
    },

    'goTo': function(target) {
        var event = new DOMEvent;
        event.target = document.getElement('a[href="#' + target + '"]');
        event.target.fireEvent('click', event);
    }
});

// error messages
Error = function(title, text, element) {
    //var messages = document.getElement('.messages').removeClass('hide');
    //var message = messages.getElement('.alert-message.error').removeClass('hide');
    //message.getElement('p').set('html', '<strong>{0}</strong> {1}'.substitute([title, text]));
    //message.getElement('a').fireEvent('click', event, 3000);

    //if (element) {
     //   element.getParent('.clearfix').addClass('error');
   // }
};

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

    // basic auth submit event
    document.getElement('form.authorization.basic').addEvents({
        'submit': function(event) {
            event.preventDefault();

            var auth = this.toQueryString().parseQueryString();

            var input = document.getElement('input[name="Authorization"]');
            input.set('value', 'Basic ' + btoa(auth.username + ':' + auth.password));
            input.getPrevious('.add-on').getElement('input[type="checkbox"]').set('checked', true).fireEvent('change');

            this.getParent('.modals').getElement('.modal-backdrop').fireEvent('click');
        },

        'reset': function(event) {
            document.getElement('input[name="Authorization"]').set('value', null);

            this.getParent('.modals').getElement('.modal-backdrop').fireEvent('click');
        }
    });

    // ensure oauth version is of the right format
    document.getElement('form.authorization.oauth input[name="version"]').addEvent('change', function() {
        this.set('value', parseInt(this.get('value')).toFixed(1));
    });

    // oauth form
    document.getElement('form.authorization.oauth').addEvents({
        'click:relay(input[type="button"], input[type="submit"], input[type="reset"])': function(event) {
            event.preventDefault();

            this.getParent('form').fireEvent(this.dataset.action, event);

            _gaq.push(['_trackEvent', 'oAuth Form', this.dataset.action]);
        },

        'submit': function(event) {
            event.preventDefault();

            var form = document.getElement('form[name="request"]');
            var request = form.toQueryString().parseQueryString();

            var data = this.toQueryString().parseQueryString();

            // start oauth
            var accessor = {
                'consumerKey': data.consumer_key,
                'consumerSecret': data.consumer_secret,
                'token': data.token_key,
                'tokenSecret': data.token_secret
            };

            var message = {
                'action': request.uri,
                'method': request.method,
                'parameters': [
                    ['oauth_version', data.version],
                    ['oauth_signature_method', data.signature]
                ]
            };

/*
            // optional params
            if (data.scope.length > 0) {
                oauth.parameters.scope = data.scope;
            }

            if (data.oauth_verifier.length > 0) {
                oauth.parameters.oauth_verifier = data.oauth_verifier;
            }
*/
            // params container
            var container = document.getElement('ul.params');

            // remove old rows if any
            container.getElements('li').each(function(row) {
                if (row.dataset.oauth) {
                    row.destroy();
                }
            });

            // GET/POST params
            var elements = {
                'keys': container.getElements('input[name="key"]').get('value'),
                'values': container.getElements('input[name="value"]').get('value')
            };

            elements.keys.each(function(key, index) {
                if (key.length > 0) {
                    message.parameters.push([key, elements.values[index]]);
                }
            });

            // sign
            OAuth.completeRequest(message, accessor);

            console.log(message);

            if (data.method == 'header') {
                var header = OAuth.getAuthorizationHeader(data.realm, message.parameters);
                var input = document.getElement('input[name="Authorization"]').set('value', header);
                input.getPrevious('.add-on').getElement('input[type="checkbox"]').set('checked', true).fireEvent('change');
            } else {
                var input = document.getElement('input[name="Authorization"]').set('value', '');
                input.getPrevious('.add-on').getElement('input[type="checkbox"]').set('checked', false).fireEvent('change');

                var oauth_params = oauth.signed_url.replace(request.uri + '?', '').parseQueryString();

                Object.each(oauth_params, function(value, key) {
                    row = container.getElement('li:last-of-type').clone();
                    row.dataset.oauth = true;
                    row.getElement('input[name="key"]').set('value', key);
                    row.getElement('input[name="value"]').set('value', value);
                    row.getElements('input').set('disabled', false);
                    row.inject(container, 'top');
                });
            }

            if (data.oauth_callback.length > 0) {
                row = container.getElement('li:last-of-type').clone();
                row.dataset.oauth = true;
                row.getElement('input[name="key"]').set('value', 'oauth_callback');
                row.getElement('input[name="value"]').set('value', data.oauth_callback);
                row.getElements('input').set('disabled', false);
                row.inject(container, 'top');
            }

            this.getParent('.modals').getElement('.modal-backdrop').fireEvent('click');
        },

        'reset': function(event) {
            // clear oAuth tokens
            chrome.extension.getBackgroundPage().oAuth.clear();

            // load stored defaults
            defaults = JSON.decode(localStorage.getItem('oauth-defaults'));

            Object.each(defaults, function(value, key) {
                var input = document.getElement('input[name="{0}"]'.substitute([key]));

                // set the value
                if (input) {
                    input.set('value', value).fireEvent('change', new DOMEvent);
                }
            });
        },

        'save': function(event) {
            // get all form data
            var defaults = {};

            defaults = this.toQueryString().parseQueryString();

            localStorage.setItem('oauth-defaults', JSON.encode(defaults));
        },

        'authorize': function(event) {
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
    }).fireEvent('reset', new DOMEvent);

    // disable the authorize button when an access token is present
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



    // request form actions
    document.getElement('form[name="request"]').addEvents({

        'basic-auth': function(event) {
            document.getElement('.modals').removeClass('hide').getElement('.modal.authorization.basic').removeClass('hide');
        },

        'oauth-setup': function(event) {
            var element = document.getElement('input[name="uri"]');

            // special
            document.getElement('.modal.authorization.oauth').getElement('input[name="token_secret"]').fireEvent('change');

            if (element.get('value').length == 0) {
                element.focus();
                Error('Missing Data', 'Please provide a target URI before setting oAuth Authorization', element);
                return;
            }

            document.getElement('.modals').removeClass('hide').getElement('.modal.authorization.oauth').removeClass('hide');
        },

        'oauth-refresh': function(event) {
            document.getElement('form.authorization.oauth').fireEvent('submit', new DOMEvent);
        },

        'save': function(event) {
            // get all form data
            var defaults = {};

            defaults = this.toQueryString().parseQueryString();

            delete defaults.key;
            delete defaults.value;

            var params = {};
            var headers = {};

            // save custom headers
            var elements = {
                'keys': this.getElements('ul.headers input[name="key"]:not(:last-of-type)').get('value'),
                'values': this.getElements('ul.headers input[name="value"]:not(:last-of-type)').get('value')
            };

            elements.keys.each(function(key, index) {
                if (key.length > 0) {
                    headers[key] = elements.values[index];
                }
            });

            // set custom params
            var elements = {
                'keys': this.getElements('ul.params input[name="key"]:not(:last-of-type)').get('value'),
                'values': this.getElements('ul.params input[name="value"]:not(:last-of-type)').get('value')
            };

            elements.keys.each(function(key, index) {
                if (key.length > 0) {
                    params[key] = elements.values[index];
                }
            });

            localStorage.setItem('request-headers-defaults', JSON.encode(headers));
            localStorage.setItem('request-params-defaults', JSON.encode(params));
            localStorage.setItem('request-defaults', JSON.encode(defaults));
        },

        'reset': function(event) {
            event.preventDefault();

            var defaults = {
                'request': JSON.decode(localStorage.getItem('request-defaults')),
                'params': JSON.decode(localStorage.getItem('request-params-defaults')),
                'headers': JSON.decode(localStorage.getItem('request-headers-defaults'))
            }

            Object.each(defaults.request, function(value, key) {
                var input = document.getElement('input[name="{0}"]'.substitute([key]));

                // set the value
                input.set('value', value);

                // enabled if a disabled field
                if (input.get('disabled')) {
                    var label = input.getPrevious('.add-on');

                    input.set('disabled', false);

                    if (label) {
                        label.getElement('input[type="checkbox"]').set('checked', true);
                    }
                }
            });

            var container = document.getElement('ul.params');

            // cleanup
            container.getElements('li:not(:last-of-type)').destroy();

            Object.each(defaults.params, function(value, key) {
                row = container.getElement('li:last-of-type').clone();
                row.getElement('input[name="key"]').set('value', key);
                row.getElement('input[name="value"]').set('value', value);
                row.getElements('input').set('disabled', false);
                row.inject(container, 'top');
            });

            var container = document.getElement('ul.headers');

            // cleanup
            container.getElements('li:not(:last-of-type)').destroy();

            Object.each(defaults.headers, function(value, key) {
                row = container.getElement('li:last-of-type').clone();
                row.getElement('input[name="key"]').set('value', key);
                row.getElement('input[name="value"]').set('value', value);
                row.getElements('input').set('disabled', false);
                row.inject(container, 'top');
            });
        },

        'get': function(event) {
            this.getElement('input[name="method"]').set('value', 'GET');
            this.fireEvent('submit', event);
        },

        'post': function(event) {
            this.getElement('input[name="method"]').set('value', 'POST');
            this.fireEvent('submit', event);
        },

        'put': function(event) {
            this.getElement('input[name="method"]').set('value', 'PUT');
            this.fireEvent('submit', event);
        },

        'delete': function(event) {
            this.getElement('input[name="method"]').set('value', 'DELETE');
            this.fireEvent('submit', event);
        },

        'stop': function(event) {
            if (window.XHR) {
                window.XHR.cancel();
            }

            // remove loading animation
            document.getElement('form[name="request"] .actions').removeClass('progress');
        }
    }).fireEvent('reset', new DOMEvent);
});
