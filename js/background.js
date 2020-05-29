const COUNTRIES_URL = "https://api.covid19api.com/countries";
const COUNTRY_DATA_URL = "https://api.covid19api.com/total/country";
const USA_STATES_URL = "https://disease.sh/v2/historical/usacounties";

chrome.runtime.onInstalled.addListener(() => {
  console.log("installed");
  GetCountryList();
  GetCountryData("united-states")
  GetUSAStateList();
  GetUSAStateData("washington");
});

async function GetCountryList() {
  try {
    let response = await fetch(COUNTRIES_URL);
    let parsed = await response.json();
    console.log(parsed);
    let unsorted = {};
    for (const countryData in parsed) {
      unsorted[parsed[countryData].Country] = parsed[countryData].Slug;
    }

    var keys = Object.keys(unsorted);
    keys.sort();

    var countryList = {};

    for (var i = 0; i < keys.length; i++) {
      var key = keys[i];
      var value = unsorted[key];
      countryList[key] = value;
    }
    
    console.log(countryList);
    chrome.storage.sync.set({"countryList": countryList});
  } catch (err) {
    console.log(err.message)
  }
}

async function GetCountryData(country) {
  try {
    let response = await fetch(`${COUNTRY_DATA_URL}/` + country);
    let parsed = await response.json();
    console.log(parsed[parsed.length-1])
  } catch (err) {
    console.log(err.message)
  }
}

async function GetUSAStateList() {
  try {
    let response = await fetch(USA_STATES_URL);
    let parsed = await response.json();
    console.log(parsed)
  } catch (err) {
    console.log(err.message)
  }
}

async function GetUSAStateData(state) {
  try {
    let response = await fetch(`${USA_STATES_URL}/` + state);
    let parsed = await response.json();
    console.log(parsed)
  } catch (err) {
    console.log(err.message)
  }
}
