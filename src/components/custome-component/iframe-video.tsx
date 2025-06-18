import React from 'react';
import {getVideoUrl} from "@/lib/youtube";

type IframeVideoType = {
    videoUrl: string,
}
export const IframeVideo = async ({videoUrl}: IframeVideoType) => {
    const yt_url = getVideoUrl(videoUrl)
    return (
        <div className="w-full h-full">
            <iframe
                className="w-full h-full min-h-[300px]"
                title="YouTube video player"
                src={yt_url}
                allowFullScreen
                loading="lazy"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            />
        </div>
    );
};
