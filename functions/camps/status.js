module.exports = {
  path: "camps/status",
  latest: 1,
  versions: [
    {
      version: 1,
      params: {},
      async function() {
        return {
          status: "success",
          data: [
            {id:"overall",title:"Overall",status:"ongoing"},
            {id:"week1",title:"Week 1",status:"finalresults"},
            {id:"week2",title:"Week 2",status:"finalresults"},
            {id:"week3",title:"Week 3",status:"finalresults"},
            {id:"week4",title:"Week 4",status:"finalresults"},
          ],
        }
      }
    }
  ]
}
//comingsoon
//leaderboardsoon
//ongoing
//resultssoon
//finalresults