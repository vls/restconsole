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

    'datalists': {
        'mimetypes': [
            '*/*',
            'application/atom+xml',
            'application/atomcat+xml',
            'application/atomserv+xml',
            'application/beep+xml',
            'application/bbolin',
            'application/davmount+xml',
            'application/docbook+xml',
            'application/ecmascript',
            'application/hta',
            'application/http',
            'application/javascript',
            'application/json',
            'application/msaccess',
            'application/msword',
            'application/news-message-id',
            'application/news-transmission',
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
            'application/sgml-open-catalog',
            'application/xhtml+xml',
            'application/xml',
            'application/xml-dtd',
            'application/xml-external-parsed-entity',
            'application/xspf+xml',
            'application/zip',
            'application/vnd.android.package-archive',
            'application/vnd.google-earth.kml+xml',
            'application/vnd.google-earth.kmz',
            'application/vnd.mozilla.xul+xml',
            'application/vnd.oasis.opendocument.chart',
            'application/vnd.oasis.opendocument.database',
            'application/vnd.oasis.opendocument.formula',
            'application/vnd.oasis.opendocument.graphics',
            'application/vnd.oasis.opendocument.graphics-template',
            'application/vnd.oasis.opendocument.image',
            'application/vnd.oasis.opendocument.presentation',
            'application/vnd.oasis.opendocument.presentation-template',
            'application/vnd.oasis.opendocument.spreadsheet',
            'application/vnd.oasis.opendocument.spreadsheet-template',
            'application/vnd.oasis.opendocument.text',
            'application/vnd.oasis.opendocument.text-master',
            'application/vnd.oasis.opendocument.text-template',
            'application/vnd.oasis.opendocument.text-web',
            'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
            'application/vnd.openxmlformats-officedocument.spreadsheetml.template',
            'application/vnd.openxmlformats-officedocument.presentationml.presentation',
            'application/vnd.openxmlformats-officedocument.presentationml.slideshow',
            'application/vnd.openxmlformats-officedocument.presentationml.template',
            'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
            'application/vnd.openxmlformats-officedocument.wordprocessingml.template',
            'application/vnd.sun.xml.calc',
            'application/vnd.sun.xml.calc.template',
            'application/vnd.sun.xml.draw',
            'application/vnd.sun.xml.draw.template',
            'application/vnd.sun.xml.impress',
            'application/vnd.sun.xml.impress.template',
            'application/vnd.sun.xml.math',
            'application/vnd.sun.xml.writer',
            'application/vnd.sun.xml.writer.global',
            'application/vnd.sun.xml.writer.template',
            'application/vnd.wap.sic',
            'application/vnd.wap.slc',
            'application/vnd.wap.wbxml',
            'application/vnd.wap.wmlc',
            'application/vnd.wap.wmlscriptc',
            'application/x-7z-compressed',
            'application/x-bittorrent',
            'application/x-cab',
            'application/x-cbr',
            'application/x-cbz',
            'application/x-debian-package',
            'application/x-executable',
            'application/x-font',
            'application/x-freemind',
            'application/x-hdf',
            'application/x-httpd-php',
            'application/x-httpd-php-source',
            'application/x-httpd-php3',
            'application/x-httpd-php3-preprocessed',
            'application/x-httpd-php4',
            'application/x-httpd-php5',
            'application/x-quicktimeplayer',
            'application/x-ruby',
            'application/x-sh',
            'application/x-shellscript',
            'application/x-shockwave-flash',
            'application/x-silverlight',
            'application/x-stuffit',
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
            'audio/x-pn-realaudio-plugin',
            'audio/x-pn-realaudio',
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
            'image/x-coreldraw',
            'image/x-coreldrawpattern',
            'image/x-coreldrawtemplate',
            'image/x-corelphotopaint',
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
            'multipart/voice-message',
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
            'text/vnd.curl',
            'text/vnd.wap.si',
            'text/vnd.wap.sl',
            'text/vnd.wap.wml',
            'text/vnd.wap.wmlscript',
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
            ['id', 'Indonesian (formerly in)'],
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
            ['om', '(Afan) Oromo'],
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
            ['yi', 'Yiddish (formerly ji)'],
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

        'header': new Template(function(data) {
            header({'class': 'topbar'},
                div({'class': 'fill'},
                    div({'class': 'container-fluid'},
                        div({'class': 'brand'},
                            img({'src': 'images/logo/32.png', 'align': 'left'}),
                            'REST Console',
                            small('version 4.1.0')
                        ),

                        ul({'class': 'nav'},
                            li(a({'href': '#options'}, span('O'), 'ptions')),
                            li(a({'href': '#main'}, span('M'), 'ain')),
                            li(a({'href': '#payload'}, span('P'), 'ayload')),
                            li(a({'href': '#authorization'}, span('A'), 'uthorization')),
                            li(a({'href': '#headers'}, span('H'), 'eaders')),
                            li(a({'href': '#response'}, span('R'), 'esponse'))
                        )
                    )
                )
            )
        }),

        'container': new Template(function(data) {
            div({'class': 'container-fluid'},
                this.renderTemplate('sidebar'),
                this.renderTemplate('content')
            )
        }),

        'sidebar': new Template(function(data) {
            section({'class': 'sidebar'},
                div({'class': 'page'},
                    h5('Services'),

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
            div({
                'class': 'content',
                'events': {
                    // load inputs defaults
                    'initInputs': function() {
                        this.getElements('.input:not(.pairs) input[type="text"], .input input[type="number"], textarea').each(function(input) {
                            input.set('value', localStorage.getItem('input-value:' + input.get('name')));
                        });

                        this.getElements('.input-prepend input[type="text"]').each(function(input) {
                            var checkbox = input.getParent('.input-prepend').getElement('input[type="checkbox"]');
                            var disabled = localStorage.getItem('input-disabled:' + input.get('name'));

                            if (disabled != null) {
                                if (disabled == 'true') {
                                    input.set('disabled', true);
                                    checkbox.set('checked', false);
                                } else {
                                    input.set('disabled', false);
                                    checkbox.set('checked', true);
                                }
                            }
                        });

                        // process pairs
                        this.getElements('.pairs').getParent('form').each(function(form) {
                            var data = localStorage.getItem('pairs-' + form.get('name'));

                            if (data != null) {
                                data = data.parseQueryString();
                                Object.each(data, function(value, key) {
                                    // construct fake event object
                                    var event = DOMEvent;
                                    event.target = form.getElement('.pairs li:last-of-type input[type="text"]:first-child');

                                    // trigger focus event to insert more rows
                                    this.fireEvent('focus', event);

                                    var last = form.getElement('.pairs li:nth-last-child(-n+2)');

                                    last.getElement('input[type="text"]:first-of-type').set('value', key);
                                    last.getElement('input[type="text"]:last-of-type').set('value', value);
                                }.bind(this));
                            }
                        }.bind(this));
                    },

                    // load section defaults
                    'initSections': function() {
                        this.getElements('section').each(function(section) {
                            var storage = localStorage.getItem('section-hidden:' + section.get('id'));

                            if (storage != null) {
                                section.removeClass('hidden');

                                if (storage == 'true') {
                                    section.addClass('hidden');
                                }
                            }
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

                        localStorage.setItem('input-disabled:' + input.get('name'), input.get('disabled'));
                    },

                    // store input values
                    'change:relay(.input:not(.pairs) input[type="text"], .input input[type="number"], textarea)': function(event) {
                        localStorage.setItem('input-value:' + this.get('name'), this.get('value'));
                    },

                    // section hide toggle
                    'click:relay(section header img)': function(event) {
                        var section = this.getParent('section');
                        section.toggleClass('hidden')
                        localStorage.setItem('section-hidden:' + section.get('id'), section.hasClass('hidden'));
                    },

                    // store pairs values
                    'change:relay(form[name="main"] input[type="text"], form[name="payload"] input[type="text"])': function(event) {
                        var form = this.getParent('form');
                        var data = form.toQueryString().parseQueryString();

                        var storage = {};

                        data.key.each(function(key, index) {
                            if (key.length > 0) {
                                storage[key] = data.value[index];
                            }
                        });

                        localStorage.setItem('pairs-' + form.get('name'), Object.toQueryString(storage));
                    },

                    // pairs delete button
                    'click:relay(.pairs button)': function(event) {
                        var row = this.getParent('li');
                        var next = row.getNext();

                        if (next != row.getParent('ul').getLast()) {
                            next.getFirst().focus();
                        }

                        row.destroy();

                        var event = new DOMEvent;
                        event.target = next.getFirst();
                        next.getParent('.content').fireEvent('change', event);
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

                        var tabs = this.getParent('ul');
                        var content = tabs.getNext('.tabs-content');
                        var index = tabs.getChildren().indexOf(this.getParent('li'));

                        // switch tabs
                        tabs.getElement('.active').removeClass('active');
                        this.getParent('li').addClass('active');

                        content.getElement('.active').removeClass('active').getElements('input, textarea').set('disabled', true);
                        content.getChildren()[index].addClass('active').getElements('input, textarea').set('disabled', false);
                    },

                    // prevent enter key from triggering any buttons on the page
                    'keydown:keys(enter):relay(form)': function(event) {
                        event.stop();

                        // TODO fire send event
                    }
                }},

                this.renderTemplate('options'),
                this.renderTemplate('main'),
                this.renderTemplate('payload'),
                this.renderTemplate('authorization'),
                this.renderTemplate('headers'),
                this.renderTemplate('response')
            ).fireEvent('initSections').fireEvent('initInputs')
        }),

        'options': new Template(function(data) {
            section({'id': 'options', 'class': 'hidden'},
                header(
                    img({'src': 'images/minimize.png'}),
                    h2('Options')
                ),

                form({
                    'name': 'options',
                    'class': 'form-stacked',
                    'novalidate': true,
                    'events': {
                        'change:relay(input[type="checkbox"])': function(event) {
                            localStorage.setItem('options:' + this.get('name'), this.get('checked'));
                        },

                        'init': function() {
                            this.getElements('input[type="checkbox"]').each(function(checkbox) {
                                var storage = localStorage.getItem('options:' + checkbox.get('name'));

                                if (storage != null) {
                                    if (storage == 'true') {
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
                        div({'class': 'span8'},
                            div({'class': 'clearfix'},
                                label('General'),
                                div({'class': 'input'},
                                    ul({'class': 'inputs-list'},
                                        li(
                                            label(
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
                                                span('Hide Help Lines')
                                            )
                                        ),

                                        li(
                                            label(
                                                input({'type': 'checkbox', 'name': 'lines'}),
                                                span('Hide Line Numbers *')
                                            )
                                        )
                                    ),

                                    span({'class': 'help-block'}, '* will affect next request.')
                                )
                            )
                        ),

                        div({'class': 'span'},
                            div({'class': 'clearfix'},
                                label('Color Theme'),
                                div({'class': 'input'},
                                    ul({'class': 'inputs-list'},
                                        li(
                                            label(
                                                input({'type': 'radio', 'name': 'theme', 'value': 'default'}),
                                                span('Default')
                                            )
                                        ),

                                        li(
                                            label(
                                                input({'type': 'radio', 'name': 'theme', 'value': 'bootstrap', 'checked': true}),
                                                span('Bootstrap')
                                            )
                                        ),

                                        li(
                                            label(
                                                input({'type': 'radio', 'name': 'theme', 'value': 'desert'}),
                                                span('Desert')
                                            )
                                        ),

                                        li(
                                            label(
                                                input({'type': 'radio', 'name': 'theme', 'value': 'sunburst'}),
                                                span('Sunburst')
                                            )
                                        ),

                                        li(
                                            label(
                                                input({'type': 'radio', 'name': 'theme', 'value': 'sons-of-obsidian'}),
                                                span('Sons of Obsidian')
                                            )
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

        'main': new Template(function(data) {
            section({'id': 'main'},
                header(
                    img({'src': 'images/minimize.png'}),
                    h2('Main')
                ),

                form({
                    'name': 'main',
                    'class': 'form-stacked',
                    'novalidate': true
                    },

                    h3('Target'),

                    div({'class': 'row'},
                        div({'class': 'span10'},
                            div({'class': 'clearfix'},
                                label({'for': 'uri'}, 'URI'),
                                div({'class': 'input'},
                                    input({
                                        'class': 'span10',
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
                                    }),
                                    span({'class': 'help-block'}, 'Universal Resource Identifier. ex: https://www.sample.com:9000')
                                )
                            )
                        ),

                        div({'class': 'span2 offset1'},
                            div({'class': 'clearfix'},
                                label({'for': 'method'}, 'Method'),
                                div({'class': 'input'},
                                    input({'class': 'span2', 'type': 'text', 'name': 'method', 'tabindex': 2, 'autocomplete': true, 'placeholder': 'ex: POST', 'list': 'methods', 'required': true}),
                                    span({'class': 'help-block'}, 'HTTP Verb')
                                )
                            )
                        ),

                        div({'class': 'span2 offset1'},
                            div({'class': 'clearfix'},
                                label({'for': 'timeout'}, 'Timeout'),
                                div({'class': 'input'},
                                    input({'class': 'span2', 'type': 'number', 'name': 'timeout', 'value': 60, 'tabindex': 2, 'min': 1, 'step': 1, 'required': true}),
                                    span({'class': 'help-block'}, 'in seconds')
                                )
                            )
                        )
                    ),

                    div({'class': 'row'},
                        div({'class': 'span6'},
                            h3('Accept'),

                            div({'class': 'clearfix'},
                                label({'for': 'accept'}, a({'href': 'http://www.w3.org/Protocols/rfc2616/rfc2616-sec14.html#sec14.1', 'target': '_blank'}, 'Content-Type')),
                                div({'class': 'input'},
                                    div({'class': 'input-prepend'},
                                        label({'class': 'add-on'}, input({'type': 'checkbox'})),
                                        input({'class': 'span5', 'type': 'text', 'name': 'Accept', 'tabindex': 3, 'autocomplete': true, 'placeholder': 'ex: text/plain', 'list': 'mimetypes', 'disabled': true})
                                    ),
                                    span({'class': 'help-block'}, 'Content-Types that are acceptable.')
                                )
                            ),

                            div({'class': 'clearfix hide'},
                                label({'for': 'charset'}, a({'href': 'http://www.w3.org/Protocols/rfc2616/rfc2616-sec14.html#sec14.2', 'target': '_blank'}, 'Charset')),
                                div({'class': 'input'},
                                    div({'class': 'input-prepend'},
                                        label({'class': 'add-on'}, input({'type': 'checkbox'})),
                                        input({'class': 'span5', 'type': 'text', 'name': 'Accept-Charset', 'tabindex': 3, 'autocomplete': true, 'placeholder': 'ex: utf-8', 'list': 'charset', 'disabled': true})
                                    ),
                                    span({'class': 'help-block'}, 'Character sets that are acceptable.')
                                )
                            ),

                            div({'class': 'clearfix hide'},
                                label({'for': 'encoding'}, a({'href': 'http://www.w3.org/Protocols/rfc2616/rfc2616-sec14.html#sec14.3', 'target': '_blank'}, 'Encoding')),
                                div({'class': 'input'},
                                    div({'class': 'input-prepend'},
                                        label({'class': 'add-on'}, input({'type': 'checkbox'})),
                                        input({'class': 'span5', 'type': 'text', 'name': 'Accept-Encoding', 'tabindex': 3, 'autocomplete': true, 'placeholder': 'ex: identity', 'list': 'encoding', 'disabled': true})
                                    ),
                                    span({'class': 'help-block'}, 'Acceptable encodings.')
                                )
                            ),

                            div({'class': 'clearfix'},
                                label({'for': 'language'}, a({'href': 'http://www.w3.org/Protocols/rfc2616/rfc2616-sec14.html#sec14.4', 'target': '_blank'}, 'Language')),
                                div({'class': 'input'},
                                    div({'class': 'input-prepend'},
                                        label({'class': 'add-on'}, input({'type': 'checkbox'})),
                                        input({'class': 'span5', 'type': 'text', 'name': 'Accept-Language', 'tabindex': 3, 'autocomplete': true, 'placeholder': 'ex: en-US', 'list': 'languages', 'disabled': true})
                                    ),
                                    span({'class': 'help-block'}, 'Acceptable languages for response.')
                                )
                            )
                        ),

                        div({'class': 'span10 clearfix'},
                            h3('Query String'),

                            label({'for': 'query'}, 'Key => Value pairs'),

                            div({'class': 'input pairs'},
                                ul({'class': 'unstyled query'},
                                    li({'class': 'clearfix row'},
                                        input({'class': 'span4', 'type': 'text', 'name': 'key', 'tabindex': 3, 'autocomplete': true, 'value': null, 'placeholder': 'ex: key'}),
                                        input({'class': 'span5', 'type': 'text', 'name': 'value', 'tabindex': 3, 'autocomplete': true, 'value': null, 'placeholder': 'ex: value'}),
                                        button({'class': 'span1 btn danger'})
                                    )
                                )
                            ),

                            span({'class': 'help-block'},  '')
                        )
                    )
                )
            )
        }),

        'payload': new Template(function(data) {
            section({'id': 'payload', 'class': 'hidden'},
                header(
                    img({'src': 'images/minimize.png'}),
                    h2('Payload')
                ),

                form({
                    'name': 'payload',
                    'class': 'form-stacked',
                    'novalidate': true
                    },

                    div({'class': 'row'},
                        div({'class': 'span6'},
                            div({'class': 'clearfix'},
                                label({'for': 'Content-Type'}, 'Content-Type'),
                                div({'class': 'input'},
                                    div({'class': 'input-prepend'},
                                        label({'class': 'add-on'}, input({'type': 'checkbox'})),
                                        input({'class': 'span5', 'type': 'text', 'name': 'Content-Type', 'tabindex': 4, 'autocomplete': true, 'placeholder': 'ex: application/x-www-form-urlencoded', 'list': 'mimetypes', 'disabled': true})
                                    ),
                                    span({'class': 'help-block'}, 'The mime type of the body of the request')
                                )
                            ),

                            div({'class': 'clearfix'},
                                label({'for': 'encoding'}, 'Content-Type Encoding'),
                                div({'class': 'input'},
                                    div({'class': 'input-prepend'},
                                        label({'class': 'add-on'}, input({'type': 'checkbox'})),
                                        input({'class': 'span5', 'type': 'text', 'name': 'content-encoding', 'tabindex': 4, 'autocomplete': true, 'placeholder': 'ex: utf-8', 'list': 'charset', 'disabled': true})
                                    ),
                                    span({'class': 'help-block'}, 'Acceptable encodings')
                                )
                            ),

                            div({'class': 'clearfix hide'},
                                label({'for': 'Content-Length'}, 'Content-Length'),
                                div({'class': 'input'},
                                    div({'class': 'input-prepend'},
                                        label({'class': 'add-on'}, input({'type': 'checkbox'})),
                                        input({'class': 'span5', 'type': 'text', 'name': 'Content-Length', 'tabindex': 4, 'autocomplete': true, 'placeholder': 'ex: 348', 'disabled': true})
                                    ),
                                    span({'class': 'help-block'}, 'The length of the request body in octets (8-bit bytes).')
                                )
                            ),

                            div({'class': 'clearfix hide'},
                                label({'for': 'Cookie'}, 'Cookie'),
                                div({'class': 'input'},
                                    div({'class': 'input-prepend'},
                                        label({'class': 'add-on'}, input({'type': 'checkbox'})),
                                        input({'class': 'span5', 'type': 'text', 'name': 'Cookie', 'tabindex': 4, 'autocomplete': true, 'placeholder': 'ex: UserID=JohnDoe; Max-Age=3600; Version=1', 'disabled': true})
                                    ),
                                    span({'class': 'help-block'}, 'an HTTP cookie previously sent by the server')
                                )
                            ),

                            div({'class': 'clearfix'},
                                label({'for': 'Content-MD5'}, 'Content-MD5'),
                                div({'class': 'input'},
                                    div({'class': 'input-prepend'},
                                        label({'class': 'add-on'}, input({'type': 'checkbox'})),
                                        input({'class': 'span5', 'type': 'text', 'name': 'Content-MD5', 'tabindex': 4, 'autocomplete': true, 'placeholder': 'ex: Q2hlY2sgSW50ZWdyaXR5IQ==', 'disabled': true})
                                    ),
                                    span({'class': 'help-block'}, 'A Base64-encoded binary MD5 sum of the content of the request body.')
                                )
                            )
                        ),

                        div({'class': 'span10 clearfix'},
                            h3('Request Payload'),

                            ul({'class': 'tabs'},
                                li({'class': 'active'}, a('Key / Value Pairs')),
                                li(a('Raw')),
                                li(a('Attachments'))
                            ),

                            ul({
                                'class': 'unstyled tabs-content',
                                'events': {
                                    'change:relay(textarea)': function(event) {
                                        var form = this.getParent('form');
                                        var data = form.toQueryString().parseQueryString();

                                        this.getParent('form').getElements('.pairs li:nth-last-of-type(n+2)').destroy();

                                        if (data['Content-Type'] && data['Content-Type'].toLowerCase() == 'application/x-www-form-urlencoded') {
                                            data = data.raw.parseQueryString();

                                            Object.each(data, function(value, key) {
                                                // construct fake event object
                                                var event = DOMEvent;
                                                event.target = form.getElement('.pairs li:last-of-type input[type="text"]:first-child');

                                                // trigger focus event to insert more rows
                                                this.getParent('.content').fireEvent('focus', event);

                                                var last = form.getElement('.pairs li:nth-last-child(-n+2)');

                                                last.getElement('input[type="text"]:first-of-type').set('value', key);
                                                last.getElement('input[type="text"]:last-of-type').set('value', value);
                                            }.bind(this));
                                        } else {
                                            localStorage.removeItem('pairs-payload');
                                        }
                                    },

                                    'change:relay(input[type="text"])': function(event) {
                                        var form = this.getParent('form').toQueryString().parseQueryString();

                                        if (form['Content-Type'] && form['Content-Type'].toLowerCase() == 'application/x-www-form-urlencoded') {
                                            var raw = {};

                                            // set payload params
                                            Array.from(form.key).each(function(key, index) {
                                                if (key.length > 0) {
                                                    raw[key] = Array.from(form.value)[index];
                                                }
                                            });

                                            this.getParent('form').getElement('textarea[name="raw"]').set('value', Object.toQueryString(raw));
                                        }
                                    }
                                }},

                                li({'class': 'active'},
                                    div({'class': 'input pairs'},
                                        ul({'class': 'unstyled query'},
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
                                        div({'class': 'input'},
                                            textarea({'class': 'span9', 'name': 'raw', 'rows': 5, 'tabindex': 5, 'placeholder': 'ex: XML, JSON, etc ...', 'disabled': true}),
                                            span({'class': 'help-block'}, 'Remember to set the Content-Type header.')
                                        )
                                    )
                                ),

                                li(
                                    div({'class': 'clearfix'},
                                        div({'class': 'input pairs'},
                                            ul({'class': 'unstyled query'},
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
            section({'id': 'headers', 'class': 'hidden'},
                header(
                    img({'src': 'images/minimize.png'}),
                    h2('Headers')
                ),

                form({
                    'name': 'headers',
                    'class': 'form-stacked',
                    'novalidate': true
                    },

                    div({'class': 'row'},
                        div({'class': 'span8'},
                            h3('Standard Headers'),

                            div({'class': 'clearfix hide'},
                                label({'for': 'date'}, 'Date'),
                                div({'class': 'input'},
                                    div({'class': 'input-prepend'},
                                        label({'class': 'add-on'}, input({'type': 'checkbox'})),
                                        input({'class': 'span7', 'type': 'text', 'name': 'Date', 'tabindex': 5, 'autocomplete': false, 'placeholder': 'ex: Tue, 15 Nov 1994 08:12:31 GMT', 'disabled': true})
                                    ),
                                    span({'class': 'help-block'}, 'The date and time that the message was sent')
                                )
                            ),

                            div({'class': 'clearfix hide'},
                                label({'for': 'origin'}, 'Origin'),
                                div({'class': 'input'},
                                    div({'class': 'input-prepend'},
                                        label({'class': 'add-on'}, input({'type': 'checkbox'})),
                                        input({'class': 'span7', 'type': 'text', 'name': 'Origin', 'tabindex': 5, 'autocomplete': false, 'placeholder': 'ex: chrome-extension', 'disabled': true})
                                    ),
                                    span({'class': 'help-block'}, '')
                                )
                            ),

                            div({'class': 'clearfix hide'},
                                label({'for': 'connection'}, 'Connection'),
                                div({'class': 'input'},
                                    div({'class': 'input-prepend'},
                                        label({'class': 'add-on'}, input({'type': 'checkbox'})),
                                        input({'class': 'span7', 'type': 'text', 'name': 'Connection', 'tabindex': 5, 'autocomplete': false, 'placeholder': 'ex: keep-alive', 'disabled': true})
                                    ),
                                    span({'class': 'help-block'}, 'What type of connection the user-agent would prefer')
                                )
                            ),

                            div({'class': 'clearfix hide'},
                                label({'for': 'expect'}, 'Expect'),

                                div({'class': 'input'},
                                    div({'class': 'input-prepend'},
                                        label({'class': 'add-on'}, input({'type': 'checkbox'})),
                                        input({'class': 'span7', 'type': 'text', 'name': 'Expect', 'tabindex': 5, 'autocomplete': false, 'placeholder': 'ex: 100-continue', 'disabled': true})
                                    ),
                                    span({'class': 'help-block'}, 'Indicates that particular server behaviors are by the client')
                                )
                            ),

                            div({'class': 'clearfix'},
                                label({'for': 'forwards'}, 'Max-Forwards'),

                                div({'class': 'input'},
                                    div({'class': 'input-prepend'},
                                        label({'class': 'add-on'}, input({'type': 'checkbox'})),
                                        input({'class': 'span7', 'type': 'text', 'name': 'Max-Forwards', 'tabindex': 5, 'autocomplete': false, 'placeholder': 'ex: 10', 'disabled': true})
                                    ),
                                    span({'class': 'help-block'}, 'Limit the number of times the message can be forwarded through proxies or gateways.')
                                )
                            ),

                            div({'class': 'clearfix'},
                                label({'for': 'range'}, 'Range'),

                                div({'class': 'input'},
                                    div({'class': 'input-prepend'},
                                        label({'class': 'add-on'}, input({'type': 'checkbox'})),
                                        input({'class': 'span7', 'type': 'text', 'name': 'Range', 'tabindex': 5, 'autocomplete': false, 'placeholder': 'ex: bytes=500-999', 'disabled': true})
                                    ),
                                    span({'class': 'help-block'}, 'Request only part of an entity. Bytes are numbered from 0.')
                                )
                            ),

                            div({'class': 'clearfix hide'},
                                label({'for': 'referer'}, 'Referer'),

                                div({'class': 'input'},
                                    div({'class': 'input-prepend'},
                                        label({'class': 'add-on'}, input({'type': 'checkbox'})),
                                        input({'class': 'span7', 'type': 'text', 'name': 'Referer', 'tabindex': 5, 'autocomplete': false, 'placeholder': 'ex: http://www.restconsole.com/', 'disabled': true})
                                    ),
                                    span({'class': 'help-block'}, 'This address of the previous web page from which a link to the currently requested page was followed.')
                                )
                            ),

                            div({'class': 'clearfix hide'},
                                label({'for': 'agent'}, 'User-Agent'),

                                div({'class': 'input'},
                                    div({'class': 'input-prepend'},
                                        label({'class': 'add-on'}, input({'type': 'checkbox'})),
                                        input({'class': 'span7', 'type': 'text', 'name': 'User-Agent', 'tabindex': 5, 'autocomplete': false, 'placeholder': 'ex: Mozilla/5.0 (compatible; MSIE 9.0; Windows NT 6.1; WOW64; Trident/5.0)', 'disabled': true})
                                    ),
                                    span({'class': 'help-block'}, 'The user agent string of the user agent.')
                                )
                            ),

                            div({'class': 'clearfix'},
                                label({'for': 'From'}, 'From'),

                                div({'class': 'input'},
                                    div({'class': 'input-prepend'},
                                        label({'class': 'add-on'}, input({'type': 'checkbox'})),
                                        input({'class': 'span7', 'type': 'text', 'name': 'From', 'tabindex': 5, 'autocomplete': false, 'placeholder': 'ex: user@example.com', 'disabled': true})
                                    ),
                                    span({'class': 'help-block'}, 'The email address of the user making the request.')
                                )
                            ),

                            div({'class': 'clearfix hide'},
                                label({'for': 'via'}, 'Via'),

                                div({'class': 'input'},
                                    div({'class': 'input-prepend'},
                                        label({'class': 'add-on'}, input({'type': 'checkbox'})),
                                        input({'class': 'span7', 'type': 'text', 'name': 'Via', 'tabindex': 5, 'autocomplete': false, 'placeholder': 'ex: 1.0 fred, 1.1 nowhere.com (Apache/1.1)', 'disabled': true})
                                    ),
                                    span({'class': 'help-block'}, 'Informs the server of proxies through which the request was sent.')
                                )
                            ),

                            div({'class': 'clearfix hide'},
                                label({'for': 'Proxy-Authorization'}, 'Proxy-Authorization'),

                                div({'class': 'input'},
                                    div({'class': 'input-prepend'},
                                        label({'class': 'add-on'}, input({'type': 'checkbox'})),
                                        input({'class': 'span7', 'type': 'text', 'name': 'Proxy-Authorization', 'tabindex': 5, 'autocomplete': false, 'placeholder': 'ex: Basic QWxhZGRpbjpvcGVuIHNlc2FtZQ==', 'disabled': true})
                                    ),
                                    span({'class': 'help-block'}, 'Authorization credentials for connecting to a proxy.')
                                )
                            ),

                            div({'class': 'clearfix hide'},
                                label({'for': 'TE'}, 'Transfer-Encoding'),

                                div({'class': 'input'},
                                    div({'class': 'input-prepend'},
                                        label({'class': 'add-on'}, input({'type': 'checkbox'})),
                                        input({'class': 'span7', 'type': 'text', 'name': 'TE', 'tabindex': 5, 'autocomplete': false, 'placeholder': 'ex: trailers, deflate', 'disabled': true})
                                    ),
                                    span({'class': 'help-block'}, 'The transfer encodings the user agent is willing to accept.')
                                )
                            ),

                            div({'class': 'clearfix hide'},
                                label({'for': 'Upgrade'}, 'Upgrade'),

                                div({'class': 'input'},
                                    div({'class': 'input-prepend'},
                                        label({'class': 'add-on'}, input({'type': 'checkbox'})),
                                        input({'class': 'span7', 'type': 'text', 'name': 'Upgrade', 'tabindex': 5, 'autocomplete': false, 'placeholder': 'ex: HTTP/2.0, SHTTP/1.3, IRC/6.9, RTA/x11', 'disabled': true})
                                    ),
                                    span({'class': 'help-block'}, 'Ask the server to upgrade to another protocol.')
                                )
                            ),

                            div({'class': 'clearfix'},
                                label({'for': 'Warning'}, 'Warning'),

                                div({'class': 'input'},
                                    div({'class': 'input-prepend'},
                                        label({'class': 'add-on'}, input({'type': 'checkbox'})),
                                        input({'class': 'span7', 'type': 'text', 'name': 'Warning', 'tabindex': 5, 'autocomplete': false, 'placeholder': 'ex: 199 Miscellaneous warning', 'disabled': true})
                                    ),
                                    span({'class': 'help-block'}, 'A general warning about possible problems with the entity body.')
                                )
                            ),

                            div({'class': 'clearfix'},
                                label({'for': 'pragma'}, 'Pragma'),

                                div({'class': 'input'},
                                    div({'class': 'input-prepend'},
                                        label({'class': 'add-on'}, input({'type': 'checkbox'})),
                                        input({'class': 'span7', 'type': 'text', 'name': 'Pragma', 'tabindex': 6, 'autocomplete': false, 'placeholder': 'ex: no-cache', 'disabled': true})
                                    ),
                                    span({'class': 'help-block'}, 'Implementation-specific headers that may have various effects anywhere along the request-response chain.')
                                )
                            )
                        ),

                        div({'class': 'span8'},
                            h3('Cache'),

                            div({'class': 'clearfix'},
                                label({'for': 'cache'}, 'Cache-Control'),

                                div({'class': 'input'},
                                    div({'class': 'input-prepend'},
                                        label({'class': 'add-on'}, input({'type': 'checkbox'})),
                                        input({'class': 'span7', 'type': 'text', 'name': 'Cache-Control', 'tabindex': 6, 'autocomplete': false, 'placeholder': 'ex: no-cache', 'disabled': true})
                                    ),
                                    span({'class': 'help-block'}, 'Used to specify directives that MUST be obeyed by all caching mechanisms along the request/response chain')
                                )
                            ),

                            div({'class': 'clearfix'},
                                label({'for': 'match'}, 'If-Match'),

                                div({'class': 'input'},
                                    div({'class': 'input-prepend'},
                                        label({'class': 'add-on'}, input({'type': 'checkbox'})),
                                        input({'class': 'span7', 'type': 'text', 'name': 'If-Match', 'tabindex': 6, 'autocomplete': false, 'placeholder': 'ex: 737060cd8c284d8af7ad3082f209582d', 'disabled': true})
                                    ),
                                    span({'class': 'help-block'}, 'Only perform the action if the client supplied entity matches the same entity on the server.')
                                )
                            ),

                            div({'class': 'clearfix'},
                                label({'for': 'url'}, 'If-None-Match'),

                                div({'class': 'input'},
                                    div({'class': 'input-prepend'},
                                        label({'class': 'add-on'}, input({'type': 'checkbox'})),
                                        input({'class': 'span7', 'type': 'text', 'name': 'If-None-Match', 'tabindex': 6, 'autocomplete': false, 'placeholder': 'ex: 737060cd8c284d8af7ad3082f209582d', 'disabled': true})
                                    ),
                                    span({'class': 'help-block'}, 'Allows a 304 Not Modified to be returned if content is unchanged')
                                )
                            ),

                            div({'class': 'clearfix'},
                                label({'for': 'url'}, 'If-Modified-Since'),

                                div({'class': 'input'},
                                    div({'class': 'input-prepend'},
                                        label({'class': 'add-on'}, input({'type': 'checkbox'})),
                                        input({'class': 'span7', 'type': 'text', 'name': 'If-Modified-Since', 'tabindex': 6, 'autocomplete': false, 'placeholder': 'ex: Sat, 29 Oct 1994 19:43:31 GMT', 'disabled': true})
                                    ),
                                    span({'class': 'help-block'}, 'Allows a 304 Not Modified to be returned if content is unchanged')
                                )
                            ),

                            div({'class': 'clearfix'},
                                label({'for': 'url'}, 'If-Unmodified-Since'),

                                div({'class': 'input'},
                                    div({'class': 'input-prepend'},
                                        label({'class': 'add-on'}, input({'type': 'checkbox'})),
                                        input({'class': 'span7', 'type': 'text', 'name': 'If-Unmodified-Since', 'tabindex': 6, 'autocomplete': false, 'placeholder': 'ex: Sat, 29 Oct 1994 19:43:31 GMT', 'disabled': true})
                                    ),
                                    span({'class': 'help-block'}, 'Only send the response if the entity has not been modified since a specific time.')
                                )
                            ),

                            div({'class': 'clearfix'},
                                label({'for': 'url'}, 'If-Range'),

                                div({'class': 'input'},
                                    div({'class': 'input-prepend'},
                                        label({'class': 'add-on'}, input({'type': 'checkbox'})),
                                        input({'class': 'span7', 'type': 'text', 'name': 'If-Range', 'tabindex': 6, 'autocomplete': false, 'placeholder': 'ex: 737060cd8c284d8af7ad3082f209582d', 'disabled': true})
                                    ),
                                    span({'class': 'help-block'}, 'If the entity is unchanged, send me the part(s) that I am missing; otherwise, send me the entire new entity')
                                )
                            ),

                            h3('Common non-standard request headers'),

                            div({'class': 'clearfix'},
                                label({'for': 'X-HTTP-Method-Override'}, 'X-HTTP-Method-Override'),

                                div({'class': 'input'},
                                    div({'class': 'input-prepend'},
                                        label({'class': 'add-on'}, input({'type': 'checkbox'})),
                                        input({'class': 'span7', 'type': 'text', 'name': 'X-HTTP-Method-Override', 'tabindex': 7, 'autocomplete': false, 'placeholder': 'ex: PUT', 'disabled': true})
                                    ),
                                    span({'class': 'help-block'}, 'mainly used bypass firewalls and browsers limitations.')
                                )
                            ),

                            div({'class': 'clearfix'},
                                label({'for': 'X-Requested-With'}, 'X-Requested-With'),

                                div({'class': 'input'},
                                    div({'class': 'input-prepend'},
                                        label({'class': 'add-on'}, input({'type': 'checkbox'})),
                                        input({'class': 'span7', 'type': 'text', 'name': 'X-Requested-With', 'tabindex': 7, 'autocomplete': false, 'placeholder': 'ex: XMLHttpRequest', 'disabled': true})
                                    ),
                                    span({'class': 'help-block'}, 'mainly used to identify Ajax requests.')
                                )
                            ),

                            div({'class': 'clearfix'},
                                label({'for': 'X-Do-Not-Track'}, 'X-Do-Not-Track'),

                                div({'class': 'input'},
                                    div({'class': 'input-prepend'},
                                        label({'class': 'add-on'}, input({'type': 'checkbox'})),
                                        input({'class': 'span7', 'type': 'text', 'name': 'X-Do-Not-Track', 'tabindex': 7, 'autocomplete': false, 'placeholder': 'ex: 1', 'disabled': true})
                                    ),
                                    span({'class': 'help-block'}, 'Requests a web application to disable their tracking of a user.')
                                )
                            ),

                            div({'class': 'clearfix'},
                                label({'for': 'DNT'}, 'DNT'),

                                div({'class': 'input'},
                                    div({'class': 'input-prepend'},
                                        label({'class': 'add-on'}, input({'type': 'checkbox'})),
                                        input({'class': 'span7', 'type': 'text', 'name': 'DNT', 'tabindex': 7, 'autocomplete': false, 'placeholder': 'ex: 1', 'disabled': true})
                                    ),
                                    span({'class': 'help-block'}, 'Requests a web application to disable their tracking of a user. (This is Mozilla\'s version of the X-Do-Not-Track header')
                                )
                            )
                        )
                    )
                )
            )
        }),

        'authorization': new Template(function(data) {
            section({'id': 'authorization', 'class': 'hidden'},
                header(
                    img({'src': 'images/minimize.png'}),
                    h2('Authorization')
                ),

                form({
                    'name': 'authorization',
                    'class': 'form-stacked',
                    'novalidate': true
                    },

                    div({'class': 'clearfix'},
                        div({'class': 'input row'},
                            div({'class': 'input-prepend span10'},
                                label({'class': 'add-on'}, input({'type': 'checkbox'})),
                                input({'class': 'span9', 'type': 'text', 'name': 'Authorization', 'tabindex': 7, 'autocomplete': true, 'placeholder': 'ex: Basic QWxhZGRpbjpvcGVuIHNlc2FtZQ=="', 'disabled': true})
                            ),

                            input({'class': 'span2 btn info', 'type': 'button', 'data-action': 'basic-auth', 'value': 'Basic'}),
                            input({'class': 'span2 btn info', 'type': 'button', 'data-action': 'basic-digest', 'value': 'Digest'}),
                            input({'class': 'span2 btn info', 'type': 'button', 'data-action': 'oauth-setup', 'value': 'oAuth'}),

                            span({'class': 'help-block'}, 'Authentication credentials for HTTP authentication.')
                        )
                    )
                )
            )
        }),

        'response': new Template(function(data) {
            section({'id': 'response', 'class': 'hidden'},
                header(
                    img({'src': 'images/minimize.png'}),
                    h2('Response')
                ),

                ul({'class': 'tabs'},
                    li({'class': 'active'}, a({'data-target': 'body'}, 'Response Body')),
                    li(a('RAW Body')),
                    li(a('Response Headers')),
                    li(a('Response Preview')),
                    li(a('Request Body')),
                    li(a('Request Headers')),
                    li(a('HTTP Archive (HAR)'))
                ),

                ul({'class': 'unstyled tabs-content'},
                    li({'class': 'active'}, pre({'id': 'body', 'class': 'prettyprint'})),
                    li(pre({'id': 'raw-body'})),
                    li(pre({'id': 'headers', 'class': 'prettyprint'})),
                    li(div({'id': 'preview'})),
                    li(pre({'id': 'request-body', 'class': 'prettyprint'})),
                    li(pre({'id': 'request-headers', 'class': 'prettyprint'})),
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

                    button({'data-action': 'submit', 'class': 'btn primary'}, 'Send'),
                    button({'data-action': 'get', 'class': 'btn'}, 'GET'),
                    button({'data-action': 'post', 'class': 'btn'}, 'POST'),
                    button({'data-action': 'put', 'class': 'btn'}, 'PUT'),
                    button({'data-action': 'delete', 'class': 'btn'}, 'DELETE'),

                    div({'class': 'pull-right'},
                        button({'data-action': 'save', 'class': 'btn success'}, 'Save Request'),
                        button({'data-action': 'stop', 'class': 'btn danger'}, 'Stop')
                    )
                )
            )
        })
    },

    'initialize': function() {
        var body = document.body;

        // render the body content
        body.adopt(this.renderTemplate('header'));
        body.adopt(this.renderTemplate('container'));
        body.adopt(this.renderTemplate('controls'));

        Object.each(this.datalists, function(datalist, id) {
            datalist.sort();
            body.adopt(this.renderTemplate('datalist', {'id': id, 'values': datalist}));
        }.bind(this));

        // enable smooth scrolling
        new Fx.SmoothScroll({
            'offset': {
                'y': -50
            },
            'links': '.topbar a[href^="#"]',
            'wheelStops': true
        });

        // setup autocomplete
        if ('options' in document.createElement('datalist') == false) {
            new AutoComplete();
        }
    },

    'send': function() {
        var data = {
            'main': {},
            'payload': {},
            'headers': {},
            'authorization': {}
        };

        var error = false;

        var forms = document.getElements('form[name="main"], form[name="payload"], form[name="authorization"], form[name="headers"]');

        forms.each(function(form) {
            data[form.get('name')] = {};

            var string = form.toQueryString();

            if (string != '') {
                data[form.get('name')] = string.parseQueryString()
            }
        });

        console.log(data);

        var options = {
            'url': data.main.uri,
            'query': {},
            'payload': {},
            'files': {},
            'headers': Object.merge({}, data.main, data.payload, data.authorization, data.headers),
            'async': true,
            'method': data.main.method,
            'link': 'ignore',
            'isSuccess': null,
            'emulation': false,
            'urlEncoded': false,
            'encoding': 'utf-8',
            'evalScripts': false,
            'evalResponse': false,
            'timeout': data.main.timeout * 1000,
            'noCache': false,

            'onRequest': function() {
                // replace buttons with animation
                //document.getElement('form[name="request"] .actions').addClass('progress');
            },

            'onProgress': function(event, xhr){
                //var loaded = event.loaded, total = event.total;
            },

            'onTimeout': function() {
                // TODO replace with notice
                Error('Error', 'Connection Timed-out');

                // remove loading animation
                //document.getElement('form[name="request"] .actions').removeClass('progress');
            },

            'onCancel': function() {
                //this.fireEvent('stop');
            }.bind(this),

            'onComplete': function() {
            }
        };

        // special condition for encoding
        if (options.headers['content-encoding'] != '') {
            options.headers['Content-Type'] = options.headers['Content-Type'] + '; charset=' + options.headers['content-encoding'];
        }

        // cleanup
        delete options.headers.uri;
        delete options.headers.method;
        delete options.headers.timeout;
        delete options.headers.key;
        delete options.headers.value;
        delete options.headers.raw;
        delete options.headers.name;
        delete options.headers.files;
        delete options.headers['content-encoding'];

        // set query string params
        Array.from(data.main.key).each(function(key, index) {
            if (key.length > 0) {
                options.query[key] = Array.from(data.main.value)[index];
            }
        });

        // set payload params
        Array.from(data.payload.key).each(function(key, index) {
            if (key.length > 0) {
                options.payload[key] = Array.from(data.payload.value)[index];
            }
        });

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


        console.log(options);

        if (error) {
            // stop on error
            return false;
        } else {
            if (options.files.length) {
                //delete options.headers['Content-Type'];
            }

            window.XHR = new Request(options).send();

            return;

            var options = {
                'url': request.uri,
                'method': request.method,
                'encoding': request.encoding,
                'timeout': request.timeout * 1000,
                'raw': request.raw,
                'data': request.data,
                'files': this.getElement('input[name="files"]').files,
                'file_key': request.file_key,
                'headers': headers,

                'onRequest': function() {
                    // replace buttons with animation
                    document.getElement('form[name="request"] .actions').addClass('progress');
                },

                'onProgress': function(event, xhr){
                    //var loaded = event.loaded, total = event.total;
                },

                'onTimeout': function() {
                    // TODO replace with notice
                    Error('Error', 'Connection Timed-out');

                    // remove loading animation
                    document.getElement('form[name="request"] .actions').removeClass('progress');
                },

                'onCancel': function() {
                    this.fireEvent('stop');
                }.bind(this),

                'onComplete': function() {
                    // for non-success
                    var responseText = this.xhr.responseText;
                    var responseXML = this.xhr.responseXML;

                    // rest response fields
                    //document.id('har').empty();
                    document.id('rawBody').empty().set('class');
                    document.id('responseBody').empty().set('class', 'prettyprint');
                    document.id('responseHeaders').empty().set('class', 'prettyprint');
                    document.id('responsePreview').empty();
                    document.id('requestBody').empty().set('class', 'prettyprint');
                    document.id('requestHeaders').empty().set('class', 'prettyprint');

                    // trigger show/hide line numbers
                    document.getElement('form[name="options"] input[name="lines"]').fireEvent('change');

                    if (this.xhr.status == 0) {
                        Error('Connection Failed!', 'Check your connectivity and try again');

                        document.getElement('form[name="request"]').fireEvent('stop');
                    } else {
                        // construct request text
                        var requestText = 'Request Url: {0}\nRequest Method: {1}\nStatus Code: {2}\n'.substitute([this.options.url, this.options.method, this.xhr.status]);

                        // uploaded files?
                        if (this.options.files.length > 0) {
                            requestText += 'Files: {0}\n'.substitute([beautify.js(JSON.encode(this.options.files))]);
                        }

                        // data
                        if (this.options.data != '') {
                            switch (typeOf(this.options.data)) {
                                case 'string':
                                    requestText += 'Params: ' + this.options.data;
                                    break;

                                case 'object':
                                    requestText += 'Params: ' + beautify.js(JSON.encode(this.options.data));
                                    break;
                            }
                        }

                        var requestHeaders = '';

                        Object.each(this.options.headers, function(value, key) {
                            requestHeaders += key + ': ' + value + "\n";
                        });

                        var defaultHeaders = {
                            'Accept': '*/\*',
                            //'Accept-Charset': 'ISO-8859-1,utf-8;q=0.7,*;q=0.3',
                            //'Accept-Encoding': 'gzip,deflate,sdch',
                            //'Accept-Language': 'en-US,en;q=0.8',
                            'Connection': 'keep-alive',
                            //'Content-Length': '34',
                            'Content-Type': 'application/xml',
                            //'Cookie': '__qca=P0-2074128619-1316995740016; __utma=71985868.1147819601.1316995740.1317068965.1317073948.4; __utmc=71985868; __utmz=71985868.1316995740.1.1.utmcsr=(direct)|utmccn=(direct)|utmcmd=(none)',
                            //'Host': 'www.codeinchaos.com',
                            'Origin': 'chrome-extension: //rest-console-id',
                            'User-Agent': navigator.userAgent
                        };

                        Object.each(defaultHeaders, function(value, key) {
                            if (this.options.headers[key] == undefined) {
                                requestHeaders += key + ': ' + value + "\n";
                            }
                        }.bind(this));

                        var responseHeaders = 'Status Code: {0}\n{1}'.substitute([this.xhr.status, this.xhr.getAllResponseHeaders()]);

                        // setup response area
                        document.id('rawBody').set('text', responseText)
                        document.id('responseBody').set('text', responseText);
                        document.id('responseHeaders').set('text', responseHeaders).store('unstyled', responseHeaders);
                        document.id('requestBody').set('text', requestText).store('unstyled', requestText);
                        document.id('requestHeaders').set('text', requestHeaders).store('unstyled', requestHeaders);

                        // extract content type
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

                                responseText = beautify.css(responseText);
                                document.id('responseBody').set('text', responseText);
                                break;

                            case 'application/ecmascript':
                            case 'application/javascript':
                            case 'application/json':
                                style = 'js';

                                responseText = beautify.js(responseText);
                                document.id('responseBody').set('text', responseText);
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

                                var declaration = responseText.match(/^(\s*)(<\?xml.+?\?>)/i);

                                responseText = declaration[2] + "\n" + beautify.xml(responseXML).firstChild.nodeValue;

                                document.id('responseBody').set('text', responseText);
                                break;

                            case 'text/html':
                            case 'application/xhtml+xml':
                                style = 'html';

                                document.id('responseBody').set('text', responseText);
                                document.getElement('input[name="highlight"][value="html"]').fireEvent('click');

                                // create and inject the iframe object
                                var iframe = new IFrame();
                                document.id('responsePreview').adopt(iframe);

                                // start writing
                                var doc = iframe.contentWindow.document;
                                doc.open();
                                doc.write(responseText);
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

                        // store the text for later use
                        document.id('responseBody').store('unstyled', responseText);

                        // trigger syntax highlighting
                        document.getElement('input[name="highlight"][value="' + style + '"]').fireEvent('click');

                        // scroll to the response area
                        document.getElement('a[href="#response"]').fireEvent('click', new DOMEvent());

                        // remove loading animation
                        document.getElement('form[name="request"] .actions').removeClass('progress');
                    }
                }
            };

        }
    },
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

    // clicks within the response body
    document.id('responseBody').addEvent('click:relay(a[href])', function(event) {
        event.preventDefault();

        document.getElement('input[name="uri"]').set('value', this.get('href'));
        document.getElement('input[name="method"]').set('value', 'GET');
        document.getElement('form[name="request"]').fireEvent('submit', new DOMEvent);
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
