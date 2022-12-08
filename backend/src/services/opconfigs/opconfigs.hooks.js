const { authenticate } = require('@feathersjs/authentication').hooks;
const { setField } = require('feathers-authentication-hooks');

const limitToUser = setField({
  from: 'params.users.id',
  as: 'params.query.userId'
});
const restrictFind = (context) => {
  if (context.params) {
    if (context.params.users) {
      if (context.params.users.role == "ADMIN" || context.params.users.role == "SUPERADMIN") {
        return context;
      } else {
        limitToUser(context);
      }
    }

  }

};

const assignConfig = async function(context){
if(context.data.userId){
  const paymentAmount = context.data.amountGiven
  delete context.data.amountGiven
    const userId = context.data.userId
    
    const res = await context.app.service('/api/opStocks').find({
      query:{

        userId : userId,
        $total: true
      }
    }) 
    console.log(res)
    const totalAmount = context.data.totalAmountGiven
    let Spent = 0
    for (var i=0; i<res.length; i++){
      Spent = Spent + res[i].amountSpent
    }
    context.data['totalAmountLeft'] = totalAmount - Spent

    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();
    today = mm + '/' + dd + '/' + yyyy;
    context.data['lastUpdateAt'] = today
    await context.app.service('/api/oppaymentdetails').create({
      userId: userId,
      paymentAmount: paymentAmount,
      updatedBalance: totalAmount - Spent,
      paymentDate: today
    })
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

module.exports = {
  before: {
    all: [ authenticate('jwt') ],
    find: [TotalValues,restrictFind],
    get: [],
    create: [assignConfig],
    update: [],
    patch: [assignConfig],
    remove: [limitDelete],
  },

  after: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
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
