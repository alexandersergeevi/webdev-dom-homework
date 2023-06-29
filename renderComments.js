import { commentsElement, getLikeButton, reply } from "./main.js";

const renderComments = (comments) => {

    const commentsHtml = comments.map((comment, index) => {
        return `<li class="comment" data-index="${index}">
    <div class="comment-header">
      <div>${comment.name}</div>
      <div>${comment.dateComment}</div>
    </div>
    <div class="comment-body">
      <div class="comment-text">
        ${comment.text}
      </div>
    </div>
    <div class="comment-footer">
      <div class="likes">
        <span class="likes-counter"> ${comment.likesNumber}</span>
        <button data-index="${index}" class='${comment.colorLike}'></button>
      </div>
    </div>
    </li>`
    }).join("");

    commentsElement.innerHTML = commentsHtml;
    getLikeButton(comments);
    reply(comments);
};

export { renderComments };