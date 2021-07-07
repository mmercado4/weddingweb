// src/setupTests.js
import { server } from "./src/test/mocks/server";

//Regenator runtime to avoid jest error "regenerator runtime is not defined"
//Stolen: https://stackoverflow.com/questions/42535270/regeneratorruntime-is-not-defined-when-running-jest-test
import "regenerator-runtime/runtime";

// Establish API mocking before all tests.
beforeAll(() => server.listen());

// Reset any request handlers that we may add during the tests,
// so they don't affect other tests.
afterEach(() => server.resetHandlers());

// Clean up after the tests are finished.
afterAll(() => server.close());
