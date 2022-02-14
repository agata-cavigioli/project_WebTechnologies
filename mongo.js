/* eslint-disable */
const { MongoClient } = require('mongodb');
const mongouri = 'mongodb://site202123:thieCah0@mongo_site202123?writeConcern=majority';

const mongo = new MongoClient(mongouri);

exports.insert_many = async function(object, collection, database='nolonolo') {
	try {
		await mongo.connect();

		const db = mongo.db(database);
		const coll = db.collection(collection);

		const options = { ordered: true };
		const result = await coll.insertMany(object, options);
		console.log(`${result.insertedCount} documents were inserted`);

	} finally {
		await mongo.close();
	}
}

exports.insert_one = async function(object, collection, database='nolonolo') {
	try {
		await mongo.connect();

		const db = mongo.db(database);
		const coll = db.collection(collection);

		const options = { ordered: true };
		const result = await coll.insertOne(object, options);
		console.log(`${result.insertedCount} documents were inserted`);

	} finally {
		await mongo.close();
	}
}

exports.query = async function(query, options, collection, database='nolonolo') {

	let cursor;

	try {
		await mongo.connect();

		const db = mongo.db(database);
		const coll = db.collection(collection);

		cursor = await coll.find(query, options).toArray();

	} finally {
		await mongo.close();
		return cursor;
	}
}

exports.erase_all = async function(collection, database='nolonolo') {
	try {
		await mongo.connect();

		const db = mongo.db(database);
		const coll = db.collection(collection);

		const result = await coll.deleteMany();
		console.log(`${result.deletedCount} documents were deleted`);

	} finally {
		await mongo.close();
	}
}

/*
exports.mongoInsert = async function() {
	try {
		await mongo.connect();

		const database = mongo.db("insertDB");
		const foods = database.collection("foods");

		const res = await foods.deleteMany();
		console.log(`${res.deletedCount} documents were inserted`);

// create an array of documents to insert
		const docs = [
			{ name: "cake", healthy: false },
			{ name: "lettuce", healthy: true },
			{ name: "donut", healthy: false }
		];

// this option prevents additional documents from being inserted if one fails
		const options = { ordered: true };
		const result = await foods.insertMany(docs, options);
		console.log(`${result.insertedCount} documents were inserted`);

	} finally {
		await mongo.close();
	}
}

exports.mongoQuery = async function() {
	try {
		await mongo.connect();
		const database = mongo.db("insertDB");
		const foods = database.collection("foods");

// query for movies that have a runtime less than 15 minutes
		const query = { healthy: false };
		const options = {
			// sort returned documents in ascending order by title (A->Z)
			sort: { name: 1 },
		};

		const cursor = foods.find(query, options);

		// print a message if no documents were found
		if ((await cursor.count()) === 0) {
			console.log("No documents found!");
		}

		// replace console.dir with your callback to access individual elements
		await cursor.forEach(console.dir);

	} finally {
		await mongo.close();
	}
}
*/
