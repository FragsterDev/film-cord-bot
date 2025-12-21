const BASE_URL = require("../../constants/api_constants.js");

async function search(query) {
    const data = (await fetch(`${BASE_URL}`)).json(); //wip...
}

module.exports = search;