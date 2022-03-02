(function () {
	//asd
	const DEBUG = true;

	if (window.location.origin !== 'https://azedo.pl') return;

	const DELAY = 2000;
	const INACTIVITY_TIMEOUT = 5000;
	const STORAGE_PRODUCT_KEY = 'productIndex';
	const STORAGE_TAB_KEY = 'tabIndex';
	const STORAGE_NOTFOUND_KEY = 'notFound';
	const TAB_COUNT = 4;

	/// alert error after inactivity for too long
	const inactivityTimeout = setTimeout(() => alert('Niepowodzenie'), INACTIVITY_TIMEOUT);

	/// queries used to access site's elements
	//prettier-ignore
	const nodeQueries = {
		navbarLink: i => `#wide-nav li:nth-of-type(${i + 1}) .nav-top-link`,
		product: 	i => `.products > .product-small:nth-of-type(${i + 1}) a`,
		download: 	i => `#somdn-form-submit-button`,
		update: 	i => `.paoc-popup-click`,
		backToMain: i => `#error-page .wc-forward`,
		nextPage: 	i => '.next.page-number',
	};

	const incrementStorageKey = key =>
		localStorage.setItem(key, `${parseInt(localStorage.getItem(key)) + 1}`);

	/// try clicking a query, run callback otherwise
	const tryClickQuery = (queryName, { onFound = null, onNotFound = null }) => {
		const element = document.querySelector(queryName);

		if (element) {
			element.click();
			if (onFound) onFound();
		} else if (onNotFound) onNotFound();
	};

	const moveBack = () =>
		setTimeout(() => {
			history.back();
		}, DELAY);

	const nextTab = () => {
		if (parseInt(localStorage.getItem(STORAGE_TAB_KEY)) + 1 === TAB_COUNT) {
			clearTimeout(inactivityTimeout);
			alert(
				`Pobieranie ukończone, nie znaleziono ${localStorage.getItem(
					STORAGE_NOTFOUND_KEY
				)} produktów`
			);
			return;
		}

		incrementStorageKey(STORAGE_TAB_KEY);
		window.location.href = 'https://azedo.pl';
		alert('next tab');
	};

	const nextPage = () =>
		// if cannot find next page btn, move to the next tab
		tryClickQuery(nodeQueries.nextPage(), { onNotFound: nextTab });

	const pathCallbacks = {
		'': () => {
			/// click navbar link

			const tabIndex = parseInt(localStorage.getItem(STORAGE_TAB_KEY));

			tryClickQuery(nodeQueries.navbarLink(tabIndex), {
				onNotFound: () => alert('Nie znaleziono zakładki'),
			});
		},
		marka: () => {
			/// click product

			tryClickQuery(
				nodeQueries.product(parseInt(localStorage.getItem(STORAGE_PRODUCT_KEY))),
				{
					onNotFound: () => {
						localStorage.setItem(STORAGE_PRODUCT_KEY, '0');
						nextPage();
					},
				}
			);
		},
		sklep: () => {
			/// download and go back

			tryClickQuery(nodeQueries.download(), {
				onFound: () => incrementStorageKey(STORAGE_PRODUCT_KEY),
				onNotFound: () => {
					// for products with no download button
					if (document.querySelector(nodeQueries.update()))
						incrementStorageKey(STORAGE_PRODUCT_KEY);
					else {
						incrementStorageKey(STORAGE_NOTFOUND_KEY);
						console.log('not found');
					}
				},
			});

			moveBack();
		},
	};

	/// set default localStorage values
	[STORAGE_PRODUCT_KEY, STORAGE_TAB_KEY, STORAGE_NOTFOUND_KEY].forEach(key => {
		if (!localStorage.getItem(key)) localStorage.setItem(key, '0');
	});

	/// execute specified callback depending on path
	const path = window.location.pathname.split('/')[1] ?? '';
	pathCallbacks[path]();
})();
