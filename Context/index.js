import React, { useEffect, useState, createContext, useContext } from "react";
import { ethers } from "ethers";

import {
    connectingWithContract,
    connectWallet,
    CheckIfWalletConnected,
} from '../Utils/apiFeature'

const StateContext = createContext();

export const StateContextProvider = ({ children }) => {
    const DAPP_NAME = "GPT_MEMBERSHIP";

    const [address, setAddress] = useState();
    const [contractMembership, setContractMembership] = useState([]);
    const [Free, setFree] = useState();
    const [userMembership, setUserMembership] = useState({});

    const fetchData = async () => {
        try {
            const freeTrail = localStorage.getItem("freeTrail");
            const FREE_TRAIL = JSON.parse(freeTrail);
            setFree(freeTrail);

            const contract = await connectingWithContract();
            const connectAccount = await connectWallet();
            setAddress(connectAccount);


        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        fetchData();
    }, [])

    const listMembership = async () => {
        const amount = 1;
        const MEMBERSHIP_NAME = "One Month";
        const MEMBERSHIP_COST = ethers.utils.parseUnits(
            amount.toString(),
            "ethers"
        );

        const MEMBERSHIP_DATE = "JULY 31 2023"

        const contract = await connectingWithContract();
        const list = await contract.list(
            MEMBERSHIP_NAME,
            MEMBERSHIP_COST,
            MEMBERSHIP_DATE
        );

        await list.wait();
        console.log(list)
    };


    return (
        <StateContext.Provider value={{ DAPP_NAME }}>
            {children}
        </StateContext.Provider>
    )
};

export const useStateContext = () => useContext(StateContext)