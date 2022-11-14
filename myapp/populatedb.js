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
          categories[1],

          callback
        );
      },
      function (callback) {
        productCreate(
          "https://upload.wikimedia.org/wikipedia/commons/thumb/8/89/Tomato_je.jpg/800px-Tomato_je.jpg",
          "Tomato",
          "The tomato is the edible berry of the plant Solanum lycopersicum",
          44,
          50,
          categories[1],
          callback
        );
      },
      function (callback) {
        productCreate(
          "https://upload.wikimedia.org/wikipedia/commons/thumb/8/89/Tomato_je.jpg/800px-Tomato_je.jpg",
          "Tomato",
          "The tomato is the edible berry of the plant Solanum lycopersicum",
          44,
          50,
          categories[1],
          callback
        );
      },
      function (callback) {
        productCreate(
          "https://upload.wikimedia.org/wikipedia/commons/thumb/8/89/Tomato_je.jpg/800px-Tomato_je.jpg",
          "Tomato",
          "The tomato is the edible berry of the plant Solanum lycopersicum",
          44,
          50,
          categories[1],
          callback
        );
      },
      function (callback) {
        productCreate(
          "https://upload.wikimedia.org/wikipedia/commons/thumb/8/89/Tomato_je.jpg/800px-Tomato_je.jpg",
          "Tomato",
          "The tomato is the edible berry of the plant Solanum lycopersicum",
          44,
          50,
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
