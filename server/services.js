const requestPromise = require('request-promise');

const fullName = {
    name: 'Dionisio',
    lastname: 'Hernandez'
}

const apiML = 'https://api.mercadolibre.com'

//utils

const formattedQuery = (data, item) => {

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
            id: data.id,
            title: data.title,
            price: formattedPrice(data.price, data.currency_id),
            picture: (item) ? formattedImage(data.pictures) : data.thumbnail,
            condition: (data.condition === 'new') ? "Nuevo" : (data.condition === 'used') ? "Usado" : "No especificado",
            sold_quantity: data.sold_quantity,
            free_shipping: data.shipping.free_shipping,
            state_name: (!item) ? data.address.state_name : ''
        };

    if(item){
        objectItem.author= {

                name: fullName.name,
                lastname: fullName.lastname

        }
    }

    return objectItem
};

const mapCategories = (categories) => categories.map(category => category.name);

//services

function getItems(req, res) {

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

}

function getItem(req, res) {
    
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
            .then(dataItem => {

                const dataItemJson = JSON.parse(dataItem.body);

                if (dataItem.statusCode === 200) {

                    let dataReturn = formattedQuery(dataItemJson, true),
                        optionsSecondPromiseCategories = {
                            method: 'GET',
                            uri: `${apiML}/categories/${dataItemJson.category_id}`,
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


                } else if (dataItem.statusCode === 404) {
                    res.status(404).json("not found")
                }


            })
            .catch((e) => {
                res.status(503).json(e)
            })


    }
}

module.exports = {
    getItem,
    getItems,
  };