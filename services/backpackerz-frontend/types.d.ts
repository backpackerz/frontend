import { ReactNode, ReactElement } from "react";
import {
	NextPage,
	NextComponentType,
	GetServerSidePropsContext,
	NextPageContext,
	GetServerSideProps,
} from "next";
import { AppProps } from "next/app";
import { DocumentProps } from "next/document";
import { Store } from "redux";
import "@emotion/react";
import { palette } from "./src/styles/palette";

declare module "@emotion/react" {
	export interface Theme {
		palette: typeof palette;
		buttonColorMap: {
			[color: string]: {
				background: string;
				color: string;
				hoverBackground: string;
			};
		};
	}
}
declare global {
	type Nullable<T> = T | null;
	type ValueOf<T> = T[keyof T];
	type ElementType<T extends ReadonlyArray<unknown>> =
		T extends ReadonlyArray<infer ElementType> ? ElementType : never;

	type BackpackerzGetLayout = (page: ReactElement, pageProps) => ReactNode;

	export type BackpackerzComponent<
		C extends BaseContext = NextPageContext,
		IP = {},
		P = {},
	> = NextComponentType<C & NextPageContext, IP, P> & {
		getLayout?: BackpackerzGetLayout;
	};
	export type BackpackerzAppProps<
		C extends BaseContext = NextPageContext,
		IP = {},
		P = {},
	> = AppProps & {
		Component: BackpackerzComponent<C, IP, P>;
	};
	export type BackpackerzDocumentProps<P = {}> = DocumentProps & {
		styleTags: Array<ReactElement<{}>>;
	};
	export type BackpackerzPageComponent<P = {}, IP = P> = NextComponentType<
		NextPageContext,
		IP,
		P
	> & {
		getLayout?: BackpackerzGetLayout;
	};

	// nextjs getServerSideProps 리턴타입 추론
	type Redirect =
		| {
				statusCode: 301 | 302 | 303 | 307 | 308;
				destination: string;
				basePath?: false;
		  }
		| {
				permanent: boolean;
				destination: string;
				basePath?: false;
		  };
	type GetSSRResult<TProps> =
		| { props: TProps | Promise<TProps> }
		| { redirect: Redirect }
		| { notFound: true };

	type GetSSRFn<TProps extends any> =
		//
		(args: any) => Promise<GetSSRResult<TProps>>;

	type inferSSRProps<TFn extends GetSSRFn<any>> =
		//
		TFn extends GetSSRFn<infer TProps> ? NonNullable<TProps> : never;
}
