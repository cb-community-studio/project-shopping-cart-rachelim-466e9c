import React from "react";
import { render, screen } from "@testing-library/react";

import FormsPage from "../FormsPage";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../models";

test("renders forms page", async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <FormsPage />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole("forms-datatable")).toBeInTheDocument();
    expect(screen.getByRole("forms-add-button")).toBeInTheDocument();
});
