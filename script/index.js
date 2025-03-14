function loadCategories(){
//    fetch the data
fetch("https://openapi.programming-hero.com/api/phero-tube/categories")
// converte promise to json
.then(res=> res.json())
// send data to display category
.then((data)=> displayCategories(data.categories))
}
// load data video
function loadVideos(){
    fetch("https://openapi.programming-hero.com/api/phero-tube/videos")
    .then(res=>res.json())
    .then((data) => displayVideos(data.videos))
}

const loadCategoryVideos=(id)=>{
    // console.log(id);
    const url = `https://openapi.programming-hero.com/api/phero-tube/category/${id}`;
    console.log(url);
    fetch(url)
    .then(res=> res.json())
    .then((data)=>{
       const clickedButton =document.getElementById(`btn-$(id)`) 
       console.log(clickedButton)
       displayVideos(data.category)


    } )    

};
 function displayCategories(categories){
    //  get the container
    const categoryContainer = document.getElementById("category-container");
   
    // loop oparation on array of object
    for(let cat of categories){
        // console.log(cat)
    
    // creat element 
    const categoryDiv = document.createElement("div");
    categoryDiv.innerHTML=`
    <button id="${cat.categories_id}"onclick="loadCategoryVideos(${cat.category_id})" class="btn btn-md hover:bg-[#FF1F3D] hover:text-white">${cat.category}</button>
    `;
    // append the element
    categoryContainer.append(categoryDiv);
    }
 }

 const displayVideos=(videos)=>{
    const videoContainer = document.getElementById("video-container")
    videoContainer.innerHTML="";

    if(videos.length==0){
        
        videoContainer.innerHTML=`
        <div class="col-span-full text-center flex flex-col justify-center items-center py-20">
            <img class="w-[120px] " src="Icon.png" alt="">
            <h2 class="text-2xl font-bold">Oops!! Sorry, There is no content here</h2>
        </div>
        `;
        return;
    }
    videos.forEach((video)=>{
        // console.log(video);
        // element create
        const videoCard = document.createElement("div");
        videoCard.innerHTML = `
       <div class="card bg-base-100  shadow-sm">
            <figure class="relative">
              <img class="w-full h-[150px] object-cover"

                src="${video.thumbnail}" />
                <span class="absolute bottom-2 right-2 text-white bg-black p-1 text-sm rounded-sm">3hrs 56 min ago</span>
            </figure>
            
            <div class=" flex gap-3 px-0 py-5 ">
             <div class="profile">
                <div class="avatar">
                    <div class="ring-primary ring-offset-base-100 w-10 rounded-full ring ring-offset-2 ">
                      <img src="${video.authors[0].profile_picture}" />
                    </div>
                  </div>
             </div>
             <div class="intro">
                <h2 class="text-sm font-semibold">Midnight Serenade</h2>
                <p class="text-sm text-gray-400 flex gap-1 ">"${video.authors[0].profile_name}" <img class="w-5 h-5" src="https://img.icons8.com/?size=96&id=SRJUuaAShjVD&format=png" alt=""></p>
                <p class="text-sm text-gray-400">${video.others.views} views</p>
             </div>
            </div>
          </div>
        `;
        // append
        videoContainer.append(videoCard);
    })

 }
loadCategories();
// loadVideos();
