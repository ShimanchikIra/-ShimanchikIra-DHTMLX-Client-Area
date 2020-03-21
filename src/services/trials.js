let products;

export function getProducts() {
	if (!products)
		// mimic async. loading from a server side
		products = new Promise((res, rej) => {
			setTimeout(
				() =>
					res({
						products: [
							{
								id: 1,
								name: "Chart",
								trialLength: 30,
								img: "https://picsum.photos/300/200",
							},
							{
								id: 2,
								name: "Vault",
								trialLength: 30,
								img: "https://picsum.photos/300/200",
							},
							{
								id: 3,
								name: "Pivot",
								trialLength: 30,
								img: "https://picsum.photos/300/200",
							},
							{
								id: 4,
								name: "Gantt",
								trialLength: 30,
								img: "https://picsum.photos/300/200",
							},
							{
								id: 5,
								name: "Diagram",
								trialLength: 30,
								img: "https://picsum.photos/300/200",
							},
						],
						trials: [
							{ start: "01/01/2020", end: "02/01/2020", productId: 1 },
							{ start: "03/01/2020", end: "04/01/2020", productId: 4 },
							{ start: "03/13/2020", end: "04/13/2020", productId: 5 },
						],
					}),
				500
			);
		});

	return products;
}