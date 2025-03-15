const githubUser = document.querySelector(".gitHubUser");
const input = document.getElementById("userName");
const searchBtn = document.getElementById("search");
const profileContainer = document.querySelector(".profileContainer");
const teamToggle = document.getElementById("darkMode");

function updateSavedText(theme) {
  if (theme === "dark") {
    teamToggle.innerHTML = ` <img src="assets/svg/lightMode.svg" alt="">`;
  } else {
    teamToggle.innerHTML = ` <img src="assets/svg/darkMode (2).svg" alt="" />`;
  }
}

function appleSavedTheme() {
  const currentTheme = localStorage.getItem("theme") || "light";

  document.body.classList.toggle("dark", currentTheme === "dark");

  updateSavedText(currentTheme);
}

teamToggle.addEventListener("click", function () {
  const isDarkmode = document.body.classList.toggle("dark");

  localStorage.setItem("theme", isDarkmode ? "dark" : "light");
  updateSavedText(isDarkmode ? "dark" : "light");
});

searchBtn.addEventListener("click", () => {
  const username = input.value.trim();
  if (!username) {
    alert("Input is empty");
  }
  if (username) {
    profileContainer.classList.add("bottomContainer");
  }

  const url = `https://api.github.com/users/${username}`;
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      githubUser.innerHTML = `
       <div class="searchGitub">
      <div class="gitHubUser">
        <div class="searchWrapper">
          <input
            type="text"
            id="userName"
            placeholder="Search GitHub username…"
          />
          <img
            class="searchIcon"
            src="assets/svg/Combined Shape (1).svg"
            alt=""
          />
          <button id="search">Search</button>
        </div>

        <div class="profileContainer">
          <div class="topContainer">
            <div class="fotoContainer">
              <img
                class="profilePhoto"
                src="${data.avatar_url}"
                alt="profilePhoto"
              />
            </div>

            <div class="profileInfo">
              <div class="nameAndJoin">
                <p class="username">${data.name}</p>
                <p class="joinDate">${data.created_at}</p>
              </div>
              <div class="bioContainer">
                <p>${data.bio}</p>
              </div>
            </div>
          </div>

          <div class="footerContainer">
            <div class="followerCountContainer">
              <div class="repo">
                <p class="title">Repos</p>
                  <p class="counts">${data.public_repos}</p>
              </div>
              <div class="follower">
                <p class="title">Followers</p>
                <p class="counts"${data.followers}></p>
              </div>
              <div class="following">
                <p class="title">Following</p>
                <p class="counts">${data.following}</p>
              </div>
            </div>
            <div class="usefullLinks">
              <div class="locationAndGithub">
                <div class="location">
                  <img src="assets/svg/location.svg" alt="" />
                  <p>${data.location}</p>
                </div>
                <div class="github">
                  <img src="assets/svg/github.svg" alt="" />
                  <a class="githubLink" href="${data.blog}"></a>
                </div>
              </div>
              <div class="socMedia">
                <div class="twitter">
                  <img src="assets/svg/twitter (2).svg" alt="twitter" />
                  <p>${data.twitter_username}</p>
                </div>
                <div class="githubWebsite">
                  <img src="assets/svg/building.svg" alt="" />
                  <p>${data.company}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
        
      `;
    })
    .catch((error) => alert("user not found"));
});
