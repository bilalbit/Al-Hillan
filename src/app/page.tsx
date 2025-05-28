import {Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle} from "@/components/ui/dialog"
import {Button} from "@/components/ui/button"
import {Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext} from "@/components/ui/carousel"
import {Suspense} from "react";
import {IframeVideo} from "@/components/custome-component/iframe-video";
import {getVideoUrl} from "@/lib/youtube";
import {DatePickerWithDropdowns} from "@/components/custome-component/date-picker-with-dropdowns";

export default function Component() {
    return (
        <div className="flex flex-col gap-8 justify-center content-center">
            <DatePickerWithDropdowns />
            <Dialog>
                <DialogTrigger asChild>
                    <Button variant="outline">Open Image Carousel</Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[600px] flex flex-col justify-center items-center">
                    <DialogHeader>
                        <DialogTitle>Image Carousel</DialogTitle>
                    </DialogHeader>
                    <Carousel className="size-3/4" opts={{
                        align: "start",
                        loop: true,
                    }}>
                        <CarouselContent>
                            <CarouselItem>
                                <Suspense fallback={<div>loading</div>}>
                                    {/*<IframeVideo videoUrl="https://www.youtube.com/embed/pr-PzWkrif0" />*/}
                                    <IframeVideo videoUrl={getVideoUrl("https://youtu.be/BxvK9eOfzfo?si=i1slMm7nk8-XlVdH")} />
                                </Suspense>
                            </CarouselItem>
                            <CarouselItem>
                                <img
                                    src="https://img.youtube.com/vi/pr-PzWkrif0/hqdefault.jpg"
                                    width={512}
                                    height={512}
                                    alt="Image 1"
                                    className="object-cover w-full aspect-[1/1] rounded-md"
                                />
                                <div className="mt-4 text-sm text-muted-foreground">
                                    This is a really long description for the first image. It goes on and on and on,
                                    describing the image in
                                    great detail. The description covers all the important aspects of the image,
                                    including
                                    the colors, the
                                    composition, the mood, and the overall feel of the image. It's a comprehensive and
                                    informative
                                    description that provides the viewer with a deep understanding of the image.
                                </div>
                            </CarouselItem>
                            <CarouselItem>
                                <img
                                    src="/images/properties/a1.jpg"
                                    width={512}
                                    height={512}
                                    alt="Image 1"
                                    className="object-cover w-full aspect-[1/1] rounded-md"
                                />
                                <div className="mt-4 text-sm text-muted-foreground">
                                    This is a really long description for the first image. It goes on and on and on,
                                    describing the image in
                                    great detail. The description covers all the important aspects of the image,
                                    including
                                    the colors, the
                                    composition, the mood, and the overall feel of the image. It's a comprehensive and
                                    informative
                                    description that provides the viewer with a deep understanding of the image.
                                </div>
                            </CarouselItem>
                            <CarouselItem>
                                <img
                                    src="/images/properties/a1.jpg"
                                    width={512}
                                    height={512}
                                    alt="Image 1"
                                    className="object-cover w-full aspect-[1/1] rounded-md"
                                />
                                <div className="mt-4 text-sm text-muted-foreground">
                                    This is a really long description for the first image. It goes on and on and on,
                                    describing the image in
                                    great detail. The description covers all the important aspects of the image,
                                    including
                                    the colors, the
                                    composition, the mood, and the overall feel of the image. It's a comprehensive and
                                    informative
                                    description that provides the viewer with a deep understanding of the image.
                                </div>
                            </CarouselItem>
                            <CarouselItem>
                                <img
                                    src="/images/properties/a2.jpg"
                                    width={512}
                                    height={512}
                                    alt="Image 2"
                                    className="object-cover w-full aspect-[1/1] rounded-md"
                                />
                                <div className="mt-4 text-sm text-muted-foreground">
                                    This is a really long description for the second image. It goes on and on and on,
                                    describing the image
                                    in great detail. The description covers all the important aspects of the image,
                                    including the colors,
                                    the composition, the mood, and the overall feel of the image. It's a comprehensive
                                    and
                                    informative
                                    description that provides the viewer with a deep understanding of the image.
                                </div>
                            </CarouselItem>
                            <CarouselItem>
                                <img
                                    src="/images/properties/a3.jpg"
                                    width={512}
                                    height={512}
                                    alt="Image 3"
                                    className="object-cover w-full aspect-[1/1] rounded-md"
                                />
                                <div className="mt-4 text-sm text-muted-foreground">
                                    This is a really long description for the third image. It goes on and on and on,
                                    describing the image in
                                    great detail. The description covers all the important aspects of the image,
                                    including
                                    the colors, the
                                    composition, the mood, and the overall feel of the image. It's a comprehensive and
                                    informative
                                    description that provides the viewer with a deep understanding of the image.
                                </div>
                            </CarouselItem>
                            <CarouselItem>
                                <img
                                    src="/images/properties/b1.jpg"
                                    width={512}
                                    height={512}
                                    alt="Image 4"
                                    className="object-cover w-full aspect-[1/1] rounded-md"
                                />
                                <div className="mt-4 text-sm text-muted-foreground">
                                    This is a really long description for the fourth image. It goes on and on and on,
                                    describing the image
                                    in great detail. The description covers all the important aspects of the image,
                                    including the colors,
                                    the composition, the mood, and the overall feel of the image. It's a comprehensive
                                    and
                                    informative
                                    description that provides the viewer with a deep understanding of the image.
                                </div>
                            </CarouselItem>
                            <CarouselItem>
                                <img
                                    src="/images/properties/b3.jpg"
                                    width={512}
                                    height={512}
                                    alt="Image 5"
                                    className="object-cover w-full aspect-[1/1] rounded-md"
                                />
                                <div className="mt-4 text-sm text-muted-foreground">
                                    This is a really long description for the fifth image. It goes on and on and on,
                                    describing the image in
                                    great detail. The description covers all the important aspects of the image,
                                    including
                                    the colors, the
                                    composition, the mood, and the overall feel of the image. It's a comprehensive and
                                    informative
                                    description that provides the viewer with a deep understanding of the image.
                                </div>
                            </CarouselItem>
                        </CarouselContent>
                        <CarouselPrevious/>
                        <CarouselNext/>
                    </Carousel>
                </DialogContent>
            </Dialog>
            <Suspense fallback={<div>loading</div>}>
                <IframeVideo videoUrl="https://www.youtube.com/embed/pr-PzWkrif0" />
            </Suspense>
        </div>
    )
}