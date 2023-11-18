import { useEffect,useState } from 'react'
import axios from "../api/axios";

export default function Home() {
const [data, setData] = useState([]);
    useEffect(() => {
        axios.get('/mobile-apps')
            .then((res) => {
              setData([...res.data])
              
            })
            .catch((error) => {
            })
    }, []);
    console.log(data)
  return (
    <>
        <section className="bg-gray-200 p-5">
        <div className="container mx-auto mt-10">
        <h1 className="text-xl font-bold ">Find your data that you need!</h1>
        </div>
        <div className="container mx-auto flex-wrap flex gap-10 items-center justify-start">
        {/* Batas awal Card section */}
        {data && data.map((res) => {
            return (
            <div className="mt-10 h-72 flex max-w-xl bg-white shadow-lg rounded-lg overflow-hidden" key ={res.id}>
                <img src={res.image_url} className="w-1/3 bg-cover bg-center bg-landscape" />
                <div className="w-2/3 p-4">
                <h1 className="text-gray-900 font-bold text-2xl">
                {res.name}
                </h1>
                <small>{res.release_year}</small>
                <p className="mt-2 text-gray-600 text-sm">
                    {WordWrap(res.description)}
                </p>
                <div className=" item-center mt-2 text-gray-500">
                    <span>{res.category +' '}</span>
                    <span>{SizeCheck(res.size)}</span>
                    <span>,{' '} {res.is_android_app === 1 ? "Android" :""} {res.is_ios_app && res.is_android_app? " & " :""} {res.is_ios_app === 1 ? "IOS" :""}</span>
                </div>
                <div className="flex item-center justify-between mt-3">
                    <h1 className="text-gray-700 font-bold text-xl">
                    {Rupiah(res.price)}
                    </h1>
                    <button className="px-3 py-2 bg-gray-800 text-white text-xs font-bold uppercase rounded">
                    {res.rating} Ratings
                    </button>
                </div>
                </div>
            </div>
            )
          })}
        
        {/* Batas akhir Card section */}
        </div>
    </section>
    </>
  )

function SizeCheck(size) {
    if(size != null){
        if(size <= 1024) {
            let text = size.toString();
            return text+' MB';
            } else{
                size = size / 1024
                let sizes = size.toFixed(1)
                let text = sizes.toString();
                return text+' GB';
            }
        }
    }
    

function Rupiah(angka) {
        if(angka == null|| angka === 0){
            return "Gratis";
        } else{
            let rupiah = angka.toLocaleString('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0, maximumFractionDigits: 0 });
            return rupiah;
            
        }

    }

function WordWrap(sentence) {
        if(sentence != null){
            let panjang_kata = sentence.length;
            let wrap = sentence.substring(0, 160);
            if(panjang_kata >= 160){
                return wrap +'...';
           } else{
               return sentence;
           }
        }else{

        }return "kosong";
        
        
    }
    
}
