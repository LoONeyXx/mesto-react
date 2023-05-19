import { apiOptions } from "./constants"



class API {
    constructor(options) {
        this._headers = options.headers
        this._cohort = options.cohort
        this._server = options.server
    }
    getCardsInfo() {
        return fetch(`${this._server}/${this._cohort}/cards`, {
            headers: this._headers
        })
            .then(this._getResult)
    }

    getProfileInfo() {
        return fetch(`${this._server}/${this._cohort}/users/me`, {
            headers: this._headers
        })
            .then(this._getResult);
    }

    setProfileInfo(info) {
        return fetch(`${this._server}/${this._cohort}/users/me`, {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify({
                name: info.name,
                about: info.about
            })
        })
            .then(this._getResult)
    }

    setProfileAvatar(info) {
        return fetch(`${this._server}/${this._cohort}/users/me/avatar`, {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify({
                avatar: info.avatar
            })
        })
            .then(this._getResult)
    }

    addNewCard(info) {
        return fetch(`${this._server}/${this._cohort}/cards`, {
            method: 'POST',
            headers: this._headers,
            body: JSON.stringify({
                name: info.name,
                link: info.link
            })
        })
            .then(this._getResult)
    }

    deleteCard(id) {
        return fetch(`${this._server}/${this._cohort}/cards/${id}`, {
            method: 'DELETE',
            headers: this._headers,
        })
            .then(this._getResult)
    }


    addLike(id) {
        return fetch(`${this._server}/${this._cohort}/cards/${id}/likes`, {
            method: 'PUT',
            headers: this._headers,
        })
            .then(this._getResult)
    }
    removeLike(id) {
        return fetch(`${this._server}/${this._cohort}/cards/${id}/likes`, {
            method: 'DELETE',
            headers: this._headers,
        })
            .then(this._getResult)
    }


    _getResult(result) {
        return result.ok ? result.json() : Promise.reject(new Error(`Что то пошло не так`))
    }
}


const Api = new API(apiOptions)

export default Api