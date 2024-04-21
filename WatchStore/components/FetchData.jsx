import React, {useState} from 'react'

export default async function FetchData() {
    const [data,setData] = useState()
        fetch("../assets/db.json")
        .then((response)=> response.json())
        .then((data)=> console.log(data))
  return data
}
