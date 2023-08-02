const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();

app.use(cors());
app.use(bodyParser.json());

// Define a route
app.get("/", (req, res) => {
  res.send("Hello, World!");
});

function generateRandomRecords() {
  const records = [];

  for (let id = 1; id <= 500; id++) {
    const name = `Service Center ${id}`;
    const phone = generateRandomPhoneNumber();
    const address = generateRandomAddress();
    const logo = `https://placehold.co/40`;
    const openingTime = generateRandomTime();
    const closingTime = generateRandomTime();
    const rating = generateRandomRating();
    const capacity = generateRandomCapacity();

    const record = {
      id,
      name,
      phone,
      address,
      logo,
      openingTime,
      closingTime,
      rating,
      capacity,
    };

    records.push(record);
  }

  return records;
}

function generateRandomPhoneNumber() {
  const digits = Array.from({ length: 10 }, () =>
    Math.floor(Math.random() * 10)
  );
  const phoneNumber = `${digits.slice(0, 3).join("")}-${digits
    .slice(3, 6)
    .join("")}-${digits.slice(6).join("")}`;
  return phoneNumber;
}

function generateRandomAddress() {
  const streets = ["Main St", "Park Ave", "Elm St", "Oak St", "Cedar Ln"];
  const cities = [
    "Anytown",
    "Cityville",
    "Metropolis",
    "Smallville",
    "Townsville",
  ];
  const states = ["CA", "NY", "TX", "FL", "IL"];
  const randomStreet = streets[Math.floor(Math.random() * streets.length)];
  const randomCity = cities[Math.floor(Math.random() * cities.length)];
  const randomState = states[Math.floor(Math.random() * states.length)];

  const address = `${
    Math.floor(Math.random() * 1000) + 1
  } ${randomStreet}, ${randomCity}, ${randomState}`;
  return address;
}

function generateRandomTime() {
  const hours = Math.floor(Math.random() * 12) + 1;
  const minutes = Math.floor(Math.random() * 60);
  const amOrPm = Math.random() < 0.5 ? "AM" : "PM";

  const time = `${hours}:${minutes.toString().padStart(2, "0")} ${amOrPm}`;
  return time;
}

function generateRandomRating() {
  return (Math.random() * (5 - 1) + 1).toFixed(1);
}

function generateRandomCapacity() {
  return Math.floor(Math.random() * 50) + 1;
}

const randomRecords = generateRandomRecords();

app.get("/api/service-centers", (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const pageSize = parseInt(req.query.pageSize) || 10;
  const search = req.query.search || "";

  const filteredData = randomRecords.filter(
    (item) =>
      item.phone.includes(search) ||
      item.name.toLowerCase().includes(search.toLowerCase())
  );

  const paginatedData = filteredData.slice(
    (page - 1) * pageSize,
    page * pageSize
  );

  res.json({
    total: filteredData.length,
    data: paginatedData,
  });
});

// Start the server
app.listen(3001, () => {
  console.log("Server started on port 3001");
});
