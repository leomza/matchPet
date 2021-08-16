const allPets = JSON.parse(localStorage.getItem('pet'));
const root: HTMLElement = document.querySelector('#root')

//I render all the pets
function renderPets(): void {
    try {
        let html: string = allPets.map(element => {
            return (
                `<div id='${element.name}' class="pet__item__wrapper">
                <div><img class="pet__item__image" src="${element.image}" alt=""></div>
                <div class="pet__item__information__wrapper">
                <div>Name: <b>${element.name.toUpperCase()}</b></div>
                <div>Age: <b>${element.age}</b></div>
                 </div>
                <div class="pet__item__information__description">${element.description}</div>
                <div class="pet__item__information__wrapper">
                <div><b>${element.city.toUpperCase()}</b></div>
                <div>Contact:<b>${element.contactNumber}</b></div>
                 </div>
                <div class="pet__item__information__description">${element.gender.toUpperCase()}</div>
                 </div>`
            )
        }).join(''); 
        if (!html) throw new Error('An error happens when you want to render the pets!')
        root.innerHTML = html;
    } catch (error) {
        console.error(error);
    }
}

//Delete duplicate elements in an array
function onlyUnique(value: number, index: number, self: any): boolean {   //YS: Look at sets in javascript - better way to get unique values. 
    try {
        return self.indexOf(value) === index;
    } catch (error) {
        console.error(error);
    };
};

//This function is to put the values in the filter. It took me time to dont DRY, at the beginning it was 3 similar functions, then I worked on it, please let me know if I can DRY better 💪

//YS: Yes you can have 1 array with objects instead of 3 separate arrays. 
function filter(): void {
    try {
        const petGender: Array<any> = [];  //I was not sure to what type write, so I know that is an array and because then I call some functions I prefer to write array on any 😁
        const petAge: Array<any> = [];
        const petCity: Array<any> = [];

        const selectGender: HTMLElement = document.querySelector('[name="gender"]');
        const selectAge: HTMLElement = document.querySelector('[name="age"]');
        const selectCity: HTMLElement = document.querySelector('[name="city"]');

        if (!selectGender || !selectAge || !selectCity) throw new Error('You don´t select the gender!')
        if (!allPets) throw new Error('You can´t access to the pets');

        //Separate the elements in different arrays
        allPets.forEach(element => {
            petGender.push(element.gender.toUpperCase());
            petAge.push(element.age);
            petCity.push(element.city.toUpperCase());
        });

        //Delete duplicate elements in an array
        const uniqueGender: Array<string> = petGender.filter(onlyUnique);
        const uniqueAge: Array<number> = petAge.filter(onlyUnique);
        const uniqueCity: Array<string> = petCity.filter(onlyUnique);

        //Call a function to add the unique values in the filters
        addFilter(uniqueGender, selectGender);
        addFilter(uniqueAge, selectAge);
        addFilter(uniqueCity, selectCity);

    } catch (error) {
        console.error(error);
    }
}

function addFilter(unique: Array<string | number>, select: HTMLElement): void {
    let htmlToAdd: string = unique.map(element => {
        return (
            `<option value="${element}">${element}</option>`
        )
    }).join('');
    select.innerHTML = htmlToAdd;
}

function handleFilter(): void {
    try {
        //With this I obtain the values of the filters that the user select
        const age: any = document.querySelector('.filter__age');
        const city: any = document.querySelector('.filter__city');
        const gender: any = document.querySelector('.filter__gender');
        const petsFiltered = allPets.filter(element => (element.age === age.value) && (element.city.toUpperCase() === city.value) && (element.gender.toUpperCase() === gender.value)); //YS: What if all of them are false? Let the user know.
        localStorage.setItem('petFiltered', JSON.stringify(petsFiltered));
        window.location.href = 'filteredPets.html';
        if (!window.location.href) throw new Error('The page where you want to redirect it doesn´t exist!');
    } catch (error) {
        console.error(error);
    }
}

//Call this functions to render all the pets
renderPets();

//Call this functions to show what to select in the filters
filter();
