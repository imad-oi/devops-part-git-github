db = db.getSiblingDB('ecommerce');

db.createCollection('init_collection');
db.init_collection.insert({ message: "ecommerce database initialized" });