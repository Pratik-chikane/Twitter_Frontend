import { api } from "../../Config/Api";

// export const createPayment =(plan)=>async(dispatch)=>{
//     try {
//         const {data} = await api.post(`/api/plan/subscribe/${plan}`);

//         if(data.paymentLink){
//             window.location.href=data.paymentLink;
//           }
//           console.log("data",data)
        
//       } catch (error) {
//         console.log("catch error ",error)
//       }
// }
// export const createPayment =(plan)=>async(dispatch)=>{
//     try {
//         const response= await api.post(`/api/create-checkout-session/${plan}`);

//         const session = await response.json();
//           console.log("data",data)
        
//       } catch (error) {
//         console.log("catch error ",error)
//       }
// }

export const verifiedAccountAction=(paymentLinkId)=>async(dispatch)=>{
  try {
      const {data} = await api.get(`/api/plan/${paymentLinkId}`);
console.log("verified account ",data)
      
    } catch (error) {
      console.log("catch error ",error)
    }
}