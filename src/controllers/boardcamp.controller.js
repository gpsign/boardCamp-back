import { db } from "../database/database.connection.js";
import { newGameSchema } from "../schemas/games.schemas.js";

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
		return res.status(422).send(errors);
	}
	const { name, image, stockTotal, pricePerDay } = req.body;
	if (stockTotal < 1 || pricePerDay < 1) return res.sendStatus(400);

	try {
		const exist = await db.query(`SELECT * FROM games WHERE name = $1;`, [
			name,
		]);
		console.log(exist.rows);
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
