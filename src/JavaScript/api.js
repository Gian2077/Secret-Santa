// Dependencies
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");
// Functions
function sortSecretSanta(participants) {
  let assignments = [...participants];
  let isInvalid = true;
  while (isInvalid) {
    // Fisher-Yates Shuffle
    assignments = assignments
      .map((value) => ({ value, sort: Math.random() }))
      .sort((a, b) => a.sort - b.sort)
      .map((obj) => obj.value);
    isInvalid = participants.some(
      (participant, i) => participant === assignments[i]
    );
  }
  const result = participants.map((giver, i) => ({
    giver,
    receiver: assignments[i],
  }));
  return result;
}
