/* eslint-disable */
import { createApp } from 'vue'
import App from './App.vue'

const mongo = require('mongodb');

//////////////////////////////////////////////////////////////////////////////

const { MongoClient } = require('mongodb')
const mongouri = 'mongodb://site202123:thieCah0@mongo_site202123?writeConcern=majority';

const mongo = new MongoClient(mongouri);

 = async function insert_many(object, collection, database='nolonolo') {
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

async function query (query, options, collection, database='nolonolo') {

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

async function erase_all(collection, database='nolonolo') {
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

//////////////////////////////////////////////////////////////////////////////


const app = createApp(App,
    {
        products: query,
    }
)

console.log(app);

app.mount('#app');



