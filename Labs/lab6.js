//counters and comments
let likes = 0;
let dislikes = 0;
let comments = [];

//read cookie value by its name
function getCookie(name) {
    let myCookies= document.cookie.split(";");
    for(let i=0; i <myCookies.length;i++) {
        let pair =myCookies[i].trim().split("=");
        if(pair[0] === name){
            return decodeURIComponent(pair[1]);
        }
    }
    return "";
}

//set the cookie max-age 7 days in seconds
function setCookie(name,value){
   document.cookie = name+ "=" + encodeURIComponent(value) + "; max-age=" + 7 *24 *60 *60 + "; path=/";
}

//delete cookie by setting expiry date to past date
function deleteCookie(name) {
    document.cookie = name + "=; expires=" +new Date(2000,0, 1).toUTCString() + "; path=/";
}

//elements
let likeBtn=document.getElementById("likeBtn");
let dislikeBtn=document.getElementById("dislikeBtn");
let likeCount= document.getElementById("likeCount");
let dislikeCount= document.getElementById("dislikeCount");
let commentInput= document.getElementById("commentInput");
let submitBtn=document.getElementById("submitBtn");
let commentsList=document.getElementById("comments");

//update the page
function updateUI() {
    likeCount.innerText =likes;
    dislikeCount.innerText =dislikes;

    //disable voting if the user already voted
    let voted =getCookie("vote") !=="";
    likeBtn.disabled=voted;
    dislikeBtn.disabled=voted;
    likeBtn.classList.toggle("chosen",getCookie("vote")==="like");
    dislikeBtn.classList.toggle("chosen",getCookie("vote")==="dislike");

    //disable commenting if the user already commented
    let commented =comments.length> 0;
    commentInput.disabled= commented;
    submitBtn.disabled= commented;

    // show the comments
    commentsList.innerHTML="";
    for(let i=0; i <comments.length;i++) {
        let li =document.createElement("li");
        li.appendChild(document.createTextNode(comments[i]));
        commentsList.appendChild(li);
    }
}

function handleLike() {
    if (getCookie("vote")!=="")
        return;
    likes++;
    setCookie("vote","like");
    updateUI();
}
//events
likeBtn.addEventListener("click", handleLike);

function handleDislike(){
    if (getCookie("vote")!=="") 
        return;
    dislikes++;
    setCookie("vote","dislike");
    updateUI();
}
//events
dislikeBtn.addEventListener("click", handleDislike);

function handleComment() {
    let text =commentInput.value.trim();
    if (text==="" || comments.length>0)
         return;
    comments.push(text);
    setCookie("comments",JSON.stringify(comments));
    commentInput.value="";
    updateUI();
}
//events
submitBtn.addEventListener("click", handleComment);

//elements
let resetBtn=document.getElementById("resetBtn");
let message=document.getElementById("message");

function handleReset() {
    deleteCookie("vote");
    deleteCookie("comments");

    likes =0;
    dislikes= 0;
    comments =[];
    updateUI();
    message.innerText ="Your vote and comment have been reset";
}
//events
resetBtn.addEventListener("click", handleReset);

//load the saved state from cookies when the page opens
function loadState() {
    let vote =getCookie("vote");
    if (vote ==="like")
        likes =1;
    if (vote ==="dislike")
        dislikes =1;

    let savedComments =getCookie("comments");
    if (savedComments !=="")
        comments =JSON.parse(savedComments);

    updateUI();
}

loadState();