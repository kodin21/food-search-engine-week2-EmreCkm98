let getModal = document.getElementById("jsModal");
let tabIndex = 1;
let getM = document.getElementById("jsMain");
let favMeals = [];

$(window).on('load', function(){
    
    getM.hidden=true;
    setTimeout(removeLoader, 2000); //loading süresi
  });
  function removeLoader(){
      $( "#jsLoading" ).fadeOut(500, function() {//loading bitince input ve ürünler geliyor.
       
        $( "#jsLoading" ).remove(); 
        getM.hidden=false;
    });  
    }

//kullanıcı adı getir
function getUserName() {
  fetch("https://jsonplaceholder.typicode.com/users/1")
    .then((response) => response.json())
    .then((json) => {
      const userName = json.name;
      let userNameHeader = document.getElementById("jsUser");
      userNameHeader.innerText = `Merhaba, ${userName}`;
    });
}
//yemek kartını oluşturma
function createMealCard(meal,getMealDiv)
{
  meal.forEach((element)=>{
    //yemek adı ve favori butonunu tutan div
    const newMealDiv = document.createElement("div");
    //div id
    const attributeId = document.createAttribute("id");
    attributeId.value = `jsCardId${element.id}`;
    const attributeTabIndex = document.createAttribute("tabIndex");
    attributeTabIndex.value = tabIndex;
    newMealDiv.setAttributeNode(attributeTabIndex);
    //div style
    newMealDiv.style =
      "border-style: solid;margin-top:10px; display: flex;flex-direction: row;flex-wrap: nowrap;justify-content: space-between;";
    //yemek adı tutan div
    const title = document.createElement("div");

    title.innerHTML = element.title;
    //favori butonu tutan div
    const button = document.createElement("div");

    const icon = document.createElement("i");
    const attributeClass = document.createAttribute("class");
    const attributeIdIcon = document.createAttribute("id");
    attributeClass.value = "far fa-heart";
    attributeIdIcon.value = `jsIcon${element.id}`;
    icon.setAttributeNode(attributeClass);
    icon.setAttributeNode(attributeIdIcon);

    button.appendChild(icon);

    handleClickFav(button,attributeClass,element.title);

        newMealDiv.appendChild(title);
        newMealDiv.appendChild(button);

          handleFocus(newMealDiv);
        
          handleKeyUpFav(newMealDiv,attributeClass,element.title);
          getMealDiv.appendChild(newMealDiv);
          tabIndex++;
  });
}
 // yemek cartına tıklanınca focus olma,olmama
function handleFocus(mealCard)
{
  mealCard.addEventListener("click", function () {
    mealCard.focus();
    mealCard.style =
      "outline:2px solid red;margin-top:10px; display: flex;flex-direction: row;flex-wrap: nowrap;justify-content: space-between;";
  });
  mealCard.addEventListener("focusout", function () {
    mealCard.style =
      "border-style: solid;margin-top:10px; display: flex;flex-direction: row;flex-wrap: nowrap;justify-content: space-between;";
  });
};
//favori butonuna tıklanınca favoriye ekleme,silme;localstoragea ekleme
function handleClickFav(favButton,favIcon,meal)
{
        //favori butonuna tıklanınca favoriye ekleme,silme;localstoragea ekleme
        favButton.addEventListener("click", () => {
          if (favIcon.value == "far fa-heart") {
            favIcon.value = "fas fa-heart";
            favMeals.push(meal);
            localStorage.setItem("meals", JSON.stringify(favMeals));
          } else {
            favIcon.value = "far fa-heart";
            const index = favMeals.indexOf(meal);
            if (index > -1) {
              favMeals.splice(index, 1);
              localStorage.setItem("meals", JSON.stringify(favMeals));
            }
          }
        });
}
// f tusuna basınca favori ekleme,çıkarma;localstorage ekleme
function handleKeyUpFav(favButton,favIcon,meal)
{
     // f tusuna basınca favori ekleme,çıkarma;localstorage ekleme
     favButton.addEventListener("keyup", (event) => {
      let clickedKey = event.key;
      if (clickedKey === "f") {
        if (favIcon.value == "far fa-heart") {
          favIcon.value = "fas fa-heart";
          favMeals.push(meal);
          localStorage.setItem("meals", JSON.stringify(favMeals));
          
        } else {
          favIcon.value = "far fa-heart";
          const index = favMeals.indexOf(meal);
          if (index > -1) {
            favMeals.splice(index, 1);
            localStorage.setItem("meals", JSON.stringify(favMeals));
          }
        }
      }
    });
}

//yemekleri getir
function getMeal() {
  fetch("https://jsonplaceholder.typicode.com/todos")
    .then((response) => response.json())
    .then((json) => {
      let id = 1;
      let getMealDiv = document.getElementById("jsMeal");
      createMealCard(json,getMealDiv);
    });
}

getMeal();
getUserName();

$(document).on("ready", function () {
  var mealList = localStorage.getItem("meals");
  var localData = mealList ? JSON.parse(mealList) : [];
  localStorage.setItem("meals", JSON.stringify(localData));
});

//inputa girilen kelimeye göre yemeklerin arasından arama işlemi
let searchDom = document
  .getElementById("jsSearch")
  .addEventListener("keyup", () => SearchMeal());
function SearchMeal() {
  let searchedMeals = [];
  let searchedText = document.getElementById("jsSearch").value;
  fetch("https://jsonplaceholder.typicode.com/todos")
    .then((response) => response.json())
    .then((json) => {
      json.map((meal) => {
        if (meal.title.startsWith(searchedText) == 1) {
          searchedMeals.push(meal);
        }
      });
    })
    .finally(() => {
      document.getElementById("jsMeal").innerHTML = "";
      GetSearchedMeals(searchedMeals);
    });
}
//aranan yemekleri getirme
function GetSearchedMeals(meals) {
  let id = 1;
  let getMealDiv = document.getElementById("jsMeal");
  createMealCard(meals,getMealDiv);
}
