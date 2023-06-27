import { formatDate } from "./date.js";
import { getFunction, postFunction } from "./api.js";
import { renderComments } from "./renderComments.js"


export const buttonElement = document.getElementById("add-button");
export const listElement = document.getElementById("list");
export const nameInputElement = document.getElementById("name-input");
export const commentInputElement = document.getElementById("comment-input");
export const commentsElement = document.querySelector(".comments");
export const formCommentElement = document.getElementById("add-form");
export const loadingHeadingElement = document.getElementById("loading-heading");
export const loadingCommentElement = document.getElementById("loading-comment");
export let comments = [];

loadingCommentElement.style.display = 'none';

// function getFunction() {

//     return fetch("https://wedev-api.sky.pro/api/v1/alexander-shmygin/comments", {
//         method: "GET"
//     })
//         .then((response) => {
//             const jsonPromise = response.json();
//             jsonPromise.then((responseData) => {
//                 const appComments = responseData.comments.map((comment) => {
//                     return {
//                         name: comment.author.name,
//                         dateComment: formatDate(new Date(comment.date)),
//                         text: comment.text,
//                         likesNumber: comment.likes,
//                         colorLike: "like-button -no-active-like",
//                         likeComment: false
//                     }
//                 });
//                 comments = appComments;
//                 loadingHeadingElement.style.opacity = '0';
//                 renderComments();
//             });
//         })
//         .catch((error) => {
//             alert('Кажется, у вас сломался интернет, попробуйте позже');
//             console.warn(error);
//         })
// }

getFunction();

export function getLikeButton() {

    const likesButton = document.querySelectorAll('.like-button');

    for (const like of likesButton) {

        like.addEventListener("click", (event) => {
            event.stopPropagation();
            const likeIndex = like.dataset.index;
            const commentsElement = comments[likeIndex];

            if (commentsElement.likeComment) {
                commentsElement.likesNumber -= 1;
                commentsElement.likeComment = false;
                commentsElement.colorLike = 'like-button -no-active-like';
            } else {
                commentsElement.likesNumber += 1;
                commentsElement.likeComment = true;
                commentsElement.colorLike = 'like-button -active-like';
            }
            renderComments();

        })
    }
};

getLikeButton();

// const renderComments = () => {

//     const commentsHtml = comments.map((comment, index) => {

//     //     return `<li class="comment" data-index="${index}">
//     //     <div class="comment-header">
//     //       <div>${comment.name}</div>
//     //       <div>${comment.dateComment}</div>
//     //     </div>
//     //     <div class="comment-body">
//     //       <div class="comment-text">
//     //         ${comment.text}
//     //       </div>
//     //     </div>
//     //     <div class="comment-footer">
//     //       <div class="likes">
//     //         <span class="likes-counter"> ${comment.likesNumber}</span>
//     //         <button data-index="${index}" class='${comment.colorLike}'></button>
//     //       </div>
//     //     </div>
//     //   </li>`;
//     }).join("");

//     commentsElement.innerHTML = commentsHtml;
//     getLikeButton();
//     reply();
// };

renderComments();

buttonElement.addEventListener("click", () => {

    nameInputElement.classList.remove("error");

    if (nameInputElement.value === "") {
        nameInputElement.classList.add("error");
        return;
    }

    commentInputElement.classList.remove("error");

    if (commentInputElement.value === "") {
        commentInputElement.classList.add("error");
        return;
    }

    buttonElement.disabled = true;
    formCommentElement.style.display = 'flex';
    loadingCommentElement.style.display = 'flex';

    // function postFunction() {
    //     return fetch("https://wedev-api.sky.pro/api/v1/alexander-shmygin/comments", {
    //         method: "POST",
    //         body: JSON.stringify({
    //             name: nameInputElement.value
    //                 .replaceAll("&", "&amp;")
    //                 .replaceAll("<", "&lt;")
    //                 .replaceAll(">", "&gt;")
    //                 .replaceAll('"', "&quot;"),
    //             dateComment: formatDate(new Date()),
    //             text: commentInputElement.value
    //                 .replaceAll("&", "&amp;")
    //                 .replaceAll("<", "&lt;")
    //                 .replaceAll(">", "&gt;")
    //                 .replaceAll('"', "&quot;"),
    //             likeComment: false,
    //             likesNumber: 0,
    //             colorLike: 'like-button -no-active-like',
    //             forceError: true
    //         })
    //     })
    //         .then((response) => {
    //             if (response.status === 500) {
    //                 throw new Error('Сервер сломался, попробуй позже');
    //             } else if (response.status === 400) {
    //                 throw new Error('Имя и комментарий должны быть не короче 3 символов');
    //             } else {
    //                 return response.json();
    //             }
    //         })
    //         .then((responseData) => {
    //             return getFunction();
    //         })
    //         .then((data) => {
    //             buttonElement.disabled = false;
    //             formCommentElement.style.display = 'flex';
    //             loadingCommentElement.style.display = 'none';
    //             nameInputElement.value = "";
    //             commentInputElement.value = "";
    //         })
    //         .catch((error) => {
    //             if (error.message === 'Сервер сломался, попробуй позже') {
    //                 postFunction();
    //             } else if (error.message === 'Имя и комментарий должны быть не короче 3 символов') {
    //                 alert('Имя и комментарий должны быть не короче 3 символов');
    //             } else {
    //                 alert('Кажется, у вас сломался интернет, попробуйте позже');
    //             }

    //             buttonElement.disabled = false;
    //             formCommentElement.style.display = 'flex';
    //             loadingCommentElement.style.display = 'none';
    //         })
    // }
    postFunction();
    renderComments();
})

export function reply() {

    let commentElements = document.querySelectorAll('.comment');

    for (const commentElement of commentElements) {
        commentElement.addEventListener("click", () => {
            const indexComment = commentElement.dataset.index;

            commentInputElement.value =
                `> ${comments[indexComment].text}\n${comments[indexComment].name}, `;
        }
        )
    }
};

export const likesButton = document.querySelectorAll('.like-button');

for (const like of likesButton) {

    like.addEventListener("click", (event) => {
        event.stopPropagation();
        const likeIndex = like.dataset.index;
        const commentsElement = comments[likeIndex];

        if (commentsElement.likeComment) {
            commentsElement.likesNumber -= 1;
            commentsElement.likeComment = false;
            commentsElement.colorLike = 'like-button -no-active-like';
        } else {
            commentsElement.likesNumber += 1;
            commentsElement.likeComment = true;
            commentsElement.colorLike = 'like-button -active-like';
        }
        renderComments();

    })
}

console.log("It works!");