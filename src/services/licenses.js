let licenses;

export function getLicenses() {
	if (!licenses)
		// mimic async. loading from a server side
		licenses = new Promise((res, rej) => {
			setTimeout(
				() =>
					res([
						{
							licenseID: 14587896,
							owner: {
								email: "some@some.com",
								name: "Alex Brown",
								organization: "Some Org",
							},
							products: ["Chart", "Vault"],
							activeTill: "2018-01-12",
							renew: { link: "https://some.com", discount: 2 },
						},
						{
							licenseID: 14587896,
							owner: {
								email: "some@some.com",
								name: "Alex Brown",
								organization: "Some Org",
							},
							products: ["Chart", "Vault"],
							activeTill: "2028-01-12",
							renew: { link: "https://some.com", discount: 2 },
						},
						{
							licenseID: 1483574,
							owner: {
								email: "some@some.com",
								name: "Alex Brown",
								organization: "Some Org",
							},
							products: ["Chart", "Vault"],
							activeTill: "2018-01-12",
							renew: { link: "https://some.com", discount: 20 },
						},
						{
							licenseID: 7892173,
							owner: {
								email: "some@some.com",
								name: "Alex Brown",
								organization: "Some Org",
							},
							products: ["Chart", "Vault"],
							activeTill: "2012-01-12",
							renew: { link: "https://some.com", discount: 20 },
						},
					]),
				500
			);
		});

	return licenses;
}