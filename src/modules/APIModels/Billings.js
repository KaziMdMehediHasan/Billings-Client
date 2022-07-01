import axios from "axios";
import { apiBaseUrl } from "../../config";

const createNewBill = async (newBill) => {
    try {
        let response = await axios({
            method: "POST",
            url: `${apiBaseUrl}/add-billing`,
            headers: { "Content-Type": "application/json" },
            data: JSON.stringify(newBill),
        });
        return [true, "Bill created successfully!"];
    } catch (err) {
        return [false, err?.response?.data];
    }
};

// get all bills

const getAllBills = async (filter) => {
    try {
        let response = await axios({
            method: "POST",
            url: `${apiBaseUrl}/billing-list`,
            headers: { "Content-Type": "application/json" },
            data: JSON.stringify(filter)
        });
        return [true, response?.data];
    } catch (err) {
        return [false, err?.response?.data];
    }
};

// delete a bill

const deleteABill = async (id) => {
    try {
        let response = await axios({
            method: "DELETE",
            url: `${apiBaseUrl}/delete-billing/${id}`,
            headers: { "Content-Type": "application/json" },
        })
        return [true, response?.data];
    } catch (err) {
        return [false, err?.response];
    }
}

const updateABill = async (id, data) => {
    // console.log(data);
    let updatedData = {
        fullname: data.fullname,
        email: data.email,
        phone: data.phone,
        paidamount: data.paidamount,
    }
    // console.log(updatedData);
    try {
        let response = await axios({
            method: "PUT",
            url: `${apiBaseUrl}/update-billing/${id}`,
            headers: { "Content-Type": "application/json" },
            data: JSON.stringify(updatedData)
        })
        return [true, "Updated Successfully!"];
    } catch (err) {
        return [false, err?.response];
    }
}

export { createNewBill, getAllBills, deleteABill, updateABill }