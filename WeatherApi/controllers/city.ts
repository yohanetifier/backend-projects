import { NextFunction, Request, Response } from 'express';

export const detailsCity = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	console.log('req.body', req.body);
	const { city } = req.body;
	const endpoints = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city},UK?key=UBH5HDB3WDYUKSLEFZRA6PBEV`;
	const response = await fetch(endpoints);
	const data = await response.json();
	console.log('data', data);
	res.status(200).json({ message: `${city}` });
};
