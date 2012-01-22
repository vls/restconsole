var IndexedDB = new Class({
    'Implements': [Options, Events],

    'objectStores': {
        'todo': {
            'keyPath': 'id',
            'autoIncrement': true
        }
    },

    'initialize': function(options) {
        // Initialising the window.IndexedDB Object
        this.indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB;
        this.IDBKeyRange = window.IDBKeyRange || window.webkitIDBKeyRange;
        this.IDBTransaction = window.IDBTransaction || window.webkitIDBTransaction;

        var request = this.indexedDB.open('restconsole');

        request.onerror = this.errorHandler;

        request.onsuccess = function(event) {
            this.db = event.target.result;

            this.db.onversionchange = function(event) {
                //this.db.close();
                //delete this.db;
            }.bind(this);

            var version = '1.0';

            // We can only create Object stores in a setVersion transaction;
            if (version != this.db.version) {
                this.setVersion(version);
            }
        }.bind(this);
    },

    'setVersion': function(version) {
        var vRequest = this.db.setVersion(version);

        request.onerror = this.errorHandler;

        request.onblocked = function(event) {
            alert('The database is open in another tab. Please close that tab');
        };

        request.onsuccess =  function(event) {
            Object.each(this.objectStores, function(prop, name) {
                this.db.createObjectStore(name, prop, true);
            }.bind(this))
        }.bind(this);
    },

    'deleteObjectStore': function(store) {
        var vRequest = this.db.setVersion(version);

        request.onerror = this.errorHandler;

        request.onsuccess =  function(event) {
            this.db.deleteObjectStore(name);
        }.bind(this);
    },

    'close': function() {
        this.db.close();
    },

    'getAllObjectStores': function(name) {
        return this.db.objectStoreNames;
    },

    'getObjectStore': function(name) {
        console.log(this.db);
        var transaction = this.db.transaction([name], this.IDBTransaction.READ_WRITE);
        return transaction.objectStore(name);
    },

    'addItem': function(store, data) {
        var request = store.add(data);

        request.onerror = this.errorHandler;
    },

    'getAllItems': function(store) {
        // Get everything in the store;
        var keyRange = this.IDBKeyRange.lowerBound(0);
        var request = store.openCursor(keyRange);

        request.onerror = this.errorHandler;
        request.onsuccess = function(event) {
            var result = event.target.result;

            if (!!result == false) {
                return;
            }

            console.log(result);

            result.continue();
        }
    },

    'errorHandler': function(event) {
        console.log(event);
    }
});

var db = new IndexedDB();
var todo = db.getObjectStore('todo');
db.addItem(todo, {'test': 'value'});
