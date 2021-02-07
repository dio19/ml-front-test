const express = require('express');
const router = express.Router();
const requestPromise = require('request-promise');

const fullName = {
    name: 'Dionisio',
    lastname: 'Hernandez'
}

const apiML = 'https://api.mercadolibre.com'

//utils

const formattedQuery = (arrayToGetData, individualItem) => {

    const formattedPrice = (amount, currency) => {

        let arrayAmount = amount.toString().split(".");
        return {
            currency: currency,
            amount: arrayAmount[0].replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1."),
            decimals: (arrayAmount[1] === undefined) ? '00' : arrayAmount[1]
        }
    };

    const formattedImage = (arrayPictures) => {

        let niceImage = arrayPictures.find(picture => {
            let arraySize = picture.size.split("x");
            return arraySize[0] > 400 && arraySize[1] > 400
        });
        if (niceImage === undefined) {
            return arrayPictures[0].secure_url
        } else {
            return niceImage.secure_url

        }

    };

    let objectItem =
        {
            id: arrayToGetData.id,
            title: arrayToGetData.title,
            price: formattedPrice(arrayToGetData.price, arrayToGetData.currency_id),
            picture: (individualItem) ? formattedImage(arrayToGetData.pictures) : arrayToGetData.thumbnail,
            condition: (arrayToGetData.condition === 'new') ? "Nuevo" : (arrayToGetData.condition === 'used') ? "Usado" : "No especificado",
            sold_quantity: arrayToGetData.sold_quantity,
            free_shipping: arrayToGetData.shipping.free_shipping,
            state_name: (!individualItem) ? arrayToGetData.address.state_name : ''

        };

    if(individualItem){
        objectItem.author= {

                name: fullName.name,
                lastname: fullName.lastname

        }
    }

    return objectItem
};

const mapCategories = (arrayCategories) => arrayCategories.map(category => category.name);

//routes

router.get('/items', function (req, res) {

    const query = req.query.q;

    if (query === undefined) {
        res.status(400).json("Bad Request")
    } else {
        let optionsRequestPromise = {
            method: 'GET',
            uri: `${apiML}/sites/MLA/search?q=${query}&limit=4`,
            resolveWithFullResponse: true
        };
        requestPromise(optionsRequestPromise)
            .then(resultQuerySearchItem => {

                const bodyRequest = JSON.parse(resultQuerySearchItem.body)

                if (bodyRequest.results.length > 0) {

                    let objectCategories='',
                    arrayCategories=[false];

                    if(bodyRequest.filters.length>0){

                        objectCategories = bodyRequest.filters.find(filter => filter.id === 'category');

                         arrayCategories = objectCategories.values.map(value => mapCategories(value.path_from_root));
                    }


                    let objectReturn = {
                        author: {
                            name: fullName.name,
                            lastname: fullName.lastname
                        },
                        categories: arrayCategories[0],
                        items: bodyRequest.results.map(item => formattedQuery(item, false))
                    };


                    res.status(200).json(objectReturn);
                } else {
                    res.status(404).json("Not found")
                }

            })
            .catch(e => res.status(503).json(e))
    }

});

router.get('/items/:id', function (req, res) {
    
    const id = req.params.id

    if (id === undefined) {
        res.status(400).json("Bad Request")
    } else {

        let optionsFirstPromise = {
            method: 'GET',
            uri: `${apiML}/items/${id}`,
            resolveWithFullResponse: true
        };


        requestPromise(optionsFirstPromise)
            .then(principalDataItem => {

                const principalDataItemJson = JSON.parse(principalDataItem.body);

                if (principalDataItem.statusCode === 200) {

                    let dataReturn = formattedQuery(principalDataItemJson, true),
                        optionsSecondPromiseCategories = {
                            method: 'GET',
                            uri: `${apiML}/categories/${principalDataItemJson.category_id}`,
                            resolveWithFullResponse: true
                        },
                        optionsThirdPromiseDescription = {
                            method: 'GET',
                            uri: `${apiML}/items/${id}/description`,
                            resolveWithFullResponse: true
                        };

                    requestPromise(optionsSecondPromiseCategories)
                        .then(categoriesItem => {


                            const categoriesItemJson = JSON.parse(categoriesItem.body);

                            dataReturn.categories = mapCategories(categoriesItemJson.path_from_root);

                            requestPromise(optionsThirdPromiseDescription)
                                .then(descriptionDataItem => {

                                    const descriptionDataJson = JSON.parse(descriptionDataItem.body);

                                    if (descriptionDataItem.statusCode === 200) {

                                        dataReturn.description = descriptionDataJson.plain_text;

                                        res.status(200).json(dataReturn);
                                    } else {
                                        dataReturn.description = false;

                                        res.status(200).json(dataReturn);
                                    }

                                })
                                .catch(e => res.status(503).json(e))

                        })


                } else if (principalDataItem.statusCode === 404) {
                    res.status(404).json("not found")
                }


            })
            .catch(e => res.status(503).json(e))


    }
});

module.exports = router;