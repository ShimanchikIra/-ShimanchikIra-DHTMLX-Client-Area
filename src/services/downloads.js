let downloads;

export function getDownloads() {
	if (!downloads)
		// mimic async. loading from a server side
		downloads = new Promise((res, rej) => {
			setTimeout(
				() =>
					res([
						{
							product: "Suite",
							version: "4.4",
							links: "http://some.com/suite/4.4/download",
							released: "2018-01-01",
							moreInfo: "http://some.com/dhtmlx/4.4",
							details: "new suite functionality a12",
						},
						{
							product: "Tree",
							version: "4.4",
							links: "http://some.com/tree/4.4/download",
							released: "2018-01-01",
							moreInfo: "http://some.com/dhtmlx/4.4",
							details: "new tree functionality a12",
						},
						{
							product: "Suite",
							version: "4.5",
							links: "http://some.com/suite/4.4/download",
							released: "2019-01-01",
							moreInfo: "http://some.com/dhtmlx/4.5",
							details: "new suite functionality a12+",
						},
						{
							product: "Tree",
							version: "4.5",
							links: "http://some.com/tree/4.5/download",
							released: "2019-01-01",
							moreInfo: "http://some.com/dhtml/4.5",
							details: "new tree functionality a12+",
						},
						{
							product: "Gantt",
							version: "7.2",
							links: "http://some.com/gantt/7.2/download",
							released: "2020-01-01",
							moreInfo: "http://some.com/gantt/7.2",
							details: "new gantt functionality a12++",
						},
						{
							product: "Gantt",
							version: "7.1",
							links: "http://some.com/gantt/7.1/download",
							released: "2019-01-01",
							moreInfo: "http://some.com/gantt/7.1",
							details: "new gantt functionality a12+",
						},
						{
							product: "Gantt",
							version: "7.0",
							links: "http://some.com/gantt/7.0/download",
							released: "2018-01-01",
							moreInfo: "http://some.com/gantt/7.0",
							details: "new gantt functionality a12",
						},
					]),
				500
			);
		});

	return downloads;
}