/* Global Variables */

//API credentials 
const country = 'us';
const key = '&appid=12c68ef7e6fa37beeb4ea91fd5ca606e';
const baseurl = 'http://api.openweathermap.org/data/2.5/weather?zip=';

// Function expressions declaration
const getData = async (url='')=>{
    const response = await fetch(url);
    try{
        const data = response.json();
        console.log(data);
        return data;
    }
    catch(error){
        console.log('error', error);
    }
}
const postData = async (url='', data={})=>{
    const response = await fetch(url, {
        method: 'POST', 
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data), 
        }
    );
    
    try {
        const newData = await response.json();
        console.log(newData);
        return newData;
    }
    catch(error) {
        console.log("error", error);
    }
}
const getWeather = async (url='',zip='' ,key ='' )=>{
    const response = await fetch(url+zip+key);
    try{
        const data = response.json();
        console.log(data);
        return data;
    }
    catch(error){
        console.log('error', error);
    }
}

const tempConv = (temp)=> (temp - 273.15).toFixed(2) + ' C' ; 

const updateUI = async ()=>{
    getData('/projectData').then((data)=>{
        console.log('data from server: ',data);
        document.querySelector('#temp').innerHTML = data.temperature;
        document.querySelector('#date').innerHTML = data.date;
        document.querySelector('#content').innerHTML = data.userResponse;
    });
}

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = (d.getMonth()+1)+'.'+ d.getDate()+'.'+ d.getFullYear();

// retreive data from the server


// Retreie the weather data from API and POST them to the server
document.querySelector('#generate').addEventListener('click',()=>{
    if (document.querySelector('#zip').value === ''){zip = '35016,'; }
    else {zip = document.querySelector('#zip').value+','; }
    getWeather(baseurl,zip+country,key).then((data)=>{
        console.log(data);
        let userResponseValue = document.querySelector('#feelings').value;
        let temp = tempConv(data.main.temp);
        postData('/addData', {temperature : temp, date : newDate, userResponse: userResponseValue});   
        updateUI();     
    })
});

