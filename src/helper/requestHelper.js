const RequestManager = require("../event-emitters/requestManager");

exports.filterBody = (req, res, allowedKeys) => {
    let body = req.body;
    let filteredBody = Object.keys(body)
        .filter((key) => allowedKeys.includes(key))
        .reduce((obj, key) => {
            return {[key]: body[key], ...obj}
        }, {});

    let missingKeys = missingKeyFromBody(body, allowedKeys)

    // traitement des champs manquant
    if (Object.keys(missingKeys).length > 0) {
        const requestManager = new RequestManager();
        requestManager.on('handleErrors', (errors) => {
            console.log(errors)
        })
        requestManager.handleErrors(missingKeys);
    }

    return filteredBody;
}

function missingKeyFromBody (body, requiredKeys)  {
    const inputKeys = Object.keys(body);

    return requiredKeys.filter((key) => !inputKeys.includes(key))
        .reduce((obj, key) => ({...obj, [key]: `Field ${key} is required`}), {})
}