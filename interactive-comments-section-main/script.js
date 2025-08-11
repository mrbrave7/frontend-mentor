var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var _this = this;
var jsonData;
var commentData = function () { return __awaiter(_this, void 0, void 0, function () {
    var response, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, , 4]);
                return [4 /*yield*/, fetch('./data.json')];
            case 1:
                response = _a.sent();
                if (!response.ok) {
                    throw new Error("HTTP error! status: ".concat(response.status));
                }
                return [4 /*yield*/, response.json()];
            case 2: return [2 /*return*/, _a.sent()];
            case 3:
                error_1 = _a.sent();
                console.error('Failed to fetch data:', error_1);
                throw error_1; // Optionally rethrow the error or handle it as needed
            case 4: return [2 /*return*/];
        }
    });
}); };
var commentList = document.getElementById('comment-list');
var formContainer = document.getElementById('form-container');
formContainer.innerHTML = ''; // Clear the form container
var getData = function () { return __awaiter(_this, void 0, void 0, function () {
    var data, userForm, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, , 4]);
                return [4 /*yield*/, commentData()];
            case 1:
                data = _a.sent();
                console.log(data);
                jsonData = data;
                return [4 /*yield*/, renderCommentForm(data.currentUser, "newComment", undefined)];
            case 2:
                userForm = _a.sent();
                formContainer.appendChild(userForm);
                renderComments(data.comments);
                return [3 /*break*/, 4];
            case 3:
                error_2 = _a.sent();
                console.error('Error in getData:', error_2);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
getData();
function renderComments(comments) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            commentList.innerHTML = ''; // Clear the comment list
            comments.forEach(function (comment) {
                var commentElement = renderSingleComment(comment);
                commentList.appendChild(commentElement);
                if (comment.replies && comment.replies.length > 0) {
                    var repliesContainer_1 = document.createElement('div');
                    repliesContainer_1.classList.add('replies');
                    comment.replies.forEach(function (reply) {
                        var replyElement = renderSingleComment(reply);
                        repliesContainer_1.appendChild(replyElement);
                    });
                    commentElement.appendChild(repliesContainer_1);
                }
            });
            return [2 /*return*/];
        });
    });
}
function renderSingleComment(comment) {
    var _a, _b, _c, _d, _e;
    var commentElement = document.createElement('div');
    commentElement.classList.add('comment');
    commentElement.innerHTML = "\n        <div class=\"comment-header\">\n            <div class=\"comment-score\">\n                <button class=\"increment\">+</button>\n                <p>".concat(comment.score, "</p>\n                <button class=\"decrement\">-</button>\n            </div>\n            <div class=\"comment-body\">  \n            <div class=\"comment-head\">\n                    <div class=\"comment-user\">\n                    <img src=\"").concat(comment.user.image.png, "\" alt=\"").concat(comment.user.username, "\" class=\"rounded-circle\">\n                        <h5>").concat(comment.user.username, "</h5>\n                        ").concat(comment.user.username === jsonData.currentUser.username ? '<span class="badge bg-primary">You</span>' : '', "\n                        <span>").concat(comment.createdAt, "</span>\n                    </div>\n                    <div class=\"comment-actions\">\n                    ").concat(comment.user.username === jsonData.currentUser.username ? "\n                        <button class=\"btn btn-link delete-btn\"> <span><svg width=\"12\" height=\"14\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M1.167 12.448c0 .854.7 1.552 1.555 1.552h6.222c.856 0 1.556-.698 1.556-1.552V3.5H1.167v8.948Zm10.5-11.281H8.75L7.773 0h-3.88l-.976 1.167H0v1.166h11.667V1.167Z\" fill=\"#ED6368\"/></svg>\n                        </span> Delete</button>\n                        <button class=\"btn btn-link edit-btn\"> <span><svg width=\"14\" height=\"14\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M13.479 2.872 11.08.474a1.75 1.75 0 0 0-2.327-.06L.879 8.287a1.75 1.75 0 0 0-.5 1.06l-.375 3.648a.875.875 0 0 0 .875.954h.078l3.65-.333c.399-.04.773-.216 1.058-.499l7.875-7.875a1.68 1.68 0 0 0-.061-2.371Zm-2.975 2.923L8.159 3.449 9.865 1.7l2.389 2.39-1.75 1.706Z\" fill=\"#5357B6\"/></svg></span>Edit</button>" :
        "\n        <button class=\"btn btn-link reply-btn\"> <span><svg width=\"14\" height=\"13\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M.227 4.316 5.04.16a.657.657 0 0 1 1.085.497v2.189c4.392.05 7.875.93 7.875 5.093 0 1.68-1.082 3.344-2.279 4.214-.373.272-.905-.07-.767-.51 1.24-3.964-.588-5.017-4.829-5.078v2.404c0 .566-.664.86-1.085.496L.227 5.31a.657.657 0 0 1 0-.993Z\" fill=\"#5357B6\"/></svg></span> Reply</button>\n        ", "\n                    </div>\n                    </div>\n                <div class=\"comment-content\">\n                    <p>").concat(comment.replyingTo ? "<span>@".concat(comment.replyingTo, "</span> ") : '').concat(comment.content, "</p>\n                </div>\n                \n                    </div>\n                    </div>\n        ");
    (_a = commentElement.querySelector('.increment')) === null || _a === void 0 ? void 0 : _a.addEventListener('click', function () { return incrementScore(comment.id); });
    (_b = commentElement.querySelector('.decrement')) === null || _b === void 0 ? void 0 : _b.addEventListener('click', function () { return decrementScore(comment.id); });
    (_c = commentElement.querySelector('.delete-btn')) === null || _c === void 0 ? void 0 : _c.addEventListener('click', function () { return deleteComment(comment.id); });
    (_d = commentElement.querySelector('.edit-btn')) === null || _d === void 0 ? void 0 : _d.addEventListener('click', function () { return editComment(commentElement, comment.id); });
    (_e = commentElement.querySelector('.reply-btn')) === null || _e === void 0 ? void 0 : _e.addEventListener('click', function () { return addReplyForm(comment, commentElement, comment.user.username); });
    return commentElement;
}
function renderCommentForm(currentUser, commentType, commentId, replyingTo) {
    return __awaiter(this, void 0, void 0, function () {
        var form, contentValue;
        return __generator(this, function (_a) {
            form = document.createElement('form');
            form.id = 'comment-form';
            form.innerHTML = "\n        <img src=\"".concat(currentUser.image.png, "\" alt=\"").concat(currentUser.username, "\" class=\"rounded-circle\">\n        <textarea id=\"comment\" name=\"comment\" placeholder=\"Add a comment...\" class=\"form-control\" required=\"true\"></textarea>\n        <button type=\"submit\" class=\"btn btn-primary\">Send</button>\n    ");
            // Handle form submission
            console.log(commentType);
            form.onsubmit = function (e) {
                e.preventDefault();
                var content = form.querySelector("#comment");
                contentValue = content.value;
                if (commentType === 'newComment') {
                    addNewComment(contentValue);
                }
                else if (commentType === 'addReply') {
                    console.log(commentId);
                    addNewReplies(contentValue, commentId, replyingTo);
                }
                content.value = "";
            };
            return [2 /*return*/, form]; // Return the created form
        });
    });
}
function addNewComment(content) {
    var newComment = {
        id: Date.now(),
        content: content,
        createdAt: 'Just now',
        score: 0,
        user: jsonData.currentUser,
        replies: [],
    };
    jsonData.comments.push(newComment);
    renderComments(jsonData.comments);
}
function addNewReplies(content, commentId, replyingTo) {
    var newReply = {
        id: Date.now(),
        content: content,
        createdAt: 'Just now',
        score: 0,
        user: jsonData.currentUser,
        replyingTo: replyingTo,
        replies: [],
    };
    jsonData.comments.forEach(function (comment) {
        if (comment.id === commentId) {
            comment.replies.push(newReply);
        }
        comment.replies.forEach(function (reply) {
            if (reply.id === commentId) {
                comment.replies.push(newReply);
            }
        });
    });
    renderComments(jsonData.comments);
}
// Add Reply
function addReplyForm(comment, commentElement, replyingTo) {
    return __awaiter(this, void 0, void 0, function () {
        var existingForm, form, repliesSection;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    existingForm = commentElement.querySelector("#comment-form");
                    if (existingForm)
                        return [2 /*return*/]; // Prevent multiple forms for the same comment
                    return [4 /*yield*/, renderCommentForm(jsonData.currentUser, "addReply", comment.id, replyingTo)];
                case 1:
                    form = _a.sent();
                    repliesSection = commentElement.querySelector(".replies");
                    if (repliesSection) {
                        commentElement.insertBefore(form, repliesSection);
                    }
                    else {
                        commentElement.appendChild(form);
                    }
                    return [2 /*return*/];
            }
        });
    });
}
// Delete Comment/Reply
function deleteComment(commentId) {
    jsonData.comments = jsonData.comments.filter(function (comment) {
        if (comment.id !== commentId) {
            comment.replies = comment.replies.filter(function (reply) { return reply.id !== commentId; });
            return true;
        }
        return false;
    });
    renderComments(jsonData.comments);
}
// Edit Comment/Reply
function editComment(comment, commentId) {
    var contentElement = comment.querySelector(".comment-content");
    var button = document.createElement("button");
    button.className = 'btn btn-primary';
    button.innerText = 'Update';
    if (contentElement === null || contentElement === void 0 ? void 0 : contentElement.contains(button))
        return;
    contentElement === null || contentElement === void 0 ? void 0 : contentElement.appendChild(button);
    var paragraph = contentElement === null || contentElement === void 0 ? void 0 : contentElement.querySelector('p');
    paragraph === null || paragraph === void 0 ? void 0 : paragraph.classList.add("editable");
    paragraph === null || paragraph === void 0 ? void 0 : paragraph.contentEditable = true;
    button.addEventListener("click", function () {
        var paragraphText = paragraph === null || paragraph === void 0 ? void 0 : paragraph.innerText.trim();
        paragraph === null || paragraph === void 0 ? void 0 : paragraph.contentEditable = false;
        paragraph === null || paragraph === void 0 ? void 0 : paragraph.classList.remove('editable');
        var content = removeFirstWord(paragraphText);
        updateComment(content, commentId);
        button.remove();
    });
}
function updateComment(content, commentId) {
    jsonData.comments.forEach(function (comment) {
        if (comment.id == commentId) {
            comment.content = content;
            return renderComments(jsonData.comments);
        }
        else {
            comment.replies.forEach(function (reply) {
                if (reply.id == commentId) {
                    reply.content = content;
                    return renderComments(jsonData.comments);
                }
            });
        }
    });
}
// Increment Score
function incrementScore(commentId) {
    jsonData.comments.forEach(function (comment) {
        if (comment.id === commentId) {
            comment.score++;
            renderComments(jsonData.comments);
        }
        else {
            comment.replies.forEach(function (reply) {
                if (reply.id === commentId) {
                    reply.score++;
                    renderComments(jsonData.comments);
                }
            });
        }
    });
}
// Decrement Score
function decrementScore(commentId) {
    jsonData.comments.forEach(function (comment) {
        if (comment.id === commentId) {
            comment.score--;
            renderComments(jsonData.comments);
        }
        else {
            comment.replies.forEach(function (reply) {
                if (reply.id === commentId) {
                    reply.score--;
                    renderComments(jsonData.comments);
                }
            });
        }
    });
}
document.addEventListener("click", function (event) {
    var commentForm = document.querySelector(".comment form");
    if (!commentForm)
        return;
    else {
        var targeted = event.target;
        if (targeted.parentElement.id === 'comment-form' || targeted.parentElement.className === 'comment' || targeted.classList.contains('reply-btn')) {
            console.log("clicked on the form");
        }
        else {
            commentForm.remove();
            renderComments(jsonData.comments);
        }
    }
});
function removeFirstWord(text) {
    // Split the string by spaces and remove the first element (word)
    var words = text.split(" ");
    words.shift(); // Removes the first word
    return words.join(" "); // Joins the remaining words back into a string
}
