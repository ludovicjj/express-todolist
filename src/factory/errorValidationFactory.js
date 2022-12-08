exports.buildErrorMessage = (validationErrors) => {
    return validationErrors.map(error => ({property: error.path, message: error.message}))
}