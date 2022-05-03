import { TypedUseSelectorHook, useSelector } from "react-redux";
import type { RootState } from "modules";

const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export default useAppSelector;
