import { StoryType } from "./type.d";
import { createStoryTransit, createStorySpot } from "./request.api";

export default class StoryService {
	static createStory(story: StoryType.StoryCreateProps) {
		switch (story.type) {
			case "Transit":
				return createStoryTransit(story).then(
					(story: StoryType.Story) => {
						return story;
					},
				);
			case "Spot":
				return createStorySpot(story).then((story: StoryType.Story) => {
					return story;
				});
		}
	}
}
