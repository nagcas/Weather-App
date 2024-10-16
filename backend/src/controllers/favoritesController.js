import cityModel from "../models/cities.js";
import userModel from "../models/user.js";
import axios from "axios";

const addFavoriteCities = async (req, res) => {
  try {
    const { cityName, cityId } = req.body;
    const userId = req.userId;
    const apiKey = process.env.OPENWEATHER_API_KEY;

    //let city =  await cityModel.findOne({  cityName,country });

    if (cityId) {
      const user = await userModel.findById(userId);
      const alreadyAdded = user.favoriteCities.includes(cityId);
      //we are checking if the given city is already in usersfavrotie list or not

      if (alreadyAdded) {
        return res
          .send("City is already present in user's favorite list.")
          .status(200);
      }

      //else adding it to favroite list
      user.favoriteCities.push(cityId);
      await user.save();

      return res.send("City added to favorite.").status(200);
    }

    //-----------Part2----------------------
    //if no id is provided ,search for cities.the user will send the city name ,we will check if its available in openweather api and then send list as response to allow him to select one city.

    if (cityName);

    //getting city data from openweather api
    let url = `https://api.openweathermap.org/data/2.5/find?q=${cityName}&appid=${apiKey}&units=metric`;

    //it will check if city exist in its db or not

    const response = await axios.get(url);
    const cityData = response.data;
    //it returns a object which contains list of cities with same name;
    //{"message":"accurate","cod":"200","count":0,"list":[]}

    if (cityData.count == 0) return res.send("No cities found.").status(200);
    //if cities with same name exist then it shows a dropdown with different lat and longitutde and with country name;
    //then we have to select the particular city of particular country to send the main request of getting data;
    else if (cityData.count > 1) {
      res.status(200).json({
        message: "Multiple cities found, select one.",
        cities: cityData.list,
      });
      //no return keyword here as we want to move froward with request processing,as the user will be selecting and sending the city now.
    }
  } catch (error) {
    console.error("Error fetching city data: ", error);
    res.status(500).json({ message: "Error fetching city data." });
  }
};

export default addFavoriteCities;
