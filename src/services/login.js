let isAuth;

export function getAuth(email, license) {
	if (!isAuth)
		// mimic async. loading from a server side
		isAuth = new Promise((res, rej) => {
			setTimeout(
				() => {
					if ((email == "Ivan" && license === "123B4") || (email == "Ira" && license === "123B4")){
						res((isAuth = true));
					} else {
						res((isAuth = false));
					}
				},

				500
			);
		});

	return isAuth;
}