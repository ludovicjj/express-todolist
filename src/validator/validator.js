exports.buildErrorMessage = (validationErrors) => {
    return validationErrors.map(error => ({property: error.path, message: error.message}))

    // return errors.reduce((result, error) => {
    //     for (const resultItem of result) {
    //         if(resultItem.property === error.property) {
    //             resultItem.messages = [...resultItem.messages, error.message];
    //             return result
    //         }
    //     }
    //
    //     const {message, ...rest} = error
    //     return [...result, {...rest, messages:[message]}]
    // }, [])
}