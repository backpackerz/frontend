import * as React from "react";

import type { Alert } from "@backpackerz/components/types";

export default React.createContext<
	React.MutableRefObject<Alert.Context | null | undefined>
>(null!);
