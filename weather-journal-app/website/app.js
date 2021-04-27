/*----Create a new date instance dynamically with JS----*/
let d = new Date();
let newDate = d.getMonth()+1+'.'+ d.getDate()+'.'+ d.getFullYear();
const btn = document.querySelector("#generate");
//API Credentials
const apikey="42fda05c78cffa87695ecb13cc7bb6aa";


//GET Route II: Client Side
btn.addEventListener("click", getweatherData);
async function getweatherData(){
    try{
        let zipcode=document.querySelector("#zip").value;
        let feelings = document.querySelector("#feelings").value;
        //Integrating OpenWeatherMap API
        let result= await fetch(`https://api.openweathermap.org/data/2.5/weather?zip=${zipcode}&appid=${apikey}&units=metric`);
        let dataresult = await result.json();
        let resultemp=`Temperature is ${dataresult.main.temp} celesius\n`;
        let resultdate=`Date is ${newDate}\n`;
        let resultfeeling = `Feeling is ${feelings}\n`;
        console.log(resultfeeling)
        document.querySelector("#entryHolder").children[0].textContent=resultemp;
        document.querySelector("#entryHolder").children[1].textContent=resultdate;
        document.querySelector("#entryHolder").children[2].textContent=resultfeeling;
    }catch(error){
        console.log(error);
    }
}
//GET Route I: Server Side
async function getdata(zipcode,feelings){
    try{
        let response = await fetch(`https://api.openweathermap.org/data/2.5/weather?zip=${zipcode}&appid=${apikey}&units=metric`)
    if(response.status === 404 || response.status === 400){
        return alert("Please enter valid zipcode!");
    }
    let weatherdata = await response.json();
    let temp = weatherdata.main.temp;
    }catch{

    }
    //Post Route Send data to server
    await fetch('/savedata',{
        method: "POST",
        credentials: "same-origin",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            date: newDate,
            temp: temp,
            feelings: feelings
        })
    });
}
