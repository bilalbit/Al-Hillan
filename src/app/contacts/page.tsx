import {Bug, Computer, MapPin} from "lucide-react";

const ContactPage = () => {
    return (
        <div className="bg-white py-24 sm:py-32">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="mx-auto max-w-2xl space-y-16 divide-y divide-gray-100 lg:mx-0 lg:max-w-none">
                    <div className="grid grid-cols-1 gap-x-8 gap-y-10 pt-16 lg:grid-cols-3">
                        <div>
                            <div
                                className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-indigo-600 mb-4">
                                <MapPin aria-hidden="true" className="size-6 text-white"/>
                            </div>
                            <h2 className="text-3xl font-bold tracking-tight text-gray-900">
                                Locations
                            </h2>
                            <p className="mt-4 leading-7 text-gray-600">
                                Consequat sunt cillum cillum elit sint. Qui occaecat nisi in ipsum commodo.
                            </p>
                        </div>
                        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:col-span-2 lg:gap-8">
                            <div className="rounded-2xl bg-gray-50 p-10">
                                <div>
                                    <h3 className="text-base font-semibold leading-7 text-gray-900">
                                        Los Angeles
                                    </h3>
                                </div>
                                <address className="mt-3 space-y-1 text-sm not-italic leading-6 text-gray-600">
                                    <p>4556 Brendan Ferry</p>
                                    <p>Los Angeles, CA 90210</p>
                                </address>
                            </div>
                            <div className="rounded-2xl bg-gray-50 p-10">
                                <h3 className="text-base font-semibold leading-7 text-gray-900">New York</h3>
                                <address className="mt-3 space-y-1 text-sm not-italic leading-6 text-gray-600">
                                    <p>886 Walter Street</p>
                                    <p>New York, NY 12345</p>
                                </address>
                            </div>
                            <div className="rounded-2xl bg-gray-50 p-10">
                                <h3 className="text-base font-semibold leading-7 text-gray-900">Toronto</h3>
                                <address className="mt-3 space-y-1 text-sm not-italic leading-6 text-gray-600">
                                    <p>7363 Cynthia Pass</p>
                                    <p>Toronto, ON N3Y 4H8</p>
                                </address>
                            </div>
                            <div className="rounded-2xl bg-gray-50 p-10">
                                <h3 className="text-base font-semibold leading-7 text-gray-900">Chicago</h3>
                                <address className="mt-3 space-y-1 text-sm not-italic leading-6 text-gray-600">
                                    <p>726 Mavis Island</p>
                                    <p>Chicago, IL 60601</p>
                                </address>
                            </div>
                        </div>
                    </div>
                    <div
                        className="isolate bg-gray-50 border-8 border-emerald-400 rounded-3xl px-6 py-24 sm:py-32 lg:px-8">
                        <div className="mx-auto max-w-2xl sm:text-center">
                            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Contact
                                Administrators</h2>
                            <p className="mt-2 text-lg leading-8 text-gray-600">
                                Aute magna irure deserunt veniam aliqua magna enim voluptate.
                            </p>
                        </div>
                        <div className="mx-auto mt-20 max-w-lg space-y-16">
                            <div className="flex gap-x-6">
                                <div
                                    className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-indigo-600">
                                    <Bug aria-hidden="true" className="size-6 text-white"/>
                                </div>
                                <div>
                                    <h3 className="text-base font-semibold leading-7 text-gray-900">Bug reports</h3>
                                    <p className="mt-2 leading-7 text-gray-600">
                                        Expedita qui non ut quia ipsum voluptatum ipsam pariatur. Culpa vitae ipsum
                                        minus eius vero quo quibusdam.
                                    </p>
                                    <p className="mt-4">
                                        <a href="#" className="text-sm font-semibold leading-6 text-indigo-600">
                                            Report a bug <span aria-hidden="true">&rarr;</span>
                                        </a>
                                    </p>
                                </div>
                            </div>
                            <div className="flex gap-x-6">
                                <div
                                    className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-indigo-600">
                                    <Computer aria-hidden="true" className="h-6 w-6 text-white"/>
                                </div>
                                <div>
                                    <h3 className="text-base font-semibold leading-7 text-gray-900">Technical
                                        support</h3>
                                    <p className="mt-2 leading-7 text-gray-600">
                                        Sint aut modi porro consequatur architecto commodi qui consequatur. Dignissimos
                                        adipisci minima.
                                    </p>
                                    <p className="mt-4">
                                        <a href="#" className="text-sm font-semibold leading-6 text-indigo-600">
                                            Join our Discord <span aria-hidden="true">&rarr;</span>
                                        </a>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}
export default ContactPage;
