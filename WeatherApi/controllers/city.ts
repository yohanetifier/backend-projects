import { NextFunction, Request, Response } from 'express';
import { client } from '../app';

export const detailsCityCtrl = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const { city } = req.body;
	// await client.set(`${city}`, 'testValue');
	await client.set(`${city}`, `${city}`);
	const value = await client.get(`${city}`);
	console.log('value', value);

	// const endpoints = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city},UK?key=UBH5HDB3WDYUKSLEFZRA6PBEV`;
	// const response = await fetch(endpoints);
	// const data = await response.json();
	res.status(200).json({ value });
};
