import { Staff } from "@/types/staff";


export const staffMockData: Staff[] = [
  {
    id: 1,
    name: "김의사",
    phone: "010-1000-0001",
    email: "doctor01@hospital.com",
    userId: "doctor01",
    role: "DOCTOR",
    department: "영상의학과",
  },
  {
    id: 2,
    name: "이의사",
    phone: "010-1000-0002",
    email: "doctor02@hospital.com",
    userId: "doctor02",
    role: "DOCTOR",
    department: "내과",
  },
  {
    id: 3,
    name: "박의사",
    phone: "010-1000-0003",
    email: "doctor03@hospital.com",
    userId: "doctor03",
    role: "DOCTOR",
    department: "정형외과",
  },
  {
    id: 4,
    name: "김간호",
    phone: "010-2000-0001",
    email: "nurse01@hospital.com",
    userId: "nurse01",
    role: "NURSE",
    department: "영상의학과",
  },
  {
    id: 5,
    name: "이간호",
    phone: "010-2000-0002",
    email: "nurse02@hospital.com",
    userId: "nurse02",
    role: "NURSE",
    department: "내과",
  },
  {
    id: 6,
    name: "관리자",
    phone: "010-3000-0001",
    email: "admin01@hospital.com",
    userId: "admin01",
    role: "ADMIN",
    department: "관리팀",
  },
];
