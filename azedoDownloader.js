(function () {
	// copy and paste into browser's console

	const DEBUG = true;

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
		'': () => {
			/// click navbar link

			clickQuery(nodeQueries.navbarLink);
			DEBUG && console.log('entering tab');
		},
		marka: () => {
			/// click product

			clickQuery(nodeQueries.product);
			DEBUG && console.log('entering product');
		},
		sklep: () => {
			/// download and go back

			// click download
			clickQuery(nodeQueries.download);

			// increment product counter
			localStorage.setItem(
				STORAGE_COUNTER_KEY,
				`${parseInt(localStorage.getItem(STORAGE_COUNTER_KEY)) + 1}`
			);

			moveBack();

			DEBUG && console.log('downloading');
		},
	};

	// try clicking a query until its loaded
	const clickQuery = queryName => {
		const id = setInterval(() => {
			const element = document.querySelector(queryName);
			if (element) {
				element.click();
				clearInterval(id);

				DEBUG && console.log(`element of query "${queryName}" clicked`);
			}
		}, 10);
	};

	const moveBack = () => {
		setTimeout(() => {
			history.back();
			DEBUG && console.log('moving back');
		}, DELAY);
	};

	const path = window.location.pathname.split('/')[1] ?? '';

	// set default counter value to 0
	if (!localStorage.getItem(STORAGE_COUNTER_KEY)) localStorage.setItem(STORAGE_COUNTER_KEY, '0');

	pathCallbacks[path]();
})();
