export default{
    async contactCoach(context,payload){
        const newRequest={
            // id:new Date().toISOString(),
            // coachId:payload.coachId,
            userEmail:payload.email,
            message:payload.message,
        };
        const response=await fetch(`https://vue-http-demo-4a8d2-default-rtdb.asia-southeast1.firebasedatabase.app/requests/${payload.coachId}.json`,{
            method:'POST',
            body:JSON.stringify(newRequest),

        });
        const responseData=await response.json();

        if (!response.ok) {
            const error=new Error(responseData.message || "Failed to send request to server");
            throw error;
          }
        newRequest.id=responseData.name;
        newRequest.coachId=payload.coachId;

        context.commit('addRequest',newRequest);
       
    },

    async fetchRequest(context){
         const coachId=context.rootGetters.userId;
        const response=await fetch(`https://vue-http-demo-4a8d2-default-rtdb.asia-southeast1.firebasedatabase.app/requests/${coachId}.json`);
        // const response=await fetch(`https://vue-http-demo-4a8d2-default-rtdb.asia-southeast1.firebasedatabase.app/requests/c3.json`);

        const responseData=await response.json();
        // console.log(responseData)

        if (!response.ok) {
            const error=new Error(responseData.message || "Failed to fetch request to server");
            throw error;
        }
        const newRequest=[];
        for (const key in responseData){
            const request={
                id:key,
                coachId:coachId,
                userEmail:responseData[key].userEmail,
                message:responseData[key].message,
            };
            newRequest.push(request);
            // console.log(newRequest)
        }
        context.commit('setRequest',newRequest);

        
    }
}