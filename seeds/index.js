const mongoose = require("mongoose");
const cities = require("./cities");
const { places, descriptors } = require("./seedHelpers");
const Campground = require("../models/campground");

mongoose.connect("mongodb://localhost:27017/YelpCamp", {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  console.log("Database connected");
});

const sample = (array) => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
  await Campground.deleteMany({});
  for (let i = 0; i < 500; i++) {
    const random1000 = Math.floor(Math.random() * 1000);
    const price = Math.floor(Math.random() * 20) + 10;
    const camp = new Campground({
      author: "6076fa384d69c04688de1528",
      location: `${cities[random1000].city}, ${cities[random1000].state}`,
      title: `${sample(descriptors)} ${sample(places)}`,
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quos molestiae atque eveniet placeat deserunt provident officia neque! Suscipit velit esse nam, facere sed pariatur veniam porro eaque ad. Dignissimos, officialipsum dolor, sit amet consectetur adipisicing elit.",
      price,
      geometry: {
        type: "Point",
        coordinates: [
            cities[random1000].longitude,
            cities[random1000].latitude,
        ]
    },
      images: [
        {
          url: 'https://res.cloudinary.com/ds4zej46d/image/upload/v1619182319/YelpCamp/brqgb8w6njwugz2s26vm.jpg',
          filename: 'YelpCamp/dvgmrzsotlsyktdosm2a'
        },
        {
          url: 'https://res.cloudinary.com/ds4zej46d/image/upload/v1618712802/YelpCamp/b2facaxlobiykz54zqyo.jpg',
          filename: 'YelpCamp/b2facaxlobiykz54zqyo'
        }
      ]
      //image: "https://source.unsplash.com/collection/483251",
    });
    await camp.save();
  }
};

seedDB().then(() => {
  mongoose.connection.close();
});
