// import { formatDate } from "./date.js";
import { format } from "date-fns";
import _ from 'lodash';

const host = "https://wedev-api.sky.pro/api/v2/alexander-shmyg/comments";

export function getFunction() {

    return fetch(host, {
        method: "GET",
    })
        .then((response) => {
            if (response.status === 401) {
                throw new Error("Нет авторизации");
            } else if (response.status === 500) {
                throw new Error("Сервер сломался");
            } else {
                return response.json();
            }
        })
}

export function postFunction(token, nameInputElement, commentInputElement) {
    return fetch(host, {
        method: "POST",
        body: JSON.stringify({
            name: nameInputElement.value
                .replaceAll("&", "&amp;")
                .replaceAll("<", "&lt;")
                .replaceAll(">", "&gt;")
                .replaceAll('"', "&quot;"),
            dateComment: format(new Date(), 'yyyy-MM-dd HH.mm.ss'),
            text: commentInputElement.value
                .replaceAll("&", "&amp;")
                .replaceAll("<", "&lt;")
                .replaceAll(">", "&gt;")
                .replaceAll('"', "&quot;"),
            likeComment: false,
            likesNumber: 0,
            colorLike: 'like-button -no-active-like',
            forceError: true,
        }),
        headers: {
            Authorization: token,
        }
    })
        .then((response) => {
            if (response.status === 500) {
                throw new Error("Сервер сломался");
            } else if (response.status === 400) {
                throw new Error("Плохой запрос");
            } else {
                return response.json();
            }
        })

}

export function loginUser({ login, password }) {
    return fetch("https://wedev-api.sky.pro/api/user/login", {
        method: "POST",
        body: JSON.stringify({
            login,
            password
        })
    })
        .then((response) => {
            if (response.status === 500) {
                throw new Error("Сервер сломался");
            } else if (response.status === 400) {
                throw new Error("Нет авторизации");
            } else {
                return response.json();
            }
        })
};

export function registerUser({ login, password, name }) {
    return fetch("https://wedev-api.sky.pro/api/user", {
        method: "POST",
        body: JSON.stringify({
            login,
            password,
            name: _.capitalize(name)
        })
    })
        .then((response) => {
            if (response.status === 500) {
                throw new Error("Сервер сломался");
            } else if (response.status === 400) {
                throw new Error("Такой пользователь уже существует");
            } else {
                return response.json();
            }
        })
}
