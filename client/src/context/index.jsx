import React, {useContext, createContext} from "react";

import  { useAddress, useContract, useContractWrite, useMetamask } from "@thirdweb-dev/react";
import { ethers } from "ethers";

const StateContext = createContext();

export const StateContextProvider = ({ children }) => {
    const { contract } = useContract("0x041A713b76Dd3aEa30A58a4bF256BFD572F2C974");
    const { mutateAsync: createCampaign } = useContractWrite(contract, "createCampaign");

    const address = useAddress();
    const connect = useMetamask();

    const publishCampaign = async (form) => {
        try {
            const data = await createCampaign({
    args: [
        address,
        form.title,
        form.description,
        ethers.utils.parseEther(form.target), // ensure target is in wei
        new Date(form.deadline).getTime(),    // timestamp
        form.image,
    ]
 });
            console.log("contract call success", data);
        } catch (error) {
            console.log("contract call failure", error);
        }
    };

    const getCampaigns = async () => {
        const campaigns = await contract.call("getCampaigns");

        const parsedCampaigns = campaigns.map((campaign,i) => ({
            owner: campaign.owner,
            title: campaign.title,
            description: campaign.description,
            target: ethers.utils.formatEther(campaign.target.toString()),
            deadline: campaign.deadline.toNumber(),
            amountCollected: ethers.utils.formatEther(campaign.amountCollected.toString()),
            image: campaign.image,
            pId: i
        }));

        return parsedCampaigns;
    };

    const getUserCampaigns = async () => {
        const allCampaigns = await getCampaigns();
        return allCampaigns.filter((campaign) => campaign.owner === address);
    };

    const donate = async (pId, amount) => {
        const data = await contract.call("donateToCampaign", [pId], {
            value: ethers.utils.parseEther(amount),
        });

        return data;
    }

    const getDonations = async (pId) => {
        const donations = await contract.call("getDonators", [pId]);
        const numberOfDonations = donations[0].length;

        const parsedDonations = [];

        for (let i = 0; i < numberOfDonations; i++) {
            parsedDonations.push({
                donator: donations[0][i],
                donation: ethers.utils.formatEther(donations[1][i].toString())
            });
        }

        return parsedDonations;
    };

  return (
    <StateContext.Provider
      value={{ 
        address,
        contract,
        connect,
        createCampaign: publishCampaign,
        getCampaigns,
        getUserCampaigns,
        donate,
        getDonations,
      }}
    >
      {children}
    </StateContext.Provider>
  )
}

export const useStateContext = () => useContext(StateContext);