import { UserList } from "../components/profile/user-list";
import { screen, render } from "@testing-library/react";
import { HashRouter } from "react-router-dom";
import { findAllUsers } from "../services/users-service";

const MOCKED_USERS = [
    {
        username: "ellen_ripley",
        password: "lv426",
        email: "repley@weyland.com",
        _id: "123",
    },
    {
        username: "alice",
        password: "alice234",
        email: "alice@wonderland.com",
        _id: "622cff009f29f1dd5a0ccead",
    },
];

test("user list renders static user array", () => {
    render(
        <HashRouter>
            <UserList users={MOCKED_USERS} />
        </HashRouter>
    );
    const linkElement = screen.getByText(/ellen_ripley/i);
    expect(linkElement).toBeInTheDocument();
});

test("user list renders async", async () => {
    const users = await findAllUsers();
    render(
        <HashRouter>
            <UserList users={users} />
        </HashRouter>
    );
    const linkElement = screen.getByText(/sarah_conor/i);
    expect(linkElement).toBeInTheDocument();
});

// test("user list renders mocked", async () => {
//     const mock = jest.spyOn(axios, "get");
//     mock.mockImplementation(() =>
//         Promise.resolve({ data: { users: MOCKED_USERS } })
//     );
//     const response = await findAllUsers();
//     const users = response.users;

//     render(
//         <HashRouter>
//             <UserList users={users} />
//         </HashRouter>
//     );

//     const user = screen.getByText(/ellen_ripley/i);
//     expect(user).toBeInTheDocument();
//     mock.mockRestore();
// });
