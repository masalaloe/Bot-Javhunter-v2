exports.reload = function (e) {
    delete require.cache[require.resolve(e)];
};