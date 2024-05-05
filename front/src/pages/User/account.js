import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { UserService } from "../../_services/user.service";

const Account = () => {
    // STATES //
    const [user, setUser] = useState([]);

    // GET ID FROM URL PARAMS //
    const { id } = useParams();

    // GET USER FUNCTION //
    const getUserOnLoad = async () => {
        try {
            // Api call for get user
            const res = await UserService.getUser(id);

            console.log(res.data.data);

            // Update state
            setUser(res.data.data);
        } catch (err) {
            console.log('Error: ', err);
        }
    };

    // GET USER ONLOAD //
    useEffect(() => {
        getUserOnLoad();
    }, []);

    return (
        <div>
            {user.map(item => (
                <div key={item.id}>
                    <p>{item.firstName}</p>
                    <p>{item.lastName}</p>
                    <p>{item.email}</p>
                </div>
            ))}
        </div>
    );
};

export default Account
