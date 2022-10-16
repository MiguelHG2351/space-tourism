import { parsePath } from './history';
import { invariant } from './utils';

export function Router({
    basename: basenameProp = "/",
    children = null,
    location: locationProp,
    navigationType = "POP",
    navigator,
    static: staticProp = false,
  }) {
    invariant(
      !useInRouterContext(),
      `You cannot render a <Router> inside another <Router>.` +
        ` You should never have more than one in your app.`
    );
  
    // Preserve trailing slashes on basename, so we can let the user control
    // the enforcement of trailing slashes throughout the app
    let basename = basenameProp.replace(/^\/*/, "/");
    let navigationContext = React.useMemo(
      () => ({ basename, navigator, static: staticProp }),
      [basename, navigator, staticProp]
    );
  
    if (typeof locationProp === "string") {
      locationProp = parsePath(locationProp);
    }
  
    let {
      pathname = "/",
      search = "",
      hash = "",
      state = null,
      key = "default",
    } = locationProp;
  
    let location = React.useMemo(() => {
      let trailingPathname = stripBasename(pathname, basename);
  
      if (trailingPathname == null) {
        return null;
      }
  
      return {
        pathname: trailingPathname,
        search,
        hash,
        state,
        key,
      };
    }, [basename, pathname, search, hash, state, key]);
  
    warning(
      location != null,
      `<Router basename="${basename}"> is not able to match the URL ` +
        `"${pathname}${search}${hash}" because it does not start with the ` +
        `basename, so the <Router> won't render anything.`
    );
  
    if (location == null) {
      return null;
    }
  
    return (
      <NavigationContext.Provider value={navigationContext}>
        <LocationContext.Provider
          children={children}
          value={{ location, navigationType }}
        />
      </NavigationContext.Provider>
    );
  }