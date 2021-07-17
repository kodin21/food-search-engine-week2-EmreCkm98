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
//yemekleri getir
function getMeal() {
  fetch("https://jsonplaceholder.typicode.com/todos")
    .then((response) => response.json())
    .then((json) => {
      let id = 1;
      let getMealDiv = document.getElementById("jsMeal");
      json.forEach((element) => {
        //yemek adı ve favori butonunu tutan div
        const newMealDiv = document.createElement("div");
        //div id
        const attributeId = document.createAttribute("id");
        attributeId.value = `jsCardId${id}`;
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
        attributeIdIcon.value = `jsIcon${id}`;
        icon.setAttributeNode(attributeClass);
        icon.setAttributeNode(attributeIdIcon);

        button.appendChild(icon);

        //favori butonuna tıklanınca favoriye ekleme,silme;localstoragea ekleme
        button.addEventListener("click", () => {
          if (attributeClass.value == "far fa-heart") {
            attributeClass.value = "fas fa-heart";
            favMeals.push(element.title);
            localStorage.setItem("meals", JSON.stringify(favMeals));
          } else {
            attributeClass.value = "far fa-heart";
            const index = favMeals.indexOf(element.title);
            if (index > -1) {
              favMeals.splice(index, 1);
            }
          }
        });

        newMealDiv.appendChild(title);
        newMealDiv.appendChild(button);

        // yemek cartına tıklanınca focus olma
        newMealDiv.addEventListener("click", function () {
          newMealDiv.focus();
          newMealDiv.style =
            "outline:2px solid red;margin-top:10px; display: flex;flex-direction: row;flex-wrap: nowrap;justify-content: space-between;";
        });
        newMealDiv.addEventListener("focusout", function () {
          newMealDiv.style =
            "border-style: solid;margin-top:10px; display: flex;flex-direction: row;flex-wrap: nowrap;justify-content: space-between;";
        });
        // f tusuna basınca favori ekleme,çıkarma;localstorage ekleme
        newMealDiv.addEventListener("keyup", (event) => {
          let clickedKey = event.key;
          if (clickedKey === "f") {
            if (attributeClass.value == "far fa-heart") {
              attributeClass.value = "fas fa-heart";
              favMeals.push(element.title);
              localStorage.setItem("meals", JSON.stringify(favMeals));
              console.log(favMeals);
            } else {
              attributeClass.value = "far fa-heart";
              const index = favMeals.indexOf(element.title);
              if (index > -1) {
                favMeals.splice(index, 1);
              }
            }
          }
        });

        getMealDiv.appendChild(newMealDiv);

        id++;
        tabIndex++;
      });
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
  meals.forEach((element) => {
    const newMealDiv = document.createElement("div");
    //div id
    const attributeId = document.createAttribute("id");
    attributeId.value = id;
    newMealDiv.setAttributeNode(attributeId);
    const attributeTabIndex = document.createAttribute("tabIndex");
    attributeTabIndex.value = tabIndex;
    newMealDiv.setAttributeNode(attributeTabIndex);
    //div style
    newMealDiv.style =
      "border-style: solid;margin-top:10px; display: flex;flex-direction: row;flex-wrap: nowrap;justify-content: space-between;";
    //div inside
    const title = document.createElement("div");

    title.innerHTML = element.title;
    const button = document.createElement("div");

    const icon = document.createElement("i");
    const attributeClass = document.createAttribute("class");
    const attributeIdIcon = document.createAttribute("id");
    attributeClass.value = "far fa-heart";
    attributeIdIcon.value = `jsIcon${id}`;
    icon.setAttributeNode(attributeClass);
    icon.setAttributeNode(attributeIdIcon);

    button.appendChild(icon);

    button.addEventListener("click", () => {
      if (attributeClass.value == "far fa-heart") {
        attributeClass.value = "fas fa-heart";
        favMeals.push(element.title);
        localStorage.setItem("meals", JSON.stringify(favMeals));
      } else {
        attributeClass.value = "far fa-heart";
        const index = favMeals.indexOf(element.title);
        if (index > -1) {
          favMeals.splice(index, 1);
        }
      }
    });

    newMealDiv.appendChild(title);
    newMealDiv.appendChild(button);

    //  //favori butonuna tıklanınca favoriye ekleme,silme;localstoragea ekleme
    newMealDiv.addEventListener("click", function () {
      newMealDiv.focus();
      newMealDiv.style =
        "outline:2px solid red;margin-top:10px; display: flex;flex-direction: row;flex-wrap: nowrap;justify-content: space-between;";
    });
    newMealDiv.addEventListener("focusout", function () {
      newMealDiv.style =
        "border-style: solid;margin-top:10px; display: flex;flex-direction: row;flex-wrap: nowrap;justify-content: space-between;";
    });
    // f tusuna basınca favori ekleme,çıkarma;localstorage ekleme
    newMealDiv.addEventListener("keyup", (event) => {
      let clickedKey = event.key;
      if (clickedKey === "f") {
        if (attributeClass.value == "far fa-heart") {
          attributeClass.value = "fas fa-heart";
          favMeals.push(element.title);
          localStorage.setItem("meals", JSON.stringify(favMeals));
        } else {
          attributeClass.value = "far fa-heart";
          const index = favMeals.indexOf(element.title);
          if (index > -1) {
            favMeals.splice(index, 1);
          }
        }
      }
    });

    getMealDiv.appendChild(newMealDiv);
    id++;
    tabIndex++;
  });
}
