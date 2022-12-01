exports.success = (message, data, status = 200) => {
    return {message, status, data}
}
exports.error = (message, data, status = 400) => {
    return {message, status, data}
}

exports.getUniqueId = (items) => {
    if (!items.length) {
        return 1;
    }
    const ids = items.map(item => item.id)
    const id = ids.reduce((acc, id) => Math.max(acc, id), -Infinity)

    return id + 1;
}