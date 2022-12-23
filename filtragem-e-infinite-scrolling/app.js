const postsContainer = document.getElementById("posts-container");
const loaderContainer = document.querySelector(".loader");
const filterInput = document.getElementById("filter");

let page = 1;

const getPosts = async () => {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/posts/?_limit=5&_page=${page}`
  );
  // const data = await response.json();
  // return data;
  return response.json();
};

const addPostsIntoDOM = async () => {
  const posts = await getPosts();
  const postsTemplate = posts
    .map(
      ({ id, title, body }) => `
        <div class="post">
            <div class="number"> ${id}</div>
            <div class="post-info">
                <h2 class="post-title">${title}</h2>
                <p class="post-body">${body}</p>
            </div>

        </div>
        `
    )
    .join("");

  postsContainer.innerHTML += postsTemplate;
};

addPostsIntoDOM();

const getNextPosts =  () => {
  setTimeout(()=>{
    page++;
    addPostsIntoDOM();
  }, 300)
}

const removeLoader = () => {
  setTimeout(() => {
    loaderContainer.classList.remove("show");
    getNextPosts()
  }, 1000);
};

const showLoader = () => {
  loaderContainer.classList.add("show");
  removeLoader();
};

window.addEventListener("scroll", () => {
  const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
  const isPageBottomAlmostReached =
    scrollTop + clientHeight >= scrollHeight - 10;

  if (isPageBottomAlmostReached) {
    showLoader();
  }
});


// closure de searchTerm
const showPostIfMAtchInputValue = searchTerm => post => {
  const postTitle = post.querySelector(".post-title").textContent.toLowerCase();
  const postBody = post.querySelector(".post-body").textContent.toLowerCase();

  if (postTitle.includes(searchTerm) || postBody.includes(searchTerm)) {
    post.style.display = "flex";
  } else {
    post.style.display = "none";
  }
}

const handleInputValue = (e) => {
  const searchTerm = e.target.value.toLowerCase();
  const posts = document.querySelectorAll(".post");

  // closure de searchTerm
  posts.forEach(showPostIfMAtchInputValue(searchTerm));
}

filterInput.addEventListener("input", handleInputValue)
