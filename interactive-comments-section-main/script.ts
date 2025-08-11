interface Image {
    png: string;
    webp: string;
}

interface User {
    image: Image;
    username: string;
}

interface Comment {
    id: number;
    content: string;
    createdAt: string;
    score: number;
    user: User;
    replyingTo?: string; // Optional field for replies
    replies: Comment[];  // Nested comments
}

interface Data {
    currentUser: User;
    comments: Comment[];
}

var jsonData: Data;

const commentData = async (): Promise<Data> => {
    try {
        const response = await fetch('./data.json'); // Correct file name
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error('Failed to fetch data:', error);
        throw error; // Optionally rethrow the error or handle it as needed
    }
};

const commentList = document.getElementById('comment-list') as HTMLElement;
const formContainer = document.getElementById('form-container') as HTMLElement;
formContainer.innerHTML = ''; // Clear the form container
const getData = async (): Promise<void> => {
    try {
        const data = await commentData();
        console.log(data);
        jsonData = data;
        const userForm = await renderCommentForm(data.currentUser, "newComment", undefined);
        formContainer.appendChild(userForm);
        renderComments(data.comments);
    } catch (error) {
        console.error('Error in getData:', error);
    }
};

getData();

async function renderComments(comments: Comment[]): Promise<void> {
    commentList.innerHTML = ''; // Clear the comment list
    comments.forEach((comment) => {
        const commentElement = renderSingleComment(comment);
        commentList.appendChild(commentElement);
        if (comment.replies && comment.replies.length > 0) {
            const repliesContainer = document.createElement('div');
            repliesContainer.classList.add('replies');
            comment.replies.forEach((reply) => {
                const replyElement = renderSingleComment(reply);
                repliesContainer.appendChild(replyElement);
            });
            commentElement.appendChild(repliesContainer);
        }
    });
}

function renderSingleComment(comment: Comment): HTMLDivElement {
    const commentElement = document.createElement('div');
    commentElement.classList.add('comment');
    commentElement.innerHTML = `
        <div class="comment-header">
            <div class="comment-score">
                <button class="increment">+</button>
                <p>${comment.score}</p>
                <button class="decrement">-</button>
            </div>
            <div class="comment-body">  
            <div class="comment-head">
                    <div class="comment-user">
                    <img src="${comment.user.image.png}" alt="${comment.user.username}" class="rounded-circle">
                        <h5>${comment.user.username}</h5>
                        ${comment.user.username === jsonData.currentUser.username ? '<span class="badge bg-primary">You</span>' : ''}
                        <span>${comment.createdAt}</span>
                    </div>
                    <div class="comment-actions">
                    ${comment.user.username === jsonData.currentUser.username ? `
                        <button class="btn btn-link delete-btn"> <span><svg width="12" height="14" xmlns="http://www.w3.org/2000/svg"><path d="M1.167 12.448c0 .854.7 1.552 1.555 1.552h6.222c.856 0 1.556-.698 1.556-1.552V3.5H1.167v8.948Zm10.5-11.281H8.75L7.773 0h-3.88l-.976 1.167H0v1.166h11.667V1.167Z" fill="#ED6368"/></svg>
                        </span> Delete</button>
                        <button class="btn btn-link edit-btn"> <span><svg width="14" height="14" xmlns="http://www.w3.org/2000/svg"><path d="M13.479 2.872 11.08.474a1.75 1.75 0 0 0-2.327-.06L.879 8.287a1.75 1.75 0 0 0-.5 1.06l-.375 3.648a.875.875 0 0 0 .875.954h.078l3.65-.333c.399-.04.773-.216 1.058-.499l7.875-7.875a1.68 1.68 0 0 0-.061-2.371Zm-2.975 2.923L8.159 3.449 9.865 1.7l2.389 2.39-1.75 1.706Z" fill="#5357B6"/></svg></span>Edit</button>` :
            `
        <button class="btn btn-link reply-btn"> <span><svg width="14" height="13" xmlns="http://www.w3.org/2000/svg"><path d="M.227 4.316 5.04.16a.657.657 0 0 1 1.085.497v2.189c4.392.05 7.875.93 7.875 5.093 0 1.68-1.082 3.344-2.279 4.214-.373.272-.905-.07-.767-.51 1.24-3.964-.588-5.017-4.829-5.078v2.404c0 .566-.664.86-1.085.496L.227 5.31a.657.657 0 0 1 0-.993Z" fill="#5357B6"/></svg></span> Reply</button>
        `
        }
                    </div>
                    </div>
                <div class="comment-content">
                    <p>${comment.replyingTo ? `<span>@${comment.replyingTo}</span> ` : ''}${comment.content}</p>
                </div>
                
                    </div>
                    </div>
        `;
    commentElement.querySelector('.increment')?.addEventListener('click', () => incrementScore(comment.id));
    commentElement.querySelector('.decrement')?.addEventListener('click', () => decrementScore(comment.id));
    commentElement.querySelector('.delete-btn')?.addEventListener('click', () => deleteComment(comment.id));
    commentElement.querySelector('.edit-btn')?.addEventListener('click', () => editComment(commentElement, comment.id));
    commentElement.querySelector('.reply-btn')?.addEventListener('click', () => addReplyForm(comment, commentElement, comment.user.username));

    return commentElement;
}

async function renderCommentForm(currentUser: User, commentType: string, commentId: number | undefined, replyingTo: string): Promise<HTMLFormElement> {
    const form = document.createElement('form');
    form.id = 'comment-form';
    form.innerHTML = `
        <img src="${currentUser.image.png}" alt="${currentUser.username}" class="rounded-circle">
        <textarea id="comment" name="comment" placeholder="Add a comment..." class="form-control" required="true"></textarea>
        <button type="submit" class="btn btn-primary">Send</button>
    `;
    // Handle form submission
    console.log(commentType);
    let contentValue: string
    form.onsubmit = (e) => {
        e.preventDefault()
        const content = form.querySelector("#comment") as HTMLTextAreaElement
        contentValue = content.value
        if (commentType === 'newComment') {
            addNewComment(contentValue)
        }
        else if (commentType === 'addReply') {
            console.log(commentId);
            addNewReplies(contentValue, commentId, replyingTo)
        }
        content.value = ""
    }
    return form; // Return the created form
}

function addNewComment(content: string): void {
    const newComment: Comment = {
        id: Date.now(),
        content,
        createdAt: 'Just now',
        score: 0,
        user: jsonData.currentUser,
        replies: [],
    };

    jsonData.comments.push(newComment);
    renderComments(jsonData.comments);
}

function addNewReplies(content: string, commentId: number | undefined, replyingTo: string): void {
    const newReply: Comment = {
        id: Date.now(),
        content,
        createdAt: 'Just now',
        score: 0,
        user: jsonData.currentUser,
        replyingTo: replyingTo,
        replies: [],
    };
    jsonData.comments.forEach((comment) => {
        if (comment.id === commentId) {
            comment.replies.push(newReply)
        }
        comment.replies.forEach((reply) => {
            if (reply.id === commentId) {
                comment.replies.push(newReply)
            }
        })
    })
    renderComments(jsonData.comments);
}

// Add Reply
async function addReplyForm(comment: Comment, commentElement: HTMLElement, replyingTo: string): Promise<void> {
    const existingForm = commentElement.querySelector("#comment-form");
    if (existingForm) return; // Prevent multiple forms for the same comment

    const form = await renderCommentForm(jsonData.currentUser, "addReply", comment.id, replyingTo);
    const repliesSection = commentElement.querySelector(".replies") as HTMLElement
    if (repliesSection) {
        commentElement.insertBefore(form, repliesSection);
    } else {
        commentElement.appendChild(form)
    }
}

// Delete Comment/Reply
function deleteComment(commentId: number): void {
    jsonData.comments = jsonData.comments.filter((comment) => {
        if (comment.id !== commentId) {
            comment.replies = comment.replies.filter((reply) => reply.id !== commentId);
            return true;
        }
        return false;
    });
    renderComments(jsonData.comments);
}


// Edit Comment/Reply
function editComment(comment: HTMLElement, commentId: number): void {
    const contentElement = comment.querySelector(".comment-content")
    const button = document.createElement("button") as HTMLButtonElement
    button.className = 'btn btn-primary'
    button.innerText = 'Update'
    if (contentElement?.contains(button)) return
    contentElement?.appendChild(button)
    const paragraph = contentElement?.querySelector('p')
    paragraph?.classList.add("editable")
    paragraph?.contentEditable = true

    button.addEventListener("click", () => {
        const paragraphText: string | undefined = paragraph?.innerText.trim()
        paragraph?.contentEditable = false
        paragraph?.classList.remove('editable')
        const content: string = removeFirstWord(paragraphText)
        updateComment(content, commentId)
        button.remove()
    })

}

function updateComment(content: string, commentId: number) {
    jsonData.comments.forEach(comment => {
        if (comment.id == commentId) {
            comment.content = content
            return renderComments(jsonData.comments)
        }
        else {
            comment.replies.forEach((reply) => {
                if (reply.id == commentId) {
                    reply.content = content
                    return renderComments(jsonData.comments)
                }
            })
        }
    });
}

// Increment Score
function incrementScore(commentId: number): void {
    jsonData.comments.forEach((comment) => {
        if (comment.id === commentId) {
            comment.score++;
            renderComments(jsonData.comments);
        }
        else {
            comment.replies.forEach((reply) => {
                if (reply.id === commentId) {
                    reply.score++;
                    renderComments(jsonData.comments);
                }
            });
        }
    }
}

// Decrement Score
function decrementScore(commentId: number): void {
    jsonData.comments.forEach((comment) => {
        if (comment.id === commentId) {
            comment.score--;
            renderComments(jsonData.comments);
        }
        else {
            comment.replies.forEach((reply) => {
                if (reply.id === commentId) {
                    reply.score--;
                    renderComments(jsonData.comments);
                }
            });
        }
    }
},

document.addEventListener("click", (event) => {
    const commentForm = document.querySelector(".comment form") as HTMLFormElement
    if (!commentForm) return
    else {
        const targeted = event.target as EventTarget
        if (targeted.parentElement.id === 'comment-form' || targeted.parentElement.className === 'comment' || targeted.classList.contains('reply-btn')) {
            console.log("clicked on the form");
        }
        else {
            commentForm.remove()
            renderComments(jsonData.comments)
        }
    }
});

function removeFirstWord(text: string): string {
    // Split the string by spaces and remove the first element (word)
    const words = text.split(" ");
    words.shift(); // Removes the first word
    return words.join(" "); // Joins the remaining words back into a string
}