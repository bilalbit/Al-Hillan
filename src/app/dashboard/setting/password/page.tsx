import {HeadingSmall} from "@/features/settings/components/heading-small";
import PasswordForm from "@/features/settings/components/password-form";


export default function Page() {

    return (

        <div className="space-y-6">
            <HeadingSmall title="Update password"
                          description="Ensure your account is using a long, random password to stay secure"/>
            <PasswordForm />

        </div>
    );
}
