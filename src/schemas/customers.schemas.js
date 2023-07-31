import joi from "joi";

export const newCustomerSchema = joi.object({
	name: joi.string().required(),
	phone: joi.string().required().regex(/^\d+$/).min(10).max(11),
	cpf: joi.string().required().regex(/^\d+$/).length(11),
	birthday: joi.string().required().isoDate(),
});
