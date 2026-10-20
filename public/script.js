const API_URL = "/api/posts";

const form = document.getElementById("post-form");
const formTitle = document.getElementById("form-title");
const formMessage = document.getElementById("form-message");

const textarea = document.getElementById("post");
const postsList = document.getElementById("posts-list");

const submitBtn = document.getElementById("submit-btn");
const cancelBtn = document.getElementById("cancel-btn");



let editingId = null;


function showMessage(message, isError = false) {
  formMessage.textContent = message;
  formMessage.classList.toggle("error", isError);
  formMessage.hidden = false;
}

function renderPosts(posts) {
  if (posts.length === 0) {
    postsList.innerHTML = "<p class='state-message'>No posts yet. Create one!</p>";
    return;
  }

  postsList.innerHTML = posts.map((post) => `
    <article class="post-card">
      <div class="post-content">
        <p class="post-text">${post.text}</p>
        <p class="post-date">${new Date(post.createdAt).toLocaleDateString()}</p>
      </div>
      <div class="post-actions">
        <button class="button button-secondary" data-action="edit" data-id="${post._id}">Edit</button>
        <button class="button button-danger" data-action="delete" data-id="${post._id}">Delete</button>
      </div>
    </article>
  `).join("");
}


// Send request to fetch post 
async function loadPost() {
  try {
    postsList.innerHTML = "<p class='state-message'>Loading...</p>";
    // Sending request
    const response = await axios.get(API_URL);
    renderPosts(response.data);
  } catch (error) {
    postsList.innerHTML = "<p class='state-message'>Failed to load posts.</p>";
  }

}


// Creating Post by form submit 
form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const text = textarea.value.trim();

  try {
    if (editingId) {
      await axios.put(`${API_URL}/${editingId}`, { text });
      showMessage("Post Updated");
      resetForm();
    } else {
      await axios.post(`${API_URL}`, { text });
      showMessage("Post creatd");
      textarea.value = "";
    }

    loadPost();
  } catch (error) {
    showMessage("Something went wrong");
    console.error(error.response?.data?.error);
  }
})

// Cancel Button
cancelBtn.addEventListener("click", resetForm);

postsList.addEventListener("click", async (e) => {
  const btn = e.target.closest("[data-section]");
  if (!btn) return;

  const { id, data } = btn.dataset;

  if (action === "delete") {
    if (!confirm("Delete this post?")) return;
    try {
      await axios.delete(`${API_URL}/${id}`);
      loadPosts();
    } catch (err) {
      alert("Failed to delete post.");
    }
  }

  if (action === "edit") {
    editingId = id;
    textarea.value = btn.closest(".post-card").querySelector(".post-text").textContent;
    createBtn.textContent = "Update Post";
    cancelBtn.hidden = false;
    textarea.focus();
    window.scrollTo({ top: 0, behavior: "smooth" });

  }
})




function resetForm() {
  editingId = null;
  textarea.value = "";
  cancelBtn.hidden = true;
  createBtn.textContent = "Create Post";
}


loadPosts();