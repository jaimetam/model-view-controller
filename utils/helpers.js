const moment = require('moment');

module.exports = {
    formatDate: (date, format = 'MM-DD-YYYY') => {
        return moment(date).isValid() ? moment(date).format(format) : 'Invalid date';
    }
};