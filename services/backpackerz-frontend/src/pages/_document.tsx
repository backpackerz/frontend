import * as React from "react";
import Document, {
	DocumentContext,
	Html,
	Head,
	Main,
	NextScript,
} from "next/document";
import { AppType } from "next/dist/shared/lib/utils";

const faviconDirFormat = (filename: ReadonlyArray<string>) =>
	`/favicon/${filename}`;

const DocumentHead = () => {
	return (
		<Head>
			<meta charSet="utf-8" />
			<link rel="shortcut icon" href={faviconDirFormat`favicon.ico`} />
			<link
				rel="apple-touch-icon"
				sizes="57x57"
				href={faviconDirFormat`apple-icon-57x57.png`}
			/>
			<link
				rel="apple-touch-icon"
				sizes="60x60"
				href={faviconDirFormat`apple-icon-60x60.png`}
			/>
			<link
				rel="apple-touch-icon"
				sizes="72x72"
				href={faviconDirFormat`apple-icon-72x72.png`}
			/>
			<link
				rel="apple-touch-icon"
				sizes="76x76"
				href={faviconDirFormat`apple-icon-76x76.png`}
			/>
			<link
				rel="apple-touch-icon"
				sizes="114x114"
				href={faviconDirFormat`apple-icon-114x114.png`}
			/>
			<link
				rel="apple-touch-icon"
				sizes="120x120"
				href={faviconDirFormat`apple-icon-120x120.png`}
			/>
			<link
				rel="apple-touch-icon"
				sizes="144x144"
				href={faviconDirFormat`apple-icon-144x144.png`}
			/>
			<link
				rel="apple-touch-icon"
				sizes="152x152"
				href={faviconDirFormat`apple-icon-152x152.png`}
			/>
			<link
				rel="apple-touch-icon"
				sizes="180x180"
				href={faviconDirFormat`apple-icon-180x180.png`}
			/>
			<link
				rel="icon"
				type="image/png"
				sizes="192x192"
				href={faviconDirFormat`android-icon-192x192.png`}
			/>
			<link
				rel="icon"
				type="image/png"
				sizes="32x32"
				href={faviconDirFormat`favicon-32x32.png`}
			/>
			<link
				rel="icon"
				type="image/png"
				sizes="96x96"
				href={faviconDirFormat`favicon-96x96.png`}
			/>
			<link
				rel="icon"
				type="image/png"
				sizes="16x16"
				href={faviconDirFormat`favicon-16x16.png`}
			/>
			<link rel="manifest" href={faviconDirFormat`manifest.json`} />
			<meta name="msapplication-TileColor" content="#ffffff" />
			<meta
				name="msapplication-TileImage"
				content="/ms-icon-144x144.png"
			/>
			<meta name="theme-color" content="#ffffff" />
			<meta
				name="msapplication-config"
				content={faviconDirFormat`browserconfig.xml`}
			/>
		</Head>
	);
};
export default class CustomDocument extends Document<BackpackerzDocumentProps> {
	public static getInitialProps = async function (
		documentContext: DocumentContext,
	) {
		const originalRenderPage = documentContext.renderPage;
		documentContext.renderPage = async () => {
			const page = await originalRenderPage({
				enhanceApp: (App: AppType) => {
					const app: AppType = (props) => {
						return <App {...props} />;
					};
					return app;
				},
				enhanceComponent: (Component) => Component,
			});
			return page;
		};

		const initialProps = await Document.getInitialProps(documentContext);

		return initialProps;
	};

	render() {
		return (
			<Html lang="ko">
				<DocumentHead />
				<body>
					<Main />
					<NextScript />
				</body>
			</Html>
		);
	}
}
