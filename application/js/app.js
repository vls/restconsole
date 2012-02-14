window.URL = window.webkitURL || window.URL;
window.BlobBuilder = window.BlobBuilder || window.WebKitBlobBuilder || window.MozBlobBuilder;

// add support for native events
Element.NativeEvents.webkitTransitionEnd = 2;

/**
 * Main App logic
 */
var App = new Class({
    'Implements': [Events],

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
            ['he', 'Hebrew'],
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

    // presets
    'presets': [{
        'name': 'Twitter',
        'resources': [
            {
                'name': 'Public Timeline',
                'request': {
                    'method': 'GET',
                    'url': 'http://api.twitter.com/1/statuses/public_timeline.json',
                    'headers': [],
                    'queryString': [],
                    'postData': {
                        'mimeType': null,
                        'params': [{
                            'name': 'paramName',
                            'value': 'paramValue',
                        }],
                        'text' : null
                    }
                }
            }
        ]
    }],

    'events': {
        'change:relay(*[data-storage])': function(event) {
            window.RESTConsole.saveValues();
        },

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

    'resizeEvent': function(event) {
        var sidebar = document.getElement('.sidebar');

        document.getElement('.container-fluid.main').setStyle('height', window.getHeight() - 100);
        sidebar.setStyles({
            'width': sidebar.getParent().getWidth() - 20,
            'height': window.getHeight() - 140
        });
        document.getElement('#response').setStyle('min-height', window.getHeight() - 140);
        document.getElements('#response pre, #preview').setStyle('height', window.getHeight() - 298);
    },

    'signOAuth': function() {
        var oauth = document.getElement('.tab-pane.oauth').toObject();
        var data = new Storage('defaults').data;

        // start oauth
        var accessor = {
            'consumerKey': oauth.consumer_key,
            'consumerSecret': oauth.consumer_secret
        };

        var message = {
            'action': data.url,
            'method': data.method,
            'parameters': [
                ['oauth_version', oauth.version],
                ['oauth_signature_method', oauth.signature]
            ]
        };

        // optional params
        if (oauth.token_key) {
            accessor.token = oauth.token_key;
        }

        if (oauth.token_secret) {
            accessor.tokenSecret = oauth.token_secret;
        }

        if (oauth.scope) {
            message.parameters.push(['scope', oauth.scope]);
        }

        if (oauth.oauth_verifier) {
            message.parameters.push(['oauth_verifier', oauth.oauth_verifier]);
        }

        // queryString
        data.queryString.each(function(param) {
            message.parameters.push([param.name, param.value]);
        });

        // payload body
        var contentType = document.getElement('input[name="Content-Type"]')
        if (!contentType.get('disabled') && contentType.get('value') == 'application/x-www-form-urlencoded' && data.postData.text.length) {
            Object.each(data.postData.text.parseQueryString(), function(value, key) {
                message.parameters.push([key, value]);
            });
        };

        // sign
        OAuth.completeRequest(message, accessor);

        // debug
        new Console().log('OAuth Base String: ', OAuth.SignatureMethod.getBaseString(message));

        return {
            'header': OAuth.getAuthorizationHeader(data.realm, message.parameters),
            'query': OAuth.formEncode(OAuth.getParameterList(message.parameters))
        }

    },

    'initialize': function() {
        var debug = new Console();

        debug.groupStart('REST Console: Initializing');

        // set google analytics info
        window._gaq = [['_setAccount','UA-598217-26'],['_trackPageview'],['_trackPageLoadTime']];

        // render the body
        debug.group('rendering body');

        var body = document.body.empty();

        body.adopt(Mooml.render('body'));

        // add the datalists
        debug.group('loading datalists');
        Object.each(this.datalists, function(datalist, id) {
            datalist.sort();
            body.adopt(Mooml.renderTemplate('datalist', {'id': id, 'values': datalist}));
        }.bind(this));

        // load history
        debug.group('loading history');
        document.getElement('.nav-list.history').adopt(Mooml.renderTemplate('history-item', new History().getAll())).fireEvent('change');

        // assign global events
        debug.group('attaching events');
        document.addEvents(this.events);

        // fix sizing
        window.addEvent('resize', this.resizeEvent).fireEvent('resize');

        // setup autocomplete
        if ('options' in document.createElement('datalist') == false) {
            debug.group('setting up autocomplete');
            new AutoComplete();
        }

        this.initInterface(defaults);

        // load default values
        var defaults = new Storage('defaults');

        if (Object.getLength(defaults.data) == 0) {
            debug.group('first run, starting with empty object');

            // create empty defaults object
            localStorage.setItem('defaults', JSON.encode(new HAR.Request().toObject()));

            // reload
            defaults = new Storage('defaults');
        }

        debug.groupEnd();

        this.resetValues(defaults.data);

        this.checkOnlineStatus(this);
    },

    'checkOnlineStatus': function() {
        var debug = new Console();

        debug.groupStart('REST Console: Checking online Status');

        if (window.navigator.onLine) {
            debug.group('online :)');
            document.body.adopt(Mooml.renderTemplate('scripts'));
            document.getElement('.social').adopt(Mooml.renderTemplate('social'));

            // don't want to tab to iframes
            this.clearTabIndex.delay(3000);
        } else {
            debug.group('offline :(');
            window.RESTConsole.checkOnlineStatus.delay(5000, this);
        }

        debug.groupEnd();
    },

    'clearTabIndex': function() {
        document.getElements('iframe').set('tabindex', '-1');
        document.getElements('.IN-widget a').set('tabindex', '-1');
    },

    'saveValues': function() {
        new Console().log('Saving ...');

        var form = document.getElement('form[name="main"]');

        // init data object
        var data = {
            'url': form.getElement('[name="url"]').get('value'),
            'method': form.getElement('[name="method"]').get('value'),
            'authorization': {},
            'extra': {},
        };

        // construct extras array
        form.getElements('[data-storage="extra"]').each(function(field) {
            if (!field.get('disabled')) {
                data.extra[field.get('name')] = field.get('value');
            }
        });

        form.getElements('[data-storage="authorization"]').each(function(field) {
            if (!field.get('disabled')) {
                data.authorization[field.get('name')] = field.get('value');
            }
        });

        // init HAR.Request
        var request = new HAR.Request(data);

        // post text
        request.addPostText(form.getElement('[data-storage="post-text"]').get('value'));

        // headers
        form.getElements('[data-storage="header"]').each(function(header) {
            if (!header.get('disabled')) {
                request.addHeader(header.get('name'), header.get('value'));
            }
        });

        // custom headers
        var headers = {
            'keys': form.getElements('[data-storage="headerCollection"][name="key"]').get('value'),
            'values': form.getElements('[data-storage="headerCollection"][name="value"]').get('value')
        };

        headers.keys.each(function(key, index) {
            if (key != '') {
                request.addHeader(key, headers.values[index]);
            }
        });

        // query string data
        var query = {
            'keys': form.getElements('[data-storage="queryString"][name="key"]').get('value'),
            'values': form.getElements('[data-storage="queryString"][name="value"]').get('value')
        };

        query.keys.each(function(key, index) {
            if (key != '') {
                request.addQueryParam(key, query.values[index]);
            }
        });

        localStorage.setItem('defaults', JSON.stringify(request.toObject()));
    },

    'resetValues': function(defaults) {
        var debug = new Console();

        debug.groupStart('REST Console: Loading Defaults ...');

        // main fields
        debug.group('main fields');
        document.getElement('input[name="url"]').set('value', defaults.url).fireEvent('change');
        document.getElement('input[name="method"]').set('value', defaults.method).fireEvent('change');
        document.getElement('textarea[name="payload"]').set('value', defaults.postData.text).fireEvent('change');

        // query string params
        debug.group('query string');
        defaults.queryString.each(function(param) {
            document.getElement('.pairs.query .controls').fireEvent('addRow', param)
        });

        // headers
        debug.group('headers');
        defaults.headers.each(function(header) {
            var input = document.getElement('[data-storage="header"][name="' + header.name + '"]');

            if (input) {
                var container = input.set('value', header.value).getParent('.input-prepend');

                if (container) {
                    container.getElement('input[type="checkbox"]').set('checked', true).fireEvent('change');
                }

                input.fireEvent('change')
            } else {
                document.getElement('.pairs.headers .controls').fireEvent('addRow', header)
            }
        });

        // authorization
        debug.group('authorization fields');
        Object.each(defaults.authorization, function(value, name) {
            var input = document.getElement('[data-storage="authorization"][name="' + name + '"]');

            if (input) {
                var container = input.set('value', value).getParent('.input-prepend');

                if (container) {
                    container.getElement('input[type="checkbox"]').set('checked', true).fireEvent('change');
                }

                input.fireEvent('change')
            }
        });

        // extra
        debug.group('extras');
        Object.each(defaults.extra, function(value, name) {
            var input = document.getElement('[data-storage="extra"][name="' + name + '"]');

            if (input) {
                var container = input.set('value', value).getParent('.input-prepend');

                if (container) {
                    container.getElement('input[type="checkbox"]').set('checked', true).fireEvent('change');
                }

                input.fireEvent('change');
            }
        });

        debug.groupEnd();

        // focus on method field
        document.getElement('input[name="method"]').focus();
    },

    'initInterface': function() {
        var debug = new Console();

        debug.groupStart('Loading Interface Defaults ...');

        var tabs        = new Storage('tabs');
        var sections    = new Storage('sections');

        // sections
        debug.group('sections');
        document.getElements('section').each(function(section) {
            var data = sections.get(section.get('id'));

            if (data != null) {
                if (data == false) {
                    section.addClass('minimize');
                } else {
                    section.removeClass('minimize');
                }
            }
        });

        // tabs
        debug.group('tabs');
        document.getElements('.tabbable .nav-tabs').each(function(tab) {
            var index = tabs.get(tab.getParent('.tabbable').dataset.name);

            var link = tab.getElement('li:nth-of-type({0}) a'.substitute([index + 1]));

            document.fireEvent('click', new FakeEvent(link));

            tab.fireEvent('click', new FakeEvent(link));
        });

        debug.groupEnd();
    },

    'setProgress': function(progress) {
        document.getElement('.progress .bar').setStyle('width', progress + '%');
    },

    'send': function() {
        var error = false;

        // check for required fields
        document.getElements('*[required]').each(function(element) {
            if (!error && !element.get('disabled') && element.get('value').length == 0) {
                element.focus();
                new Console().log('Missing ' + element.get('name'));
                new Alert('danger', 'Missing Data', 'Please Fill out all the required fields');
                error = true;
            }
        });

        if (!error) {
            var data = new Storage('defaults').data;

            // check for authorization data
            switch (true) {
                case (data.authorization.consumer_key  != undefined && data.authorization.consumer_secret  != undefined):
                    var oauth = this.signOAuth();

                    if (data.authorization.method == 'header') {
                        data.headers.push({
                            'name': 'Authorization',
                            'value': oauth.header
                        });
                    } else {
                        Object.each(oauth.query.parseQueryString(), function(value, name) {
                            data.queryString.push({
                                'name': name,
                                'value': value
                            })
                        });
                    }
                    break;

                case (data.authorization['basic-username'] != undefined):
                    var header = data.authorization['basic-username'] + ':';

                    if (data.authorization['basic-password'] != undefined) {
                        header += data.authorization['basic-password'];
                    }

                     data.headers.push({
                        'name': 'Authorization',
                        'value': 'Basic ' + btoa(header)
                    });
                    break;
            }

            // set mimeType
            var contentType = document.getElement('input[name="Content-Type"]');

            if (!contentType.get('disabled')) {
                data.postData.mimeType = contentType.get('value').split(';')[0];
            }

            // store into history
            if (new History().add(data)) {
                document.getElement('.nav-list.history').adopt(Mooml.renderTemplate('history-item', data)).fireEvent('change');
            }

            var options = {
                'url': data.url,
                'query': {},
                'payload': '',
                'files': [],
                'headers': {},
                'async': true,
                'method': data.method,
                'link': 'ignore',
                'isSuccess': null,
                'emulation': false,
                'evalScripts': false,
                'evalResponse': false,
                'timeout': data.extra.timeout * 1000,

                'onRequest': function() {
                    // replace buttons with animation
                    document.getElement('footer').addClass('active');

                    // scroll to the response area
                    document.fireEvent('click', new FakeEvent(document.getElement('a[href="#response"]')));

                    // set progress
                    window.RESTConsole.setProgress(10);
                },

                'onProgress': function(event, xhr) {
                    if (event.lengthComputable) {
                        window.RESTConsole.setProgress((event.loaded / event.total) * 100);
                    } else {
                        window.RESTConsole.setProgress(50);
                    }
                },

                'onTimeout': function() {
                    window.XHR.cancel();

                    new Alert('danger', 'Connection Timed-out', '');
                },

                'onCancel': function() {
                    // remove loading animation
                    document.getElement('footer').removeClass('active');
                }.bind(this),

                'onComplete': this.processResponse
            };

            // queryString
            data.queryString.each(function(param) {
                options.query[param.name] = param.value;
            });

            // headers
            data.headers.each(function(header) {
                options.headers[header.name] = header.value;
            });

            // set payload
            if (options.headers['Content-Type'] == 'application/x-www-form-urlencoded') {
                options.payload = (data.postData.text.length) ? data.postData.text.parseQueryString() : {};
            } else {
                options.payload = data.postData.text;
            };

            // modify Content-Type header based on encoding charset
            // TODO: shouldn't this be done as a rule in the REQUEST object?
            if (data.extra['content-encoding']) {
                options.encoding = data.extra['content-encoding'],
                options.headers['Content-Type'] = options.headers['Content-Type'] + '; charset=' + options.encoding;
            }

            // files
            document.getElements('.input-append:not(:last-of-type) input[type="file"]').each(function(input) {
                var key = input.getPrevious('input[name="key"]').get('value');

                if (key != '') {
                    input.files[0].key = key;
                }

                options.files.push(input.files);
            });

            // clear response area
            document.getElements('#preview, pre.har code, pre.request code, pre.response code').each(function(code) {
                code.empty();
            });

            if (error) {
                // stop on error
                return false;
            } else {
                window.XHR = new Request(options).send();
            }
        }
    },

    'processResponse': function() {
        window.RESTConsole.setProgress(75);

        var xhr = Object.clone(this.xhr);

        var mimeType = this.xhr.getResponseHeader('Content-Type');

        if (mimeType) {
            mimeType = mimeType.split(';')[0];
        }

        if (['image/gif', 'image/png', 'image/jpeg'].contains(mimeType)) {
            var binary = true;

            var byteArray = new Uint8Array(xhr.responseText.length);

            for (var i = 0; i < xhr.responseText.length; i++) {
                byteArray[i] = xhr.responseText.charCodeAt(i) & 0xff;
            }
        }

        // get history
        var history = new History();
        var request = history.getLast();

        // construct HAR objects
        var response = new HAR.Response();
        response.fromXHR(this.xhr);

        if (binary) {
            response.setContentText(uint8ToString(byteArray));
            response.encode('base64');
        }

        var har = new HAR.Log();
        var harResponse = response.toObject();

        har.addEntry(new HAR.Entry({
            'request': request,
            'response': harResponse
        }).toObject());

        request.url = request.url.parseUrl();

        request.queryString = request.queryString.toQueryString();

        // beautify
        var prettify = {
            'request': false,
            'response': false
        };

        // process request
        switch (request.postData.mimeType) {
            case 'text/css':
                prettify.request = 'css';

                request.postData.text = css_beautify(request.postData.text, {
                    'indent_size': 1,
                    'indent_char': '\t'
                });
                break;

            case 'application/json':
            case 'application/ecmascript':
            case 'application/javascript':
                prettify.request = 'js';

                request.postData.text = js_beautify(request.postData.text, {
                    'indent_size': 1,
                    'indent_char': '\t'
                });
                break;

            case 'text/xml':
            case 'image/svg+xml':
            case 'application/xml':
            case 'application/rdf+xml':
            case 'application/rss+xml':
            case 'application/beep+xml':
            case 'application/atom+xml':
            case 'application/xspf+xml':
            case 'application/atomcat+xml':
            case 'application/atomserv+xml':
            case 'application/davmount+xml':
            case 'application/docbook+xml':
            case 'application/vnd.google-earth.kml+xml':
            case 'application/vnd.mozilla.xul+xml':
                prettify.request = 'xml';

                request.postData.text = style_html(request.postData.text, {
                    'indent_size': 1,
                    'indent_char': '\t'
                });
                break;

            case 'text/html':
            case 'application/xhtml+xml':
                request.request = 'html';

                request.postData.text = style_html(request.postData.text, {
                    'indent_size': 1,
                    'indent_char': '\t',
                    'max_char': 1000,
                    //'unformatted': ['!--[if lt IE 7]', '!--[if IE 7]', '!--[if IE 8]', '!--[if gt IE 8]', '![endif]--', '!--']
                });
                break;
        }

        // process response
        switch (mimeType) {
            case 'text/css':
                prettify.response = 'css';

                xhr.responseText = css_beautify(xhr.responseText, {
                    'indent_size': 1,
                    'indent_char': '\t'
                });
                break;

            case 'application/json':
            case 'application/ecmascript':
            case 'application/javascript':
                prettify.response = 'js';

                xhr.responseText = js_beautify(xhr.responseText, {
                    'indent_size': 1,
                    'indent_char': '\t'
                });
                break;

            case 'text/xml':
            case 'image/svg+xml':
            case 'application/xml':
            case 'application/rdf+xml':
            case 'application/rss+xml':
            case 'application/beep+xml':
            case 'application/atom+xml':
            case 'application/xspf+xml':
            case 'application/atomcat+xml':
            case 'application/atomserv+xml':
            case 'application/davmount+xml':
            case 'application/docbook+xml':
            case 'application/vnd.google-earth.kml+xml':
            case 'application/vnd.mozilla.xul+xml':
                prettify.response = 'xml';

                xhr.responseText = style_html(xhr.responseText, {
                    'indent_size': 1,
                    'indent_char': '\t'
                });
                break;

            case 'text/html':
            case 'application/xhtml+xml':
                prettify.response = 'html';

                xhr.responseText = style_html(xhr.responseText, {
                    'indent_size': 1,
                    'indent_char': '\t',
                    'max_char': 1000,
                    //'unformatted': ['!--[if lt IE 7]', '!--[if IE 7]', '!--[if IE 8]', '!--[if gt IE 8]', '![endif]--', '!--']
                });

                // create and inject the iframe object
                var iframe = new IFrame();
                document.id('preview').adopt(iframe);

                // start writing
                var doc = iframe.contentWindow.document;
                doc.open();
                doc.write(this.xhr.responseText);
                doc.close();
                break;

            case 'image/gif':
            case 'image/png':
            case 'image/jpeg':
                var bb = new BlobBuilder();
                bb.append(byteArray.buffer);
                blob = bb.getBlob(mimeType);

                var img = Mooml.renderTemplate('image-preview', window.URL.createObjectURL(blob));
                document.id('preview').adopt(img);
                break;
        }

        // beautify HAR response
        var harText = js_beautify(JSON.stringify(har.toObject()), {
            'indent_size': 1,
            'indent_char': '\t'
        });

        document.getElement('pre.har code').set('text', harText);
        document.getElement('pre.request code').adopt(Mooml.renderTemplate('http-request', request)).appendText(request.postData.text);
        document.getElement('pre.response code').adopt(Mooml.renderTemplate('http-response', response.toObject())).appendText(xhr.responseText);

        // generate download links
        ['request', 'requestBody', 'response', 'responseBody', 'preview', 'har'].each(function(download) {
            var link = document.getElement('button[download="' + download + '"]').removeClass('disabled');
            window.URL.revokeObjectURL(link);

            var blob = null;
            var bb = new BlobBuilder();

            switch (download) {
                case 'request':
                    bb.append(document.getElement('pre.request code').get('text'));
                    blob = bb.getBlob('message/http');
                    break;

                case 'requestBody':
                    bb.append(request.postData.text);
                    blob = bb.getBlob(request.postData.mimeType);
                    break;

                case 'response':
                    if (binary) {
                        var body = document.getElements('pre.response code .nocode').get('text').join('\r\n') + '\n\n' + harResponse.content.text;
                    } else {
                        var body = document.getElement('pre.response code').get('text');
                    }

                    bb.append(body);
                    blob = bb.getBlob('message/http');
                    break;

                case 'preview':
                case 'responseBody':
                    if (binary) {
                        var body = byteArray.buffer;
                    } else {
                        var body = harResponse.content.text;
                    }

                    bb.append(body);
                    blob = bb.getBlob(mimeType);
                    break;

                case 'har':
                    bb.append(harText);
                    blob = bb.getBlob('application/json');
                    break;
            }

            link.set('href', window.URL.createObjectURL(blob));
        }.bind(this));

        window.RESTConsole.setProgress(100);

        // google prettify
        if (prettify.request) {
            document.getElement('pre.request code').set('class', 'language-' + prettify.request);
        }

        if (prettify.response) {
            document.getElement('pre.response code').set('class', 'language-' + prettify.response);
        }

        document.getElements('pre.request code, pre.response code, pre.har code').each(function(code) {
            var lang = code.get('class');

            if (lang) {
                prettyPrintOne(code, lang, true);
            } else {
                prettyPrintOne(code, false, true);
            }
        });

        document.getElement('footer').removeClass('active');

        if (xhr.status == 0) {
            new Alert('warning', 'Connection Failed!', 'Check your connectivity and try again');
        }
    }
});

window.addEvent('domready', function(event) {
    this.RESTConsole = new App;
});
