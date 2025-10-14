"use client";

import React, { useState } from "react";
import axios from "axios";

function FileUpload() {
    const [file, setFile] = useState<File | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const [uploadedUrl, setUploadedUrl] = useState<string | null>(null);

    // 파일 선택 핸들러
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = e.target.files?.[0];
        if (selectedFile) {
            setFile(selectedFile);
            setPreviewUrl(URL.createObjectURL(selectedFile)); // 미리보기용
        }
    };

    // 업로드 요청
    const handleUpload = async () => {
        if (!file) {
            alert("파일을 선택하세요!");
            return;
        }

        const formData = new FormData();
        formData.append("file", file);
        const API_BASE =
            process.env.NEXT_PUBLIC_API_BASE;
        try {
            const response = await axios.post(`${API_BASE}/api/uploadImage`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });

            console.log("업로드 성공:", response.data);
            setUploadedUrl(response.data as string);
        } catch (error) {
            console.error("업로드 실패:", error);
            alert("업로드 중 오류가 발생했습니다.");
        }
    };

    return (
        <div style={{ padding: 20 }}>
            <h2>🖼️ S3 이미지 업로드</h2>

            <input type="file" accept="image/*" onChange={handleFileChange} />
            {previewUrl && <img src={previewUrl} alt="preview" width={200} style={{ marginTop: 10 }} />}

            <button onClick={handleUpload} style={{ display: "block", marginTop: 10 }}>
                업로드
            </button>

            {uploadedUrl && (
                <p style={{ marginTop: 10 }}>
                    ✅ 업로드 완료: <a href={uploadedUrl} target="_blank" rel="noopener noreferrer">{uploadedUrl}</a>
                </p>
            )}
        </div>
    );
}

export default FileUpload;
