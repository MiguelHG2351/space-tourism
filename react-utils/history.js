function createBrowserHistory(options) {
	function createBrowserLocation(window, globalHistory) {
		let { pathname, search, hash } = window.location;
		return createLocation(
			"",
			{ pathname, search, hash },
			// state defaults to `null` because `window.history.state` does
			(globalHistory.state && globalHistory.state.usr) || null,
			(globalHistory.state && globalHistory.state.key) || "default"
		);
	}

	function createBrowserHref(window, to) {
		return typeof to === "string" ? to : createPath(to);
	}

	return getUrlBasedHistory(
		createBrowserLocation,
		createBrowserHref,
		null,
		options
	);
}

function getUrlBasedHistory(
	getLocation,
	createHref,
	validateLocation,
	options
) {
	let { window = document.defaultView, v5Compat = false } = options;
	let globalHistory = window.history;
	let action = "POP";
	let listener;

	function handlePop() {
		action = "POP";
		if (listener) {
			listener({ action, location: history.location });
		}
	}

	function push(to, state) {
		action = "PUSH";
		let location = createLocation(history.location, to, state);
		if (validateLocation) validateLocation(location, to);

		let historyState = getHistoryState(location);
		let url = history.createHref(location);

		// try...catch because iOS limits us to 100 pushState calls :/
		try {
			globalHistory.pushState(historyState, "", url);
		} catch (error) {
			// They are going to lose state here, but there is no real
			// way to warn them about it since the page will refresh...
			window.location.assign(url);
		}

		if (v5Compat && listener) {
			listener({ action, location });
		}
	}

	function replace(to, state) {
		action = "REPLACE";
		let location = createLocation(history.location, to, state);
		if (validateLocation) validateLocation(location, to);

		let historyState = getHistoryState(location);
		let url = history.createHref(location);
		globalHistory.replaceState(historyState, "", url);

		if (v5Compat && listener) {
			listener({ action, location: location });
		}
	}

	let history = {
		get action() {
			return action;
		},
		get location() {
			return getLocation(window, globalHistory);
		},
		listen(fn) {
			if (listener) {
				throw new Error("A history only accepts one active listener");
			}
			window.addEventListener(PopStateEventType, handlePop);
			listener = fn;

			return () => {
				window.removeEventListener(PopStateEventType, handlePop);
				listener = null;
			};
		},
		createHref(to) {
			return createHref(window, to);
		},
		push,
		replace,
		go(n) {
			return globalHistory.go(n);
		},
	};

	return history;
}

/**
 * Creates a Location object with a unique key from the given Path
 */
export function createLocation(current, to, state, key) {
	let location = {
		pathname: typeof current === "string" ? current : current.pathname,
		search: "",
		hash: "",
		...(typeof to === "string" ? parsePath(to) : to),
		state,
		// TODO: This could be cleaned up.  push/replace should probably just take
		// full Locations now and avoid the need to run through this flow at all
		// But that's a pretty big refactor to the current test suite so going to
		// keep as is for the time being and just let any incoming keys take precedence
		key: (to && to.key) || key || createKey(),
	};
	return location;
}

function createKey() {
	return Math.random().toString(36).substring(2, 8);
}

/**
 * For browser-based histories, we combine the state and key into an object
 */
function getHistoryState(location) {
  return {
    usr: location.state,
    key: location.key,
  };
}

/**
 * Creates a string URL path from the given pathname, search, and hash components.
 */
export function createPath({ pathname = "/", search = "", hash = "" }) {
	if (search && search !== "?")
		pathname += search.charAt(0) === "?" ? search : "?" + search;
	if (hash && hash !== "#")
		pathname += hash.charAt(0) === "#" ? hash : "#" + hash;
	return pathname;
}

/**
 * Parses a string URL path into its separate pathname, search, and hash components.
 */
export function parsePath(path) {
  let parsedPath = {};

  if (path) {
    let hashIndex = path.indexOf("#");
    if (hashIndex >= 0) {
      parsedPath.hash = path.substr(hashIndex);
      path = path.substr(0, hashIndex);
    }

    let searchIndex = path.indexOf("?");
    if (searchIndex >= 0) {
      parsedPath.search = path.substr(searchIndex);
      path = path.substr(0, searchIndex);
    }

    if (path) {
      parsedPath.pathname = path;
    }
  }

  return parsedPath;
}
