import axios from "axios"

// const baseUrl = "http://localhost:3000"
const baseUrl = "https://muse-box-backend.vercel.app"


type FormValues = {
    songName: string;
    artist: string;
    audioType: string;
    albumName: string;
    language: string;
    duration: string;
    releaseDate: string;
  };
export const uploadSong = async(songData:FormData) =>{
    try{
        const response = await axios.post(`${baseUrl}/api/v1/uploadSong`,songData)
        if(response){
            console.log(response);
            return response
        }else{
            return false
        }
    }catch(e){
        console.log(e);
        
    }
}

export const uploadThumbnail = async(thumbnailData:FormData) =>{
    try{
        const response = await axios.post(`${baseUrl}/api/v1/uploadThumbnail`,thumbnailData)
        if(response){
            console.log(response);
            return response
        }else{
            return false
        }
    }catch(e){
        console.log(e);
        
    }
}


export const uploadSongData = async (songData:FormValues) =>{
    const response = await axios.post(`${baseUrl}/api/v1/uploadSongData`,songData)
    if(response){
        return response
    }else{
        return false
    }
}


export const getSongData = async () =>{
    const response = await axios.get(`${baseUrl}/api/v1/getSongData`)
    if(response){
        return response
    }else{
        return false
    }
}