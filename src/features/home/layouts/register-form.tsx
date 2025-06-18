'use client'

import React, {useState} from 'react'
import {Button} from '@/components/ui/button'
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from '@/components/ui/card'
import {cn, removeEmptyFields} from '@/lib/utils'
import {Input} from '@/components/ui/input'
import {FieldErrors} from "@/components/form-ui/field-errors"
import {useForm} from '@tanstack/react-form'
import {CalendarField} from '@/components/ui+/calender-field'
import {
    getCourseWithLabel,
    getCoursePackages,
} from "@/features/courses/server/api";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue
} from '@/components/ui/select'
import {RadioGroup, RadioGroupItem} from '@/components/ui/radio-group'
import {Label} from '@/components/ui/label'
import {Badge} from '@/components/ui/badge'
import {Skeleton} from '@/components/ui/skeleton'
import {
    PaymentSchema, PublicPaymentFormType,
    PublicRegisterFormType,
    PublicRegisterSchema,
    RegisterFormFirstStep
} from "@/features/home/schema";

type CoursePackage = {
    id: string
    month_price: string
    year_price: string
    half_year_price: string
}
import {addPayment, registerStudent} from "@/features/home/server/api";
import * as v from "valibot"
import {toast} from "sonner";

const paymentMethod = ['telebirr', 'cbe', 'cbe-birr'];

export const RegisterForm = () => {
    const [step, setStep] = useState(1);
    const totalSteps = 3;
    const [courseValue, setCourseValue] = React.useState<{ value: string, label: string; }[] | null>(null);
    const [packages, setPackages] = React.useState<CoursePackage | null>(null);
    const [loadingPackages, setLoadingPackages] = React.useState(false);

    const registerForm = useForm({
        defaultValues: {
            first_name: "",
            middle_name: "",
            last_name: "",
            email: "",
            phone_number: "",

            date_of_birth: "",
            course_id: "",

        } as PublicRegisterFormType,
        validators: {
            onChangeAsync: PublicRegisterSchema,
            onChangeAsyncDebounceMs: 2000
        },
        onSubmit: async ({value}) => {
            const cleanedData = removeEmptyFields(value)
            const {success, error} = await registerStudent(cleanedData)
            if (success) {
                handleNext()
                return toast("student Registered successfully");
            }
            return toast(error)

        }
    });
    const paymentForm = useForm({
        defaultValues: {
            plan: "half_year",
            payment_method: "telebirr" as 'telebirr' | 'cbe' | 'cbe-birr',
            transaction: "",
            account_number: "",
            package_id: ""
        } as PublicPaymentFormType, validators: {
            onChange: PaymentSchema,
        },
        onSubmit: async ({value}) => {
            const cleanedData = removeEmptyFields(value)
            const {success, error} = await addPayment(registerForm.getFieldValue('phone_number'), cleanedData)
            if (success) {
                handleNext();
                paymentForm.reset();
                registerForm.reset();
                setStep(1);
                return toast("Payment Saved");
            }
            return toast(error);
        }
    })

    const handleBack = () => {
        if (step > 0) {
            setStep(step - 1)
        }
    }

    const handleNext = () => {
        if (step < totalSteps) {
            setStep(step + 1)
        }
    }

    React.useEffect(() => {
        async function fetchCourse() {
            const fetchedCourses = await getCourseWithLabel();
            setCourseValue(fetchedCourses)
        }

        fetchCourse()
    }, [])

    // Fetch packages when course changes
    const handleCourseChange = async (courseId: string) => {
        setLoadingPackages(true)
        try {
            const fetchedPackages = await getCoursePackages(courseId);
            setPackages(fetchedPackages)
            if (fetchedPackages?.id) {
                paymentForm.setFieldValue('package_id', fetchedPackages.id)
            }
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (error) {
            toast(`failed to load course`)
        } finally {
            setLoadingPackages(false)
        }
    }

    // Calculate discount percentage
    const calculateDiscount = (originalPrice: number, discountedPrice: number) => {
        return Math.round(((originalPrice - discountedPrice) / originalPrice) * 100)
    }

    // Parse price string to number
    const parsePrice = (price: string) => {
        return parseFloat(price.replace(/[^0-9.]/g, ''))
    }
    return (
        <div className="space-y-4 min-w-4/5">
            <div className="flex items-center justify-center">
                {Array.from({length: totalSteps}).map((_, index) => (
                    <div key={index} className="flex items-center">
                        <div
                            className={cn(
                                "w-4 h-4 rounded-full transition-all duration-300 ease-in-out",
                                index <= step ? "bg-gold" : "bg-tertiary",
                                index < step && "bg-gold"
                            )}
                        />
                        {index < totalSteps - 1 && (
                            <div
                                className={cn(
                                    "w-8 h-0.5",
                                    index < step ? "bg-gold" : "bg-muted"
                                )}
                            />
                        )}
                    </div>
                ))}
            </div>
            <Card className="shadow-sm min-w-full flex justify-center">
                <CardHeader>
                    <CardTitle className="text-lg">{step != 3 ? "Register-Form: " : "Payment-Form: "}</CardTitle>
                    <CardDescription>Current step {step}</CardDescription>
                </CardHeader>
                <CardContent className="min-w-max">
                    <form onSubmit={e => {
                        e.stopPropagation();
                        e.preventDefault();
                        registerForm.handleSubmit();
                    }}>
                        {step === 1 && (
                            <div className="flex flex-col gap-y-4 w-full">
                                <div className="flex flex-col gap-4 md:flex-row mb-4 justify-between">
                                    <registerForm.Field name="first_name">
                                        {(field) => (
                                            <>
                                                <Input
                                                    id="first_name"
                                                    value={field.state.value}
                                                    onChange={(e) => field.handleChange(e.target.value)}
                                                    type="text"
                                                    className="mt-1 block w-full md:w-1/3"
                                                    autoComplete="given-name"
                                                    placeholder="First Name(required)"
                                                    required
                                                />
                                                <FieldErrors meta={field.state.meta}/>
                                            </>
                                        )}
                                    </registerForm.Field>
                                    <registerForm.Field name="middle_name">
                                        {(field) => (
                                            <>
                                                <Input
                                                    id="middle_name"
                                                    value={field.state.value}
                                                    onChange={(e) => field.handleChange(e.target.value)}
                                                    type="text"
                                                    className="mt-1 block w-full md:w-1/3"
                                                    autoComplete="additional-name"
                                                    placeholder="Middle Name(required)"
                                                />
                                                <FieldErrors meta={field.state.meta}/>
                                            </>
                                        )}
                                    </registerForm.Field>
                                    <registerForm.Field name="last_name">
                                        {(field) => (
                                            <>
                                                <Input
                                                    id="last_name"
                                                    value={field.state.value}
                                                    onChange={(e) => field.handleChange(e.target.value)}
                                                    type="text"
                                                    className="mt-1 block w-full md:w-1/3"
                                                    autoComplete="family-name"
                                                    placeholder="Last Name(optional)"
                                                    required
                                                />
                                                <FieldErrors meta={field.state.meta}/>
                                            </>
                                        )}
                                    </registerForm.Field>
                                </div>
                                <div className="flex flex-col md:flex-row justify-start mb-4 gap-4">
                                    <registerForm.Field name="email">
                                        {(field) => (
                                            <>
                                                <Input
                                                    id="email"
                                                    value={field.state.value}
                                                    onChange={(e) => field.handleChange(e.target.value)}
                                                    type="email"
                                                    className="mt-1 block w-full md:w-1/3"
                                                    placeholder="email@email.com(optional)"
                                                />
                                                <FieldErrors meta={field.state.meta}/>
                                            </>
                                        )}
                                    </registerForm.Field>
                                    <registerForm.Field name="date_of_birth">
                                        {(field) => (
                                            <CalendarField
                                                value={field.state.value as string}
                                                onChangeAction={field.handleChange}
                                                placeholder="Date of birth (optional)"
                                            />
                                        )}
                                    </registerForm.Field>
                                </div>
                                <registerForm.Field name="phone_number">
                                    {(field) => (
                                        <>
                                            <Input
                                                id="phone_number"
                                                value={field.state.value}
                                                onChange={(e) => field.handleChange(e.target.value)}
                                                type="tel"
                                                className="mt-1 block w-full md:w-1/3"
                                                autoComplete="tel"
                                                placeholder="Phone Number"
                                                required
                                            />
                                            <FieldErrors meta={field.state.meta}/>
                                        </>
                                    )}
                                </registerForm.Field>
                                <div className="flex justify-between">
                                    <Button
                                        type="button"
                                        className="font-medium"
                                        size="sm"
                                        onClick={handleBack}
                                        disabled={step === 1}
                                    >
                                        Back
                                    </Button>
                                    <registerForm.Subscribe
                                        selector={state => {
                                            return ({
                                                first_name: state.values.first_name,
                                                middle_name: state.values.middle_name,
                                                phone_number: state.values.phone_number
                                            })
                                        }}
                                    >
                                        {(values) => {
                                            // const {firstName, middleName, phoneNumber} = values;
                                            let isValid: boolean
                                            try {
                                                v.parse(RegisterFormFirstStep, values);

                                                isValid = true;
                                            } catch (e) {
                                                isValid = false;
                                                console.error(e);
                                            }
                                            return <Button
                                                type="button"
                                                size="sm"
                                                onClick={handleNext}
                                                className="font-medium"
                                                disabled={!isValid}

                                            >
                                                Next
                                            </Button>
                                        }
                                        }
                                    </registerForm.Subscribe>
                                </div>
                            </div>
                        )}
                        {step === 2 && (
                            <div className="grid gap-y-4">
                                <div className="space-y-4">
                                    {courseValue && (
                                        <registerForm.Field name="course_id">
                                            {(field) => (
                                                <div className="space-y-2">
                                                    <Label htmlFor="course">Select Course</Label>
                                                    <Select
                                                        value={field.state.value}
                                                        onValueChange={async (value) => {
                                                            field.handleChange(value)
                                                            await handleCourseChange(value)
                                                        }}
                                                        required
                                                    >
                                                        <SelectTrigger className="w-full">
                                                            <SelectValue placeholder="Select a course"/>
                                                        </SelectTrigger>
                                                        <SelectContent>
                                                            <SelectGroup>
                                                                {courseValue.map((course) => (
                                                                    <SelectItem key={course.value} value={course.value}>
                                                                        {course.label}
                                                                    </SelectItem>
                                                                ))}
                                                            </SelectGroup>
                                                        </SelectContent>
                                                    </Select>
                                                    <FieldErrors meta={field.state.meta}/>
                                                </div>
                                            )}
                                        </registerForm.Field>
                                    )}

                                    {loadingPackages ? (
                                        <div className="space-y-2">
                                            <Skeleton className="h-4 w-[200px]"/>
                                            <div className="space-y-2">
                                                {[1, 2, 3].map((i) => (
                                                    <Skeleton key={i} className="h-10 w-full"/>
                                                ))}
                                            </div>
                                        </div>
                                    ) : packages ? (

                                        <paymentForm.Field name="plan">
                                            {(field) => (
                                                <>
                                                    <div className="space-y-4 hidden md:block">
                                                        <Label className="text-lg font-semibold mb-3"
                                                               id="package-selection">
                                                            Select Your Package
                                                        </Label>
                                                        <RadioGroup
                                                            value={field.state.value}
                                                            onValueChange={(value: 'monthly' | 'half_year' | 'yearly') => {
                                                                field.handleChange(value);
                                                            }}
                                                            className="grid grid-cols-1 md:grid-cols-3 gap-4"
                                                            required
                                                            aria-labelledby="package-selection"
                                                        >
                                                            {/* Monthly Package */}
                                                            <Card
                                                                key={1}
                                                                className={cn(
                                                                    "cursor-pointer transition-border-color duration-200 hover:border-primary",
                                                                    field.state.value === "monthly" && "border-2 border-primary"
                                                                )}
                                                            >
                                                                <CardContent className="p-6">
                                                                    <label htmlFor="monthly"
                                                                           className="flex flex-col space-y-3 cursor-pointer">
                                                                        <div
                                                                            className="flex items-center justify-between">
                                                                            <h3 className="font-medium text-lg">Monthly</h3>
                                                                            <RadioGroupItem
                                                                                value="monthly"
                                                                                id="monthly"
                                                                                className="h-5 w-5"
                                                                            />
                                                                        </div>
                                                                        <p className="text-2xl font-bold text-primary">
                                                                            {packages.month_price}
                                                                        </p>
                                                                        <div className="text-sm text-muted-foreground">
                                                                            Monthly Price
                                                                        </div>
                                                                    </label>
                                                                </CardContent>
                                                            </Card>

                                                            {/* Half Yearly Package */}
                                                            <Card
                                                                key={2}
                                                                className={cn(
                                                                    "cursor-pointer transition-border-color duration-200 hover:border-primary relative",
                                                                    field.state.value === "half_year" && "border-2 border-primary"
                                                                )}
                                                            >
                                                                <div
                                                                    className="absolute top-0 right-0 bg-primary text-primary-foreground px-2 py-1 text-xs font-medium rounded-bl-lg"
                                                                >
                                                                    POPULAR
                                                                </div>
                                                                <CardContent className="p-6">
                                                                    <label htmlFor="half_year"
                                                                           className="flex flex-col space-y-3 cursor-pointer">
                                                                        <div
                                                                            className="flex items-center justify-between">
                                                                            <h3 className="font-medium text-lg">Half
                                                                                Yearly</h3>
                                                                            <RadioGroupItem
                                                                                value="half_year"
                                                                                id="half_year"
                                                                                className="h-5 w-5"
                                                                            />
                                                                        </div>
                                                                        <div className="flex items-end gap-2">
                                                                            <p className="text-2xl font-bold text-primary">
                                                                                {packages.half_year_price}
                                                                            </p>
                                                                            <Badge variant="secondary" className="mb-1">
                                                                                Save {calculateDiscount(
                                                                                parsePrice(packages.month_price) * 6,
                                                                                parsePrice(packages.half_year_price)
                                                                            )}%
                                                                            </Badge>
                                                                        </div>
                                                                        <div className="text-sm text-muted-foreground">
                <span className="font-medium">
                  ${(parsePrice(packages.half_year_price) / 6).toFixed(2)}/month
                </span> - Billed every 6 months
                                                                        </div>
                                                                    </label>
                                                                </CardContent>
                                                            </Card>

                                                            {/* Yearly Package */}
                                                            <Card
                                                                key={3}
                                                                className={cn(
                                                                    "cursor-pointer transition-border-color duration-200 hover:border-primary",
                                                                    field.state.value === "yearly" && "border-2 border-primary"
                                                                )}
                                                            >
                                                                <CardContent className="p-6">
                                                                    <label htmlFor="yearly"
                                                                           className="flex flex-col space-y-3 cursor-pointer">
                                                                        <div
                                                                            className="flex items-center justify-between">
                                                                            <h3 className="font-medium text-lg">Yearly</h3>
                                                                            <RadioGroupItem
                                                                                value="yearly"
                                                                                id="yearly"
                                                                                className="h-5 w-5"
                                                                            />
                                                                        </div>
                                                                        <div className="flex items-end gap-2">
                                                                            <p className="text-2xl font-bold text-primary">
                                                                                {packages.year_price}
                                                                            </p>
                                                                            <Badge variant="secondary" className="mb-1">
                                                                                Save {calculateDiscount(
                                                                                parsePrice(packages.month_price) * 12,
                                                                                parsePrice(packages.year_price)
                                                                            )}%
                                                                            </Badge>
                                                                        </div>
                                                                        <div className="text-sm text-muted-foreground">
                                                                        <span className="font-medium">
                                                                          ${(parsePrice(packages.year_price) / 12).toFixed(2)}/month
                                                                        </span> - Billed annually

                                                                        </div>
                                                                    </label>
                                                                </CardContent>
                                                            </Card>
                                                        </RadioGroup>
                                                        <FieldErrors meta={field.state.meta}/>
                                                    </div>
                                                    <Card className="max-w-xs shadow-sm md:hidden">
                                                        <CardHeader>
                                                            <CardTitle>Plan Options</CardTitle>
                                                            <CardDescription>
                                                                Select your preferred subscription plan
                                                            </CardDescription>
                                                        </CardHeader>
                                                        <CardContent>
                                                            <RadioGroup
                                                                value={field.state.value}
                                                                onValueChange={(value: 'monthly' | 'half_year' | 'yearly') => {
                                                                    field.handleChange(value);
                                                                }}>
                                                                <div className="flex items-center space-x-2 mb-4">
                                                                    <RadioGroupItem value="monthly" id="monthly"/>
                                                                    <Label htmlFor="monthly" className="flex flex-col">
                                                                        <span className="font-semibold">Free</span>
                                                                        <span className="text-sm text-muted-foreground">
                                                                            Monthly {packages.month_price}
                                                                          </span>
                                                                    </Label>
                                                                </div>
                                                                <div className="flex items-center space-x-2 mb-4">
                                                                    <RadioGroupItem value="half_year" id="half_year"/>
                                                                    <Label htmlFor="half_year"
                                                                           className="flex flex-col">
                                                                        <span className="font-semibold">Standard</span>
                                                                        <span className="text-sm text-muted-foreground">
                                                                            Half Year,{packages?.half_year_price}
                                                                            <Badge variant="secondary" className="mb-1">
                                                                                Save {calculateDiscount(
                                                                                parsePrice(packages.month_price) * 6,
                                                                                parsePrice(packages.half_year_price)
                                                                            )}%
                                                                            </Badge>
                                                                          </span>
                                                                    </Label>
                                                                </div>
                                                                <div className="flex items-center space-x-2">
                                                                    <RadioGroupItem value="yearly" id="yearly"/>
                                                                    <Label htmlFor="yearly" className="flex flex-col">
                                                                        <span className="font-semibold">yearly</span>
                                                                        <span className="text-sm text-muted-foreground">
                                                                              Half Year,{packages?.year_price}
                                                                            <Badge variant="secondary" className="mb-1">
                                                                                Save {calculateDiscount(
                                                                                parsePrice(packages.month_price) * 12,
                                                                                parsePrice(packages.half_year_price)
                                                                            )}%
                                                                            </Badge>
                                                                              </span>
                                                                    </Label>
                                                                </div>
                                                            </RadioGroup>
                                                        </CardContent>
                                                    </Card>
                                                </>
                                            )}
                                        </paymentForm.Field>

                                    ) : (
                                        <div className="text-muted-foreground text-sm">
                                            {registerForm.state.values.course_id
                                                ? "No packages available for this course"
                                                : "Please select a course to view packages"}
                                        </div>
                                    )}
                                </div>

                                <div className="flex justify-between pt-4">
                                    <Button
                                        type="button"
                                        className="font-medium"
                                        size="sm"
                                        onClick={handleBack}
                                    >
                                        Back
                                    </Button>

                                    <registerForm.Subscribe
                                        selector={(state: {
                                            canSubmit: boolean;
                                            isSubmitting: boolean;
                                        }) => [state.canSubmit, state.isSubmitting]}
                                    >
                                        {([canSubmit, isSubmitting]) => (
                                            <Button
                                                size="sm"
                                                className="font-medium"
                                                disabled={!canSubmit}
                                            >
                                                {isSubmitting ? '...' : 'Submit'}
                                            </Button>
                                        )}
                                    </registerForm.Subscribe>
                                </div>
                            </div>

                        )}
                    </form>

                    {
                        step === 3
                        &&
                        <form
                            onSubmit={(e) => {
                                e.stopPropagation();
                                e.preventDefault();
                                paymentForm.handleSubmit()
                            }}
                            className="min-w-1/3 flex justify-center py-4 "
                        >
                            <div className="flex flex-col gap-y-4 md:w-4xl ">
                                <paymentForm.Field name="transaction">
                                    {(field) => (
                                        <>
                                            <Input
                                                id="transaction"
                                                value={field.state.value}
                                                onChange={(e) => field.handleChange(e.target.value)}
                                                type="text"
                                                className="mt-1 block w-full md:w-1/3"
                                                autoComplete="given-name"
                                                placeholder="Tranaction Number (required)"
                                                required
                                            />
                                            <FieldErrors meta={field.state.meta}/>
                                        </>
                                    )}
                                </paymentForm.Field>
                                <div className="flex flex-col mb-4 justify-between">
                                    <paymentForm.Field name="payment_method">
                                        {(field) => (
                                            <div className="space-y-2 mt-1 block w-full md:w-1/3">
                                                <Label htmlFor="course">Select Payment Method</Label>
                                                <Select
                                                    value={field.state.value}
                                                    onValueChange={(value) => field.handleChange(value as "telebirr" | "cbe" | "cbe-birr")}
                                                    required
                                                >
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Select a course"/>
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectGroup>
                                                            {
                                                                paymentMethod.map((v, i) => (
                                                                    <SelectItem key={i} value={v}>
                                                                        {v}
                                                                    </SelectItem>
                                                                ))
                                                            }
                                                        </SelectGroup>
                                                    </SelectContent>
                                                </Select>
                                                <FieldErrors meta={field.state.meta}/>
                                            </div>
                                        )}
                                    </paymentForm.Field>
                                    <paymentForm.Subscribe
                                        selector={(state) => state.values.payment_method}
                                    >
                                        {
                                            (field) => {
                                                return (
                                                    field == "cbe" ?
                                                        (
                                                            <paymentForm.Field name="account_number">
                                                                {(field) => (
                                                                    <>
                                                                        <Input
                                                                            id="account_number"
                                                                            value={field.state.value}
                                                                            onChange={(e) => field.handleChange(e.target.value)}
                                                                            type="text"
                                                                            className="mt-1 block w-full md:w-1/3"
                                                                            autoComplete="given-name"
                                                                            placeholder="Account Number(required)"
                                                                            required
                                                                        />
                                                                        <FieldErrors meta={field.state.meta}/>
                                                                    </>
                                                                )}
                                                            </paymentForm.Field>
                                                        ) : null
                                                )
                                            }
                                        }
                                    </paymentForm.Subscribe>
                                </div>
                                {
                                    packages && (
                                        <paymentForm.Field name="package_id">
                                            {(field) => (
                                                <>
                                                    <input
                                                        type="hidden"
                                                        value={field.state.value}
                                                        onChange={(e) => field.handleChange(e.target.value)}
                                                        className="hidden"
                                                    />
                                                    <FieldErrors meta={field.state.meta}/>
                                                </>
                                            )}
                                        </paymentForm.Field>
                                    )
                                }

                                <div className="flex justify-end pt-4 w-full md:w-1/3">
                                    <paymentForm.Subscribe
                                        selector={(state: {
                                            canSubmit: boolean;
                                            isSubmitting: boolean;
                                        }) => [state.canSubmit, state.isSubmitting]}
                                    >
                                        {([canSubmit, isSubmitting]) => (
                                            <Button
                                                size="sm"
                                                className="font-medium w-full"
                                                disabled={!canSubmit}
                                            >
                                                {isSubmitting ? '...' : 'Submit'}
                                            </Button>
                                        )}
                                    </paymentForm.Subscribe>
                                </div>
                            </div>
                        </form>

                    }
                </CardContent>
            </Card>
        </div>
    );
};
