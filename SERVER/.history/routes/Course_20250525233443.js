//TODO: put IsAdmin Middleware here
router.post("/createCategory",auth,isAdmin,createCategory)
router.get("/showAllCategory",shoCategory)
router.post("/createCategory",auth,isAdmin,createCategory)
