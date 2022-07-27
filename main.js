

const html = document.querySelector(".content")


const input = document.querySelector(".input")

input.addEventListener("keyup", (e)=>{
    githubUser = e.target.value
    

    const githubApi = `https://api.github.com/users/${githubUser}`

    fetch(githubApi, {
        method:'GET',
        headers:{'Accept':'application/vnd.github.v3+json'}
    })
    .then(response=>{
        response.json().then(body=>{
            if(response.status === 200){
                const name = body.name ? body.name : 'No Name';
                const bio = body.bio ? body.bio : 'No Bio';
                const location = body.location ? body.location : 'No Location'
                const repos = body.public_repos ? body.public_repos : 'No Repo'
                const html_url = body.html_url ? body.html_url : '#'
                const card = `
                <div class="content-card">
                <div class="content-card-image-wrapper">
                <div class="content-card-img-blur" style="background:url(${body.avatar_url}); background-size:cover; background-position:50% 0"></div>
                <div class="content-card-image">
                    <img src=${body.avatar_url} alt="avatar"/>
                </div>
                </div>
                <div class="content-card-details-wrapper">
                    <div class="content-card-details">
                        <div class="content-card-details-grade">
                            <a class="material-icons" href=${html_url}>grade</a>
                        </div>
                        <div class="content-card-details-header">
                            <div>
                                <h1>${name}</h1>
                                <p>${bio}</p>
                            </div>
                        </div>
                        <div class="content-card-details-body">
                            <div class="content-card-details-body-list">
                                <div class="content-card-details-body-list-icon">
                                    <span class="material-icons">perm_identity</span>
                                </div>
                                <div class="content-card-details-body-list-pag">
                                    <p>ID</p>
                                    <p>${body.id}</p>
                                </div>
                            </div>
                            <div class="content-card-details-body-list">
                                <div class="content-card-details-body-list-icon">
                                    <span class="material-icons">store</span>
                                </div>
                                <div class="content-card-details-body-list-pag">
                                    <p>Repository</p>
                                    <p>${repos}</p>
                                </div>
                            </div>
                            <div class="content-card-details-body-list">
                                <div class="content-card-details-body-list-icon">
                                    <span class="material-icons">location_on</span>
                                </div>
                                <div class="content-card-details-body-list-pag">
                                    <p>Location</p>
                                    <p>${location}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            `
                html.innerHTML = card
                return;
            }
            else if(response.status === 403){
                return console.log("Limit Reached")
            }
            return console.log("User not Found")

        })
        .catch(err=>console.log("inner error:", err))
    })
    .catch(err=>{
        console.log("error:", err)
    }) 
})
 

