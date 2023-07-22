
// Start Get Repos From Github 
let theInput = document.querySelector(".get-repos input"),
getBtn = document.querySelector(".get-btn"),
reposData = document.querySelector(".show-data");

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
            // console.log(repository)
            reposData.innerHTML = "";
            // loop on repositories
            repository.forEach(repo=>{
                // console.log(repo.name)
                // create main div 
                let mainDiv = document.createElement("div");

                let repoName = document.createTextNode(repo.name);
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
                let starsText = document.createTextNode(`Stars ${repo.stargazers_count}`);

                // Add StarsTExt to starsRepo
                starsSpan.appendChild(starsText);
                // Append StarsSpan to mainDiv
                mainDiv.appendChild(starsSpan)
                mainDiv.classList.add("repo-box")
                // append the main div to container 
                reposData.appendChild(mainDiv)
            })
        })

    }
}