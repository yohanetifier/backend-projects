import express, { Response, Request, Express, NextFunction } from 'express';

const app: Express = express();

app.use(express.json());

app.post(
	'http://locahost:3000/:postCode',
	(req: Request, res: Response, next: NextFunction) => {
		console.log('req.body', req.body);
		next();
	}
);

export default app;
