import axios from "axios";
export const fetchCategories = async () => {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/brands`,
      {
        headers: {
          "x-rapidapi-key": `${process.env.RAPIDAPI_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );
    return response;
  } catch (e) {
    throw new Error("Network response was not ok");
  }
};


export const fetchItems=async()=>{
  try{
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/search`,
      {
        headers: {
          "x-rapidapi-key": `${process.env.RAPIDAPI_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );
    return response;

  }catch(e){
    throw new Error("Network response was not ok");
  }
}
