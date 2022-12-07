exports.buildValidationData = (validationErrors) => {
    return validationErrors.reduce((result, error) => {
        const property = error.path
        result[property] = result[property] || [];
        result[property].push(error.message);

        return result;
    }, {});
}