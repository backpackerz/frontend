import GridItinerary from "./Grid.itinerary";

interface GridCompound {
	Itinerary: typeof GridItinerary;
}
const Grid = {
	Itinerary: GridItinerary,
};

export default Grid as GridCompound;
