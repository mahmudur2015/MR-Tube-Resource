

const showLoader=()=>{
    document.getElementById("loader").classList.remove("hidden");
    document.getElementById("video-container").classList.add("hidden");
}

const hideLoader=()=>{
    document.getElementById("loader").classList.add("hidden");
    document.getElementById("video-container").classList.remove("hidden");
}

function removeActiveClass() {
    const activeButtons = Array.from(document.getElementsByClassName("active"));
    for (let btn of activeButtons) {
        btn.classList.remove("active");
    }
}


function loadCategories() {
    fetch("https://openapi.programming-hero.com/api/phero-tube/categories")
        .then((res) => res.json())
        .then((data) => displayCategories(data.categories));

}

// Display video categories
function displayCategories(categories) {

    const categoryContainer = document.getElementById("category-container");

    for (const cate of categories) {

        const categoryDiv = document.createElement("div");

        categoryDiv.innerHTML = `     
         <button id="btn-${cate.category_id}" onclick="loadCategoryVideos(${cate.category_id})" class="btn btn-sm hover:bg-[#FF1F3D] hover:text-white">${cate.category}</button>
        `
        categoryContainer.append(categoryDiv);

    }
}

function loadVideos(searchText = "") {
    showLoader();

    fetch(`https://openapi.programming-hero.com/api/phero-tube/videos?title=${searchText}`)
        .then((res) => res.json())
        .then((data) => {

            removeActiveClass();
            document.getElementById("btn-all").classList.add("active");
            displayVideos(data.videos);
        });
}

const displayVideos = (videos) => {
    // console.log(videos);
    const videoContainer = document.getElementById("video-container");

    videoContainer.innerHTML = "";
    if (videos.length == 0) {
        videoContainer.innerHTML = `
         <div class=" col-span-full flex flex-col text-center justify-center items-center py-20">
            <img class="w-[120px]" src="assets/Icon.png" alt="">
            <h2 class="text-2xl font-bold">Oops!! Sorry, There is no content here</h2>
        </div>
        `
        hideLoader();
        return;
    }

    videos.forEach(video => {
        console.log(video);
        const videoCard = document.createElement("div");
        videoCard.innerHTML = `
            <div class="card bg-base-100 ">
            <figure class="relative">
                <img  src="${video.thumbnail}" class="w-full h-[160px] object-cover" alt="hdvideos" />
                <span class="absolute bottom-2 right-2 text-sm text-white bg-black px-2 rounded">3hrs 56 min ago</span>
            </figure>
            <div class="flex gap-3 px-0 py-5">
                <div class="profile">
                    <div class="avatar">
                        <div class="ring-primary ring-offset-base-100 w-6 rounded-full ring-2 ring-offset-2">
                            <img src="${video.authors[0].
                profile_picture
            }" />
                        </div>
                    </div>
                </div>
                <div class="intro">
                    <h2 class=" text-sm font-semibold">Midnight Serenade</h2>
                    <p class="text-sm text-gray-400 flex gap-1">${video.authors[0].
                profile_name} ${video.authors[0].verified == true ? `
                    <img class="w-5 h-5" src="https://img.icons8.com/?size=48&id=98A4yZTt9abw&format=png" alt="">
                    ` : ``}</p>
                    <p class="text-sm text-gray-400">${video.others.views} views</p>
                </div>
            </div>
            <button onclick="loadVideoDetails('${video.video_id}')" class="btn btn-block">Show Details</button>
        </div> 
        
        `;

        videoContainer.appendChild(videoCard);
        hideLoader();

    });


}

//Category wise load videos
const loadCategoryVideos = (id) => {
    showLoader();

    const url = `https://openapi.programming-hero.com/api/phero-tube/category/${id}`
    console.log(url);
    fetch(url)
        .then((res) => res.json())
        .then((data) => {

            removeActiveClass();

            const clickedButton = document.getElementById(`btn-${id}`);
            clickedButton.classList.add("active");

            displayVideos(data.category)
        });
}

const loadVideoDetails = (videoid) => {
    const url = `https://openapi.programming-hero.com/api/phero-tube/video/${videoid}`
    fetch(url)
        .then((res) => res.json())
        .then(data => displayVideoDetails(data.video));
}

const displayVideoDetails = (video) => {

    console.log(video);
    document.getElementById("video_details").showModal()

    const detailsContainer = document.getElementById("details-container");
    detailsContainer.innerHTML = `
    <div class="card bg-base-100  shadow-sm">
  <figure>
    <img
      src="${video.thumbnail}"
      alt="thubnail" />
  </figure>
  <div class="card-body">
    <h2 class="card-title">
      <div class="badge badge-secondary">${video.title}</div>
    </h2>
    <p>${video.description}</p>
    <div class="card-actions justify-end">
    <div class="profile">
                    <div class="avatar">
                        <div class="ring-primary ring-offset-base-100 w-6 rounded-full ring-2 ring-offset-2">
                            <img src="${video.authors[0].
            profile_picture
        }" />
                        </div>
                    </div>
                </div>
      <div class="badge badge-outline">
      <p class="text-sm text-black flex gap-1">${video.authors[0].
            profile_name}</p>
      </div>
    </div>
  </div>
</div>

    `


}

document.getElementById("search-input").addEventListener("keyup", (e) => {

    const input = e.target.value;
    loadVideos(input);
})



loadCategories();



