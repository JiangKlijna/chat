
// util
window.util = {
    random_choose: function (arr) {
        return arr[parseInt(Math.random()*arr.length)];
    },
    toUpperTitle: function (str) {
        if (str.indexOf('-') >= 0) {
            var arr = str.split('-');
            for (var i in arr) {
                arr[i] = window.util.toUpperTitle(arr[i]) + ' ';
            }
            return arr.join('');
        } else {
            return str.substring(0, 1).toUpperCase() + str.substring(1);
        }
    }
};
