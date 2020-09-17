

const DEFAULT_TIMEOUT = 15000

export default class Request{

    constructor(url, method, body, options, timeout){
        this.url = url;
        this.method = method;
        this.body = body;
        this.options = options;
        this.timeout = timeout;
    }

    static get = (url, body, options, timeout = DEFAULT_TIMEOUT) => {
        return new Request(url, 'GET', body, options, timeout);
    }
    static post = (url, body, options, timeout = DEFAULT_TIMEOUT) => {
        return new Request(url, 'POST', body, options, timeout);
    }
    static delete = (url, body, options, timeout = DEFAULT_TIMEOUT) => {
        return new Request(url, 'DELETE', body, options, timeout);
    }
    static put = (url, body, options, timeout = DEFAULT_TIMEOUT) => {
        return new Request(url, 'PUT', body, options, timeout);
    }
    static patch = (url, body, options, timeout = DEFAULT_TIMEOUT) => {
        return new Request(url, 'PATCH', body, options, timeout);
    }

    auth = (token) => {
        this.options = {
            ...this.options,
            "Authorization" : "Bearer "+ token
        }
        return this;
    }

    submit = () => {
        return (() => {
            let isOk = false;
            return Promise.race([
                fetch(this.url, {
                    method : this.method,
                    headers : {
                        Accept: 'application/json',
                        'Content-Type' : 'application/json; charset=utf-8',
                        ...this.options,
                    },
                    body: this.body,
                })
                .then((response) => {
                    isOk = response.ok;
                    return response.json();
                })
                .then((data) => {
                    return new Promise((resolve, reject) => {
                        if(isOk){
                            resolve(data)
                        }else{
                            reject(data)
                        }
                    })
                }),
                new Promise((_, reject) => setTimeout(() => reject(new Error('타임 아웃')), this.timeout))
            ])
    
        })();
    }
}



