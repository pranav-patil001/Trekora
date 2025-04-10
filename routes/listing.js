const express = require('express');
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const ExpressError = require("../utils/ExpressError.js");
const {listingSchema, reviewSchema } = require("../schema.js");
const Listing = require("../models/listing.js");
const { isLoggedIn, isOwner, validateListing} = require("../middleware.js");
const listingController = require("../controllers/listings.js");

const multer  = require('multer');
const {storage} = require("../cloudConfig.js");
const { validate } = require('../models/review.js');
const upload = multer({ storage });

router.get("/search", listingController.searchListing);

router.route("/")
.get(wrapAsync (listingController.index))
.post(
    isLoggedIn,
    upload.single('listing[image]'),
    validateListing,
    wrapAsync(listingController.createListing)
);


//New Route
router.get("/new",  isLoggedIn, listingController.renderNewForm);

router.route("/:id")
.get(wrapAsync(listingController.showListing))
.put(
    isLoggedIn,
    isOwner,
    upload.single('listing[image]'),
    validateListing,
     wrapAsync(listingController.updateListing)
)
.delete(
    isOwner,
    isLoggedIn, wrapAsync(listingController.destroyListing)
);








//Edit route
router.get("/:id/edit",isLoggedIn, wrapAsync(listingController.renderEditForm ));






module.exports = router;
