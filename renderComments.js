import { postFunction } from "./api.js";
import { getAPI } from "./main.js";
import { rederLoginComponent } from "./components/login-component.js";
import { getListComments } from "./listComments.js";

let token = null;
let name = null;

export function renderApp(comments, listComments) {

  const appEl = document.getElementById('app');

  if (!token) {
    rederLoginComponent({
      comments,
      appEl,
      setToken: (newToken) => {
        token = newToken;
      },
      setName: (newName) => {
        name = newName;
      },
      getAPI
    });
  } else {

    const commentsHtml = comments.map((comment, index) => listComments(comment, index)).join("");

    const appHTML = `<div class="container">

      <ul class="comments">
      ${commentsHtml}
      </ul>
      <div id="loading-comment" class="loading-comment">Комментарий добавляется...</div>
      <div id="add-form" class="add-form">
      <input id="name-input" type="text" class="add-form-name-block" value="${name}" disabled />
      <textarea id="comment-input" type="textarea" class="add-form-text" placeholder="Введите ваш коментарий"
        rows="4"></textarea>
      <div class="add-form-row">
        <button id="add-button" class="add-form-button">Написать</button>
      </div>
    </div>
    </div>`;

    appEl.innerHTML = appHTML;

    const buttonElement = document.getElementById("add-button");
    const nameInputElement = document.getElementById("name-input");
    const commentInputElement = document.getElementById("comment-input");
    const commentsElement = document.querySelector(".comments");
    const formCommentElement = document.getElementById("add-form");
    const loadingCommentElement = document.getElementById("loading-comment");

    loadingCommentElement.style.display = 'none';

    function getLikeButton(comments) {

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
          renderApp(comments, listComments);
        })
      }
    };

    getLikeButton(comments);


    function reply(comments) {

      let commentElements = document.querySelectorAll('.comment');

      for (const commentElement of commentElements) {
        commentElement.addEventListener("click", () => {
          const indexComment = commentElement.dataset.index;

          commentInputElement.value =
            `> ${comments[indexComment].text} \n${comments[indexComment].name}, `;
        }
        )
      }
    };

    reply(comments);

    function postData() {

      return postFunction(token, nameInputElement, commentInputElement)
        .then((response) => {
          return getAPI();
        })
        .then((data) => {
          // buttonElement.disabled = false;
          loadingCommentElement.style.display = 'none';
          formCommentElement.style.display = 'flex';

          nameInputElement.value;
          commentInputElement.value = "";

        })
        .catch((error) => {
          if (error.message === "Сервер сломался") {
            alert("Сервер сломался, попробуйте позже");
            postData();
          } else
            if (error.message === "Плохой запрос") {
              alert("Имя и комментарий должны быть не короче 3 символов");
              buttonElement.disabled = false;
              formCommentElement.style.display = 'flex';
              loadingCommentElement.style.display = 'none';
            } else {
              alert('Кажется, у вас сломался интернет, попробуйте позже');
              console.log(error);
            }

          console.log(error);
        });
    };


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
      formCommentElement.style.display = 'none';
      loadingCommentElement.style.display = 'flex';

      postData();
    });
  }
};
