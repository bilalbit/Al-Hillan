import React from 'react';
import {ScrollArea} from "@/components/ui/scroll-area";
import {Card} from "@/components/ui/card";
import {Checkbox} from "@/components/ui/checkbox";
import {PopOverCalendar} from "@/features/dashboard/components/pop-over-calendar";
export const TodoList = () => {
    return (
        <div className="flex flex-col items-center">
            <h1 className="text-lg font-bold mb-6 w-full">Todo List</h1>
            <PopOverCalendar />
            <ScrollArea className="max-h-[400px] mt-4 overflow-y-auto">
                <div className="flex flex-col gap-4 *:bg-background">
                    {/*LIST ITEMS*/}
                    <Card className="p-4">
                        <div className="flex items-center gap-4">
                            <Checkbox id='item' defaultChecked/>
                            <label htmlFor='item' className="text-sm">
                                Lorem ipsum dolor sit amet,consectetur adipisicing elit.
                            </label>
                        </div>
                    </Card>
                    <Card className="p-4">
                        <div className="flex items-center gap-4">
                            <Checkbox id='item' />
                            <label htmlFor='item' className="text-sm">
                                Lorem ipsum dolor sit amet,consectetur adipisicing elit.
                            </label>
                        </div>
                    </Card>
                    <Card className="p-4">
                        <div className="flex items-center gap-4">
                            <Checkbox id='item' />
                            <label htmlFor='item' className="text-sm">
                                Lorem ipsum dolor sit amet,consectetur adipisicing elit.
                            </label>
                        </div>
                    </Card>
                    <Card className="p-4">
                        <div className="flex items-center gap-4">
                            <Checkbox id='item' defaultChecked/>
                            <label htmlFor='item' className="text-sm">
                                Lorem ipsum dolor sit amet,consectetur adipisicing elit.
                            </label>
                        </div>
                    </Card><Card className="p-4">
                    <div className="flex items-center gap-4">
                        <Checkbox id='item' defaultChecked/>
                        <label htmlFor='item' className="text-sm">
                            Lorem ipsum dolor sit amet,consectetur adipisicing elit.
                        </label>
                    </div>
                </Card><Card className="p-4">
                    <div className="flex items-center gap-4">
                        <Checkbox id='item' />
                        <label htmlFor='item' className="text-sm">
                            Lorem ipsum dolor sit amet,consectetur adipisicing elit.
                        </label>
                    </div>
                </Card>
                    <Card className="p-4">
                        <div className="flex items-center gap-4">
                            <Checkbox id='item' defaultChecked/>
                            <label htmlFor='item' className="text-sm">
                                Lorem ipsum dolor sit amet,consectetur adipisicing elit.
                            </label>
                        </div>
                    </Card>
                    <Card className="p-4">
                        <div className="flex items-center gap-4">
                            <Checkbox id='item' />
                            <label htmlFor='item' className="text-sm">
                                Lorem ipsum dolor sit amet,consectetur adipisicing elit.
                            </label>
                        </div>
                    </Card>
                    <Card className="p-4">
                        <div className="flex items-center gap-4">
                            <Checkbox id='item' />
                            <label htmlFor='item' className="text-sm">
                                Lorem ipsum dolor sit amet,consectetur adipisicing elit.
                            </label>
                        </div>
                    </Card><Card className="p-4">
                    <div className="flex items-center gap-4">
                        <Checkbox id='item' defaultChecked/>
                        <label htmlFor='item' className="text-sm">
                            Lorem ipsum dolor sit amet,consectetur adipisicing elit.
                        </label>
                    </div>
                </Card><Card className="p-4">
                    <div className="flex items-center gap-4">
                        <Checkbox id='item' defaultChecked/>
                        <label htmlFor='item' className="text-sm">
                            Lorem ipsum dolor sit amet,consectetur adipisicing elit.
                        </label>
                    </div>
                </Card>
                    <Card className="p-4">
                        <div className="flex items-center gap-4">
                            <Checkbox id='item' />
                            <label htmlFor='item' className="text-sm">
                                Lorem ipsum dolor sit amet,consectetur adipisicing elit.
                            </label>
                        </div>
                    </Card>
                    <Card className="p-4">
                        <div className="flex items-center gap-4">
                            <Checkbox id='item' defaultChecked/>
                            <label htmlFor='item' className="text-sm">
                                Lorem ipsum dolor sit amet,consectetur adipisicing elit.
                            </label>
                        </div>
                    </Card>
                    <Card className="p-4">
                        <div className="flex items-center gap-4">
                            <Checkbox id='item' />
                            <label htmlFor='item' className="text-sm">
                                Lorem ipsum dolor sit amet,consectetur adipisicing elit.
                            </label>
                        </div>
                    </Card>


                </div>

            </ScrollArea>
        </div>
    );
};
