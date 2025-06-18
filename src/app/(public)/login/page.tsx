import { LoginForm } from "@/features/login/components/login-form";
import Image from "next/image";
import Link from "next/link";


export default function LoginPage() {
    return (
        <div className="grid min-h-svh lg:grid-cols-2">
            <div className="flex flex-col mt-10 gap-4 p-6 md:p-10">
                <div className="flex justify-center gap-2 md:justify-start">
                    <Link href="/" className="flex items-center gap-2 font-medium">
                        <div className="flex size-20 items-center justify-center rounded-md">
                            <Image
                                src="/logo.svg"
                                alt="Image"
                                width={20}
                                height={20}
                                className="size-20 object-cover"
                            />
                        </div>
                        <span className="text-3xl font-extrabold text-emerald-600">
                            Al-Hilal.
                        </span>
                    </Link>
                </div>
                <div className="flex flex-1 flex-col items-center justify-center">
                    <h1 className="mb-8 text-3xl font-extrabold text-emerald-500">For Admin Only</h1>
                    <div className="w-full max-w-1/2 p-8 shadow-2xl shadow-emerald-600 rounded-3xl">
                        <LoginForm />
                    </div>
                </div>
            </div>
            <div className="relative hidden bg-muted lg:block">
                <Image
                    src="/logo.svg"
                    alt="Image"
                    width={20}
                    height={20}
                    className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
                />
            </div>
        </div>
    )
}
