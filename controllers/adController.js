const { adModel } = require('../models');

function getAds(req, res, next) {

    const limit = Number(req.query.limit) || 0;

    adModel.find()
        .sort({ created_at: -1 })
        .limit(limit)
        .populate('userId')
        .then(ads => res.json(ads))
        .catch(next);
}

function getAdsByUserId(req, res, next) {

    const { _id: userId } = req.user;


    adModel.find({ userId: userId })
        .sort({ created_at: -1 })
        .limit()
        .populate('userId')
        .then(ads => res.json(ads))
        .catch(next);


}

function searchAd(req, res, next) {

    let params = {};
    let sortValues = {};

    if (req.query.brand != undefined && req.query.brand != '')
        params.brand = req.query.brand;

    if (req.query.model != undefined && req.query.model != '')
        params.model = req.query.model;

    if (req.query.engineType != undefined && req.query.engineType != '')
        params.engineType = req.query.engineType;

    if (req.query.manifactureDate != undefined && req.query.manifactureDate != '')
        params.manifactureDate = req.query.manifactureDate;

    if (req.query.maxPrice != undefined && req.query.maxPrice != '')
        params.price = { $gte: +req.query.maxPrice };

    if (req.query.transmission != undefined && req.query.transmission != '')
        params.transmission = req.query.transmission;

    if (req.query.order != undefined && req.query.order != '') {
        let a = req.query.order.toString()
        sortValues[`${a}`] = 1;
    }

    adModel.find(params)
        .sort(sortValues)
        .populate('themeId userId')
        .then(posts => {
            res.status(200).json(posts)
        })
        .catch(next);

}

function deleteAd(req, res, next) {
    const { adId } = req.params;

    adModel.deleteOne({ _id: adId })
        .then(x => {
            if (x.n == 1) {
                res.status(200).json(x)
            }

            else {
                res.status(400).json({ message: `Not allowed!` });
            }

        })
        .catch(next);

}

function getAd(req, res, next) {
    const { adId } = req.params;

    adModel.findById(adId)
        // .populate({
        //     path: 'posts',
        //     populate: {
        //         path: 'userId'
        //     }
        // })
        .populate({ path: 'userId' })
        .then(ad => res.json(ad))
        .catch(next);

}

function createAd(req, res, next) {
    const brand = req.body.brand;
    const model = req.body.model;
    const pictures = req.body.pictures;
    const manifactureDate = req.body.manifactureDate;
    const engineType = req.body.engineType;
    const transmission = req.body.transmission;
    const category = req.body.category;
    const mileage = req.body.mileage;
    const color = req.body.color;
    const price = +req.body.price;
    const currency = req.body.currency;
    const moreInfo = req.body.moreInfo;
    //const postText = req.body.moreInfo;

    const { _id: userId } = req.user;

    adModel.create(
        {
            brand,
            model,
            pictures,
            manifactureDate,
            engineType,
            transmission,
            category,
            mileage,
            color,
            userId,
            price,
            currency,
            moreInfo
        })
        .then(updatedAd => res.status(200).json(updatedAd))
        //.then(ad => { newPost(postText, userId, ad._id).then(([_, updatedAd]) => res.status(200).json(updatedAd))})
        .catch(next);
}

function subscribe(req, res, next) {
    const adId = req.params.themeId;
    const { _id: userId } = req.user;
    adModel.findByIdAndUpdate({ _id: adId }, { $addToSet: { subscribers: userId } }, { new: true })
        .then(updatedAd => {
            res.status(200).json(updatedAd)
        })
        .catch(next);
}


function updateAd(req, res, next) {

    const brand = req.body.brand;
    const model = req.body.model;
    const manifactureDate = req.body.manifactureDate;
    const engineType = req.body.engineType;
    const transmission = req.body.transmission;
    const category = req.body.category;
    const mileage = req.body.mileage;
    const color = req.body.color;
    const price = +req.body.price;
    const currency = req.body.currency;
    const moreInfo = req.body.moreInfo;

    const { adId } = req.params;
    const { _id: userId } = req.user;

    // if the userId is not the same as this one of the post, the post will not be updated
    adModel.findOneAndUpdate({ _id: adId, userId }, {
        moreInfo: moreInfo,
        currency: currency,
        price: price,
        color: color,
        mileage: mileage,
        category: category,
        transmission: transmission,
        engineType: engineType,
        manifactureDate: manifactureDate,
        model: model,
        brand: brand
    }, { new: true })
        .then(updatedAd => {
            if (updatedAd) {
                res.status(200).json(updatedAd);
            }
            else {
                res.status(401).json({ message: `Not allowed!` });
            }
        })
        .catch(next);
}

module.exports = {
    getAds,
    createAd,
    getAd,
    subscribe,
    searchAd,
    getAdsByUserId,
    deleteAd,
    updateAd
}
