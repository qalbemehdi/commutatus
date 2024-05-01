"use client"
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTeams } from "@/store/slices/teamSlice";

export default function useTeamsData() {
    const teams = useSelector((state) => state.teams.teams);
    const status = useSelector((state) => state.teams.status);
    const dispatch = useDispatch();

    useEffect(() => {
        if (status === "idle") {
            dispatch(fetchTeams());
        }
    }, [status, dispatch]);

    return teams;
}
