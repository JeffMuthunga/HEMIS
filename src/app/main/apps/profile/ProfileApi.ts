import { apiService as api } from 'app/store/apiService';
import { Integer } from 'type-fest';

export const addTagTypes = ['profile_photos_videos', 'profile_timeline', 'profile_about'] as const;

const ProfileApi = api 
	.enhanceEndpoints({//this adds additional functionality to the endoints api 
		addTagTypes
	})
	.injectEndpoints({//allows the addition of new api endpoints
		endpoints: (build) => ({//where these apis are defined
			getProfilePhotosVideos: build.query<GetProfilePhotosVideosApiResponse, GetProfilePhotosVideosApiArg>({
				query: () => ({ url: `/mock-api/profile/photos-videos` }),
				providesTags: ['profile_photos_videos']//caches data fetched from the datbase, ie helps redux remember the info associated with the query
			}),
			getProfileTimeline: build.query<GetProfileTimelineApiResponse, GetProfileTimelineApiArg>({
				query: () => ({ url: `/mock-api/profile/timeline` }),
				providesTags: ['profile_timeline']
			}),
			getProfileAbout: build.query<GetProfileAboutApiResponse, GetProfileAboutApiArg>({
				query: () => ({ url: `/mock-api/profile/about` }),
				providesTags: ['profile_about']
			})
		}),
		overrideExisting: false
	});

export default ProfileApi;

export type GetProfilePhotosVideosApiResponse = /** status 200 OK */ ProfilePhotosVideos[];
export type GetProfilePhotosVideosApiArg = void;

export type GetProfileTimelineApiResponse = /** status 200 OK */ ProfileTimeline;
export type GetProfileTimelineApiArg = void;

export type GetProfileAboutApiResponse = /** status 200 OK */ ProfileAbout;
export type GetProfileAboutApiArg = void;

export type ProfilePhotosVideos = {//structure of the profile photos
	id?: string;
	name?: string;
	info?: string;
	media?: {
		type?: string;
		title?: string;
		preview?: string;
	}[];
};

export type Activity = {
	id?: string;
	user?: {
		name?: string;
		avatar?: string;
	};
	message?: string;
	time?: string;
};

export type Post = {
	id?: string;
	user?: {
		name?: string;
		avatar?: string;
	};
	message?: string;
	time?: string;
	type?: string;
	like?: number;
	share?: number;
	media?: {
		type?: string;
		preview?: string;
	};
	comments?: {
		id?: string;
		user?: {
			name?: string;
			avatar?: string;
		};
		time?: string;
		message?: string;
	}[];
	article?: {
		title?: string;
		subtitle?: string;
		excerpt?: string;
		media?: {
			type?: string;
			preview?: string;
		};
	};
};

export type ProfileTimeline = {
	activities?: Activity[];
	posts?: Post[];
};

export type ProfileAbout = {
	studentinfo?: {
		sex?: string;
		dateofbirth?: string;
		address?: string[];
		about?: string;
		academicYear?: string;
		studentId?: string;
		emailAddress?: string;
		contactNumber?: Integer<number>;
		qualificationCode?: Integer<number>;
		faculty?: string;

	}
};

export const { useGetProfilePhotosVideosQuery, useGetProfileTimelineQuery, useGetProfileAboutQuery } = ProfileApi;
