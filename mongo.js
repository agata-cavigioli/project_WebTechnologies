/* eslint-disable */
const { MongoClient } = require('mongodb');
const mongouri = 'mongodb://site202123:thieCah0@mongo_site202123?writeConcern=majority';

const mongo = new MongoClient(mongouri);

exports.test = async function (){
	return [
		{
			"name": "Aaron David Gordon",
			"birth": "1856",
			"birth_p": "Ukraine",
			"death": "1922",
			"death_p": "Palestine",
			"subjects": "Agriculture, Zionism"
		},
		{
			"name": "Abraham Joshua Heschel",
			"birth": "1907",
			"birth_p": "Poland",
			"death": "1972",
			"death_p": "York",
			"subjects": "Judaism, Philosophy Of Religion"
		},
		{
			"name": "Albert of Saxony",
			"birth": "1316",
			"birth_p": "Germany",
			"death": "1390",
			"death_p": "Germany",
			"subjects": "Gravity"
		},
		{
			"name": "Alessandro Achillini",
			"birth": "1463",
			"birth_p": "Italy",
			"death": "1512",
			"death_p": "Bologna",
			"subjects": "William Of Ockham"
		},
		{
			"name": "Alexander Gottlieb Baumgarten",
			"birth": "1714",
			"birth_p": "Germany",
			"death": "1762",
			"death_p": "Germany",
			"subjects": "Aesthetics, Gottfried Wilhelm Leibniz, Feeling, Christian, Baron Von Wolff"
		},
		{
			"name": "Alexius Meinong",
			"birth": "1853",
			"birth_p": "Ukraine",
			"death": "1920",
			"death_p": "Austria",
			"subjects": "Objectivism, Intentionality"
		},
		{
			"name": "Alfred Firmin Loisy",
			"birth": "1857",
			"birth_p": "France",
			"death": "1940",
			"death_p": "France",
			"subjects": "Philosophy Of Religion, Modernism"
		},
		{
			"name": "Alfred Korzybski",
			"birth": "1879",
			"birth_p": "Poland",
			"death": "1950",
			"death_p": "Connecticut",
			"subjects": "Semantics, General Semantics"
		}];

}

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
