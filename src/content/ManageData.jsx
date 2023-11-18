import { useEffect,useState } from 'react'
import axios from "../api/axios";

export default function ManageData() {

const [data, setData] = useState(null)
const [errors, setErrors] = useState({});
const [fetchStatus, setFetchStatus] = useState(true)

const [currentId, setCurrentId] = useState(-1)

//Input
const [name, setName]= useState("");
const [description, setDescription]= useState("");
const [category, setCategory]= useState("");
const [size, setSize]= useState("");
const [price, setPrice]= useState("");
const [rating, setRating]= useState("");
const [image_url, setImage]= useState("");
const [release_year, setYear]= useState("");
const [is_android_app, setAndroid]= useState("");
const [is_ios_app, setIos]= useState("");
const input = {name,description,category,size,price,rating,image_url,release_year,is_android_app,is_ios_app};

useEffect(() => {
  //fetch data dengan kondisi
  if (fetchStatus === true) {
    axios.get('/mobile-apps')
      .then((res) => {
        setData([...res.data])
      })
      .catch((error) => {
      })
    setFetchStatus(false)
  }

}, [fetchStatus, setFetchStatus]) 
const handleSubmit = (event) => {
  event.preventDefault()
  
    if (currentId === -1) {
      
          // Lakukan aksi ketika formulir valid
          
            //create data
            axios.post('/mobile-apps', input)
              .then((res) => {
                console.log(res)
                
                setFetchStatus(true)
              })
        
            //clear input setelah create data
            
    } 
    else{
// update data
         axios.put(`/mobile-apps/${currentId}`,input)
          .then((res) => {
          setFetchStatus(true)
          })
    }
  setCurrentId(-1)
  setName("")
  setDescription("")
  setCategory("")
  setSize("")
  setPrice("")
  setRating("")
  setImage("")
  setYear("")
  setAndroid("")
  setIos("")
}
const handleDelete = (event) => {
  let idData = parseInt(event.target.value)
  
  axios.delete(`/mobile-apps/${idData}`)
    .then((res) => {
      setFetchStatus(true)
    })

}

const handleEdit = (event) => {
  let idData = parseInt(event.target.value)
  console.log(idData)
  setCurrentId(idData)

  axios.get(`/mobile-apps/${idData}`)
    .then((res) => {
      let data = res.data
      setName(data.name)
      setDescription(data.description)
      setCategory(data.category)
      setSize(data.size)
      setPrice(data.price)
      setRating(data.rating)
      setImage(data.image_url)
      setYear(data.release_year)
      setAndroid(data.is_android_app)
      setIos(data.is_ios_app)
    })
    const formElement = document.getElementById('formulir');
    formElement.scrollIntoView({ behavior: 'smooth' });
}


  return (
    <>
      <div className="container mx-auto">
        <h5 className="text-xl font-bold dark:text-white m-5 ">Manage Data</h5>
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-white uppercase bg-purple-500 dark:bg-purple-500 dark:text-white">
              <tr>
                <th scope="col" className="px-6 py-3">
                  No
                </th>
                <th scope="col" className="px-6 py-3">
                  NAME
                </th>
                <th scope="col" className="px-6 py-3">
                  CATEGORY
                </th>
                <th scope="col" className="px-6 py-3">
                  DESCRIPTION
                </th>
                <th scope="col" className="px-6 py-3">
                  PRICE
                </th>
                <th scope="col" className="px-6 py-3">
                  RATING
                </th>
                <th scope="col" className="px-6 py-3">
                  RELEASE YEAR
                </th>
                <th scope="col" className="px-6 py-3">
                  SIZE
                </th>
                <th scope="col" className="px-6 py-3">
                  ANDROID
                </th>
                <th scope="col" className="px-6 py-3">
                  IOS
                </th>
                <th scope="col" className="px-6 py-3">
                  ACTION
                </th>
              </tr>
            </thead>
            <tbody>
            {data && data.map((res,Index) => {
              return (
              <tr key ={res.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                  {Index + 1}
                </th>
                <td className="px-6 py-4">
                {res.name}
                </td>
                <td className="px-6 py-4">
                {res.category}
                </td>
                <td className="px-6 py-4">
                {WordWrap(res.description)}
                </td>
                <td className="px-6 py-4">
                {Rupiah(res.price)}
                </td>
                <td className="px-6 py-4">
                {res.rating}
                </td>
                <td className="px-6 py-4">
                {res.release_year}
                </td>
                <td className="px-6 py-4">
                {SizeCheck(res.size)}
                </td>
                <td className="px-6 py-4">
                {Platform(res.is_android_app)}
                </td>
                <td className="px-6 py-4">
                {Platform(res.is_ios_app)}
                </td>
                <td className="px-6 py-4">
                  <button onClick={handleEdit} value={res.id} className="focus:outline-none text-white bg-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:focus:ring-yellow-900">Edit</button>
                  <button onClick={handleDelete} value={res.id} className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">Delete</button>
                </td>
              </tr>
              )
            })}

            </tbody>
          </table>
        </div>
          <h5 className="text-xl font-bold dark:text-white m-5 ">Create Data</h5>
          
          <form id="formulir" onSubmit={handleSubmit}>
            <div className="border-b-4 border-gray-100 mb-5">Gambar data Game</div>
            <div className="mb-6">
              <label htmlFor="image_url" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Image URL</label>
              <input type="text" id="image_url" onChange={(e)=>setImage(e.target.value)} value={image_url} name='image_url' className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"  required />
            </div>
            <div className="border-b-4 border-gray-100 mb-5">Data Game</div>
            <div className="mb-6">
              <label htmlFor="image_url" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Name</label>
              <input type="text" id="name" onChange={(e)=>setName(e.target.value)} value={name} name='name' className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"  required />
            </div>
            <div className="mb-6">
              <label htmlFor="image_url" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Category</label>
              <input type="text" id="category" onChange={(e)=>setCategory(e.target.value)} value={category} name='category' className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"  required />
            </div>
            <div className="mb-6">
              <label htmlFor="image_url" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Description</label>
              <textarea  type="text" id="description" onChange={(e)=>setDescription(e.target.value)} value={description} name='description' className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"  required />
            </div>
            <div className="mb-6">
              <label htmlFor="image_url" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Price</label>
              <input type="number" id="price" onChange={(e)=>setPrice(e.target.value)} value={price} name='price' className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"  required />
            </div>
            <div className="mb-6">
              <label htmlFor="image_url" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Rating</label>
              <input type="number" id="rating" onChange={(e)=>setRating(e.target.value)} value={rating} name='rating' className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"  required />
            </div>
            <div className="mb-6">
              <label htmlFor="image_url" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Release Year</label>
              <input type="number" id="release_year" onChange={(e)=>setYear(e.target.value)} value={release_year} name='release_year' className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"  required />
            </div>
            <div className="mb-6">
              <label htmlFor="image_url" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Size</label>
              <input type="number" id="size" onChange={(e)=>setSize(e.target.value)} value={size} name='size' className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"  required />
            </div>
            <div className="border-b-4 border-gray-100 mb-5">Jenis Perangkat</div>
            <div className="mb-6">
              <label htmlFor="image_url" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Android ?</label>
              <input type="text" id="is_android_app" onChange={(e)=>setAndroid(e.target.value)} value={is_android_app} name='is_android_app' className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"  required />
            </div>
            <div className="mb-6">
              <label htmlFor="image_url" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">IOS ?</label>
              <input type="text" id="is_ios_app"onChange={(e)=>setIos(e.target.value)} value={is_ios_app} name='is_ios_app' className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"  required />
            </div>
            <button type="submit" className="mb-5 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" >Submit</button>
          </form>

      </div>
    

    </>
  )
}

function WordWrap(sentence) {
  if(sentence != null){
      let panjang_kata = sentence.length;
      let wrap = sentence.substring(0,30);
      if(panjang_kata >= 30){
          return wrap +'...';
     } else{
         return sentence;
     }
  }else{

  }return "kosong";
  
  
}

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
function Platform(params) {
  if(params != null){
    if(params == 0) {
      return  <p className="text-red-600">NO</p>;
      } else{
         
          return  <p className="text-blue-600">YES</p>;
          ;
      }
  }
}