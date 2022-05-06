import * as React from "react";
import styled from "@emotion/styled";
import TabsUnstyled from "@mui/base/TabsUnstyled";
import TabsListUnstyled, {
	tabsListUnstyledClasses,
	TabsListUnstyledProps,
} from "@mui/base/TabsListUnstyled";
import TabPanelUnstyled from "@mui/base/TabPanelUnstyled";
import { buttonUnstyledClasses } from "@mui/base/ButtonUnstyled";
import TabUnstyled, { tabUnstyledClasses } from "@mui/base/TabUnstyled";

import { palette } from "@backpackerz/components/styles/palette";

const Tab = styled(TabUnstyled)`
	display: flex;
	justify-content: center;
	width: 100%;
	padding: 12px 16px;
	background-color: transparent;
	border: 2px solid transparent;
	border-radius: 0.4rem;
	cursor: pointer;
	color: ${palette.gray6};
	font-family: IBM Plex Sans, sans-serif;
	font-size: 1.275rem;
	font-weight: bold;
	&:hover {
		border: 2px solid ${palette.gray6};
		background-color: ${palette.gray2};
	}

	&:focus {
		border-radius: 3px;
		border: 2px solid ${palette.gray6};
	}

	&.${tabUnstyledClasses.selected} {
		background-color: ${palette.gray0};
		color: ${palette.gray6};
		border: 2px solid ${palette.gray6};
	}

	&.${buttonUnstyledClasses.disabled} {
		opacity: 0.5;
		cursor: not-allowed;
	}
`;

const TabPanel = styled(TabPanelUnstyled)`
	width: 100%;
`;

const TabsList = styled(TabsListUnstyled)`
	display: flex;
	align-items: center;
	justify-content: center;
	align-content: space-between;
	min-width: 320px;
	margin-bottom: 16px;
	background-color: ${palette.gray0};
	border-radius: 0.4rem;
	border-radius: 5px;
	font-family: IBM Plex Sans, sans-serif;
	font-weight: bold;
	font-size: 1.275rem;
`;

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
