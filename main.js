import { formatDate } from "./date.js";
import { getFunction } from "./api.js";
import { renderApp } from "./renderComments.js";
import { getListComments } from "./listComments.js";

const loadingHeadingElement = document.querySelector('.loading-heading');

let comments = [];

export function getAPI() {
    return getFunction()
      .then((responseData) => {
        const appComments = responseData.comments.map((comment) => {
          return {
            id: comment.id,
            name: comment.author.name,
            dateComment: formatDate(new Date(comment.date)),
            text: comment.text,
            likeComment: comment.isLiked,
            likesNumber: comment.likes,
            colorLike: 'like-button no-active-like',
          }
        });
        comments = appComments;
        return renderApp(comments, getListComments);
      })
      .then((response) => {
        loadingHeadingElement.style.display = 'none';
      })
      .catch((error) => {
        if (error.message === "Сервер сломался") {
          alert("Сервер сломался, попробуйте позже");
          getAPI();
        } else if (error.message === "Нет авторизации") {       
          } else {
            alert('Кажется, у вас сломался интернет, попробуйте позже');
            console.warn(error);
          }
      });
  };
  
  getAPI();

console.log("It works!");