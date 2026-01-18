// import DicomViewer from "@/components/dicom/DicomViewer";


// export default function ResultPage() {
//   return (
//     <div style={{ padding: 40 }}>
//       <h2>의료 영상 테스트</h2>

//       <DicomViewer dicomUrl="https://medical-ai-yhj.s3.ap-northeast-2.amazonaws.com/image-00000.dcm" />
//     </div>
//   );
// }
"use client";

import { useEffect, useState } from "react";
import DicomViewer from "@/components/dicom/DicomViewer";
import { pacsMockData, Patient } from "@/mock/pacsData";
import axios from "axios";
import { API_BASE_URL, AWS_BASE_URL } from "@/shared/constants/clientEnv";
import type { ReactNode } from "react";

type SelectedImageInfo = {
  patientName: string;
  email: string;
  modality: "CT" | "MRI" | "XRAY";
  bodyPart: string;
  studyId: number;
  imageIndex: number;
  totalImages: number;
  dicomUrl: string;
};

export default function ResultPage() {
  const [selectedImage, setSelectedImage] =
    useState<SelectedImageInfo | null>(null);
  const [search, setSearch] = useState("");
  const [pacsData, setPacsData] = useState<Patient[] | []>([]);



  useEffect(() => {
    axios.get<Patient[]>(`${API_BASE_URL}/api/pacs`).then(res => {
      setPacsData(res.data); // ✅ 기존 pacsMockData 제거 가능
    });
  }, []);
  console.log("pacsData", pacsData);
  const filteredPatients = pacsData?.filter(patient =>
    patient.name.includes(search)
  );

  return (
    <div className="flex flex-col h-screen bg-black">
      {/* 🔹 상단 검색 바 */}
      <div className="h-[60px] flex items-center px-5 bg-neutral-900 border-b border-neutral-800">
        <input
          placeholder="환자 이름 검색"
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="w-[300px] h-9 px-3 bg-neutral-800 border border-neutral-700 text-white outline-none"
        />
      </div>

      {/* 🔹 메인 영역 */}
      <div className="flex flex-1 overflow-hidden">
        {/* ✅ 왼쪽 썸네일 영역 */}
        <div className="w-[280px] bg-neutral-950 border-r border-neutral-800 p-2 overflow-y-auto">
          <div className="grid grid-cols-2 gap-2">
            {filteredPatients.map(patient =>
              patient.studies.map(study =>
                study.series.map((img, index) => (
                  <div
                    key={img.imageId}
                    onClick={() =>
                      setSelectedImage({
                        patientName: patient.name,
                        email: patient.email,
                        modality: study.modality,
                        bodyPart: study.bodyPart,
                        studyId: study.studyId,
                        imageIndex: index + 1,
                        totalImages: study.series.length,
                        dicomUrl: img.dicomUrl,
                      })
                    }
                    className={`h-[120px] border cursor-pointer transition
                      ${selectedImage?.dicomUrl === img.dicomUrl
                        ? "border-green-500"
                        : "border-neutral-700 hover:border-green-500"
                      }`}
                  >
                    <DicomViewer dicomUrl={`${AWS_BASE_URL}/${img.dicomUrl}`} />
                  </div>
                ))
              )
            )}
          </div>
        </div>

        {/* 🔥 오른쪽 영역 */}
        <div className="flex-1 bg-black p-3 flex overflow-hidden">
          <div className="flex-1 bg-black">
            {selectedImage ? (
              <DicomViewer
                key={selectedImage.dicomUrl}
                dicomUrl={`${AWS_BASE_URL}/${selectedImage.dicomUrl}`}
              />
            ) : (
              <div className="text-neutral-500 flex items-center justify-center h-full">
                왼쪽에서 이미지를 선택하세요
              </div>
            )}
          </div>

          {selectedImage && (
            <div className="w-[320px] ml-4 bg-neutral-900 border border-neutral-800 text-neutral-200 p-4 text-sm overflow-y-auto">
              <h3 className="text-lg font-semibold mb-4 border-b border-neutral-700 pb-2">
                Study Details
              </h3>

              <div className="space-y-2">
                <Info label="Patient Name" value={selectedImage.patientName} />
                <Info label="Patient Email" value={selectedImage.email} />
                <Info label="Modality" value={selectedImage.modality} />
                <Info label="Body Part Examined" value={selectedImage.bodyPart} />
                <Info label="Study ID" value={selectedImage.studyId} />
                <Info
                  label="Image Index"
                  value={`${selectedImage.imageIndex} / ${selectedImage.totalImages}`}
                />
                <Info label="Acquisition Plane" value="Axial" />
                <Info label="Slice Thickness" value="5 mm" />
                <Info label="Window Preset" value="Soft Tissue" />
                <Info label="Reconstruction Kernel" value="Standard" />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function Info({ label, value }: { label: string; value: ReactNode }) {
  return (
    <div className="flex justify-between gap-2">
      <span className="text-neutral-400">{label}</span>
      <span className="font-medium text-right">{value}</span>
    </div>
  );
}
