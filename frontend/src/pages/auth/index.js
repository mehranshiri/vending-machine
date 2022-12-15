import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Login from "./Login";
import Register from "./Register";

export default function Auth() {
    return (
        <>
            <Route path="/auth/login" element={<Login />} />
            <Route path="/augh/register" element={<Register />} />
            <Route
                path="*"
                element={<Navigate to="/auth/login" replace />}
            />
        </>
    )
}