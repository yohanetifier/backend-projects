import { Request, Response } from 'express';
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

type DataFromDB = {
	resolvedAddress: string;
	days: Array<
		Omit<Days, 'address' | 'date' | 'tempMax' | 'temMin'> & {
			tempmax: string;
			tempmin: string;
			datetime: string;
		}
	>;
};

const checkCityInRedis = async (
	normalizeCity: string
): Promise<{ [x: string]: string } | null> => {
	const checkIfCityIsInTheCache = await client.hGetAll(`${normalizeCity}`);
	const isPresentInCache = Object.hasOwn(checkIfCityIsInTheCache, 'address');
	if (isPresentInCache) {
		return checkIfCityIsInTheCache;
	} else {
		return null;
	}
};

const createCityInTheDb = async (
	normalizeCity: string,
	data: DataFromDB
): Promise<void> => {
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
	await client.expire(`${normalizeCity}`, 43200);
};

export const detailsCityCtrl = async (
	req: Request,
	res: Response
): Promise<void> => {
	const { city } = req.body;
	let normalizeCity = city ? city.toLowerCase() : null;
	if (!city) {
		res.status(500).json({ message: 'No city provided' });
	} else {
		const isPresentInCache = await checkCityInRedis(normalizeCity);
		if (isPresentInCache) {
			const data = JSON.stringify(isPresentInCache);
			res.send(data);
		} else {
			try {
				const endpoints = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city}?key=${process.env.VISUAL_CROSSING_API_KEY}`;
				const response = await fetch(endpoints);
				const data = await response.json();
				if (data.days[0]) {
					createCityInTheDb(normalizeCity, data);
					res.status(201).json({ data });
				} else {
					res.status(500).json({
						message: 'No data supplied for this location'
					});
				}
			} catch (error) {
				res.status(500).json({ error: 'No city found' });
			}
		}
	}
};
