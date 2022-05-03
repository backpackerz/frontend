import { Element as ElementDefault, Props } from "./Element.default";
import {
	Element as ElementCode,
	Props as ElementCodeProps,
} from "./Element.code";
import {
	Element as ElementHeading,
	Props as ElementHeadingProps,
} from "./Element.heading";

interface ElementCompound {
	Code: React.FC<ElementCodeProps>;
	Heading: React.FC<ElementHeadingProps>;
}

const Element = ElementDefault;

(Element as React.FC<Props> & ElementCompound).Code = ElementCode;
(Element as React.FC<Props> & ElementCompound).Heading = ElementHeading;

export default Element as React.FC<Props> & ElementCompound;
