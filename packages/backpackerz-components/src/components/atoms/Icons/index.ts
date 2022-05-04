import * as React from "react";

import BaseIcon, { Props } from "./BaseIcon";
import CloseIcon from "./CloseIcon";
import SuccessIcon from "./SuccessIcon";
import ErrorIcon from "./ErrorIcon";
import InfoIcon from "./InfoIcon";

type IconType = "Close" | "Success" | "Error" | "Info";

type IconCompound<P = {}> = Record<IconType, React.FC<P>>;

const IconComponents = BaseIcon;

(IconComponents as React.FC & IconCompound).Close = CloseIcon;
(IconComponents as React.FC & IconCompound).Success = SuccessIcon;
(IconComponents as React.FC & IconCompound).Error = ErrorIcon;
(IconComponents as React.FC & IconCompound).Info = InfoIcon;

export default IconComponents as React.FC<Props> & IconCompound;
