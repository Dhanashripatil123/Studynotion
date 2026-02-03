//TODO: put IsAdmin Middleware here
router.post("/createCategory",auth,isAdmin,createCategory)
router.get("/showAllCategory",Category)
router.post("/createCategory",auth,isAdmin,createCategory)
