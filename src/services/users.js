let users;

export function getUsers() {
	if (!users)
		// mimic async. loading from a server side
		users = new Promise((res, rej) => {
			setTimeout(
				() =>
					res([
						{
							id: 1,
							name: "Alex Bronski",
							email: "alex@some.com",
							npm: { user: "Alex", password: "Alex321" },
						},
						{
							id: 2,
							name: "Diane Range",
							email: "diane@some.com",
							npm: { user: "Diane", password: "Range$67" },
						},
					]),
				500
			);
		});

	return users;
}   