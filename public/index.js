const API_URL = "https://shortify-api.onrender.com/api/shortify";
const API_BASE = "https://shortify-api.onrender.com/"

function copy(target) {
  //  selecting element to copy
  let copyText = document.querySelector(".urlLink").innerText;
  // let copyText = target.closest('.shortLink').children[0].innerText;
  navigator.clipboard.writeText(copyText);
  const copiedDiv = document.getElementById("copiedDiv");
  copiedDiv.className="copied";

}

const span = document.querySelector('.copy');

// span.addEventListener('click', (e) => {
//   console.log('copied');
// });

document.addEventListener("click",(e)=>{
    if(e.target.matches("span") && e.target.classList.contains("copy")){
        console.log("copied")
        copy()
    }
    console.log("inCondition")
})

const content = document.querySelector('.content');

function putUrlOnPage(url,urlText,random) {
  let shortLink = document.createElement('div')
  shortLink.className = "shortLink";

  let urlLink = document.createElement('a');

  urlLink.className = "urlLink";
  urlLink.href = url;
  urlLink.target = "_blank";
  urlLink.innerHTML = urlText || `${API_BASE}${random}`;
  let copyBoard = document.createElement('span');
//   copy.classList.add('copy');
copyBoard.className='copy';
// let copyBoardImg = document.createElement("img")
// copyBoardImg.className="copyBoardImg"
// copyBoardImg.src = "copyIcon.png"


  content.appendChild(shortLink);
//   content.className = "show"
  shortLink.appendChild(urlLink);
  shortLink.appendChild(copyBoard);
  
  // copyBoard.appendChild(copyBoardImg)
  let inputUrl = document.getElementById("inputUrl")
  inputUrl.value = "";
}

const form = document.querySelector('form');

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  const linkData = document.getElementById("inputUrl").value;
//   let formData = new FormData(form);
  let payload = {url: linkData}
//   let payload = {url: formData.get('url')}

  // requesting backend api
  try {
    let request = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });
// note we cannot pass object in body because middlware can not pass object
    const response = await request.json();
    if(response.originalUrl || response.short){
        putUrlOnPage(linkData,response.short,response.random)
        console.log(response)
    }else{
        content.innerHTML = response.message;
        console.log(response)
    }

  } catch (err) {
    console.log(err);
  }
});
