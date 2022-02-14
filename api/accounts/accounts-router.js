const router = require('express').Router()
const Account = require ('./accounts-model')
const md = require('./accounts-middleware')

router.get('/', async (req, res, next) => {
  try {
    const accounts = await Account.getAll()
   res.json(accounts)
  } catch (err) {
    next (err)
  }
 });  
 //important - use this as default test ... use next to pass error down to router.use. 17:40 of mod solution video
//  try {
//   throw new Error('argh!!!')
// } catch (err) {
//   next (err)
// }
// }); 
  
router.get('/:id', md.checkAccountId, async (req, res, next) => {
  try {
    const accounts = await Account.getById(req.params.id)
    res.json(accounts)
  } catch (err) {
    next (err)
  }
 });

router.post('/',
md.checkAccountPayload,
md.checkAccountNameUnique,
 (req, res, next) => {
  try {
    res.json('post account!')
  } catch (err) {
    next (err)
  }
 });

router.put('/:id', 
md.checkAccountId,
md.checkAccountPayload,
md.checkAccountNameUnique,
(req, res, next) => {
  try {
    res.json('update account!')
  } catch (err) {
    next (err)
  }
 });

router.delete('/:id',
md.checkAccountId,
 (req, res, next) => {
  try {
    res.json('delete account!')
  } catch (err) {
    next (err)
  }
 });

router.use((err, req, res, next) => { // eslint-disable-line
  res.status(err.status || 500).json({
    message: err.message,
  })
 })

module.exports = router;
