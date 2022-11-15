#! /usr/bin/env node

console.log(
  "This script populates some test books, authors, genres and bookinstances to your database. Specified database as argument - e.g.: populatedb mongodb+srv://cooluser:coolpassword@cluster0.a9azn.mongodb.net/local_library?retryWrites=true"
);

// Get arguments passed on command line
var userArgs = process.argv.slice(2);

var async = require("async");
// var Book = require('./models/book')
var Product = require("./models/product");
var Category = require("./models/category");
// var BookInstance = require('./models/bookinstance')

var mongoose = require("mongoose");
var mongoDB = userArgs[0];
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));

var products = [];
var categories = [];
// var books = []
// var bookinstances = []

function productCreate(
  src,
  P_name,
  P_discription,
  P_price,
  P_quantity,
  P_category,
  //   manufacture_date,
  //   expiry_date,
  cb
) {
  productdetail = {
    src: src,
    P_name: P_name,
    P_discription: P_discription,
    P_price: P_price,
    P_quantity: P_quantity,
    P_category: P_category,
  };
  if (P_price != false) productdetail.price_of_product = P_price;
  if (P_quantity != false) productdetail.quantity_of_product = P_quantity;

  var product = new Product(productdetail);

  product.save(function (err) {
    if (err) {
      cb(err, null);
      return;
    }
    console.log("New Product: " + product);
    products.push(product);
    cb(null, product);
  });
}

function categoryCreate(C_name, cb) {
  var category = new Category({ C_name: C_name });

  category.save(function (err) {
    if (err) {
      cb(err, null);
      return;
    }
    console.log("New category: " + category);
    categories.push(category);
    cb(null, category);
  });
}

function createCategories(cb) {
  async.series(
    [
      function (callback) {
        categoryCreate("Vegetable", callback);
      },
      function (callback) {
        categoryCreate("Beans", callback);
      },
      function (callback) {
        categoryCreate("Grains", callback);
      },
    ],
    // optional callback
    cb
  );
}

function createProducts(cb) {
  async.series(
    [
      function (callback) {
        productCreate(
          "https://upload.wikimedia.org/wikipedia/commons/thumb/8/89/Tomato_je.jpg/800px-Tomato_je.jpg",
          "Tomato",
          "The tomato is the edible berry of the plant Solanum lycopersicum",
          44,
          50,
          categories[0],

          callback
        );
      },
      function (callback) {
        productCreate(
          "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7b/White%2C_Brown%2C_Red_%26_Wild_rice.jpg/800px-White%2C_Brown%2C_Red_%26_Wild_rice.jpg",
          "Rice",
          "Rice is the seed of the grass species Oryza sativa (Asian rice) or less commonly Oryza glaberrima (African rice)",
          100,
          67,
          categories[1],
          callback
        );
      },
      function (callback) {
        productCreate(
          "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ab/Patates.jpg/1024px-Patates.jpg",
          "Potato",
          "The potato is a starchy tuber of the plant Solanum tuberosum and is a root vegetable native to the Americas. The plant is a perennial in the nightshade family Solanaceae.[2]",
          44,
          50,
          categories[0],
          callback
        );
      },
      function (callback) {
        productCreate(
          "https://upload.wikimedia.org/wikipedia/commons/thumb/9/92/Cajanus_cajan_Blanco1.167-cropped.jpg/800px-Cajanus_cajan_Blanco1.167-cropped.jpg",
          "Pigeon Peas",
          "The pigeon pea[1] (Cajanus cajan) is a perennial legume from the family Fabaceae native to the Old World",
          89,
          100,
          categories[1],
          callback
        );
      },
      function (callback) {
        productCreate(
          "https://cdn.britannica.com/90/94190-050-C0BA6A58/Cereal-crops-wheat-reproduction.jpg",
          "wheat",
          "wheat, any of several species of cereal grasses of the genus Triticum (family Poaceae) and their edible grains",
          30,
          500,
          categories[1],
          callback
        );
      },
      function (callback) {
        categoryCreate("Vegetable", callback);
      },
      function (callback) {
        categoryCreate("Beans", callback);
      },
      function (callback) {
        categoryCreate("Grains", callback);
      },
    ],
    // optional callback
    cb
  );
}

async.series(
  [createCategories, createProducts],
  // Optional callback
  function (err, results) {
    if (err) {
      console.log("FINAL ERR: " + err);
    } else {
      console.log("BOOKInstances: " + products);
    }
    // All done, disconnect from database
    mongoose.connection.close();
  }
);
