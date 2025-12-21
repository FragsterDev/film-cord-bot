const BASE_URL = require("../../constants/api_constants.js"); // unused for now

/**
 *
 * @param {string} type
 * @param {string} query
 * @returns {object}
 */
async function search(type, query) {
  type = "accepted";
  // Simulate network delay (optional, but realistic)
  await new Promise((res) => setTimeout(res, 200));

  return {
    page: 1,
    results: [
      {
        id: 27205,
        title: "Inception",
        overview: "A skilled thief infiltrates dreams to steal secrets.",
        release_date: "2010-07-15",
        vote_average: 8.4,
        poster_path: "/inception.jpg",
      },
      {
        id: 157336,
        title: "Interstellar",
        overview: "Explorers travel through a wormhole to save humanity.",
        release_date: "2014-11-05",
        vote_average: 8.6,
        poster_path: "/interstellar.jpg",
      },
      {
        id: 603,
        title: "The Matrix",
        overview: "A hacker discovers the nature of reality.",
        release_date: "1999-03-31",
        vote_average: 8.7,
        poster_path: "/matrix.jpg",
      },
      {
        id: 155,
        title: "The Dark Knight",
        overview: "Batman faces the Joker in Gotham City.",
        release_date: "2008-07-18",
        vote_average: 9.0,
        poster_path: "/dark_knight.jpg",
      },
      {
        id: 680,
        title: "Pulp Fiction",
        overview: "Interconnected stories of crime in Los Angeles.",
        release_date: "1994-10-14",
        vote_average: 8.9,
        poster_path: "/pulp_fiction.jpg",
      },
      {
        id: 13,
        title: "Forrest Gump",
        overview: "The life journey of Forrest Gump.",
        release_date: "1994-07-06",
        vote_average: 8.8,
        poster_path: "/forrest_gump.jpg",
      },
      {
        id: 122,
        title: "The Lord of the Rings: The Return of the King",
        overview: "The final battle for Middle-earth.",
        release_date: "2003-12-17",
        vote_average: 8.9,
        poster_path: "/lotr_return.jpg",
      },
      {
        id: 120,
        title: "The Lord of the Rings: The Fellowship of the Ring",
        overview: "A hobbit begins a journey to destroy a powerful ring.",
        release_date: "2001-12-19",
        vote_average: 8.8,
        poster_path: "/lotr_fellowship.jpg",
      },
      {
        id: 121,
        title: "The Lord of the Rings: The Two Towers",
        overview: "The fellowship is broken but the quest continues.",
        release_date: "2002-12-18",
        vote_average: 8.7,
        poster_path: "/lotr_two_towers.jpg",
      },
      {
        id: 11,
        title: "Star Wars: A New Hope",
        overview: "A farm boy joins a rebellion in space.",
        release_date: "1977-05-25",
        vote_average: 8.6,
        poster_path: "/star_wars.jpg",
      },
      {
        id: 1891,
        title: "The Empire Strikes Back",
        overview: "The Rebels face a powerful counterattack.",
        release_date: "1980-05-21",
        vote_average: 8.7,
        poster_path: "/empire.jpg",
      },
      {
        id: 1892,
        title: "Return of the Jedi",
        overview: "The final confrontation with the Empire.",
        release_date: "1983-05-25",
        vote_average: 8.3,
        poster_path: "/jedi.jpg",
      },
      {
        id: 550,
        title: "Fight Club",
        overview: "An underground fight club spirals out of control.",
        release_date: "1999-10-15",
        vote_average: 8.8,
        poster_path: "/fight_club.jpg",
      },
      {
        id: 278,
        title: "The Shawshank Redemption",
        overview: "Two prisoners bond over years in prison.",
        release_date: "1994-09-23",
        vote_average: 9.3,
        poster_path: "/shawshank.jpg",
      },
      {
        id: 238,
        title: "The Godfather",
        overview:
          "The aging patriarch of an organized crime dynasty transfers control.",
        release_date: "1972-03-24",
        vote_average: 9.2,
        poster_path: "/godfather.jpg",
      },
      {
        id: 240,
        title: "The Godfather Part II",
        overview: "The rise and fall of the Corleone family.",
        release_date: "1974-12-20",
        vote_average: 9.0,
        poster_path: "/godfather2.jpg",
      },
      {
        id: 424,
        title: "Schindler's List",
        overview: "A businessman saves Jewish refugees during WWII.",
        release_date: "1993-12-15",
        vote_average: 8.9,
        poster_path: "/schindler.jpg",
      },
      {
        id: 637,
        title: "Life Is Beautiful",
        overview: "A father protects his son during the Holocaust.",
        release_date: "1997-12-20",
        vote_average: 8.6,
        poster_path: "/life_beautiful.jpg",
      },
      {
        id: 68001,
        title: "Django Unchained",
        overview: "A freed slave sets out to rescue his wife.",
        release_date: "2012-12-25",
        vote_average: 8.4,
        poster_path: "/django.jpg",
      },
      {
        id: 68718,
        title: "The Hateful Eight",
        overview: "Eight strangers are trapped in a blizzard.",
        release_date: "2015-12-25",
        vote_average: 7.8,
        poster_path: "/hateful_eight.jpg",
      },
      {
        id: 27206,
        title: "Tenet",
        overview: "A secret agent manipulates time to prevent disaster.",
        release_date: "2020-08-26",
        vote_average: 7.5,
        poster_path: "/tenet.jpg",
      },
      {
        id: 497,
        title: "The Green Mile",
        overview: "A death row guard witnesses miracles.",
        release_date: "1999-12-10",
        vote_average: 8.6,
        poster_path: "/green_mile.jpg",
      },
      {
        id: 1893,
        title: "Back to the Future",
        overview: "A teenager travels through time.",
        release_date: "1985-07-03",
        vote_average: 8.5,
        poster_path: "/back_future.jpg",
      },
      {
        id: 769,
        title: "Goodfellas",
        overview: "The rise and fall of a mob associate.",
        release_date: "1990-09-21",
        vote_average: 8.7,
        poster_path: "/goodfellas.jpg",
      },
      {
        id: 752,
        title: "V for Vendetta",
        overview: "A masked vigilante fights a totalitarian regime.",
        release_date: "2006-03-17",
        vote_average: 8.2,
        poster_path: "/v_vendetta.jpg",
      },
    ],
    total_pages: 4,
    total_results: 25,
    query_used: query,
  };
}

module.exports = search;
