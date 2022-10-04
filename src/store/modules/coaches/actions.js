export default {
  async registerCoach(context, data) {
    const userId = context.rootGetters.userId;
    const coachData = {
      // id:'c3',

      firstName: data.first,
      lastName: data.last,
      description: data.desc,
      hourlyRate: data.rate,
      areas: data.areas,
    };
    const response = await fetch(
      `https://vue-http-demo-4a8d2-default-rtdb.asia-southeast1.firebasedatabase.app/coaches/${userId}.json`,
      {
        method: 'PUT',
        body: JSON.stringify(coachData),
      }
    );

    // const responseData=await response.json();

    if (!response.ok) {
      //
    }
    // context.commit('registerCoach', coachData);
    context.commit('registerCoach', {
      ...coachData,
      id: userId,
    });
  },

  async loadCoaches(context) {
    const response = await fetch(
      `https://vue-http-demo-4a8d2-default-rtdb.asia-southeast1.firebasedatabase.app/coaches.json`
    );

    const responseData = await response.json();

    if (!response.ok) {
      const error=new Error(responseData.message || "Failed to fetch from server");
      throw error;
    }

    const coaches = [];

    for (const key in responseData) {
      const coach = {
        id: key,
        firstName: responseData[key].firstName,
        lastName: responseData[key].lastName,
        description: responseData[key].description,
        hourlyRate: responseData[key].hourlyRate,
        areas: responseData[key].areas,
      };
      coaches.push(coach);
    }
    context.commit('setCoaches',coaches)
  },
};
