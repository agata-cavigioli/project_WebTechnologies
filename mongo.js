/* eslint-disable */
const { MongoClient } = require('mongodb');
const mongouri = 'mongodb://site202123:thieCah0@mongo_site202123?writeConcern=majority';

const mongo = new MongoClient(mongouri);

exports.update = async function(query, update, collection, database='nolonolo') {
	
	let cursor;

	try {
		await mongo.connect();

		const db = mongo.db(database);
		const coll = db.collection(collection);

		cursor = await coll.updateOne(query, update, {});

	} finally {
		await mongo.close();
	}
	
}

exports.delete = async function(query, collection, database='nolonolo') {
	
	let cursor;

	try {
		await mongo.connect();

		const db = mongo.db(database);
		const coll = db.collection(collection);

		cursor = await coll.deleteOne(query);

	} finally {
		await mongo.close();
	}
	
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
