export default function http () {
    const token = sessionStorage.getItem('token')
    const baseUrl = 'http://localhost:5000/api'
    return {
        get(url) {
            return fetch(baseUrl + url, {
                method: 'GET',
                headers: {
                    Authorization: 'Bearer ' + token
                }
            })
        },
        post(url, body, type = 'application/json') {
            return fetch(baseUrl + url, {
                method: 'POST',
                headers: {
                    Authorization: 'Bearer ' + token,
                    'Content-Type': type
                },
                body: JSON.stringify(body)
            })
        },
        delete() {},
        put() {},
        patch(url, body, type = 'application/json') {
            return fetch(baseUrl + url, {
                method: 'PATCH',
                headers: {
                    Authorization: 'Bearer ' + token,
                    'Content-Type': type
                },
                body: JSON.stringify(body)
            })
        }
    }
}
