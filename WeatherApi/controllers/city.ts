import { NextFunction, Request, Response } from 'express';
import { client } from '../app';

type Days = {
	adress: string;
	tempmax: number;
	tempmin: number;
	temp: number;
	sunrise: string;
	sunset: string;
	description: string;
};

export const detailsCityCtrl = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const { city } = req.body;
	const endpoints = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city},UK?key=UBH5HDB3WDYUKSLEFZRA6PBEV`;
	const checkIfCityIsInTheCache = await client.hGetAll(`${city}`);

	if (!!checkIfCityIsInTheCache) {
		console.log('city exist');
		const data = JSON.stringify(checkIfCityIsInTheCache);
		res.send(data);
	} else {
		console.log('city not exist');
		const response = await fetch(endpoints);
		const data = await response.json();
		const days: Days = data.days[0];
		const daysDetails: { [x: string]: string } = {
			address: `${days.adress}`,
			tempMax: `${days.tempmax}`,
			tempMin: `${days.tempmin}`,
			temp: `${days.temp}`,
			description: `${days.description}`,
			sunrise: `${days.sunrise}`,
			sunset: `${days.sunset}`
		};
		console.log('data.adress', data.resolvedAddress);
		console.log('data.tempMax', days.tempmax);
		console.log('data.tempMin', days.tempmin);
		console.log('data.temp', days.temp);
		console.log('data.description', days.description);
		console.log('data.sunrise', days.sunrise);
		console.log('data.sunset', days.sunset);
		await client.hSet(`${city}`, daysDetails);
		res.status(201).json({ data });
	}
};
