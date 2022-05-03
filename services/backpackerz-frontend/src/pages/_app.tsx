import * as React from "react";
import Head from "next/head";
import App, { AppContext } from "next/app";
import { Store } from "redux";
import { http } from "@backpackerz/core";
import Core from "components/Core";
import { wrapper, RootState } from "modules";
import { globalStyles } from "styles";
import { actions } from "modules/app/user";

export type BackpackerzAppContext = AppContext & {
	store: Store<RootState>;
};

const METADATA = {
	description: "Backpackerz",
	keywords:
		"백패커즈, Backpackerz, 여행일정, 여행정보, 세계여행정보, 국내여행정보, 해외여행정보, 여행팁, 자유여행, 자유여행준비, 가이드북, 지도, 추천일정, 테마여행, 명소, 스팟, 맛집, 쇼핑, 숙박, 호텔, 게스트하우스, 최저가 항공권 검색, 최저가 숙박 검색, 최저가 호텔 검색, 특가 항공권, 무료 항공 이벤트, 무료 호텔 이벤트, 여행Q&A, 여행후기, 홍콩, 마카오, 오사카, 후쿠오카, 도쿄, 타이베이, 베이징, 상하이, 칭다오, 싱가포르, 방콕, 푸껫, 보라카이, 코타 키나발루, 파리, 로마, 런던, 바르셀로나, 크로아티아, 이스탄불, 뉴욕, 하와이, 미서부, 괌, 시드니, 제주, 타이중, 가오슝",
};

export default wrapper.withRedux(
	class extends App<BackpackerzAppProps> {
		public static getInitialProps = wrapper.getInitialAppProps(
			(store) => async (appContext: AppContext) => {
				const { ctx } = appContext;
				// SSR
				if (typeof window == "undefined") {
					const cookie = ctx.req ? ctx.req.headers.cookie || "" : "";
					http.defaults.headers.common["Cookie"] = "";
					http.defaults.headers.common["Cookie"] = cookie;

					store
						.dispatch(actions.AsyncActionCurrentUser())
						.then((_) => store.dispatch(actions.idle()));
				}
				return {
					pageProps: {
						...(await App.getInitialProps(appContext)).pageProps,
						initialState: JSON.stringify(store.getState()),
					},
				};
			},
		);

		render() {
			const { Component, pageProps } = this.props;
			const getLayout =
				Component.getLayout ?? ((page: React.ReactNode) => page);

			return (
				<>
					<Head>
						<title>슬기로운 여행의 시작 - Backpackerz</title>
						<meta
							name="viewport"
							content="viewport-fit=cover, width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, shrink-to-fit=no"
						/>
						<meta
							name="description"
							content={METADATA.description}
						/>
						<meta name="keywords" content={METADATA.keywords} />
					</Head>
					<Core pageProps={pageProps}>
						{globalStyles}
						{getLayout(<Component {...pageProps} />, pageProps)}
					</Core>
				</>
			);
		}
	},
);
