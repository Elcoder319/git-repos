
// Start Get Repos From Github 
let theInput = document.querySelector(".get-repos input"),
getBtn = document.querySelector(".get-btn"),
reposData = document.querySelector(".show-data"),
container = document.querySelector(".container");

// Get Repos function
getBtn.onclick = function () {
    getRepos();
  }

function getRepos(){
    if(theInput.value == ""){
        reposData.innerHTML = "<span>Please Enter Github Username</span>";
    }else if (! window.navigator.onLine) {
        reposData.innerHTML = "<span>Check Your Internet Connection</span>";
    }
    else {
        fetch(`https://api.github.com/users/${theInput.value}/repos`)
        .then((response)=> {
            return response.json();
        }).then((repository)=>{
            console.log(repository)
            reposData.innerHTML = "";
            // loop on repositories
            repository.forEach(repo=>{
                // console.log(repo.name)
                // create main div 
                
                
                let mainDiv = document.createElement("div"),
                 repoName = document.createElement("div"),
                repoText = document.createTextNode(repo.name);
                repoName.className = "repo-name";
                repoName.appendChild(repoText);
                // Append The Text to the main div
                mainDiv.appendChild(repoName);
                // Create repo url
                 let theUrl = document.createElement("a");
                //  Create Repo Url Text
                let theUrlText = document.createTextNode("Visit");
                // Append The Url Text
                theUrl.appendChild(theUrlText);
                // Add The hypertext Referance
                theUrl.href = `https://github.com/${theInput.value}/${repo.name}`;
                // Set Attribute Blank
                theUrl.setAttribute("target", "_blank");
                // Append url to main div 
                mainDiv.appendChild(theUrl);
                 
                // Create the stars repos 
                let starsSpan = document.createElement("span");
                // Create the stas repos text

                let starsText = document.createTextNode(`${repo.stargazers_count}`),
                iconStars = document.createElement("i");
                iconStars.className = `fa-solid fa-star`;
                starsSpan.appendChild(iconStars);
                // Add StarsTExt to starsRepo
                starsSpan.appendChild(starsText);
                // Append StarsSpan to mainDiv
                // create language
                mainDiv.appendChild(starsSpan)
                if (repo.language) {
                    let lang = document.createElement("div"),
                    langText = document.createTextNode(`${repo.language}`),
                    iconLang = document.createElement("i");
                    iconLang.className = `fa-solid fa-code`;
                    lang.appendChild(iconLang)
                    lang.className = "lang";
                    lang.appendChild(langText);
                    mainDiv.appendChild(lang)
                }

                let watch = document.createElement("div"),
                watchText = document.createTextNode(`${repo.watchers}`),
                Iconwatch = document.createElement("i");
                Iconwatch.className = `fa-regular fa-eye`;
                watch.appendChild(Iconwatch)
                watch.className = "watch";
                watch.appendChild(watchText);
                mainDiv.appendChild(watch)

                let created = document.createElement("div"),
                createdText = document.createTextNode(`Created in ${repo.created_at}`);
                created.className = "created"
                created.appendChild(createdText)
                mainDiv.appendChild(created);

                let updatedAt = document.createElement("div"),
                updatedtext = document.createTextNode(`Updatte in ${repo.updated_at}`);
                updatedAt.className = "updatedAt"
                updatedAt.appendChild(updatedtext)
                mainDiv.appendChild(updatedAt);

                let visibility = document.createElement("div"),
                visibilityText = document.createTextNode(`visibility ${repo.visibility}`);
                visibility.className = "visibility"
                visibility.appendChild(visibilityText)
                mainDiv.appendChild(visibility);
                // append the main div to container 
                reposData.appendChild(mainDiv)

                mainDiv.classList.add("repo-box")
            })
        })

    }
}
