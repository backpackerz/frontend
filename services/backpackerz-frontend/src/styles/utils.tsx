import { css } from "@emotion/react";

export const ellipsis = (lineClamp = 1) => css`
	overflow: hidden;
	word-wrap: break-word;
	${lineClamp == 1 ? `word-break: break-all;` : `word-break: break-word;`}
	display: -webkit-box;
	-webkit-line-clamp: ${lineClamp};
	-webkit-box-orient: vertical;
`;
