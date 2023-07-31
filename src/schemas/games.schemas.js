import joi from "joi";

export const newGameSchema = joi.object({
	name: joi.string().required(),
	image: joi.string().uri().required(),
	stockTotal: joi.number(),
	pricePerDay: joi.number(),
});
