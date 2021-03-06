export class Cookie {

    static get(name) {
        let cookies = this.all();

        if (cookies) {
            return cookies[name];
        }

        return null;
    }

    static set(name, value, options = {}) {
        let str = `${Cookie.encode(name)}=${Cookie.encode(value)}`;

        if (value == null) {
            options.expiry = -1;
        }

        if (options.expiry && !options.expires) {
            options.expires = new Date(+new Date + options.expiry);
        }

        if (options.path) {
            str += `; path=${options.path}`;
        }

        if (options.domain) {
            str += `; domain=${options.domain}`;
        }

        if (options.expires) {
            str += `; expires=${options.expires.toUTCString()}`;
        }

        if (options.secure) {
            str += '; secure';
        }

        document.cookie = str;
    }

    static all() {
        return Cookie.parse(document.cookie);
    }

    static parse(str) {
        var obj = {};
        var pairs = str.split(/ *; */);
        var pair;

        if ('' == pairs[0]) {
            return obj;
        }

        for (let i = 0; i < pairs.length; ++i) {
            pair = pairs[i].split('=');
          obj[Cookie.decode(pair[0])] = Cookie.decode(pair[1]);
        }

        return obj;
    }

    static encode(value) {
        try {
            return encodeURIComponent(value);
        } catch (e) {
            return null;
        }
    }

    static decode(value) {
        try {
            return decodeURIComponent(value);
        } catch (e) {
            return null;
        }
    }
}
