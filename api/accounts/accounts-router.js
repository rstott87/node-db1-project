const router = require('express').Router()
const Account = require ('./accounts-model')


router.get('/', (req, res, next) => {
  try {
   res.json('update account!')
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
  
router.get('/:id', (req, res, next) => {
  try {
    res.json('update account id!')
  } catch (err) {
    next (err)
  }
 });

router.post('/', (req, res, next) => {
  try {
    res.json('post account!')
  } catch (err) {
    next (err)
  }
 });

router.put('/:id', (req, res, next) => {
  try {
    res.json('update account!')
  } catch (err) {
    next (err)
  }
 });

router.delete('/:id', (req, res, next) => {
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
