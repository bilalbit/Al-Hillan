const YouTubeGetID = (yt_url: string) => {
    const url = yt_url.split(/(vi\/|v%3D|v=|\/v\/|youtu\.be\/|\/embed\/)/);
    return undefined !== url[2] ? url[2].split(/[^0-9a-z_\-]/i)[0] : url[0];
}

export const getImageUrl = (yt_url: string) => {
    const yt_Id = YouTubeGetID(yt_url);
    return `https://img.youtube.com/vi/${yt_Id}/hqdefault.jpg`;

};
export const getVideoUrl = (yt_url: string) => {
    const yt_Id = YouTubeGetID(yt_url);
    return `https://www.youtube.com/embed/${yt_Id}`;

};

