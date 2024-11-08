"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
dotenv_1.default.config();
const PORT = process.env.PORT;
app.get('/', (req, res) => {
    res.send('Hello NOD Readers!');
});
app.listen(PORT, () => {
    return console.log(`Express server is listening at http://localhost:${PORT} 🚀`);
});
