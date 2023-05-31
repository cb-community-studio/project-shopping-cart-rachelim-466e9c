import React from "react";
import { render, screen } from "@testing-library/react";

import PromotionsPage from "../PromotionsPage";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../models";

test("renders promotions page", async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <PromotionsPage />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole("promotions-datatable")).toBeInTheDocument();
    expect(screen.getByRole("promotions-add-button")).toBeInTheDocument();
});
