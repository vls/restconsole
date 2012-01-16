var HAR = {
    'Log': new Class({
        'Implements': Options,

        'options': {
            'version' : '1.2',
            'creator': {
                'name': 'REST Console',
                'version': '4.0.1',
            },

            'browser': {
                'name': navigator.appName,
                'version': navigator.appVersion,
                'comment': navigator.userAgent
            },

            'pages': [],

            'entries': []
        },

        'initialize': function(options) {
            this.setOptions(options)
        },

        'addEntry': function(entry) {
            this.options.entries.push(entry);

            return this;
        },

        'toJson': function() {
            return JSON.encode(this.options);
        },

        'toObject': function() {
            return this.options;
        }
    }),

    'Entry': new Class({
        'Implements': Options,

        'options': {
            'startedDateTime': new Date().toISOString(),
            'time': 0,
            'request': {},
            'response': {}
        },

        'initialize': function(options) {
            this.setOptions(options)
        },

        'toJson': function() {
            return JSON.encode(this.options);
        },

        'toObject': function() {
            return this.options;
        }
    }),

    'Request': new Class({
        'Implements': Options,

        'options': {
            'method': null,
            'url': null,
            'httpVersion': 'HTTP/1.1',
            'cookies': [],
            'headers': [],
            'queryString': [],
            'postData': {
                'mimeType': null,
                'params': [],
                'text' : null,
            },
            'headersSize': -1,
            'bodySize': -1,
            'comment': null
        },

        'initialize': function(options) {
            this.setOptions(options)
        },

        'addHeader': function(name, value, comment) {
            this.options.headers.push({
                'name': name,
                'value': value,
                'comment': comment
            });

            return this;
        },

        'addQueryParam': function(name, value) {
            this.options.queryString.push({
                'name': name,
                'value': value
            });

            return this;
        },

        'addPostParam': function(name, value, fileName, contentType) {
            this.options.postData.params.push({
                'name': name,
                'value': value,
                'fileName': fileName,
                'contentType': contentType,
            });

            return this;
        },

        'toJson': function() {
            return JSON.encode(this.options);
        },

        'toObject': function() {
            return this.options;
        }
    }),

    'Response': new Class({
        'Implements': Options,

        'options': {
            'status': 0,
            'statusText': null,
            'httpVersion': 'HTTP/1.1',
            'cookies': [],
            'headers': [],
            'content': {
                'size': 0,
                'compression': 0,
                'mimeType': null,
                'text': null,
                'encoding': 'base64'
            },
            'redirectURL': null,
            'headersSize': -1,
            'bodySize': -1
        },

        'initialize': function(options) {
            this.setOptions(options)
        },

        'addHeader': function(name, value) {
            this.options.headers.push({
                'name': name,
                'value': value
            });

            return this;
        }
    })
}
