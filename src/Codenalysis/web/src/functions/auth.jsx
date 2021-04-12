import { request } from "./request";

export const authCheck = () => {
    return request('/api/v1/auth/check', { method: 'GET' }, { notifications: false }).then(response => response.response.status === 200 && response.data.data.success === true);
}

export const login = (username, password) => {
    return request(
        '/api/v1/auth/login',
        { method: 'POST', body: JSON.stringify({ username: username, password: password }) }
    ).then(({ response }) => response.status === 200);
}

export const logout = () => {
    return request('/api/v1/auth/logout', { method: 'POST' }).then(({ response, data }) => {
        return response.status === 200 && data.data.success === true
    });
}