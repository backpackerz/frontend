import * as React from "react";
import Link from "next/link";

import { styled, Brand } from "@backpackerz/components";

const MENU = {
	TOP: [],
};

export default function Footer() {
	return (
		<FooterBlock>
			<Inner>
				<Brand area="footer" />
				<Menu>
					{MENU.TOP.map(
						({ href, label }: typeof MENU.TOP[number]) => {
							return (
								<Item>
									<Link href={href}>
										<a>{label}</a>
									</Link>
								</Item>
							);
						},
					)}
				</Menu>
			</Inner>
		</FooterBlock>
	);
}

const Item = styled("li")`
	& {
		a {
			cursor: pointer;
		}
	}
	& + & {
		margin-left: 0.4rem;
	}
`;

const Menu = styled("ul")`
	& {
		display: flex;
		list-style: none;
	}
`;

const Inner = styled("div")`
	& {
		display: flex;
		flex-direction: column;
	}
`;

const FooterBlock = styled("footer")`
	& {
		width: 100%;
		margin: 5rem 0 0 0;
		padding: 7.5rem 2rem;
		font-size: 1.6rem;
		background: ${(props) => props.theme.palette.primary.light};
	}
`;
