import axios from "../http";
import { StoryType } from "./type.d";
import { storyTranslator } from "./request.translator";

export async function createStoryTransit(story: StoryType.StoryCreateProps) {
	const { data } = await axios.post<{ story: StoryType.Story }>(
		"/stories/transit",
		story,
	);
	return storyTranslator(data.story);
}

export async function createStorySpot(story: StoryType.StoryCreateProps) {
	const { data } = await axios.post<{ story: StoryType.Story }>(
		"/stories/spot",
		story,
	);
	return storyTranslator(data.story);
}
