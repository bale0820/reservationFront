//  const axiosData = async() => {
//         //  const API_BASE = process.env.NEXT_PUBLIC_API_BASE || 'http://localhost:8080'
//       const res = await axios.get<imgData[]>(`/datas/mainImgData.json`);
//       setImages(res.data);
//     }
import axios from "axios";

export const axiosGet = async<T>(url: string) : Promise<T> => {
            //  const API_BASE = process.env.NEXT_PUBLIC_API_BASE || 'http://localhost:8080'
            const res = await axios.get<T>(url);
            return res.data;

}
