import cornerstone from "cornerstone-core";
import cornerstoneWADOImageLoader from "cornerstone-wado-image-loader";
import dicomParser from "dicom-parser";

// 🔑 필수 연결
cornerstoneWADOImageLoader.external.cornerstone = cornerstone;
cornerstoneWADOImageLoader.external.dicomParser = dicomParser;

// 🔑 web worker 비활성화 (Next.js + 포트폴리오용 필수)
cornerstoneWADOImageLoader.configure({
  useWebWorkers: false,
});

export { cornerstone };
