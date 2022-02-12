(function () {
	const DEBUG = true;

	if (window.location.origin !== 'https://azedo.pl') return;

	const DELAY = 2000;
	const INACTIVITY_TIMEOUT = 5000;
	const STORAGE_PRODUCT_KEY = 'productIndex';
	const STORAGE_TAB_KEY = 'tabIndex';
	const PRODUCTS_PER_PAGE = 12;
	const TAB_COUNT = 4;

	/// queries used to access site's elements
	//prettier-ignore
	const nodeQueries = {
		navbarLink: i => `#wide-nav li:nth-of-type(${i + 1}) .nav-top-link`,
		product: 	i => `.product-small:nth-of-type(${i + 1}) a`,
		download: 	i => `#somdn-form-submit-button`,
		update: 	i => `.paoc-popup-click`,
		backToMain: i => `#error-page .wc-forward`,
		nextPage: 	i => '.next.page-number',
	};

	const incrementStorageKey = key =>
		localStorage.setItem(key, `${parseInt(localStorage.getItem(key)) + 1}`);

	/// try clicking a query until it's loaded
	const clickQuery = queryName => document.querySelector(queryName).click();

	const moveBack = () =>
		setTimeout(() => {
			history.back();
			console.log('move back');
		}, DELAY);

	/// increment product index
	const nextProduct = () => {
		// const newVal = parseInt(localStorage.getItem(STORAGE_PRODUCT_KEY)) + 1;
		// localStorage.setItem(STORAGE_PRODUCT_KEY, `${newVal}`);
		incrementStorageKey(STORAGE_PRODUCT_KEY);
		DEBUG && console.log('next product');
	};

	const nextTab = () => {
		if (parseInt(localStorage.getItem(STORAGE_TAB_KEY)) + 1 === TAB_COUNT) {
			alert('Pobieranie ukończone');
			return;
		}

		incrementStorageKey(STORAGE_TAB_KEY);
		window.location.href = 'https://azedo.pl';
		alert('next tab');
	};

	const nextPage = () =>
		// if cannot find next page btn, move to the next tab
		onQueryLoad(nodeQueries.nextPage(), () => clickQuery(nodeQueries.nextPage()), nextTab);

	/// callback on element of given query loaded or when not found
	const onQueryLoad = (queryName, onFound, onNotFound = null) => {
		const id = setInterval(() => {
			if (document.querySelector(queryName)) {
				onFound();
				clearInterval(id);
			}
		}, 10);

		if (onNotFound) setTimeout(onNotFound, DELAY);
	};

	const pathCallbacks = {
		'': () => {
			/// click navbar link

			const tabIndex = parseInt(localStorage.getItem(STORAGE_TAB_KEY));
			const tabQuery = nodeQueries.navbarLink(tabIndex);

			onQueryLoad(
				tabQuery,
				() => {
					clickQuery(tabQuery);
					DEBUG && console.log(`entering tab of index ${tabIndex}`);
				},
				() => alert('Nie znaleziono zakładki')
			);
		},
		marka: () => {
			/// click product

			let productIndex = parseInt(localStorage.getItem(STORAGE_PRODUCT_KEY));

			// next page on loop
			if (productIndex === PRODUCTS_PER_PAGE) {
				localStorage.setItem(STORAGE_PRODUCT_KEY, '0');
				productIndex = 0;
				nextPage();
			}

			onQueryLoad(
				nodeQueries.product(productIndex),
				() => {
					clickQuery(nodeQueries.product(productIndex));
					DEBUG && console.log(`entering product of index ${productIndex}`);
				},
				nextTab
			);
		},
		sklep: () => {
			/// download and go back

			onQueryLoad(
				nodeQueries.update(),
				() => {
					nextProduct();
					clickQuery(nodeQueries.download());
				},
				() => console.log('Product not found')
			);

			moveBack();
		},
	};

	/// set default counter and tab values
	if (!localStorage.getItem(STORAGE_PRODUCT_KEY)) localStorage.setItem(STORAGE_PRODUCT_KEY, '0');
	if (!localStorage.getItem(STORAGE_TAB_KEY)) localStorage.setItem(STORAGE_TAB_KEY, '0');

	/// alert error after inactivity for too long
	setTimeout(() => alert('Niepowodzenie'), INACTIVITY_TIMEOUT);

	/// execute specified callback depending on path
	const path = window.location.pathname.split('/')[1] ?? '';
	pathCallbacks[path]();
})();
