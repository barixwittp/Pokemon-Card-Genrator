const url = "https://pokeapi.co/api/v2/pokemon/";

const typesColor = {
  "bug": "#26de81",
  "dragon": "#ffeaA7",
  "electric": "#fed330",
  "fairy": "#ff0069",
  "fighting": "#30336b",
  "fire": "#f0932b",
  "flying": "#81ecec",
  "grass": "#00b894",
  "ground": "#EFB549",
  "ghost": "#a55eea",
  "ice": "#74b9ff",
  "normal": "#95afc0",
  "poison": "#6c5ce7",
  "psychic": "#a29bfe",
  "rock": "#2d3436",
  "water": "#0190FF"
};

const card = document.querySelector('.card');
const btn = document.querySelector('.btn');

// Fetches a random Pokémon and generates its data card
let getPokeData = () => {
  let id = Math.floor(Math.random() * 1010) + 1;
  const finalUrl = url + id;

  fetch(finalUrl)
    .then((response) => response.json())
    .then((data) => {
      generateCard(data);
      console.log(data);
    });
};

// Capitalizes the first letter of the word
function capitalizeWord(word) {
  return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
}

// Generates the Pokémon card based on fetched data
let generateCard = (data) => {
  const hp = data.stats[0].base_stat;

  // Check for image in different sources and provide a fallback
  const imgSrc = data.sprites.other.dream_world.front_default || 
                 data.sprites.other['official-artwork'].front_default || 
                 data.sprites.front_default || 
                 'https://via.placeholder.com/150'; // Placeholder if no image available

  const pokeName = data.name;
  const statAttack = data.stats[1].base_stat;
  const statDefense = data.stats[2].base_stat;
  const statSpeed = data.stats[5].base_stat;
  const backGroundcolor = typesColor[data.types[0].type.name]; 

  // Update card content
  card.innerHTML = `
    <p class="hp w-[80px] bg-white text-center p-[8px_0px] rounded-[30px] ml-auto font-[600]">
          <span class="text-[12px] leading-[0.4px] font-[600]">HP</span>
          ${hp}
    </p>
    <img src=${imgSrc} alt="Pokemon Image" class="block w-[180px] h-max-[200px] relative m-[20px_auto]">
    <h2 class="poke-name text-center font-[600]">${capitalizeWord(`${pokeName}`)}</h2>
    <div class="types flex justify-around m-[20px_0px_40px_0px]"></div>
    <div class="stats flex items-center justify-around text-center">
        <div>
            <h2 class="font-[500]">${statAttack}</h2>
            <p class="text-[#404060]">Attack</p>
        </div>
        <div>
            <h2 class="font-[500]">${statDefense}</h2>
            <p class="text-[#404060]">Defense</p>
        </div>
        <div>
            <h2 class="font-[500]">${statSpeed}</h2>
            <p class="text-[#404060]">Speed</p>
        </div>
    </div>`;

  appendTypes(data.types);
  styeleCard(backGroundcolor);
};

// Appends Pokémon types to the card
let appendTypes = (types) => {
  const typesContainer = document.querySelector(".types");

  if (!typesContainer) {
    console.error("Container for types not found");
    return;
  }

  types.forEach((item) => {
    let span = document.createElement("SPAN");
    span.classList.add("font-[12px]", "leading-tight", "font-semibold", "p-[5px_20px]"); // Using Tailwind's predefined classes
    span.textContent = capitalizeWord(`${item.type.name}`);
    typesContainer.appendChild(span);
  });
};

// Styles the card's background based on Pokémon type color
let styeleCard = (color) => {
    let bodyy = document.querySelector("body");

    // Set card background using the dynamic color value
    card.style.background = `radial-gradient(circle at 50% 0%, ${color} 36%, #ffffff 36%)`; 
    
    // Set body background color using inline styles (since we can't use Tailwind's dynamic class like this)
    bodyy.style.backgroundColor = color;
};


// Event listeners for button click and window load to generate random Pokémon
btn.addEventListener('click', getPokeData);
window.addEventListener('load', getPokeData);
