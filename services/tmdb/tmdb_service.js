const { BASE_URL } = require("../../constants/api_constants");

const TMDB_TOKEN = process.env.TMDB_BEARER_TOKEN;

/**
 *
 * @param {string} type
 * @param {string} query
 */
async function searchByQuery(type, query) {
  if (!type || !query) {
    throw new Error("Type and query are required");
  }

  const url = new URL(`${BASE_URL}/search/${type}`);
  url.searchParams.set("query", query);

  const response = await fetch(url, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${TMDB_TOKEN}`,
      "Content-Type": "application/json;charset=utf-8",
    },
  });

  if (!response.ok) {
    throw new Error(
      `TMDB search failed: ${response.status} ${response.statusText}`
    );
  }

  return response.json();
}

/**
 *
 * @param {number} id
 */
async function searchByID(type, id) {
  if (!type || !id) {
    throw new Error("Type and query are required");
  }

  const url = new URL(`${BASE_URL}${type}/${id}`);

  const response = await fetch(url, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${TMDB_TOKEN}`,
      "Content-Type": "application/json;charset=utf-8",
    },
  });

  if (!response.ok) {
    throw new Error(
      `TMDB search failed: ${response.status} ${response.statusText}`
    );
  }

  return response.json();
}

module.exports = {
  searchByQuery,
  searchByID,
};
