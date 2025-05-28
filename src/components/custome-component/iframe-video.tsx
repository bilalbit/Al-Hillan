import React from 'react';
type IframeVideoType = {
    videoUrl: string,
}
export const IframeVideo = async ({videoUrl}:IframeVideoType) => {
    return (
        <iframe width="560" height="315" title="title" src={videoUrl} allowFullScreen loading="lazy"/>
    );
};
