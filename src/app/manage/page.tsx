"use client"

import { patientMockData } from "@/mock/patient.mock";
import { API_BASE_URL } from "@/shared/constants/clientEnv";
import { Patient } from "@/types/patient";
import axios from "axios";
import { useEffect, useState } from "react";


export default function ManagePatients() {

    const [patients, setPatients] = useState<Patient[]>([]);
    useEffect(() => {
        const fetchPatients = async () => {
            // const res = await axios.get<Patient[]>(`${API_BASE_URL}/api/users`);
            // setPatients(res.data);
            setPatients(patientMockData);
        };

        fetchPatients();
    }, []);


    console.log("patients", patients);

    return (
        <div className="p-6 text-white">
            <h1 className="text-2xl font-bold mb-6">환자 목록</h1>

            <div className="overflow-x-auto rounded-lg border">
                <table className="min-w-full text-sm">
                    <thead className="bg-gray-100 text-gray-700">
                        <tr>
                            <th className="px-4 py-3 text-left">ID</th>
                            <th className="px-4 py-3 text-left">이름</th>
                            <th className="px-4 py-3 text-left">이메일</th>
                            <th className="px-4 py-3 text-left">전화번호</th>
                            <th className="px-4 py-3 text-left">User ID</th>
                        </tr>
                    </thead>

                    <tbody>
                        {patients.map((p) => (
                            <tr
                                key={p.id}
                                className="border-t hover:bg-gray-500 transition"
                            >
                                <td className="px-4 py-3">{p.id}</td>
                                <td className="px-4 py-3 font-medium">{p.name}</td>
                                <td className="px-4 py-3 text-blue-600">{p.email}</td>
                                <td className="px-4 py-3">{p.phone}</td>
                                <td className="px-4 py-3 text-gray-500">
                                    {p.userId ?? "-"}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}