var periods = require('./periods')

module.exports = function(value) {
	if (!value) {
		return null
	}
	var key = value.split(':', 2)[0].toLowerCase()
	var period
	for (var pname in periods) {
		if (periods.hasOwnProperty(pname)) {
			if (pname.toLowerCase() === key) {
				period = periods[pname]
			}
		}
	}
	if (period) {
		return period.create({value: value})
	} else {
		return null
	}
}
