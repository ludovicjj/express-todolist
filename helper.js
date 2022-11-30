exports.success = (message, data, status = 200) => {
    return {message, status, data}
}