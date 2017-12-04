const {Given,Then,When} = require ('cucumber');

Given(/^The contact list is display$/, function (callback) {
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
When(/^User clicks on remove button of the first contact$/, function (callback) {
    this.browser.visit(" http://127.0.0.1:3000", (err) => {
        if (err) throw err;
        var contact = this.browser.tabs.current.Contact.Contacts.instance().iterator().next()
        var tab = this.browser.queryAll('table tbody td a');
        tab[0].click();
        callback();
    });
});
Then(/^The first contact is removed$/, function (callback) {
    this.browser.visit(" http://127.0.0.1:3000", (err) => {
        if (err) throw err;
        var contact = this.browser.tabs.current.Contact.Contacts.instance().iterator().next()
        var tab = this.browser.queryAll('table tbody td');
        this.browser.assert.success(contact.firstName()===tab[0].innerHTML);
        this.browser.assert.success(contact.firstName()==="Jacques");
        callback();
    });
});