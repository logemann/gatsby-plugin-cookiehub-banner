"use strict";

exports.pluginOptionsSchema = ({Joi}) => {
    return Joi.object({
        cookieHubId: Joi.string()
            .required()
            .min(8)
            .description(`The cookiehub banner plugin requires a cookieHubId.`),
        cookieHubV2Api: Joi.boolean()
            .default(true)
            .description("cookieHubV2Api must be true || false"),
        stageHosts: Joi.array()
            .items(
                Joi.string()
            )
            .description(`Please provide hostnames as string in the array`),
        stageMode: Joi.any()
            .when('stageHosts', { is: Joi.array().required(), then: Joi.valid('demo', 'off'), otherwise: Joi.forbidden()})
            .description(`Please submit either demo or off.`),
        categories: Joi.array()
            .items(
                Joi.object({
                    categoryName: Joi.string().required(),
                    cookieName: Joi.string().required()
                })
            )
            .min(1)
            .required()
    })
}