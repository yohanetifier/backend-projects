import express, { Response, Request, Express, NextFunction } from 'express';
import router from './routes/detailsCityRoutes';
import { createClient } from 'redis';
import 'dotenv/config';

const app: Express = express();
const client = createClient({
	password: '',
	socket: {
		host: '127.0.0.1',
		port: 6379
	}
});

app.use(express.json());

app.use((req: Request, res: Response, next: NextFunction) => {
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader(
		'Access-Control-Allow-Headers',
		'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization'
	);
	res.setHeader(
		'Access-Control-Allow-Methods',
		'GET, POST, PUT, DELETE, PATCH, OPTIONS'
	);
	next();
});

app.use('/api', router);

client.on('error', (err) => console.log('Redis Client Error', err));
const bootstrapRedis = async () => {
	await client.connect();
};

bootstrapRedis();
export { app, client };
// export default app;
