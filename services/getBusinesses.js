import axios from "axios";

function getBusinesses(zipstr) {
  try {
    // const businesses = await axios.get(
    //     `https://api.data.gov/sam/v3/registrations?qterms=minorityOwned:OY+AND+samAddress.zip:${}&api_key=${token.samApi}&start=1&length=1000`
    //   );
  } catch (error) {
    console.log("This is the error from getBusinesses ", error);
  }
}

export default getBusinesses;
