import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';


type User = {
    username: string,
    email: string
    first_name: string
    last_name: string
    phone_number: string
    role: string,
    is_active: true,
    id: string
}


export const UserInfo = ({ user, showEmail = true }: { user: User; showEmail?: boolean }) =>{

    return (
        <>
            <Avatar className="h-8 w-8 overflow-hidden rounded-full">
                <AvatarImage src='/images/logo.svg' alt={user.username} />
                <AvatarFallback className="rounded-lg bg-neutral-200 text-black dark:bg-neutral-700 dark:text-white">
                    {user.username}
                </AvatarFallback>
            </Avatar>
            <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-medium">{user.username}</span>
                {showEmail && <span className="truncate text-xs text-muted-foreground">{user.email}</span>}
            </div>
        </>
    );
}
