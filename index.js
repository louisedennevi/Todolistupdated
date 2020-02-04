const express = require("express");
const mongoose = require("mongoose");
const commentRouter = require("./router/commentRouter");
const config = require("./config/config")
const path = require("path");
const app = express();