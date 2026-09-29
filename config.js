require("dotenv").config();

module.exports = {
  BOT_NAME: "MADO-BOT",
  PREFIX: ".",

  // Ton numéro uniquement pour les commandes propriétaire
  OWNER_NUMBER: process.env.OWNER_NUMBER || "",

  // Clé IA facultative
  AI_API_KEY: process.env.AI_API_KEY || "",

  VERSION: "2.0.0",

  // Langue par défaut
  DEFAULT_LANGUAGE: "fr",

  // Langues prévues
  LANGUAGES: [
    "fr",
    "en",
    "es",
    "pt",
    "ar",
    "de",
    "it"
  ],

  // Plusieurs pays peuvent utiliser MADO-BOT
  MULTI_COUNTRY: true,

  DATABASE_FILE: "./database/data.json",

  SESSION_DIR: "./session"
};