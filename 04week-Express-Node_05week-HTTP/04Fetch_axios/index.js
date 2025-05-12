//Simple way using inbuilt fetch
async function getData() {
    const response = await fetch("https://api.restful-api.dev/objects");
    const data = await response.json();
    console.log(data);
}
getData();

//OR

//Using axios library
const axios = require('axios');
async function fetchData() {
    const response = await axios.get("https://api.restful-api.dev/objects");
    const apiData = response.data;
    console.log(apiData[0].name);
}
fetchData();

//practice
// const findData = () => {
    //arrow function
// }

async function findData(){
    const res = await fetch("https://api.restful-api.dev/objects");
    const data =await res.json();
    console.log(data[3].name);
}
findData();