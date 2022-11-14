"use strict";const listEl=document.querySelector(".js-list-char"),favListEl=document.querySelector(".js-list-fav-char"),searchInputEl=document.querySelector(".js-search-input"),searchBtnEl=document.querySelector(".js-search-btn"),searchAlertEl=document.querySelector(".js-alert-msg");let charactersList=[],allCharacters=[],favCharactersObjList=[],favCharacters=[],delIcons=[],filteredCharList=[];const delBtnEl=document.querySelector(".js-del-btn");function checkImageOk(){for(const e of charactersList)"https://vignette.wikia.nocookie.net/breaking-bad-tv/images/c/ce/Sp.png/revision/latest?cb=20121016143623"!==e.img&&"https://static.wikia.nocookie.net/breakingbad/images/0/08/Tumblr_lqddc79K9S1qc5omm.png/revision/latest?cb=20111012055605"!==e.img&&"https://media1.popsugar-assets.com/files/thumbor/wERDST0TUb-iHCSb2r5ZpsvaZLo/fit-in/1024x1024/filters:format_auto-!!-:strip_icc-!!-/2013/07/17/675/n/1922283/fae2f583f04bb80f_Laura-Fraser-is-back-as-Lydia-Rodarte-Quayle_gallery_primary/i/Laura-Fraser-Lydia-Rodarte-Quayle.jpg"!==e.img||(e.img="./assets/images/unknown-char.jpg")}function addSelectClass(e,t){for(const a of e)if(null!==t)for(const e of t)parseInt(e.id)===parseInt(a.id)&&a.classList.add("js-selected")}function addEventListClick(e){for(const t of e)t.addEventListener("click",handleListClick)}function renderChar(e){const t=document.createElement("li");t.setAttribute("class","char__list--item js-char-item"),t.setAttribute("id",e.char_id);const a=document.createElement("article");a.setAttribute("class","char__article");const r=document.createElement("img");r.setAttribute("class","char__article--img"),r.setAttribute("src",e.img),r.setAttribute("alt",e.name),a.appendChild(r);const s=document.createElement("h3");s.setAttribute("class","char__article--title");const c=document.createTextNode(e.name);s.appendChild(c),a.appendChild(s);const l=document.createElement("small");l.setAttribute("class","char__article--subtitle");const n=document.createTextNode(e.status);return l.appendChild(n),a.appendChild(l),t.appendChild(a),t}function renderAllChar(e){for(const t of e){const e=renderChar(t);listEl.appendChild(e)}}function renderFavChar(e){const t=document.createElement("li");t.setAttribute("class","char__list--item js-favchar-item js-highlight"),t.setAttribute("id",e.char_id);const a=document.createElement("article");a.setAttribute("class","char__article");const r=document.createElement("i");r.setAttribute("class","fa-solid fa-xmark char__article--del js-fav-del"),r.setAttribute("id",e.char_id),a.appendChild(r);const s=document.createElement("img");s.setAttribute("class","char__article--img"),s.setAttribute("src",e.img),s.setAttribute("alt",e.name),a.appendChild(s);const c=document.createElement("h3");c.setAttribute("class","char__article--title");const l=document.createTextNode(e.name);c.appendChild(l),a.appendChild(c);const n=document.createElement("small");n.setAttribute("class","char__article--subtitle");const i=document.createTextNode(e.status);return n.appendChild(i),a.appendChild(n),t.appendChild(a),t}function renderAllFavChar(e){for(const t of e){const e=renderFavChar(t);favListEl.appendChild(e)}}function checkFav(e){const t=charactersList.find(t=>t.char_id===parseInt(e.id)),a=favCharactersObjList.findIndex(t=>t.char_id===parseInt(e.id));-1===a?favCharactersObjList.push(t):favCharactersObjList.splice(a,1)}function fillFavSection(e){favListEl.innerHTML="",renderAllFavChar(e)}function saveFavLs(){localStorage.setItem("fs",JSON.stringify(favCharactersObjList))}function createFavArr(){favCharacters=document.querySelectorAll(".js-favchar-item")}function addDeleteListeners(){delIcons=document.querySelectorAll(".js-fav-del");for(const e of delIcons)e.addEventListener("click",handleDelClick)}function addGenDelBtn(){0!==favCharacters.length?delBtnEl.classList.remove("js-hidden"):delBtnEl.classList.add("js-hidden")}function addDeleteListeners(){for(const e of delIcons)e.addEventListener("click",handleDelClick)}function handleListClick(e){const t=e.currentTarget;t.classList.toggle("js-selected"),checkFav(t),fillFavSection(favCharactersObjList),saveFavLs(),createFavArr(),delIcons=document.querySelectorAll(".js-fav-del"),addDeleteListeners(),addGenDelBtn()}fetch("https://breakingbadapi.com/api/characters",{method:"GET",headers:{"Content-Type":"application/json"}}).then(e=>e.json()).then(e=>{charactersList=e,checkImageOk(),renderAllChar(charactersList),allCharacters=document.querySelectorAll(".js-char-item"),addEventListClick(allCharacters),addSelectClass(allCharacters,favCharacters)});const savedFavChar=JSON.parse(localStorage.getItem("fs"));function handleSearchBtn(e){e.preventDefault();const t=searchInputEl.value.toLowerCase();if(0===charactersList.length)listEl.innerHTML="Please wait a few seconds until the information has been loaded";else if(""===t)searchAlertEl.innerHTML="*You must write the name of a character";else{const e=charactersList.filter(e=>e.name.toLowerCase().includes(t));if(0!==e.length)searchAlertEl.innerHTML="",listEl.innerHTML="",renderAllChar(e),createFavArr(),filteredCharList=document.querySelectorAll(".js-char-item"),addSelectClass(filteredCharList,favCharacters),addEventListClick(filteredCharList);else{searchAlertEl.innerHTML="",listEl.innerHTML="";const e=document.createElement("p");e.setAttribute("class","char__result");const t=document.createTextNode("Sorry, no results were found for your search");e.appendChild(t),listEl.appendChild(e)}}}function handleSearchInput(e){""===e.currentTarget.value&&(listEl.innerHTML="",renderAllChar(charactersList),allCharacters=document.querySelectorAll(".js-char-item"),createFavArr(),addSelectClass(allCharacters,favCharacters),addEventListClick(allCharacters))}function deleteSelClass(e,t){for(const a of e)parseInt(a.id)===parseInt(t)&&a.classList.remove("js-selected")}function delObject(e){const t=favCharactersObjList.findIndex(t=>t.char_id===parseInt(e));-1!==t?favCharactersObjList.splice(t,1):delBtnEl.classList.add("js-hidden")}function handleDelClick(e){const t=e.currentTarget.id;delObject(t),fillFavSection(favCharactersObjList),saveFavLs(),createFavArr(),deleteSelClass(allCharacters,t),deleteSelClass(filteredCharList,t),delIcons=document.querySelectorAll(".js-fav-del"),addDeleteListeners(),addGenDelBtn()}function handleDelBtnClick(){0!==favCharacters.length&&(favListEl.innerHTML="",favCharactersObjList=[],saveFavLs());for(const e of allCharacters)e.classList.remove("js-selected");for(const e of filteredCharList)e.classList.remove("js-selected");delBtnEl.classList.add("js-hidden")}null!==savedFavChar&&(favCharactersObjList=savedFavChar,renderAllFavChar(savedFavChar),createFavArr(),delIcons=document.querySelectorAll(".js-fav-del"),addDeleteListeners(),0!==favCharacters.length?delBtnEl.classList.remove("js-hidden"):delBtnEl.classList.add("js-hidden")),searchBtnEl.addEventListener("click",handleSearchBtn),searchInputEl.addEventListener("input",handleSearchInput),delBtnEl.addEventListener("click",handleDelBtnClick);