import express, { Response, Request, Express } from 'express';

const app: Express = express();

app.use((req: Request, res: Response) => {
	res.json({ message: 'Request sent' });
});

export default app;
