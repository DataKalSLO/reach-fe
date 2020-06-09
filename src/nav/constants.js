// Routes
export const HOME = '/';
export const EXPLORE = '/explore';
export const VIZ_BUILDER = '/viz-builder';
export const STORY_BUILDER = '/story-builder';
export const MY_STUFF = '/my-stuff';
export const MY_STUFF_GRAPHS = MY_STUFF + '/graphs';
export const MY_STUFF_STORIES = MY_STUFF + '/stories';
export const LOGIN = '/login';
export const CREATE_ACCOUNT = '/create-account';
export const SETTINGS = '/settings';
export const ADMIN = '/admin';
export const FORGOT_PASSWORD = '/forgot-password';
export const RESET_PASSWORD = '/reset-password';
export const STORY_VIEW = '/story';
export const STORY_VIEW_ID = STORY_VIEW + '/:storyId';

// Note: this isn't currently being used as a direct URL.
// Clicking on the ADMIN button in the app bar redirects to ADMIN_UPLOAD_DATA
export const ADMIN_UPLOAD_DATA = ADMIN + '/upload-data';
export const ADMIN_REVIEW_STORIES = ADMIN + '/review-stories';

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
