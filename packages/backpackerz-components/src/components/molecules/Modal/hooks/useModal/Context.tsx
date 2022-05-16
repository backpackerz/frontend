import * as React from "react";

import type { Modal } from "@backpackerz/components/types";

export default React.createContext<null | React.MutableRefObject<
	Modal.Context | null | undefined
>>(null);
