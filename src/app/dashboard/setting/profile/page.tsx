
import {DeleteUser} from "@/features/settings/layouts/delete-user";
import UserProfileForm from "@/features/settings/components/user-profile-form";


const ProfilePage = () => {


    return (
        <div className="flex-1 md:max-w-2xl">
            <section className="max-w-xl space-y-12">
                <div className="space-y-6">
                    <header><h3 className="mb-0.5 text-base font-medium">Profile information</h3><p
                        className="text-sm text-muted-foreground">Update your name and email address</p>
                    </header>
                    {/*MUST PASS DEFAULT VALUE*/}
                    <UserProfileForm />
                </div>
                <DeleteUser/>
            </section>
        </div>

    );
}
export default ProfilePage;
