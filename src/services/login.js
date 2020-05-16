let auth_user;

export function getAuth(email, license) {
	if (!auth_user)
		// mimic async. loading from a server side
		auth_user = new Promise((res, rej) => {
			setTimeout(
				() => {
					if (email === "Ivan" && license === "123B4"){
						res((auth_user = {
							email: "Ivan",
							license: "123B4",
							role: 'user'
						}
							));
					} 
					else if (email === "Ira" && license === "123B4"){
						res((auth_user = {
							email: "Ira",
							license: "123B4",
							role: 'admin'
						}));
					}
					else {
						res((auth_user = false));
					}
				},

				500
			);
		});

	return auth_user;
}