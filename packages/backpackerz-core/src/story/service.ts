import * as Api from "./request.api";
import { StoryCreateProps } from "@backpackerz/core/index.d";

export default class StoryService {
	static async createStory(story: StoryCreateProps) {
		const result = await {
			Transit: Api.createStoryTransit,
			Spot: Api.createStorySpot,
		}[story.type](story);

		return result;
	}
}
