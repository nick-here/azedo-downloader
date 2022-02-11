(function () {
	const DEBUG = true;

	const DELAY = 1500;
	const STORAGE_COUNTER_KEY = 'currentProduct';
	const PRODUCTS_PER_PAGE = 12;

	// queries used to access site's elements
	const nodeQueries = {
		navbarLink: i => `#wide-nav .nav-top-link:nth-of-type(${i + 1})`,
		product: i => `.product-small:nth-of-type(${i + 1}) a`,
		download: i => `#somdn-form-submit-button`,
		backToMain: i => `#error-page .wc-forward`,
		nextPage: i => '.next.page-number',
	};

	// try clicking a query until it's loaded
	const clickQuery = (queryName, callback = null) => {
		const id = setInterval(() => {
			const element = document.querySelector(queryName);
			if (element) {
				element.click();
				if (callback) callback();
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

	// aim at the next product, next page if 12 products opened
	const nextProduct = () => {
		const newVal =
			(parseInt(localStorage.getItem(STORAGE_COUNTER_KEY)) + 1) % PRODUCTS_PER_PAGE;

		// increment product counter
		localStorage.setItem(STORAGE_COUNTER_KEY, `${newVal}`);

		if (newVal === 0) nextPage();

		DEBUG && console.log('next product');
	};

	const nextPage = () => {
		const nextBtn = document.querySelector(nodeQueries.nextPage());

		if (nextBtn) {
			nextBtn.click();

			DEBUG && console.log('next page');
		} else if (DEBUG) {
			console.log('last page met');
			alert('last page met');
		}
	};

	const pathCallbacks = {
		'': () => {
			/// click navbar link

			clickQuery(nodeQueries.navbarLink(0));

			DEBUG && console.log(`entering tab of index ${0}`);
		},
		marka: () => {
			/// click product

			const productIndex = parseInt(localStorage.getItem(STORAGE_COUNTER_KEY));
			clickQuery(nodeQueries.product(productIndex));

			DEBUG && console.log(`entering product of index ${productIndex}`);
		},
		sklep: () => {
			/// download and go back

			clickQuery(nodeQueries.download(), nextProduct);
			moveBack();

			DEBUG && console.log('downloading');
		},
	};

	const path = window.location.pathname.split('/')[1] ?? '';

	// set default counter value to 0
	if (!localStorage.getItem(STORAGE_COUNTER_KEY)) localStorage.setItem(STORAGE_COUNTER_KEY, '0');

	pathCallbacks[path]();
})();
