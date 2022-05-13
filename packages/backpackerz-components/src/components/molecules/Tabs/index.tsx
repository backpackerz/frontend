import * as React from "react";
import { styled } from "@mui/material";
import TabsUnstyled from "@mui/base/TabsUnstyled";
import TabsListUnstyled from "@mui/base/TabsListUnstyled";
import TabPanelUnstyled from "@mui/base/TabPanelUnstyled";
import { buttonUnstyledClasses } from "@mui/base/ButtonUnstyled";
import TabUnstyled, { tabUnstyledClasses } from "@mui/base/TabUnstyled";

const Tab = styled(TabUnstyled)(
	({ theme }) => `
		display: flex;
		justify-content: center;
		width: 100%;
		padding: 12px 16px;
		background-color: transparent;
		border: 2px solid transparent;
		border-radius: 0.4rem;
		cursor: pointer;
		color: ${theme.palette.grey[600]};
		font-family: IBM Plex Sans, sans-serif;
		font-size: 1.275rem;
		font-weight: bold;
		&:hover {
			border: 2px solid ${theme.palette.grey[600]};
			background-color: ${theme.palette.grey[200]};
		}

		&:focus {
			border-radius: 3px;
			border: 2px solid ${theme.palette.grey[600]};
		}

		&.${tabUnstyledClasses.selected} {
			background-color: ${theme.palette.common.white};
			color: ${theme.palette.grey[600]};
			border: 2px solid ${theme.palette.grey[600]};
		}

		&.${buttonUnstyledClasses.disabled} {
			opacity: 0.5;
			cursor: not-allowed;
		}
		`,
);

const TabPanel = styled(TabPanelUnstyled)`
	width: 100%;
`;

const TabsList = styled(TabsListUnstyled)(
	({ theme }) => `
		display: flex;
		align-items: center;
		justify-content: center;
		align-content: space-between;
		min-width: 320px;
		margin-bottom: 16px;
		background-color: ${theme.palette.common.white};
		border-radius: 0.4rem;
		border-radius: 5px;
		font-family: IBM Plex Sans, sans-serif;
		font-weight: bold;
		font-size: 1.275rem;
		`,
);

type Props = {
	tabs: {
		label: string;
		render: () => React.ReactChild;
	}[];
};
export default function Tabs(props: Props) {
	const { tabs } = props;
	return (
		<TabsUnstyled defaultValue={0}>
			<TabsList>
				{tabs.map((tab) => (
					<Tab>{tab.label}</Tab>
				))}
			</TabsList>
			{tabs.map((tab, index) => (
				<TabPanel value={index}>{tab.render()}</TabPanel>
			))}
		</TabsUnstyled>
	);
}
