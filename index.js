import { XMLParser } from "fast-xml-parser";
import fs from "fs";

const data = fs.readFileSync("ushospitals.xml", "utf8");
//console.log(data);

const options = {
  ignoreAttributes: false,
};
const theData = new XMLParser(options).parse(data);
//console.log(theData);

console.log(theData.response.row.row);
const inputDataArr = theData.response.row.row;

const mappedDataArr = [];

inputDataArr.map((x) => {
  //console.log(hosptial.hospital_name);
  const mappedData = {
    provider_id: x.provider_id,
    hospital_name: x.hospital_name,
    address: x.address,
    city: x.city,
    state: x.state,
    zip_code: x.zip_code,
    county_name: x.county_name,
    phone_number: x.phone_number["@_phone_number"], //{ '@_phone_number': '9072624404' },
    hospital_type: x.hospital_type,
    hospital_ownership: x.hospital_ownership,
    emergency_services: x.emergency_services,
    latitude: x.location["@_latitude"],
    longitude: x.location["@_longitude"],
    human_address: x.location["@_human_address"],
    /*location: {
      '@_human_address': '{"address":"250 HOSPITAL PLACE","city":"SOLDOTNA","state":"AK","zip":"99669"}',
      '@_latitude': '60.49373236400049',
      '@_longitude': '-151.07808299499973',
      '@_needs_recoding': 'false'
    },
    '@__id': '100',
    '@__uuid': 'EA083860-B5BC-42D1-8F1A-3CFFA29C0D54',
    '@__position': '100',
    '@__address': 'http://data.medicare.gov/resource/xubh-q36u/100'
    */
  };

  //console.log(mappedData);
  mappedDataArr.push(mappedData);
});

console.log(mappedDataArr);
