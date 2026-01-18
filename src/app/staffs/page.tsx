"use client"

import { API_BASE_URL } from "@/shared/constants/clientEnv";
import { Staff } from "@/types/staff";
import axios from "axios";
import { useEffect, useState } from "react";

export default function ManageStaffs() {

    const [staffs, setStaffs] = useState<Staff[]>([]);
    useEffect(() => {
        const fetchStaffs = async () => {
            const res = await axios.get<Staff[]>(`${API_BASE_URL}/api/staffs`);
            setStaffs(res.data);
        };

        fetchStaffs();
    }, []);


    return (
        <div className="p-6 text-white">
            <h1 className="text-2xl font-bold mb-6">근무자 목록</h1>

            <div className="overflow-x-auto rounded-lg border">
                <table className="min-w-full text-sm">
                    <thead className="bg-gray-100 text-gray-700">
                        <tr>
                            <th className="px-4 py-3 text-left">ID</th>
                            <th className="px-4 py-3 text-left">이름</th>
                            <th className="px-4 py-3 text-left">이메일</th>
                            <th className="px-4 py-3 text-left">전화번호</th>
                            <th className="px-4 py-3 text-left">User ID</th>
                            <th className="px-4 py-3 text-left">직업</th>
                            <th className="px-4 py-3 text-left">부서</th>
                        </tr>
                    </thead>

                    <tbody>
                        {staffs.map((p) => (
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
                                <td className="px-4 py-3 text-gray-500">
                                    {p.role}
                                </td>
                                <td className="px-4 py-3 text-gray-500">
                                    {p.department}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}