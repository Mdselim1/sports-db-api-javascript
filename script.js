
function inputValue() {
    const inpVal = document.getElementById('input-value');
    const inputVal = inpVal.value;
    inpVal.value = '';
    if (inputVal == '') {
        document.getElementById('error').innerText = 'write a valid team name then click search';
    }
    else {
        return inputVal;
    }
}

const searchBtn = document.getElementById('btn-search').addEventListener('click', function () {
    searchWork();
    const containerDiv = document.getElementById('box-container');
    containerDiv.textContent = '';
});

const searchWork = async () => {
    const findData = inputValue();
    const url = `https://www.thesportsdb.com/api/v1/json/1/searchteams.php?t=${findData}`;
    const val = await fetch(url);
    const data = await val.json();
    teamDisplay(data.teams);
    return data.teams;
};

const teamDisplay = data => {
    const temContainer = document.getElementById('team-container');
    temContainer.textContent = '';
    data.forEach(nam => {
        const div = document.createElement('div');
        div.classList.add('col');
        div.innerHTML = `
        <div onclick="detailsDiv(${nam.idTeam})" class="card h-100">
        <img src="${nam.strTeamBadge}" class="card-img-top p-3" alt="This Image Not Available">
        <div class="card-body">
                      <h5 class="card-title">${nam.strTeam}</h5>
                      <p class="card-text">${nam.strDescriptionEN.slice(0, 250)}</p>
                    </div>
         </div>
        `;
        temContainer.appendChild(div);
    });
};

const detailsDiv = (num) => {
    
    const url = `https://www.thesportsdb.com/api/v1/json/1/lookupteam.php?id=${num}`;

    fetch(url)
        .then(pas => pas.json())
        .then(val => teamDetails(val.teams[0]))

}
 

const teamDetails = (data) => {
    // console.log(data);
    const containerDiv = document.getElementById('box-container');
    containerDiv.textContent = '';
    const div = document.createElement('div');
    div.classList.add('card');
    div.innerHTML = `
    <img src="${data.strTeamBadge}" class="card-img-top" alt="...">
    <div class="card-body">
      <p class="card-text">${data.strDescriptionEN.slice(0, 400)}</p>
    </div>
    `;
    containerDiv.appendChild(div);
}

   
    

