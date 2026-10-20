const API_URL = "/api/posts";

const form = document.getElementById("post-form");
const formTitle = document.getElementById("form-title");
const formMessage = document.getElementById("form-message");

const postInput = document.getElementById("post");
const postsList = document.getElementById("posts-list");

const submitButton = document.getElementById("submit-btn");
const cancelButton = document.getElementById("cancel-btn");


function resetForm() {
  editingPostId = null;
  form.reset();
  formTitle.textContent = "Create post";
  submitButton.textContent = "Create post";
  cancelButton.hidden = true;
  formMessage.hidden = true;
  formMessage.textContent = "";
}


function showMessage(message, isError = false) {
  formMessage.textContent = message;
  formMessage.classList.toggle("error", isError);
  formMessage.hidden = false;
}