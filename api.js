import { formatDate } from "./date.js";
import { nameInputElement, commentInputElement, loadingHeadingElement, buttonElement, formCommentElement, loadingCommentElement, comments } from "./main.js";
import { renderComments } from "./renderComments.js";

export function getFunction() {

    return fetch("https://wedev-api.sky.pro/api/v1/alexander-shmygin/comments", {
        method: "GET"
    })
        .then((response) => {
            const jsonPromise = response.json();
            jsonPromise.then((responseData) => {
                let appComments = responseData.comments.map((comment) => {
                    return {
                        name: comment.author.name,
                        dateComment: formatDate(new Date(comment.date)),
                        text: comment.text,
                        likesNumber: comment.likes,
                        colorLike: "like-button -no-active-like",
                        likeComment: false
                    }                    
                });
                let comments = appComments;
                loadingHeadingElement.style.opacity = '0';
                return renderComments(comments);
            });
        })
        .catch((error) => {
            alert('Кажется, у вас сломался интернет, попробуйте позже');
            console.warn(error);
        })
}

export function postFunction() {

    return fetch("https://wedev-api.sky.pro/api/v1/alexander-shmygin/comments", {
        method: "POST",
        body: JSON.stringify({
            name: nameInputElement.value
                .replaceAll("&", "&amp;")
                .replaceAll("<", "&lt;")
                .replaceAll(">", "&gt;")
                .replaceAll('"', "&quot;"),
            dateComment: formatDate(new Date()),
            text: commentInputElement.value
                .replaceAll("&", "&amp;")
                .replaceAll("<", "&lt;")
                .replaceAll(">", "&gt;")
                .replaceAll('"', "&quot;"),
            likeComment: false,
            likesNumber: 0,
            colorLike: 'like-button -no-active-like',
            forceError: true
        })
    })
        .then((response) => {
            if (response.status === 500) {
                throw new Error('Сервер сломался, попробуй позже');
            } else if (response.status === 400) {
                throw new Error('Имя и комментарий должны быть не короче 3 символов');
            } else {
                return response.json();
            }
        })
        .then((responseData) => {
            return getFunction();
        })
        .then((data) => {
            buttonElement.disabled = false;
            formCommentElement.style.display = 'flex';
            loadingCommentElement.style.display = 'none';
            nameInputElement.value = "";
            commentInputElement.value = "";
        })
        .catch((error) => {
            if (error.message === 'Сервер сломался, попробуй позже') {
                postFunction();
            } else if (error.message === 'Имя и комментарий должны быть не короче 3 символов') {
                alert('Имя и комментарий должны быть не короче 3 символов');
            } else {
                alert('Кажется, у вас сломался интернет, попробуйте позже');
            }

            buttonElement.disabled = false;
            formCommentElement.style.display = 'flex';
            loadingCommentElement.style.display = 'none';
        })
};