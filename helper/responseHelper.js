exports.success = (message, data, status = 200) => {
    if (status === 204) {
        return;
    }
    return {message, status, data}
}

exports.error = (message, errors, status = 400) => {
    if (errors === null) {
        return {message, status}
    }
    return {message, status, errors}
}