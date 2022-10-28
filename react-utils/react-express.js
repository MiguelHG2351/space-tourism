// function

//#region react-express.js

export function renderFullPage(html, head) {
	// const main = manifest ? manifest["main.js"] : "";
	// const mainCss = manifest ? manifest["main.css"] : "";
	// const common = manifest ? manifest["commons.js"] : "";
	// const vendor = manifest ? manifest["vendors.js"] : "";
	// const runtime = manifest ? manifest["runtime.js"] : "";

	// let scripts = `
	//   <script defer src="${main}"></script>
	//   <script defer src="${common}"></script>
	//   <script defer src="${vendor}"></script>
	//   <script defer src="${runtime}"></script>
	//   `;
	// if (process.env.NODE_ENV === "development") {
	// 	const __what = manifest ? manifest["__what.js"] : "";

	// 	scripts += `
	//     <script defer src="${__what}"></script>
	//   `;
	// }

	// new
	// const index = textHtml.indexOf('</head')
	// textHtml.slice(0, index) + textHtml.slice(index)
	// const init = html.indexOf("<head-tag>");
	// const end = html.indexOf("</head-tag>");
	// const headerTags = html.slice(init + 10, end);
	// const content = html.replace(headerTags, "");
	console.log("head", head);
	return `
	<!DOCTYPE html>
        <html>
          <head>
		  	<title>${head.title}</title>
			<link rel="stylesheet" href="/public/pages/home/styles.css" />
			<link rel="favicon" href="https://miguel2351.me/images/favicon.ico" />
          </head>
          <body>
            <div id="root">${html}</div>
            <script type="text/javascript" src="/public/pages/assets/common.js"></script>
            <script type="text/javascript" src="/public/pages/assets/vendor.js"></script>
          </body>
        </html>
        `;
}

//#endregion