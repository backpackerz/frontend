import axios from "../http";
import { storyTranslator } from "./request.translator";
import { Entity, StoryCreateProps } from "@backpackerz/core/index.d";

export async function createStoryTransit(story: StoryCreateProps) {
	const { data } = await axios.post<{ story: Entity.Story }>(
		"/stories/transit",
		story,
	);
	return storyTranslator(data.story);
}

export async function createStorySpot(story: StoryCreateProps) {
	const { data } = await axios.post<{ story: Entity.Story }>(
		"/stories/spot",
		story,
	);
	return storyTranslator(data.story);
}
