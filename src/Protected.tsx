import { useSession } from "next-auth/react";
const Protected = () => {
    const session = useSession()
    return (
        <div>
            This page is protected
        </div>
    );
}

export default Protected;