const fs = require("node:fs");
const pathItemData = "./items_data.json";

exports.createItem = (data) => {
    const items = getItems();
    const id = getUniqueId(items);
    const itemCreated = {id, ...data, created: new Date()};
    items.push(itemCreated);
    writeData(items);

    return itemCreated;
}

exports.updateItem = (item, data) => {
    const updatedItem = {...item, ...data}
    let items = getItems();

    items = items.map(item => {
        return (item.id === updatedItem.id) ? updatedItem : item
    });

    writeData(items)
    return updatedItem;
}

exports.deleteItem = (oldItem) => {
    let items = getItems();
    items = items.filter(item => item.id !== oldItem.id);
    writeData(items)
}

exports.getItems = getItems

function getUniqueId (items)  {
    if (!items.length) {
        return 1;
    }
    const ids = items.map(item => item.id)
    const id = ids.reduce((acc, id) => Math.max(acc, id), -Infinity)

    return id + 1;
}

function writeData(items) {
    fs.writeFileSync(pathItemData, JSON.stringify(items, null, 4));
}

function getItems() {
    return JSON.parse(fs.readFileSync(pathItemData, "utf8"));
}
