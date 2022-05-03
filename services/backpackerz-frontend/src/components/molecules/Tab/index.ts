import React from "react";

import TabButton, { Props as TabProps } from "./Tab";
import Tabs, { Props as TabsProps } from "./Tabs";
import TabPannel, { Props as TabPannelProps } from "./TabPannel";

interface TabCompound {
	Tabs: React.FC<TabsProps>;
	TabPannel: React.FC<TabPannelProps>;
}

const Tab = TabButton;

(Tab as React.FC<TabProps> & TabCompound).Tabs = Tabs;
(Tab as React.FC<TabProps> & TabCompound).TabPannel = TabPannel;

export default Tab as React.FC<TabProps> & TabCompound;
