const { FeathersError } = require('@feathersjs/errors');

const { authenticate } = require('@feathersjs/authentication').hooks;

const assignUserId = async function(context){
  if (context.data.Title && context.params.users.role=='OPUSER'){
    context.data['userId'] = context.params.users.id
  }
  else{
    throw new FeathersError("Not A Valid User",
    "Error",
    401,
    "CMS",
    { msg: "Not Authenticated" })
  }
}

const TotalValues = async function(context){

  if (context.params.query && context.params.query.$total){
    delete context.params.query.$total
    context.params.paginate = false
    context.params._populate = true
  }
}
const limitDelete = async function(context){
  if (context.params.users.role=='ENDUSER' || context.params.users.role=='OPUSER'){
    throw new FeathersError(
      "Not A Valid User",
      "Error",
      401,
      "CMS",
      { msg: "Not Authenticated" }
    );
  }
  
}
const updateConfigs = async function(context){
  const userId = context.params.users.id
  const res = await context.app.service('/api/opStocks').find({
    query:{

      userId : userId,
      $total: true
    }
  }) 
  const res1 = await context.app.service('/api/opconfigs').find({
    query:{

      userId : userId,
      $total: true
    }
  })
  const totalAmount = res1[0].totalAmountGiven
    let Spent = 0
    for (var i=0; i<res.length; i++){
      Spent = Spent + res[i].amountSpent
    } 
  const totalAmountLeft = totalAmount - Spent
  var today = new Date();
  var dd = String(today.getDate()).padStart(2, '0');
  var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
  var yyyy = today.getFullYear();
  today = mm + '/' + dd + '/' + yyyy;
  await context.app.service('/api/opconfigs').patch(res1[0].id,{
    lastUpdateAt: today,
    totalAmountLeft: totalAmountLeft
  })

}

module.exports = {
  before: {
    all: [ authenticate('jwt') ],
    find: [TotalValues],
    get: [],
    create: [assignUserId],
    update: [],
    patch: [],
    remove: [limitDelete]
  },

  after: {
    all: [],
    find: [],
    get: [],
    create: [updateConfigs],
    update: [],
    patch: [updateConfigs],
    remove: []
  },

  error: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  }
};
