// 환자 + 검사 + 다량의 DICOM 이미지 구조 (PACS 스타일)

export type DicomImage = {
  imageId: number;
  dicomUrl: string;
};

export type Study = {
  studyId: number;
  modality: "CT" | "MRI" | "XRAY";
  bodyPart: string;
  series: DicomImage[];
};

export type Patient = {
  userId: number;
  name: string;
  email: string;
  studies: Study[];
};

export const pacsMockData: Patient[] = [
  {
    userId: 1,
    name: "홍길동",
    email: "hong@test.com",
    studies: [
      {
        studyId: 101,
        modality: "MRI",
        bodyPart: "Brain",
        series: Array.from({ length: 24 }).map((_, i) => ({
          imageId: i + 19,
          dicomUrl: `https://medical-ai-yhj.s3.ap-northeast-2.amazonaws.com/image-${String(i + 19).padStart(5, "0")}.dcm`,
        })),
      },
      {
        studyId: 102,
        modality: "CT",
        bodyPart: "Chest",
        series: Array.from({ length: 18 }).map((_, i) => ({
          imageId: i + 1,
          dicomUrl: `https://medical-ai-yhj.s3.ap-northeast-2.amazonaws.com/image-${String(i + 1).padStart(5, "0")}.dcm`,
        })),
      },
    ],
  },
  {
    userId: 2,
    name: "김의사",
    email: "doctor@test.com",
    studies: [
      {
        studyId: 201,
        modality: "XRAY",
        bodyPart: "Lung",
        series: Array.from({ length: 12 }).map((_, i) => ({
          imageId: i + 44,
          dicomUrl: `https://medical-ai-yhj.s3.ap-northeast-2.amazonaws.com/image-${String(i + 44).padStart(5, "0")}.dcm`,
        })),
      },
    ],
  },
];
