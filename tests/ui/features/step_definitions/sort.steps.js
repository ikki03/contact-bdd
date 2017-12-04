const {Given,Then,When} = require ('cucumber');

Given(/^The sort contact list is display$/, function (callback) {
    this.browser.visit(" http://127.0.0.1:3000", (err) => {
        if (err) throw err;
        var contact = this.browser.tabs.current.Contact.Contacts;
        var tab = this.browser.queryAll('table tbody td');
        var i = contact.instance().iterator();
        var j =0;
        while (i.hasNext()) {
            var val = i.next();
            this.browser.assert.success(val.firstName()===tab[j].innerHTML);
            j += 1;
            this.browser.assert.success(val.lastName()===tab[j].innerHTML);
            j += 5;
        }
        callback();
    });
});
When(/^User clicks on sort button$/, function (callback) {
    this.browser.visit(" http://127.0.0.1:3000", (err) => {
        if (err) throw err;
        var tab = this.browser.query('#button_sort');
        tab.click();
        callback();
    });
});
Then(/^The list is sort$/, function (callback) {
    this.browser.visit(" http://127.0.0.1:3000", (err) => {
        if (err) throw err;
        var contact = this.browser.tabs.current.Contact.Contacts.instance();
        var tab = this.browser.queryAll('table tbody td');
        var test = [];
        var parcour =0;
        var i = contact.iterator();
        while (i.hasNext()){
            var val =i.next();
            test[parcour] = val.lastName();
            parcour+=1;
        }
        test.sort();
        var avancement =1;
        for( var x=0;x<test.length;x++){
            this.browser.assert.success(test[x]===tab[avancement].innerHTML);
            avancement+=6;
        }
        callback();
    });
});