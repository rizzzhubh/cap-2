import axios from "axios"

const baseURL = "http://localhost:3000/"


export const validateuser = async (token) => {
    try {
        const res = await axios.get(`${baseURL}api/users/login`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        return res.data;
    } catch (error) {
        console.log(error)
    }

    
    
}


export const getAllUsers = async () => {
    try {
        const res = await axios.get(`${baseURL}api/users/getUsers `)
        console.log("user data" ,res.data);
        return res.data
    } catch (error) {
        console.log(error)
    }
}

export const getAllArtist = async () => {
    try {
      const res = await axios.get(`${baseURL}api/artist/getAll`);
      return res.data;
    } catch (error) {
      return null;
    }
  };


  export const getAllAlbums = async () => {
    try {
      const res = await axios.get(`${baseURL}api/album/getAll`);
      return res.data;
    } catch (error) {
      return null;
    }
  };

  export const getAllSongs = async () => {
    try {
      const res = await axios.get(`${baseURL}api/songs/getAll`);
      return res.data;
    } catch (error) {
      return null;
    }
  };
  export const saveNewSong = async (data) => {
    try {
      const res = await axios.post(`${baseURL}api/songs/save`, { ...data });
      return res.data.Song; // Assuming 'Song' is the property containing the saved song in the response
    } catch (error) {
      console.error("Error saving song:", error);
      return null;
    }
  };

  export const deleteSongById = async (id) => {
    try {
      const res = axios.delete(`${baseURL}api/songs/delete/${id}`);
      return res;
    } catch (error) {
      return null;
    }
  };



  export const changingUserRole = async (userId, role) => {
    try {
      const res = await axios.put(`${baseURL}api/users/updateRole/${userId}`, {
        role: role,
      });
      return res;
    } catch (error) {
      console.error("Error updating user role:", error);
      throw error; 
    }
  };
  export const removeUser = async (userId) => {
    try {
      const res = axios.delete(`${baseURL}api/users/deleteUser/${userId}`);
      return res;
    } catch (error) {
      return null;
    }
  };