var allPets = JSON.parse(localStorage.getItem('pet'));
var root = document.querySelector('#root');
//I render all the pets
function renderPets() {
    try {
        var html = allPets.map(function (element) {
            return ("<div id='" + element.name + "' class=\"pet__item__wrapper\">\n                <div><img class=\"pet__item__image\" src=\"" + element.image + "\" alt=\"\"></div>\n                <div class=\"pet__item__information__wrapper\">\n                <div>Name: <b>" + element.name.toUpperCase() + "</b></div>\n                <div>Age: <b>" + element.age + "</b></div>\n                 </div>\n                <div class=\"pet__item__information__description\">" + element.description + "</div>\n                <div class=\"pet__item__information__wrapper\">\n                <div><b>" + element.city.toUpperCase() + "</b></div>\n                <div>Contact:<b>" + element.contactNumber + "</b></div>\n                 </div>\n                <div class=\"pet__item__information__description\">" + element.gender.toUpperCase() + "</div>\n                 </div>");
        }).join('');
        if (!html)
            throw new Error('An error happens when you want to render the pets!');
        root.innerHTML = html;
    }
    catch (error) {
        console.error(error);
    }
}
//Delete duplicate elements in an array
function onlyUnique(value, index, self) {
    try {
        return self.indexOf(value) === index;
    }
    catch (error) {
        console.error(error);
    }
    ;
}
;
//This function is to put the values in the filter. It took me time to dont DRY, at the beginning it was 3 similar functions, then I worked on it, please let me know if I can DRY better 💪
//YS: Yes you can have 1 array with objects instead of 3 separate arrays. 
function filter() {
    try {
        var petGender_1 = []; //I was not sure to what type write, so I know that is an array and because then I call some functions I prefer to write array on any 😁
        var petAge_1 = [];
        var petCity_1 = [];
        var selectGender = document.querySelector('[name="gender"]');
        var selectAge = document.querySelector('[name="age"]');
        var selectCity = document.querySelector('[name="city"]');
        if (!selectGender || !selectAge || !selectCity)
            throw new Error('You don´t select the gender!');
        if (!allPets)
            throw new Error('You can´t access to the pets');
        //Separate the elements in different arrays
        allPets.forEach(function (element) {
            petGender_1.push(element.gender.toUpperCase());
            petAge_1.push(element.age);
            petCity_1.push(element.city.toUpperCase());
        });
        //Delete duplicate elements in an array
        var uniqueGender = petGender_1.filter(onlyUnique);
        var uniqueAge = petAge_1.filter(onlyUnique);
        var uniqueCity = petCity_1.filter(onlyUnique);
        //Call a function to add the unique values in the filters
        addFilter(uniqueGender, selectGender);
        addFilter(uniqueAge, selectAge);
        addFilter(uniqueCity, selectCity);
    }
    catch (error) {
        console.error(error);
    }
}
function addFilter(unique, select) {
    var htmlToAdd = unique.map(function (element) {
        return ("<option value=\"" + element + "\">" + element + "</option>");
    }).join('');
    select.innerHTML = htmlToAdd;
}
function handleFilter() {
    try {
        //With this I obtain the values of the filters that the user select
        var age_1 = document.querySelector('.filter__age');
        var city_1 = document.querySelector('.filter__city');
        var gender_1 = document.querySelector('.filter__gender');
        var petsFiltered = allPets.filter(function (element) { return (element.age === age_1.value) && (element.city.toUpperCase() === city_1.value) && (element.gender.toUpperCase() === gender_1.value); }); //YS: What if all of them are false? Let the user know.
        localStorage.setItem('petFiltered', JSON.stringify(petsFiltered));
        window.location.href = 'filteredPets.html';
        if (!window.location.href)
            throw new Error('The page where you want to redirect it doesn´t exist!');
    }
    catch (error) {
        console.error(error);
    }
}
//Call this functions to render all the pets
renderPets();
//Call this functions to show what to select in the filters
filter();
