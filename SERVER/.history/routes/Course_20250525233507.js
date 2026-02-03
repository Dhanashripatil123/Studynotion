//TODO: put IsAdmin Middleware here
router.post("/createCategory",auth,isAdmin,createCategory)
router.get("/showAllCategory",showAllCategory)
router.post("/getCategoryPage",auth,isAdmin,createCategory)
