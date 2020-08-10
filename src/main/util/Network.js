
export function request(url, method, body, options, timeout){
    this.url = url;
    this.method = method;
    this.body = body;
    this.options = options;
    this.timeout = timeout;
}

request.prototype = {
    get : (url, body, options, timeout = 1000) => {
        return new request(url, 'GET', body, options, timeout);
    },
    post : (url, body, options, timeout = 1000) => {
        return new request(url, 'POST', body, options, timeout);
    },
    delete : (url, body, options, timeout = 1000) => {
        return new request(url, 'DELETE', body, options, timeout);
    },
    put : (url, body, options, timeout = 1000) => {
        return new request(url, 'PUT', body, options, timeout);
    },
    patch : (url, body, options, timeout = 1000) => {
        return new request(url, 'PATCH', body, options, timeout);
    },
}

request.prototype.auth = (token) => {
    this.options = {
        ...options,
        "Authorization" : "Berarer "+token
    }
    return this;
}

request.prototype.submit = () => {
    return (() => {
        Promise.race([
            fetch(url, {
                method : this.method,
                headers : {
                    ...this.options,
                    Accept: 'application/json',
                    'Content-Type' : 'application/json',
                },
                body: JSON.stringify(this.body),
            }),
            new Promise((_, reject) => setTimeout(() => reject(new Error('timeout')), timeout))
        ])

    })();
}


