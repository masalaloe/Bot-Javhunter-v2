exports.checkRole = function (e, f) {
    var e = e.member.roles.cache.array();
    var f = f.split(",");

    for (idx = 0; idx < e.length; ++idx) {
        if (f.includes(e[idx].id)) { return true}
    }
    return false;
};