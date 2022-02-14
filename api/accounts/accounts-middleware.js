const Account = require('./accounts-model')
const db = require('../../data/db-config')


exports.checkAccountPayload = (req, res, next) => {
  // DO YOUR MAGIC
  // Note: you can either write "manual" validation logic
  // or use the Yup library (not currently installed)
  const error = { status: 400 }
  const { name, budget } = req.body 
  if (name === undefined || budget === undefined) {
    error.message = "name and budget are required"
    next(error)
  } else if (typeof name !== 'string') {
    error.message = "name must be a string" //note - why not working????
    next(error)
  } else if (name.trim().length < 3 ||name.trim().length > 100) {
    error.message = 'name of acct must be bet 3 and 100'
    next(error)
  } else if (typeof budget !== 'number') {
    error.message = 'budget of account must be a number'
    next(error)
  }else if (budget < 0 ||budget > 1000000) {
    error.message = 'budget of account is too large or too small'
    next(error)
  }
}

exports.checkAccountNameUnique = (req, res, next) => {
  // DO YOUR MAGIC
 try {
  const existing = await ('accounts')
  .where('name', req.body.name.trim())
  .first()

if(existing) {
  next({status:400, message: 'that name is taken'})
} else{
  next()
  }
 } catch (err) {
   next(err)
 }
}

exports.checkAccountId = async (req, res, next) => {
  // DO YOUR MAGIC
  try {
    const account = await Account.getById(req.params.id)
    if (!account) {
      next({status: 404, message: 'not found' })
    } else {
      req.account = account
      next()
    }
  } catch(err) {

  }
}

//notes - added the console.logs and nexts, 23:00 min