//TODO: put IsAdmin Middleware here
router.post("/createCategory",auth,isAdmin,createCategory)
router.get("/showAllCategory",showCategory)
router.post("/createCategory",auth,isAdmin,createCategory)
