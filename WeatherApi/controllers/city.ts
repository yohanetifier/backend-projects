import { NextFunction, Request, Response } from 'express';
import { client } from '../app';

type Days = {
	address: string;
	tempMax: number;
	tempMin: number;
	temp: number;
	sunrise: string;
	sunset: string;
	description: string;
	date: string;
};

export const detailsCityCtrl = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const { city } = req.body;
	const normalizeCity = city.toLowerCase();
	if (!normalizeCity) {
		res.status(500).json({ message: 'No city provided' });
	} else {
		const checkIfCityIsInTheCache = await client.hGetAll(
			`${normalizeCity}`
		);
		const isPresentInCache = Object.hasOwn(
			checkIfCityIsInTheCache,
			'address'
		);

		if (isPresentInCache) {
			const data = JSON.stringify(checkIfCityIsInTheCache);
			res.send(data);
		} else {
			try {
				const endpoints = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city}?key=UBH5HDB3WDYUKSLEFZRA6PBEV`;
				const response = await fetch(endpoints);
				const data = await response.json();
				if (data.days[0]) {
					const days = data.days[0];
					const daysDetails: Days = {
						address: `${data.resolvedAddress}`,
						tempMax: Number(`${days.tempmax}`),
						tempMin: Number(`${days.tempmin}`),
						temp: Number(`${days.temp}`),
						description: `${days.description}`,
						sunrise: `${days.sunrise}`,
						sunset: `${days.sunset}`,
						date: `${days.datetime}`
					};
					await client.hSet(`${normalizeCity}`, daysDetails);
					res.status(201).json({ data });
				} else {
					res.status(500).json({
						message: 'No data supplied for this location'
					});
				}
			} catch (error) {
				res.status(500).json({ error: error });
			}
		}
	}
};
