/* choose a project that you like. you can take ideas from existing sites.
It should consist of at least 2 pages, that you can navigate between them (using href ot js redirect)
the user must enter data, and you share the data over the 2 screens.
for example, the user enter an image to a bank of images, and we see each image in a seprate page.

preferbly use OOP, or at least functional programing.
use scss, and make it beutiful.
use animations

use google if you dont know how to do things.
 */

class Pet {
    id: string;
    name: string;
    age: number;
    gender: string;
    city: string;
    image: string;
    description: string;
    contactNumber: number;

    constructor(name: string, age: number, gender: string, city: string, image: string, description: string, contactNumber: number) {
        this.id = "id" + Math.random().toString(16).slice(2);
        this.name = name;
        this.age = age;
        this.gender = gender;
        this.city = city;
        this.image = image;
        this.description = description;
        this.contactNumber = contactNumber;
    }
}

//I initialice a new array that will contains all the pets:
let pets: Array<Pet> = JSON.parse(localStorage.getItem('pet'));

//Function to add a pet to the array
function addPet(name: string, age: number, gender: string, city: string, image: string, description: string, contactNumber: number): void {
    try {
        let newPet: Pet = new Pet(name, age, gender, city, image, description, contactNumber)
        if (pets === null){
            pets = [];
        }
        pets.push(newPet);
        if (!this.pets) throw new Error('The array where you want to push the pets it doesn´t exist!')
        localStorage.setItem('pet', JSON.stringify(pets));
    } catch (error) {
        console.error(error);
    }
}   

//With this function I handle the form:
const doingSubmit = (ev: any): void => {   
    ev.preventDefault();
    try {
        const name: string = ev.target.elements.namePet.value;
        const gender: string = ev.target.elements.gender.value;
        const age: number = ev.target.elements.age.value;
        const city: string = ev.target.elements.city.value;
        const description: string = ev.target.elements.description.value;
        const contactNumber: number = ev.target.elements.contactNumber.value;
        const image: string = document.querySelector('#previewImage').getAttribute("src");  
        addPet(name, age, gender, city, image, description, contactNumber);
        ev.target.reset();
        alert('Pet added propertly!')
        location.href = 'listOfPets.html';
    } catch (error) {
        console.error(error);
    }
};

//Function to show the previous image in the form:
function readURL(input): void {
    if (input.files && input.files[0]) {
        let reader: FileReader = new FileReader();   //YS: Very nice! 

        reader.onload = (e) => {
            try {
                document.querySelector('#previewImage').setAttribute("src", `${e.target.result}`);   //YS: You dont need temlate literals here ${}
            } catch (error) {
                console.error(error);
            }
            return e.target.result
        }
        reader.readAsDataURL(input.files[0]);
    }
}