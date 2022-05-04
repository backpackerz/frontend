import * as React from "react";
import { RenderElementProps } from "slate-react";

export type Props = React.PropsWithChildren<
	Pick<RenderElementProps, "attributes">
>;

function Element({ attributes, children }: Props) {
	return (
		<pre {...attributes}>
			<code>{children}</code>
		</pre>
	);
}

export { Element };
