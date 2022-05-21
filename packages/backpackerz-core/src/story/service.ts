import { createStoryTransit, createStorySpot } from "./request.api";
import { Entity, StoryCreateProps } from "@backpackerz/core/index.d";

export default class StoryService {
	static createStory(story: StoryCreateProps) {
		switch (story.type) {
			case "Transit":
				return createStoryTransit(story).then((story: Entity.Story) => {
					return story;
				});
			case "Spot":
				return createStorySpot(story).then((story: Entity.Story) => {
					return story;
				});
		}
	}
}
