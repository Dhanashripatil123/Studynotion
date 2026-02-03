//TODO: put IsAdmin Middleware here
router.post("/createCategory",auth,isAdmin,createC)