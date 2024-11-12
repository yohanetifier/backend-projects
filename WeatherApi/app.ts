import express, { Response, Request, Express, NextFunction } from 'express';

const app: Express = express();

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

app.post('/api/:city', (req: Request, res: Response, next: NextFunction) => {
	console.log('req.body', req.params.city);
	res.status(200).json({ message: `${req.params.city}` });
});

export default app;
