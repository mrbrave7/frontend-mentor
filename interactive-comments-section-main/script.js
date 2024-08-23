let currentUser;

async function fetchData() {
    try {
        const response = await fetch('data.json');
        if (!response.ok) {
            console.log("Can't Get Response");
            return;
        }
        const data = await response.json();
        console.log(data);
        currentUser = data.currentUser;
        const comments = data.comments;
        console.log(currentUser);
        console.log(comments);

        const root = document.getElementById("root");
        const commentsSection = document.createElement("div");
        commentsSection.className = "commentsSection";
        root.appendChild(commentsSection);

        comments.forEach(comment => {
            commentsSection.appendChild(showComments(comment));
        });

    } catch (error) {
        console.log("Can't Get Data:", error);
    }
}

window.addEventListener("DOMContentLoaded", fetchData);

function showComments(comment, repliedTo = "") {
    const replies = comment.replies ? [...comment.replies] : [];
    const repliesDiv = document.createElement("div");
    repliesDiv.classList.add("repliesDiv");
    
    replies.forEach(reply => {
        repliesDiv.appendChild(showComments(reply, reply.replyingTo));
    });

    const commentDiv = document.createElement("div");
    commentDiv.className = "commentDiv";

    // Score Div
    const scoreDiv = document.createElement("div");
    scoreDiv.className = "scoreDiv";
    const scoreTag = document.createElement("p");
    scoreTag.innerHTML = comment.score;
    const buttonPlus = document.createElement("button");
    buttonPlus.innerHTML = "+";
    buttonPlus.id = "increment";
    buttonPlus.onclick = () => {
        comment.score++;
        scoreTag.innerHTML = comment.score;
    };
    const buttonMinus = document.createElement("button");
    buttonMinus.id = "decrement";
    buttonMinus.innerHTML = "-";
    buttonMinus.onclick = () => {
        comment.score--;
        scoreTag.innerHTML = comment.score;
    };
    scoreDiv.append(buttonPlus, scoreTag, buttonMinus);

    // User Div
    const user = comment.user;
    const image = document.createElement("img");
    image.src = user.image.png;
    image.alt = user.username;

    const userName = document.createElement("h1");
    userName.id = "userName";
    userName.innerText = user.username;

    const createdAt = document.createElement("p");
    createdAt.innerText = comment.createdAt;
    createdAt.id = "createdAt";
    const userDiv = document.createElement("div");
    userDiv.id = "userDiv";
    const functionSection = document.createElement("div");

    if (user.username === currentUser.username) {
        const matchedUser = document.createElement("p");
        matchedUser.innerText = "You";
        matchedUser.className = "matchedUser";
        userDiv.append(image, userName, matchedUser, createdAt);

        const deleteButton = document.createElement("button");
        deleteButton.id = "deleteButton";
        deleteButton.innerHTML = `<span>
            <svg width="12" height="14" xmlns="http://www.w3.org/2000/svg"><path d="M1.167 12.448c0 .854.7 1.552 1.555 1.552h6.222c.856 0 1.556-.698 1.556-1.552V3.5H1.167v8.948Zm10.5-11.281H8.75L7.773 0h-3.88l-.976 1.167H0v1.166h11.667V1.167Z" fill="#ED6368"/></svg>
        </span> Delete`;
        const editButton = document.createElement("button");
        editButton.id = "editButton";
        editButton.innerHTML = `<span>
            <svg width="14" height="14" xmlns="http://www.w3.org/2000/svg"><path d="M13.479 2.872 11.08.474a1.75 1.75 0 0 0-2.327-.06L.879 8.287a1.75 1.75 0 0 0-.5 1.06l-.375 3.648a.875.875 0 0 0 .875.954h.078l3.65-.333c.399-.04.773-.216 1.058-.499l7.875-7.875a1.68 1.68 0 0 0-.061-2.371Zm-2.975 2.923L8.159 3.449 9.865 1.7l2.389 2.39-1.75 1.706Z" fill="#5357B6"/></svg>
        </span> Edit`;
        functionSection.append(deleteButton, editButton);
    } else {
        userDiv.append(image, userName, createdAt);
        const replyButton = document.createElement("button");
        replyButton.innerHTML = `<span>
            <svg width="14" height="13" xmlns="http://www.w3.org/2000/svg"><path d="M.227 4.316 5.04.16a.657.657 0 0 1 1.085.497v2.189c4.392.05 7.875.93 7.875 5.093 0 1.68-1.082 3.344-2.279 4.214-.373.272-.905-.07-.767-.51 1.24-3.964-.588-5.017-4.829-5.078v2.404c0 .566-.664.86-1.085.496L.227 5.31a.657.657 0 0 1 0-.993Z" fill="#5357B6"/></svg>
        </span> Reply`;
        functionSection.append(replyButton);
    }

    const commentContent = document.createElement("div");
    commentContent.id = "commentContent";

    const content = document.createElement("p");
    content.id = "content";
    content.innerHTML = repliedTo ? `<span id="repliedTo">@${repliedTo}</span> ${comment.content}` : comment.content;
    commentContent.append(userDiv, content);

    commentDiv.append(scoreDiv, commentContent, functionSection);

    const commentSection = document.createElement("div");
    commentSection.className = "commentSection";
    if(!replies){
    commentSection.append(commentDiv);
    }
    else{
        commentSection.append(commentDiv, repliesDiv);
    }
    return commentSection;
}
