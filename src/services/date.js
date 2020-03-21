
export function checkLicenseDate(data) {
	const curentDate = new Date().getTime();
	const licenseDate = new Date(data).getTime();
	const result = curentDate >= licenseDate;
	return result;
}

export function formatLicenseDate(data) {
	const months = [
		"January",
		"February",
		"March",
		"April",
		"May",
		"June",
		"July",
		"August",
		"September",
		"October",
		"November",
		"December",
	];
	const date = new Date(data);
	return `${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;
}

export function getLicenseActiveMonths(data) {
	const MONTH_IN_YEAR = 12;
	const today = new Date();
	const date = new Date(data);
	const result =
		(date.getFullYear() - today.getFullYear()) * MONTH_IN_YEAR +
		date.getMonth() -
		today.getMonth();
	return result >= 0 ? result : 0;
}