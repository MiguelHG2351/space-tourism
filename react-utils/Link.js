Link = React.forwardRef(function LinkWithRef(
	{
		onClick,
		relative,
		reloadDocument,
		replace,
		state,
		target,
		to,
		preventScrollReset,
		...rest
	},
	ref
) {
	let href = useHref(to, { relative });
	let internalOnClick = useLinkClickHandler(to, {
		replace,
		state,
		target,
		preventScrollReset,
		relative,
	});
	function handleClick(event) {
		if (onClick) onClick(event);
		if (!event.defaultPrevented) {
			internalOnClick(event);
		}
	}

	return (
		<a
			{...rest}
			href={href}
			onClick={reloadDocument ? onClick : handleClick}
			ref={ref}
			target={target}
		/>
	);
});

/**
 * Handles the click behavior for router `<Link>` components. This is useful if
 * you need to create custom `<Link>` components with the same click behavior we
 * use in our exported `<Link>`.
 */
export function useLinkClickHandler(
	to,
	{ target, replace: replaceProp, state, preventScrollReset, relative } = {}
) {
	let navigate = useNavigate();
	let location = useLocation();
	let path = useResolvedPath(to, { relative });

	return React.useCallback(
		(event) => {
			if (shouldProcessLinkClick(event, target)) {
				event.preventDefault();

				// If the URL hasn't changed, a regular <a> will do a replace instead of
				// a push, so do the same here unless the replace prop is explicitly set
				let replace =
					replaceProp !== undefined
						? replaceProp
						: createPath(location) === createPath(path);

				navigate(to, { replace, state, preventScrollReset, relative });
			}
		},
		[
			location,
			navigate,
			path,
			replaceProp,
			state,
			target,
			to,
			preventScrollReset,
			relative,
		]
	);
}
