import { Story, TextBlock } from './StoryTypes';

const existing_user_id = '51d73193-470d-442b-a392-3e43238eb089'; //TODO: Remove when accounts implemented

export function serializeStory(story: Story) : string {
    const result = JSON.stringify({
        id: story.id,
        userid: existing_user_id, 
        description: story.description,
        title: story.title,
        storyBlocks: story.storyBlocks.map(storyBlock => {
            if (storyBlock.type.toUpperCase() == "TEXT"){
                const textBlock: TextBlock = storyBlock as TextBlock ;
                return {
                    ...textBlock,
                    editorState: JSON.stringify(textBlock.editorState)
                }
            }
            return storyBlock ; 
        })
    });
    console.log(result);
    return result;
}

export function parseObjectToStory(obj: Object) : Story {

    if (!('storyBlocks' in obj || 'title' in obj || 'id' in obj || 'description' in obj ||
    'userID' in obj))
        throw new Error("Expected storyBlocks") ; 
    
    const storyBocks : Array<Object> = obj['storyBlocks'] ; 

    return {
        id: obj['id'] as string,
        userID: obj['userID'] as string,
        title: obj['title'] as string,
        description: obj['description'] as string,
        storyBlocks: storyBocks.map((storyBlock: Object) => {

            if (!('id' in storyBlock || 'type' in storyBlock))
                throw new Error("Expected storyBlocks") ; 

            const baseTypeBlock =  {
                id: storyBlock['id'] as string,
                type: storyBlock['type'] as string
            }

            const blockType: string = (storyBlock['type'] as string).toUpperCase() as string ;

            switch(blockType){
                case "TEXT":
                    return {
                        ...baseTypeBlock,
                        editorState: JSON.parse(storyBlock['editorState']) 
                    }
                case "GRAPH":
                    return {
                        ...baseTypeBlock,
                        graphID: storyBlock['graphID'] as string
                    }
                case "GEOMAP":
                    return {
                        ...baseTypeBlock,
                        mapID: storyBlock['mapID'] as string
                    }
                default:
                    throw new Error("Unrecognized story block type: " + blockType)
            }
        })
    }  as Story; 
}