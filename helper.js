const RequestManager = require("./event-emitters/requestManager");


exports.successResponse = (message, data, status = 200) => {
    return {message, status, data}
}

const errorResponse =  (message, errors, status = 400) => {
    return {message, status, errors}
}

exports.errorResponse = errorResponse

exports.getUniqueId = (items) => {
    if (!items.length) {
        return 1;
    }
    const ids = items.map(item => item.id)
    const id = ids.reduce((acc, id) => Math.max(acc, id), -Infinity)

    return id + 1;
}

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
            res.status(400);
            return res.json(errorResponse('Bad Request', errors))
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