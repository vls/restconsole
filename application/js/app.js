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

var App = new Class({
    'Implements': [Events, Mooml.Templates],

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
    ],

    'templates': {
        'header': new Template(function(data) {
            div({'class': 'topbar'},
                div({'class': 'fill'},
                    div({'class': 'container-fluid'},
                        div({'class': 'brand'},
                            img({'src': 'images/logo/32.png', 'align': 'left'}),
                            'REST Console small',
                            small('version 4.1.0')
                        ),

                        ul({'class': 'nav'},
                            li(a({'href': '#options', 'scroll': true}, span('O'), 'ptions')),
                            li(a({'href': '#target', 'scroll': true}, span('T'), 'arget')),
                            li(a({'href': '#body', 'scroll': true}, span('B'), 'ody')),
                            li(a({'href': '#authorization', 'scroll': true}, span('A'), 'uthorization')),
                            li(a({'href': '#headers', 'scroll': true}, span('H'), 'eaders')),
                            li(a({'href': '#response', 'scroll': true}, span('R'), 'esponse'))
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
            div({'class': 'sidebar'},
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
                )
            )
        }),

        'content': new Template(function(data) {
            div({'class': 'content'},
                this.renderTemplate('options')
            )
        }),

        'options': new Template(function(data) {
            div({'class': 'page', 'id': 'options'},
                div({'class': 'page-header'},
                    h1('Options'),
                    a({'href': '#', 'class': 'minimize'}, img({'src': 'images/minimize.png'}))
                ),

                section(
                    form({
                        'class': 'form-stacked',
                        'novalidate': true
                        },

                        div({'class': 'row'},
                            div({'class': 'span8'},
                                fieldset(
                                    legend('General'),

                                    div({'class': 'clearfix'},
                                        label(
                                            input({'type': 'checkbox', 'name': 'help'}),
                                            span('Hide Help Lines')
                                        )
                                    )
                                )
                            ),

                            div({'class': 'span8'},
                                fieldset(
                                    legend('Syntax Highlighting'),

                                    div({'class': 'clearfix'},
                                        label(
                                            input({'type': 'checkbox', 'name': 'lines'}),
                                            span('Hide Line Numbers')
                                        ),

                                        span({'class': 'help-block'}, 'Results are not immediate, will affect next request.')
                                    ),

                                    div({'class': 'clearfix'},
                                        label({'for': 'theme'}, 'Color Theme'),
                                        span({'class': 'help-block'}, 'Syntax highlighting default color theme'),

                                        div({'class': 'row'},
                                            div({'class': 'span2'},
                                                label(
                                                    input({'type': 'radio', 'name': 'theme', 'value': 'default'}),
                                                    span('Default')
                                                )
                                            ),

                                            div({'class': 'span2'},
                                                label(
                                                    input({'type': 'radio', 'name': 'theme', 'value': 'bootstrap', 'checked': true}),
                                                    span('Bootstrap')
                                                )
                                            ),

                                            div({'class': 'span2'},
                                                label(
                                                    input({'type': 'radio', 'name': 'theme', 'value': 'desert'}),
                                                    span('Desert')
                                                )
                                            )
                                        ),

                                        div({'class': 'row'},
                                            div({'class': 'span2'},
                                                label(
                                                    input({'type': 'radio', 'name': 'theme', 'value': 'sunburst'}),
                                                    span('Sunburst')
                                                )
                                            ),

                                            div({'class': 'span3'},
                                                label(
                                                    input({'type': 'radio', 'name': 'theme', 'value': 'sons-of-obsidian'}),
                                                    span('Sons of Obsidian')
                                                )
                                            )
                                        )
                                    )
                                )
                            )
                        ),

                        div({'class': 'actions'},
                            input({'type': 'submit', 'data-action': 'submit', 'class': 'btn success', 'value': 'Save'}),
                            input({'type': 'reset', 'data-action': 'reset', 'class': 'btn danger', 'value': 'Reset'})
                        )
                    )
                )
            )
        }),

        'datalist': new Template(function(data) {
            datalist({'id': data.id}, this.renderTemplate('option', data.values))
        }),

        'option': new Template(function(data) {
            data = Array.from(data);
            option({'value': data[0]}, [data[1], data[0]].pick())
        })
    },

    initialize: function() {
        document.body.adopt(this.renderTemplate('header'));
        document.body.adopt(this.renderTemplate('container'));
    }
});

// error messages
Error = function(title, text, element) {
    var messages = document.getElement('.messages').removeClass('hide');
    var message = messages.getElement('.alert-message.error').removeClass('hide');
    message.getElement('p').set('html', '<strong>{0}</strong> {1}'.substitute([title, text]));
    message.getElement('a').fireEvent('click', event, 3000);

    if (element) {
        element.getParent('.clearfix').addClass('error');
    }
};

// add events
window.addEvent('domready', function() {
    return;
    // enable smooth scrolling
    new Fx.SmoothScroll({
        'offset': { 'y': -50 },
        'links': 'a[scroll][href^="#"]',
        'wheelStops': true
    });

    // special scroll listener for the request form actions bar
    window.addEvent('scroll', function(event) {
        var scroll = window.getSize().y + window.getScroll().y;
        var form = document.getElement('form[name="request"]');
        var coordinates = form.getCoordinates();

        var element = form.getElement('.actions');

        if (scroll - 200 <= coordinates.top || scroll >= coordinates.bottom) {
            element.removeClass('fixed');
        } else {
            element.addClass('fixed');
        }
    });

    // sections
    document.getElements('a.minimize').addEvent('click', function(event) {
        event.preventDefault();

        var section = this.getParent('.page').getElement('section');

        if (section.isDisplayed()) {
            section.hide();
        } else {
            section.show();
        }
    });

    // setup autocomplete
    if ('options' in document.createElement('datalist') == false) {
        new AutoComplete();
    }

    // pills actions
    document.getElements('ul.pills li a').addEvent('click', function(event) {
        event.preventDefault();

        var ul = this.getParent('ul');

        ul.getElements('.active').removeClass('active');
        this.getParent().addClass('active');

        // hide all then show the selected one
        ul.getNext('ul').getElements(' > li').addClass('hide');
        ul.getNext('ul').getElement(this.get('href')).getParent().removeClass('hide');

        _gaq.push(['_trackEvent', this.get('text'), 'clicked']);
    });

    // remove errors
    document.addEvent('blur:relay(.error)', function(event) {
        this.removeClass('error');
    });

    // show/hide help blocks
    document.getElement('form[name="options"] input[name="help"]').addEvent('change', function(event) {
        if (this.get('checked')) {
            document.getElements('.help-block').addClass('hide');
        } else {
            document.getElements('.help-block').removeClass('hide');
        }
    });

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

    // options form
    document.getElement('form[name="options"]').addEvents({
        'click:relay(input[type="button"], input[type="submit"], input[type="reset"])': function(event) {
            event.preventDefault();

            this.getParent('form').fireEvent(this.dataset.action, event);
        },

        'submit': function(event) {
            var data = this.toQueryString().parseQueryString();
            localStorage.setItem('options', JSON.encode(data));
        },

        'reset': function(event) {
            var defaults = JSON.decode(localStorage.getItem('options'));

            Object.each(defaults, function(value, key) {
                var input = document.getElement('input[name="{0}"]:not([type="radio"]), input[type="radio"][name="{0}"][value="{1}"]'.substitute([key, value]));

                switch (input.get('type')) {
                    case 'checkbox':
                        input.set('checked', value == 'on' ? true : false).fireEvent('change');
                        break;

                    case 'radio':
                        input.set('checked', true).fireEvent('change');
                        break;
                }
            });
        }
    }).fireEvent('reset', new DOMEvent);

    // messages close action
    document.getElements('.messages .alert-message a.close').addEvent('click', function(event) {
        event.preventDefault();

        this.getParent('.messages').addClass('hide').getElements('.alert-message').addClass('hide');
    });

    // modals backdrop action
    document.getElements('.modals .modal-backdrop').addEvent('click', function(event) {
        this.getParent('.modals').addClass('hide').getElements('.modal').addClass('hide');
    });

    // modals close action
    document.getElements('.modals .modal-header a.close').addEvent('click', function(event) {
        event.preventDefault();

        this.getParent('.modals').getElement('.modal-backdrop').fireEvent('click');
    });

    // field checkboxes
    document.getElements('div.input-prepend > label.add-on > input[type="checkbox"]').addEvent('change', function(event) {
        this.getParent('div.input-prepend > input, div.input-prepend > textarea').set('disabled', !this.get('checked'));
    }).fireEvent('change');

    // headers & params
    document.getElements('ul.params, ul.headers').addEvents({
        'click:relay(.btn.success)': function(event) {
            event.preventDefault();

            row = this.getParent().clone();
            this.getParent().grab(row, 'before');
            row.getElements('input').set('disabled', false)[0].focus();
        },

        'click:relay(.btn.danger)': function(event) {
            event.preventDefault();

            this.getParent().dispose();
        }
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

    document.id('responseBody').addEvent('click:relay(a[href])', function(event) {
        event.preventDefault();

        document.getElement('input[name="uri"]').set('value', this.get('href'));
        document.getElement('input[name="method"]').set('value', 'GET');
        document.getElement('form[name="request"]').fireEvent('submit', new DOMEvent);
    });

    document.getElement('form[name="request"] input[name="uri"]').addEvent('change', function(event) {
        if (this.get('value').length > 0 && this.get('value').substr(0, 4) != 'http') {
            this.set('value', 'http://' + this.get('value'));
        }
    });

    // request form actions
    document.getElement('form[name="request"]').addEvents({
        'click:relay(input[type="button"], input[type="submit"], input[type="reset"])': function(event) {
            event.preventDefault();

            if (this.dataset.action) {
                this.getParent('form').fireEvent(this.dataset.action, event);

                _gaq.push(['_trackEvent', 'Request Form', this.dataset.action]);
            }
        },

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

        'submit': function(event) {
            event.preventDefault();

            var error = false;

            // get all form data
            var request = this.toQueryString().parseQueryString();

            // extract the headers
            var headers = Object.clone(request);

            // delete none headers
            delete headers.uri;
            delete headers.method;
            delete headers.timeout;
            delete headers.raw;
            delete headers.encoding;
            delete headers.key;
            delete headers.value;
            delete headers.file_key;

            // unsecure headers:
            var unsafe = [
                'accept-charset',
                'accept-encoding',
                'content-length',
                'cookie',
                'date',
                'connection',
                'expect',
                'referer',
                'user-agent',
                'via',
                'proxy-authorization',
                'te',
                'upgrade'
            ];

            // get custom fields
            var custom = {
                'headers': {
                    'keys': this.getElements('ul.headers input[name="key"]').get('value'),
                    'values': this.getElements('ul.headers input[name="value"]').get('value')
                },

                'data': {
                    'keys': this.getElements('ul.params input[name="key"]').get('value'),
                    'values': this.getElements('ul.params input[name="value"]').get('value')
                }
            }

            // init variables
            request.data = {};

            // set custom params data
            custom.data.keys.each(function(key, index) {
                if (key.length > 0) {
                    request.data[key] = custom.data.values[index];
                }
            });

            // validate headers
            custom.headers.keys.each(function(key, index) {
                if (unsafe.contains(key.toLowerCase())) {
                    Error('Unsafe Header', 'Refused to set unsafe header "' + key +'"', this.getElement('ul.headers input[name="key"]:nth-of-type(' + (index + 1) + ')'));
                    error = true;
                } else if (key.length > 0) {
                    headers[key] = custom.headers.values[index];
                }
            }.bind(this));

            // check for required fields
            this.getElements('*[required]').each(function(element) {
                if (element.get('value').length == 0) {
                    Error('Missing Data', 'Please Fill out all the required fields', element);
                    error = true;
                }
            });

            if (error) {
                // stop on error
                return false;
            } else {
                // special condition for encoding
                if (request.encoding) {
                    request['Content-Type'] = request['Content-Type'] + '; charset=' + request.encoding;
                }

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

                // don't force the content-type header
                if (options.files.length > 0) {
                    delete options.headers['Content-Type'];
                }

                window.XHR = new RESTRequest(options).send();
            }
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
