var filterPets = JSON.parse(localStorage.getItem('petFiltered'));
var rootFilter = document.querySelector('#root');
function renderPetsFilter() {
    try {
        var html = this.filterPets.map(function (element) {
            return ("<div id='" + element.name + "' class=\"pet__item__wrapper\">\n                <div><img class=\"pet__item__image\" src=\"" + element.image + "\" alt=\"\"></div>\n                <div class=\"pet__item__information__wrapper\">\n                <div>Name: <b>" + element.name.toUpperCase() + "</b></div>\n                <div>Age: <b>" + element.age + "</b></div>\n                 </div>\n                <div class=\"pet__item__information__description\">" + element.description + "</div>\n                <div class=\"pet__item__information__wrapper\">\n                <div><b>" + element.city.toUpperCase() + "</b></div>\n                <div>Contact:<b>" + element.contactNumber + "</b></div>\n                 </div>\n                <div class=\"pet__item__information__description\">" + element.gender.toUpperCase() + "</div>\n                 </div>");
        }).join('');
        if (!html)
            throw new Error('An error happens when you want to render the pets filtered!');
        rootFilter.innerHTML = html;
    }
    catch (error) {
        console.error(error);
    }
}
