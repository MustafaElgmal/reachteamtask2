import axios from "axios";
export const fetchCategories = async () => {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/brands`,
      {
        headers: {
          "x-rapidapi-key": `${process.env.NEXT_PUBLIC_RAPIDAPI_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );
    return response;
  } catch (e) {
    console.log(e)
    throw new Error("Network response was not ok");
  }
};


export const fetchItems=async(categoryId:number)=>{
  try{
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/${categoryId}/phones`,
      {
        headers: {
          "x-rapidapi-key": `${process.env.NEXT_PUBLIC_RAPIDAPI_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;

  }catch(e){
    throw new Error("Network response was not ok");
  }
}
