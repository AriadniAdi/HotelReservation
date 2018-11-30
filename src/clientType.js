const clientType = {
    REWARDS: 'rewards',
    REGULAR: 'regular',

    isValid: function(type) {
        return type.toLowerCase() === this.REWARDS || type.toLowerCase() === this.REGULAR
    }
}

module.exports = clientType;