import {
	Toolbar as ToolbarDefault,
	Props as ToolbarProps,
} from "./Toolbar.default";

interface ToolbarCompound {}

const Toolbar = ToolbarDefault;

// (Toolbar as React.FC<ToolbarProps> & ToolbarCompound).Bubble = ToolbalBubble;
export default Toolbar as React.FC<ToolbarProps> & ToolbarCompound;
