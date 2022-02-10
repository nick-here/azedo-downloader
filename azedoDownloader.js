(function () {
	// copy and paste into browser's console

	const DELAY = 100;
	const STORAGE_COUNTER_KEY = 'currentProduct';

	// queries used to access site's elements
	const nodeQueries = {
		navbarLink: '#wide-nav .nav-top-link',
		product: '.product-small a',
		download: '#somdn-form-submit-button',
		backToMain: '#error-page .wc-forward',
	};

	const pathCallbacks = {
		'': () => clickQuery(nodeQueries.navbarLink), // click navbar link
		marka: () => clickQuery(nodeQueries.product), // click product
		sklep: () => {
			// click download
			clickQuery(nodeQueries.download);

			// increment product counter
			localStorage.setItem(
				STORAGE_COUNTER_KEY,
				`${parseInt(localStorage.getItem(STORAGE_COUNTER_KEY)) + 1}`
			);

			moveBack();
		}, // download and go back
	};

	// try clicking a query until its loaded
	const clickQuery = queryName => {
		const id = setInterval(() => {
			const element = document.querySelector(queryName);
			if (element) {
				element.click();
				console.log(`element of query "${queryName}" clicked`);
				clearInterval(id);
			}
		}, 10);
	};

	const moveBack = () => {
		console.log('moving back');
		setTimeout(() => history.back(), DELAY);
	};

	const path = window.location.pathname.split('/')[1] ?? '';

	// set default counter value to 0
	if (!localStorage.getItem(STORAGE_COUNTER_KEY)) localStorage.setItem(STORAGE_COUNTER_KEY, '0');

	pathCallbacks[path]();
})();
