const _ = require('lodash');

module.exports = {
    // Generic error handler used by all endpoints.
    handleError: function (res, reason, message, code) {
        console.log('handleError', message, reason);
        res.status(code || 500).send(message);
    },

    APIResponse: function  (res, options){
        return (err, doc) => {
            if (err) {
                console.log("ERROR: ", err);
                this.handleError(res, err.message);
            } else {
                res.status(200).json(doc);
            }
        }
    },

    socketResponse: function  (err, message, data){
        let response = {
            error: err,
            message: message,
            data: data
        };
        if(err)
            console.log(response);
        return response;
    },

    getOrderedCollection: function (collection, docs) {

        let userSortedMediaIds = _(collection).orderBy(['number'], ['desc']).map((elem) => elem.media_id.toString()).value();
        let sortedMedia = _.orderBy(docs, (media) => {
            return userSortedMediaIds.indexOf(media._id.toString());
        },['asc']);

        return sortedMedia;

    }


};