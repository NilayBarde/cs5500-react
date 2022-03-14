import { Tuits } from "../components/tuits";
import { screen, render } from "@testing-library/react";
import { HashRouter } from "react-router-dom";
import { findAllTuits } from "../services/tuits-service";
import axios from "axios";

const MOCKED_USERS = [
    {
        username: "alice",
        password: "alice234",
        email: "alice@wonderland.com",
        _id: "622cff009f29f1dd5a0ccead",
    },
    {
        username: "bob",
        password: "bob123",
        email: "bob@marley.com",
        _id: "622d0476b860979eac13ea46",
    },
    {
        username: "charlie",
        password: "charlie456",
        email: "charlie@charlie.com",
        _id: "622d0570b860979eac13ea49",
    },
];

const MOCKED_TUITS = [
    {
        _id: "622cdd5fcb4ea01e8affff29",
        postedBy: MOCKED_USERS[1],
        tuit: "bob's 2nd tuit",
    },
    {
        _id: "622d05ccb860979eac13ea4d",
        postedBy: MOCKED_USERS[0],
        tuit: "alice's 1st tuit",
    },
    {
        _id: "622d05e7b860979eac13ea50",
        postedBy: MOCKED_USERS[2],
        tuit: "charlie's 1st tuit",
    },
];

test("tuit list renders mocked", async () => {
    const mock = jest.spyOn(axios, "get");
    mock.mockImplementation(() =>
        Promise.resolve({ data: { tuits: MOCKED_TUITS } })
    );
    const response = await findAllTuits();
    const tuits = response.tuits;

    render(
        <HashRouter>
            <Tuits tuits={tuits} />
        </HashRouter>
    );
    const linkElement1 = screen.getByText(/bob's 2nd tuit/i);
    expect(linkElement1).toBeInTheDocument();
    const linkElement2 = screen.getByText(/alice's 1st tuit/i);
    expect(linkElement2).toBeInTheDocument();
    const linkElement3 = screen.getByText(/charlie's 1st tuit/i);
    expect(linkElement3).toBeInTheDocument();

    mock.mockRestore();
});
