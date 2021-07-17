let getModal=document.getElementById('jsModal');
let tabIndex = 1;

let favMeals=[];

   async function getUserName() {
    await fetch("https://jsonplaceholder.typicode.com/users/1")
        .then(response => response.json())
        .then(json => {
            const userName = json.name
            let userNameHeader = document.getElementById("jsUser")
            userNameHeader.innerText = `Merhaba, ${userName}`
        })
}

async function getMeal() {
    await fetch("https://jsonplaceholder.typicode.com/todos")
        .then(response => response.json())
        .then(json => {
            let id=1;
            let getMealDiv=document.getElementById("jsMeal");
            json.forEach(element => {
               
                
                const newMealDiv=document.createElement('div');
                //div id
                 const attributeId = document.createAttribute("id");                
                 attributeId.value=`jsCardId${id}`; 
                 const attributeTabIndex = document.createAttribute("tabIndex");                
                 attributeTabIndex.value=tabIndex; 
                 newMealDiv.setAttributeNode(attributeTabIndex);
                 //div style
                 newMealDiv.style="border-style: solid;margin-top:10px; display: flex;flex-direction: row;flex-wrap: nowrap;justify-content: space-between;";
                //div inside
                const title=document.createElement("div");
               
                title.innerHTML=element.title;
                const button=document.createElement("div");
                
                const icon=document.createElement("i");
                const attributeClass = document.createAttribute("class");
                const attributeIdIcon = document.createAttribute("id");  
                attributeClass.value="far fa-heart";
                attributeIdIcon.value=`jsIcon${id}`;
                icon.setAttributeNode(attributeClass);
                icon.setAttributeNode(attributeIdIcon);
               
                button.appendChild(icon);
              
                
                button.addEventListener('click',()=>{
                  
                   if(attributeClass.value=="far fa-heart")
                   {
                    attributeClass.value="fas fa-heart";
                    favMeals.push(element.title);
                    localStorage.setItem("meals", JSON.stringify(favMeals));
                   
                   }
                   else
                   {
                    attributeClass.value="far fa-heart";
                    const index = favMeals.indexOf(element.title);
                    if (index > -1) {
                        favMeals.splice(index, 1);
                    }
                
                   }
                   
                    });
                
                newMealDiv.appendChild(title);
                newMealDiv.appendChild(button);
               
                          // Click Events
                          newMealDiv.addEventListener("click", function () {
                            // Focus on the exact box
                            newMealDiv.focus();
                            newMealDiv.style="outline:2px solid red;margin-top:10px; display: flex;flex-direction: row;flex-wrap: nowrap;justify-content: space-between;";

                          
                        });
                        newMealDiv.addEventListener("focusout", function () {
 
                            newMealDiv.style="border-style: solid;margin-top:10px; display: flex;flex-direction: row;flex-wrap: nowrap;justify-content: space-between;";

                        });
                        // Key Events                     
                       newMealDiv.addEventListener("keyup", (event) => {
                            let clickedKey = event.key;
                            if (clickedKey === "f") {
                                if(attributeClass.value=="far fa-heart")
                                {
                                 attributeClass.value="fas fa-heart";
                                 favMeals.push(element.title);
                                 localStorage.setItem("meals", JSON.stringify(favMeals));
                                 console.log(favMeals);
                                }
                                else
                                {
                                 attributeClass.value="far fa-heart";
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

          
                
           
            
        })
}

getMeal();
getUserName();

$(document)
 .on('ready',function(){
     var mealList = localStorage.getItem("meals");
     var localData = mealList ? JSON.parse(mealList) : [];
    localStorage.setItem("meals", JSON.stringify(localData));
 })
.on('click','[id^=button]',function(e){
    var id = e.target.id.replace('button','');
    var parentElement = $(e.target).parent();
    const currentDatas = JSON.parse(localStorage.mealList || '[]');
    
    if(parentElement.hasClass('fav')){
        parentElement.removeClass('fav');
        localStorage.removeItem("mealList"+e.target.id);
    }else{
        currentDatas.push({id:id});
        parentElement.addClass('fav');
        
        localStorage.setItem("mealList"+e.target.id,JSON.stringify(currentDatas));
    };
})

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
    function GetSearchedMeals(meals)
    {
        let id=1;
        let getMealDiv=document.getElementById("jsMeal");
        meals.forEach(element=>{
        
                const newMealDiv=document.createElement('div');
                //div id
                 const attributeId = document.createAttribute("id");                
                 attributeId.value=id; 
                 newMealDiv.setAttributeNode(attributeId);
                 const attributeTabIndex = document.createAttribute("tabIndex");                
                 attributeTabIndex.value=tabIndex; 
                 newMealDiv.setAttributeNode(attributeTabIndex);
                 //div style
                 newMealDiv.style="border-style: solid;margin-top:10px; display: flex;flex-direction: row;flex-wrap: nowrap;justify-content: space-between;";
                //div inside
                const title=document.createElement("div");
               
                title.innerHTML=element.title;
                const button=document.createElement("div");
                
                const icon=document.createElement("i");
                const attributeClass = document.createAttribute("class");
                const attributeIdIcon = document.createAttribute("id");  
                attributeClass.value="far fa-heart";
                attributeIdIcon.value=`jsIcon${id}`;
                icon.setAttributeNode(attributeClass);
                icon.setAttributeNode(attributeIdIcon);
               
                button.appendChild(icon);

                button.addEventListener('click',()=>{
                  
                    if(attributeClass.value=="far fa-heart")
                    {
                     attributeClass.value="fas fa-heart";
                     favMeals.push(element.title);
                     localStorage.setItem("meals", JSON.stringify(favMeals));
                    }
                    else
                    {
                     attributeClass.value="far fa-heart";
                     const index = favMeals.indexOf(element.title);
                     if (index > -1) {
                         favMeals.splice(index, 1);
                     }
                    }
                    
                     });
              
                newMealDiv.appendChild(title);
                newMealDiv.appendChild(button);

                  // Click Events
                  newMealDiv.addEventListener("click", function () {
                    // Focus on the exact box
                    newMealDiv.focus();
                    newMealDiv.style="outline:2px solid red;margin-top:10px; display: flex;flex-direction: row;flex-wrap: nowrap;justify-content: space-between;";
                });
                newMealDiv.addEventListener("focusout", function () {

                    newMealDiv.style="border-style: solid;margin-top:10px; display: flex;flex-direction: row;flex-wrap: nowrap;justify-content: space-between;";

                });
                // Key Events                     
               newMealDiv.addEventListener("keyup", (event) => {
                    let clickedKey = event.key;
                    if (clickedKey === "f") {
                        if(attributeClass.value=="far fa-heart")
                        {
                         attributeClass.value="fas fa-heart";
                         favMeals.push(element.title);
                         localStorage.setItem("meals", JSON.stringify(favMeals));
                        }
                        else
                        {
                         attributeClass.value="far fa-heart";
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
