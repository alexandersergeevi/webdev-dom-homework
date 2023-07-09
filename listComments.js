export function getListComments(comment, index) {
    return `<li class="comment" data-index="${index}">
            <div class="comment-header" data-index="${index}">
              <div>${comment.name}
              </div>
              <div>${comment.dateComment}</div>
            </div>
            <div class="comment-body">
              <div data-index="${index}" class="comment-text" >
                ${comment.text}
              </div>
            </div>
            <div class="comment-footer">
              <div class="likes">
                <span class="likes-counter"> ${comment.likesNumber}</span>
                <button data-index="${index}" data-id="${comment.id}" class='${comment.colorLike}'></button>
              </div>
            </div>
          </li>`;
}