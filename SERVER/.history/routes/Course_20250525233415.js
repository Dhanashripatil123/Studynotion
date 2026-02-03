//TODO: put IsAdmin Middleware here
router.post("/createCategory",auth,isAdmin,createCategory)
router.get("/createCategory",auth,isAdmin,createCategory)
router.post("/createCategory",auth,isAdmin,createCategory)
