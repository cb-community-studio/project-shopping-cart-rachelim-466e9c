import React from "react";
import { render, screen } from "@testing-library/react";

import CartsPage from "../CartsPage";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../models";

test("renders carts page", async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <CartsPage />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole("carts-datatable")).toBeInTheDocument();
    expect(screen.getByRole("carts-add-button")).toBeInTheDocument();
});
