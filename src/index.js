console.log('%c HI', 'color: firebrick');

fetch("https://dog.ceo/api/breeds/image/random/4")
    .then(response => {return response.json()})
    .then(dogImages => {
        const dogImageContainer = document.getElementById("dog-image-container");
        dogImages.message.forEach(dog => {
            const newImage = document.createElement("img");
            newImage.src = dog;
            dogImageContainer.appendChild(newImage);
        });
    });

fetch("https://dog.ceo/api/breeds/list/all")
    .then(response => {return response.json()})
    .then(dogBreeds => {
        const dogBreedsContainer = document.getElementById("dog-breeds");
        Object.entries(dogBreeds.message).forEach(breed => {
            const newLi = document.createElement("li");
            newLi.textContent = breed[0][0].toUpperCase() + breed[0].slice(1);
            if (breed[1].length !== 0){
                const subUl = document.createElement("ul");
                for (subBreed of breed[1]){
                    const newSubLi = document.createElement("li");
                    newSubLi.textContent = subBreed[0].toUpperCase() + subBreed.slice(1);
                    newSubLi.addEventListener('click', (event) => {
                        event.stopPropagation();
                        if (newSubLi.style.color !== 'lightgreen') newSubLi.style.color = 'lightgreen';
                        else newSubLi.style.color = '';
                    });
                    subUl.appendChild(newSubLi);
                }
                newLi.append(subUl);
            }
            
            newLi.addEventListener('click', () => {
                if (newLi.style.color !== 'lightgreen') {
                    newLi.style.color = 'lightgreen';
                }
                else newLi.style.color = '';
            });
            dogBreedsContainer.appendChild(newLi);
        });
    });
    
const breedDropdown = document.getElementById("breed-dropdown");
while (breedDropdown.firstChild) {
    breedDropdown.removeChild(breedDropdown.lastChild);
}
const noFilter = document.createElement('option');
noFilter.value = noFilter.textContent = '-';
breedDropdown.appendChild(noFilter);

for (let i = 65; i <= 90; i++) {
    const letter = String.fromCharCode(i);
    const option = document.createElement("option");
    option.value = option.textContent = letter;
    breedDropdown.appendChild(option);
}  

breedDropdown.addEventListener('change', () => {
    const breedList = document.querySelectorAll("ul li");
    breedList.forEach(breed => {
        if (breed.textContent[0] !== breedDropdown.value && breedDropdown.value !== "-") {
            breed.style.display = "none";
        } else {
            breed.style.display = "list-item";
        }
    });
});