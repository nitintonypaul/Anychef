//Key identifiers
const searchBtn = document.getElementById('searchbutton')
const mealList = document.getElementById('result')
const mealDetails = document.querySelector('.detailed-stuff-container')
const closeBtn = document.getElementById('close-button')


//Event Listeners
searchBtn.addEventListener('click',getList)
mealList.addEventListener('click', getRecipe)
closeBtn.addEventListener('click', () => {
    mealDetails.parentElement.classList.remove('detail-container-show')
})

//Fetching meal list
function getList() {
    let input = document.getElementById('searchbox').value.trim()
    console.log(input)
    if (input!="") {

        //Changing the display of the div
        document.getElementById('block-container').style.display = "flex"
        document.getElementById('block-container').scrollIntoView()

        fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${input}`)
        .then(response => response.json())
        .then(data => {
            let html = ""
            if (data.meals){
                data.meals.forEach(meal => {
                html += `
                    <div class="result-block">
                        <div class="result-image">
                            <img src="${meal.strMealThumb}" class="image">
                        </div>
                        <div class="result-description"  data-id = ${meal.idMeal}>
                            <div class="result-title"><h1 style="padding: 0px 10px;">${meal.strMeal}</h1><a class="result-recipe" href="#">Get Recipe</a></div> 
                        </div>
                    </div>
                `
            })
        } else {
            html = "Nothing"
            mealList.classList.add('nothing')
        }

        mealList.innerHTML = html
        })
    }

}

//Fetching recipe
function getRecipe(e) {
    e.preventDefault()
    if (e.target.classList.contains('result-recipe')) {
        let item = e.target.parentElement.parentElement
        fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${item.dataset.id}`)
        .then(response => response.json())
        .then(data => mealRecipeModal(data.meals))
    }
}

//create a modal
function mealRecipeModal(meal) {
    meal = meal[0]

    let html = `
            <div class="detailed-image">
                <img src="${meal.strMealThumb}" class="detailed-image">
            </div>

            <div class="extras">
                <div class="detailed-title">
                    <h1>${meal.strMeal}</h1>
                </div>
                <div class="detailed-recipe">
                    <h2>Recipe:</h2>
                    <a>${meal.strInstructions}</a>
                </div>
                <br><br>
                <div class="recipe-link-div">
                    <a class="recipe-link" href="${meal.strYoutube}">Watch video</a>
                </div>
            </div>
    `
    mealDetails.innerHTML = html
    mealDetails.parentElement.classList.add('detail-container-show')
}
