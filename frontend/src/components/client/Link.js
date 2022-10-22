import React from "react";
/**
 * 
 * @param {Object} args
 * @param {string} args.key  
 * @param {string} args.expected  
 * @param {string} args.actual
 */
function createPropError(args) {
    return new Error(
      `Failed prop type: The prop \`${args.key}\` expects a ${args.expected} in \`<Link>\`, but got \`${args.actual}\` instead.` +
        (typeof window !== 'undefined'
          ? "\nOpen your browser's console to view the Component stack trace."
          : '')
    )
}

function navigateTo(e, router, href) {

}

const Link = React.forwardRef((props, forwardRef) => {
	// TypeScript trick for type-guarding:
	const requiredPropsGuard = {
		href: true,
	};
	const requiredProps = Object.keys(requiredPropsGuard);
	requiredProps.forEach((key) => {
		if (key === "href") {
			if (
				props[key] == null ||
				(typeof props[key] !== "string" && typeof props[key] !== "object")
			) {
				throw createPropError({
                    key,
                    expected: '`Object` or `string`',
                    actual: props[key] === null ? 'null' : typeof props[key]
                })
			}
		} else {
			// TypeScript trick for type-guarding:
			// eslint-disable-next-line @typescript-eslint/no-unused-vars
			const _ = key;
		}
	});

    const childProps = {
        onClick(e) {
            e.preventDefault();
            if (!e.defaultPrevented) {
                navigateTo(e)
            }
        }
    }

    // TODO-APP intersection observer

    return (
        <a href=""></a>
    )
});
