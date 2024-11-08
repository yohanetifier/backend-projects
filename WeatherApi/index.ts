import dotenv from 'dotenv';
import http from 'http';
import app from './app';

dotenv.config();

const PORT = process.env.PORT || 3000;
app.set('port', PORT);
const server = http.createServer(app);

server.listen(PORT, () => {
	console.log(`Server listening on port ${PORT}`);
});
