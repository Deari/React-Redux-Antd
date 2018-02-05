import "whatwg-fetch"

const DEBUG_MODE = new RegExp("debug=1").test(window.location.search)

export const isObject = x => x && typeof x === "object"

export const makeReject = (status, message) => Promise.reject({status, message})

export const buildSearchParams = (params) => Object.keys(params).map(key => {
    if (Array.isArray(params[key])) {
        return params[key].map(v => (encodeURIComponent(key) + "[]=" + encodeURIComponent(v) )).join("&")
    }
    return [key, params[key]].map(encodeURIComponent).join("=")
}).join("&").replace(/%20/g, "+")

const defaultHeaders = {
    "Accept": "application/json"
    // 'Content-Type': 'application/x-www-form-urlencoded'
    // 'Cache-Control': 'no-cache'
}

const defaultOptions = {
    credentials: "include",
    mode: "cors"
}

class Fetch {
    static getJSON(url, params = {}, options = {}) {
        if (!url.trim()) {
            return makeReject(-101, "URL is empty")
        }

        if (!isObject(params) || !isObject(options)) {
            return makeReject(-102, "The type of params and options must be a Object")
        }

        if (DEBUG_MODE) {
            params.debug = 1
        }

        params = Object.assign({}, params)
        params = buildSearchParams(params)
        const {headers, ...rest} = options

        options = {
            method: "GET",
            headers: {
                ...defaultHeaders,
                ...headers
            },
            ...defaultOptions,
            ...rest
        }

        if (params) {
            const quesMark = new RegExp("\\?").test(url) ? "&" : "?"
            url = `${url}${quesMark}${params}`
        }

        return new Promise((resolve, reject) => {
            fetch(url, options).then(res => res.json()).then(json => {
                const {data, attachment} = json
                resolve(data || attachment)
            })["catch"](e => {
                reject(e)
            })
        })
    }

    static postJSON(url, params = {}, options = {}) {
        if (!url.trim()) {
            return makeReject(-101, "URL is empty")
        }

        if (!isObject(params) || !isObject(options)) {
            return makeReject(-102, "The type of params and options must be a Object")
        }

        if (DEBUG_MODE) {
            params.debug = 1
        }

        let {headers, formDataType, ...rest} = options
        let body

        headers = {...defaultHeaders, ...headers}

        switch (formDataType) {
            case "json":
                headers["Content-Type"] = "application/json"
                params = Object.assign({}, {clientType: 1}, params)
                body = JSON.stringify(params)
                break
            case "FormData":
                const data = new FormData()
                params = Object.assign({}, {clientType: 1}, params)
                for (let i in params) {
                    let item = params[i]
                    if (item instanceof Array) {
                        for (let j in item) {
                            if (item[j] instanceof Object) {
                                let key = i + "[" + j + "]"
                                for (let k in item[j]) {
                                    let subkey = key + "[" + k + "]"
                                    data.append(subkey, item[j][k])
                                }
                            } else {
                                let subkey = i + "[" + j + "]"
                                data.append(subkey, item[j])
                            }
                        }
                    } else {
                        let key = i
                        data.append(key, item)
                    }
                }
                body = data
                break
            case "file":
                body = params
                break
            case "urlencode":
            default:
                params = Object.assign({}, {clientType: 1}, params)
                headers["Content-Type"] = "application/x-www-form-urlencoded"
                body = buildSearchParams(params)
        }

        options = {
            method: "POST",
            headers,
            body,
            ...defaultOptions,
            ...rest
        }

        return new Promise((resolve, reject) => {
            fetch(url, options).then((res) => res.json()).then(json => {
                const { data} = json
                resolve(data)
            })["catch"](e => {
                reject(e)
            })
        })
    }
}

export default Fetch
