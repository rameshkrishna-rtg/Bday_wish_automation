

route.post("/email", upload.single("attachments"), sendBirthdayWishes)

module.exports = route
