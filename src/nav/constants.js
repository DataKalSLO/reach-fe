// Routes
export const HOME = '/';
export const EXPLORE = '/explore';
export const VIZ_BUILDER = '/viz-builder';
export const STORY_BUILDER = '/story-builder';
export const MY_STUFF = '/my-stuff';
export const MY_STUFF_CHARTS = MY_STUFF + '/charts';
export const MY_STUFF_MAPS = MY_STUFF + '/maps';
export const MY_STUFF_STORIES = MY_STUFF + '/stories';
export const LOGIN = '/login';
export const SAMPLE = '/sample';
export const CREATE_ACCOUNT = '/create-account';
export const SETTINGS = '/settings';
export const ADMIN = '/admin';
export const STORY_VIEW = '/story';
export const STORY_VIEW_ID = STORY_VIEW + '/:storyId';

// Names of routes in the navigation bar
export const HOME_NAME = 'Reach';
export const EXPLORE_NAME = 'Explore';
export const VIZ_BUILDER_NAME = 'VizBuilder';
export const STORY_BUILDER_NAME = 'StoryBuilder';
export const MY_STUFF_NAME = 'My Stuff';
export const LOGIN_NAME = 'Login';
export const ADMIN_NAME = 'Admin';

// TODO: these don't belong here
export const ADMIN_USER = 1;
export const BASE_USER = 0;
export const UNDEFINED_USER = -1;
export const EMPTY_TOKEN = '';
export const DEFAULT_USER_NAME = 'REACH User';
