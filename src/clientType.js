const clientType = {
    REWARD: 'reward',
    REGULAR: 'regular',

    isValid: function(type) {
        return type.toLowerCase() === this.REWARD || type.toLowerCase() === this.REGULAR
    }
}

module.exports = clientType;