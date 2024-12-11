let btnInput=document.getElementById('btnInput')
let buttonaddon2=document.getElementById('button-addon2')
let two=document.getElementById('two')
let one=document.getElementById('one')
async function search(term) {
    try {
        let data = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=706a949190764a50b35204431241012&q=${term}&days=3`);
        let apiData = await data.json();
        displayFirstData(apiData.location, apiData.current);
        displaySecondData(apiData.forecast.forecastday);
    } catch (error) {
        console.log("Error fetching data:", error);
    }
}
btnInput.addEventListener('keyup',async data=>{
           console.log(await search(data.target.value)); 
})
buttonaddon2.addEventListener('click', async () => {
   await search(btnInput.value); 
});

function displayFirstData(loc,curr){
    let date=new Date(loc.localtime.replace(' ','T'))
let options = { weekday: 'long' }; 
let dayString = date.toLocaleDateString('eng', options); 
let day = date.getDate();
let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
let monthName = months[date.getMonth()]
    let box=''
    box+=`
    <div class="col-md-4 ">
    <div class="inner rounded-5 shadow ">
                    <div class="d-flex justify-content-between"><div class="day">${dayString}</div>
                    <div class=" date">${day}${monthName}</div></div>
                  
                    <div class="location">${loc.name}</div>
                    <div class="degree">
                        <div class="num1 text-white">${curr.temp_c}<sup>o</sup>C</div>
                      
                        <div class="forecast-icon">
                            <img src="https:${curr.condition.icon}" alt="" width="90">
                        </div>	
                    
                    </div>
                    <div class="custom text-info">${curr.condition.text}</div>
                    <span class="pe-4"><img src="img/icon-umberella.png" alt="">20%</span>
                    <span class="pe-4"><img src="img/icon-wind.png" alt="">18km/h</span>
                    <span><img src="img/icon-compass.png" alt="">East</span>
    </div></div> </div>`
one.innerHTML=box
}

function displaySecondData(fcast){   
let box=''
for(i=1;i<fcast.length;i++){
    let date=new Date(fcast[i].date)
    let options = { weekday: 'long' }; 
let dayString = date.toLocaleDateString('eng', options); 
    box+=` <div class="col-md-4 ">
    <div class="inner h-100 rounded-5  text-center shadow">
                    <div class="day">${dayString}</div>
                   
                    <div class="forecast-icon">
                            <img src="https:${fcast[i].day.condition.icon}" alt="" width="90">
                        </div>	
                    <div class="degree">
                        <div class="num">${fcast[i].day.maxtemp_c}<sup>o</sup>C</div>
                      <div class="fs-5"> <small>${fcast[i].day.mintemp_c}<sup>o</sup></small></div>
                    </div>
                    <div class="custom text-info mt-3">${fcast[i].day.condition.text}</div></div></div>`
                    
}
one.innerHTML+=box
}
search('cairo')
