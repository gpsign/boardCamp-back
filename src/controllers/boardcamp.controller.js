import { db } from "../database/database.connection.js";
import { newCustomerSchema } from "../schemas/customers.schemas.js";
import { newGameSchema } from "../schemas/games.schemas.js";
import { newRentalSchema } from "../schemas/rentals.schemas.js";

export async function getGames(req, res) {
	try {
		const games = await db.query("SELECT * FROM games");
		res.send(games.rows);
	} catch (err) {
		res.status(500).send(err.message);
	}
}

export async function postGame(req, res) {
	const validation = newGameSchema.validate(req.body);
	if (validation.error) {
		const errors = validation.error.details.map((detail) => detail.message);
		return res.status(400).send(errors);
	}
	const { name, image, stockTotal, pricePerDay } = req.body;
	if (stockTotal < 1 || pricePerDay < 1) return res.sendStatus(400);

	try {
		const exist = await db.query(`SELECT * FROM games WHERE name = $1;`, [
			name,
		]);
		if (exist.rows[0]) return res.sendStatus(409);

		await db.query(
			`INSERT INTO games (name, image, "stockTotal", "pricePerDay") VALUES ($1, $2, $3, $4);`,
			[name, image, stockTotal, pricePerDay]
		);
		res.send(201);
	} catch (err) {
		console.log(err);
		res.status(500).send(err.message);
	}
}

export async function getCustomers(req, res) {
	try {
		const customers = await db.query(
			"SELECT *, TO_CHAR(birthday, 'YYYY-MM-DD') AS birthday FROM customers"
		);
		res.send(customers.rows);
	} catch (err) {
		res.status(500).send(err.message);
	}
}

export async function getCustomerById(req, res) {
	const { id } = req.params;

	try {
		const customers = await db.query(
			"SELECT *, TO_CHAR(birthday, 'YYYY-MM-DD') AS birthday FROM customers WHERE id = $1;",
			[id]
		);
		customers.rows[0] ? res.send(customers.rows[0]) : res.sendStatus(404);
	} catch (err) {
		res.status(500).send(err.message);
	}
}

export async function postCustomer(req, res) {
	const validation = newCustomerSchema.validate(req.body);
	if (validation.error) {
		const errors = validation.error.details.map((detail) => detail.message);
		return res.status(400).send(errors);
	}

	const { name, phone, cpf, birthday } = req.body;

	console.log(birthday);

	try {
		const exist = await db.query(`SELECT * FROM customers WHERE cpf = $1;`, [
			cpf,
		]);
		if (exist.rows[0]) return res.sendStatus(409);

		await db.query(
			`INSERT INTO customers (name, phone, cpf, birthday) VALUES ($1, $2, $3, $4);`,
			[name, phone, cpf, birthday]
		);
		res.send(201);
	} catch (err) {
		res.status(500).send(err.message);
	}
}

export async function updateCustomer(req, res) {
	const validation = newCustomerSchema.validate(req.body);
	if (validation.error) {
		const errors = validation.error.details.map((detail) => detail.message);
		return res.status(400).send(errors);
	}

	const { name, phone, cpf, birthday } = req.body;
	const { id } = req.params;

	try {
		const exist = await db.query(
			`SELECT * FROM customers WHERE cpf = $1 AND id != $2`,
			[cpf, id]
		);
		if (exist.rows[0]) return res.sendStatus(409);

		await db.query(
			`UPDATE customers SET name = $1, phone = $2, cpf = $3, birthday = $4 WHERE id = $5;`,
			[name, phone, cpf, birthday, id]
		);
		res.send(200);
	} catch (err) {
		res.status(500).send(err.message);
	}
}

export async function getRentals(req, res) {
	try {
		const rentals = await db.query(
		);
		res.send(rentals.rows);
	} catch (err) {
		res.status(500).send(err.message);
	}
}

export async function postRental(req, res){
	
}
