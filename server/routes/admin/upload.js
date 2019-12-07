const Router = require('koa-router')
const router = new Router({mergeParams: true})
router.prefix('/admin/api/upload')

const multer = require('@koa/multer')
const upload = multer({dest: __dirname + '/../../uploads'})

router.post('/', upload.single('file'), async (ctx, next) => {
  const file = ctx.file
  file.url = `http://localhost:3000/${file.filename}`
  ctx.body = file
})




module.exports = router
