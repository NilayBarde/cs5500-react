import {
    createTuit,
    deleteTuit,
    findTuitById,
    findAllTuits,
} from "../services/tuits-service";
import { createUser, deleteUsersByUsername } from "../services/users-service";

// sample user
const ripley = {
    username: "ellenripley",
    password: "lv426",
    email: "ellenripley@aliens.com",
};

describe("can create tuit with REST API", () => {
    // sample tuit to insert
    const tuit = {
        _id: "622cdd5bcb4ea01e8affff27",
        tuit: "Hello! How is everyone today?",
    };

    // setup test before running test
    beforeAll(async () => {
        // remove any/all users with username and tuits with that id to make sure we create it in the test
        await deleteTuit(tuit._id);
        return await deleteUsersByUsername(ripley.username);
    });

    // clean up after test runs
    afterAll(async () => {
        // remove any data we created
        await deleteTuit(tuit._id);
        return await deleteUsersByUsername(ripley.username);
    });

    test("can create tuit with REST API", async () => {
        const user = await createUser(ripley);
        const tuitCreated = await createTuit(user._id, tuit);

        expect(tuitCreated.tuit).toEqual(tuit.tuit);
    });
});

describe("can delete tuit wtih REST API", () => {
    // sample tuit to delete
    const tuit = {
        _id: "622cdd5bcb4ea01e8affff27",
        tuit: "Hello! How is everyone today?",
    };

    // setup test before running test
    beforeAll(async () => {
        // remove user and tuit to delete in test
        await deleteTuit(tuit._id);
        await deleteUsersByUsername(ripley.username);
    });

    // clean up after test runs
    afterAll(async () => {
        // remove any data we created
        await deleteTuit(tuit._id);
        return await deleteUsersByUsername(ripley.username);
    });

    test("can delete tuit with REST API", async () => {
        const user = await createUser(ripley);
        await createTuit(user._id, tuit);
        const status = await deleteTuit(tuit._id);
        expect(status.deletedCount).toBeGreaterThanOrEqual(1);
    });
});
describe("can retrieve a tuit by their primary key with REST API", () => {
    // sample tuit to retrieve
    const tuit = {
        _id: "622cdd5bcb4ea01e8affff27",
        tuit: "Hello! How is everyone today?",
    };

    // setup test before running test
    beforeAll(async () => {
        // remove user and tuit to delete in test
        await deleteTuit(tuit._id);
        return await deleteUsersByUsername(ripley.username);
    });

    // clean up after test runs
    afterAll(async () => {
        // remove any data we created
        await deleteTuit(tuit._id);
        return await deleteUsersByUsername(ripley.username);
    });

    test("can retrieve a tuit by id with REST API", async () => {
        const user = await createUser(ripley);
        await createTuit(user._id, tuit);

        const retrievedTuit = await findTuitById(tuit._id);
        expect(retrievedTuit.tuit).toEqual(tuit.tuit);
        expect(retrievedTuit.postedBy).toEqual(user);
    });
});

describe("can retrieve all tuits with REST API", () => {
    const tuits = [
        {
            _id: "622cdd5bcb4ea01e8affff27",
            tuit: "I am doing well today!",
        },
        {
            _id: "622cdd5bcb4ea01e8affff28",
            tuit: "The weather is very boring today!",
        },
        {
            _id: "622cdd5bcb4ea01e8affff29",
            tuit: "I can't wait to travel this spring break!",
        },
        {
            _id: "622cdd5bcb4ea01e8affff30",
            tuit: "I am feeling sick today :(",
        },
    ];

    // setup test before running test
    beforeAll(async () => {
        // remove user and tuits to delete in test
        await Promise.all(
            tuits.map(async (tuit) => await deleteTuit(tuit._id))
        );
        return await deleteUsersByUsername(ripley.username);
    });

    // clean up after test runs
    afterAll(async () => {
        // remove any data we created
        await Promise.all(
            tuits.map(async (tuit) => await deleteTuit(tuit._id))
        );
        return await deleteUsersByUsername(ripley.username);
    });

    test("can retrieve all tuits with REST API", async () => {
        const user = await createUser(ripley);
        await Promise.all(
            tuits.map(async (tuit) => {
                return await createTuit(user._id, tuit);
            })
        );

        const retrievedTuits = await findAllTuits();
        expect(retrievedTuits.length).toBeGreaterThanOrEqual(tuits.length);
        const tuitsWeInserted = retrievedTuits.filter(
            (tuit) => tuit.postedBy._id === user._id
        );

        tuitsWeInserted.forEach((tuitInserted) => {
            const tuit = tuits.find((tuit) => tuit._id === tuitInserted._id);
            expect(tuitInserted.tuit).toEqual(tuit.tuit);
            expect(tuitInserted.postedBy).toEqual(user);
        });
    });
});
