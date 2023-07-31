import joi from "joi";

export const newCustomerSchema = joi.object({
	name: joi.string().required(),
	phone: joi.string().required(),
	cpf: joi.string().required(),
	birthday: joi.string().required(),
});
