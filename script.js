const REPOS = document.getElementById("repos");
const INPUT = document.getElementById("input-word");

function showRepos() {
    let githubApiUrl = 'https://api.github.com/search/repositories?q=stars:%3E1&sort=stars';

    fetch(githubApiUrl)
        .then((response) => response.json())
        .then((data) => {
            REPOS.innerHTML = '<!-- Code injected by script.js -->';
            console.log(data);
            for (let i = 0; i < data.items.length; i++) {
                let cardHtml = `<div class="card">`;
                let updatedDate = new Date(data.items[i].updated_at);
                let createdDate = new Date(data.items[i].created_at);
                let options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };

                cardHtml = cardHtml + `<h3 id="project-name">${data.items[i].name}</h3>`;
                cardHtml = cardHtml + `<h4 id="stargazers">⭐${data.items[i].stargazers_count}</h4>`;
                cardHtml = cardHtml + `<h5>Updated: ${updatedDate.toLocaleDateString('en-US', options)}</h5>`;
                cardHtml = cardHtml + `<h5>Created: ${createdDate.toLocaleDateString('en-US', options)}</h5>`;

                if (data.items[i].description !== null) {
                    cardHtml = cardHtml + ` <p>${data.items[i].description}</p>`;
                }

                cardHtml = cardHtml + `<br><div class="links">`;
                cardHtml = cardHtml + `<a id="project-url" href="${data.items[i].html_url}" target="_blank">Source Code</a>`;

                if (data.items[i].homepage !== "" && data.items[i].homepage !== null) {
                    cardHtml = cardHtml + ` <a id="project-live" href="${data.items[i].homepage}" target="_blank">Website</a>`;
                } else {
                    cardHtml = cardHtml + `<a class="no-link" href="#">Website</a>`;
                }

                cardHtml = cardHtml + `</div></div>`;
                REPOS.insertAdjacentHTML("beforeend", cardHtml);
            }
        })
}
showRepos();