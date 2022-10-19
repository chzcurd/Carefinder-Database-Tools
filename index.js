import { XMLParser } from "fast-xml-parser";
import fs from "fs";

//Read in XML file
const data = fs.readFileSync("ushospitals.xml", "utf8");

//Parse XML file
const options = {
  //Why is data stored in attributes :(
  //Makes my code longer to parse it all
  ignoreAttributes: false,
};
const theData = new XMLParser(options).parse(data);

//Pull out array of hospitals from the parsed xml
const inputDataArr = theData.response.row.row;

//Map the hospital data that is parsed to the proper format
const mappedDataArr = [];
inputDataArr.map((x) => {
  const mappedData = {
    //data that can be nicely mapped
    provider_id: x.provider_id,
    hospital_name: x.hospital_name,
    address: x.address,
    city: x.city,
    state: x.state,
    zip_code: x.zip_code,
    county_name: x.county_name,
    hospital_type: x.hospital_type,
    hospital_ownership: x.hospital_ownership,
    emergency_services: x.emergency_services,

    //phone number is stored as { '@_phone_number': '9072624404' } for some reason
    phone_number: x.phone_number["@_phone_number"],

    //Pull location data from location object
    latitude: x.location["@_latitude"],
    longitude: x.location["@_longitude"],
    //TODO figure out if this should be parsed to json or left as a string
    human_address: JSON.parse(x.location["@_human_address"]),

    //Unmapped data, may or may not be needed
    /*
    '@__id': '100',
    '@__uuid': 'EA083860-B5BC-42D1-8F1A-3CFFA29C0D54',
    '@__position': '100',
    '@__address': 'http://data.medicare.gov/resource/xubh-q36u/100'
    */
  };

  //add mapped object to return array
  mappedDataArr.push(mappedData);
});

//Stringify JSON and write to file
const hospitalJSON = JSON.stringify(mappedDataArr);
fs.writeFileSync("ushospitals.json", hospitalJSON);
