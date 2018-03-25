var app = angular.module('ShoppingListModule', []);

app.controller('ProductListController', ['$http', '$scope', function ($http, $scope) {
    list = this;
    list.products = [];
    list.total = 0;
    //global calculate total cost ammount function
    list.calcTotal = function (product) {
        list.total += product.quantity * product.cost;
    }
    //get all products from API and save current state
    var getAllprods = () => {
        $http.get('/api/products').then(
            (res) => {
                list.products = res.data;
                for (i = 0; i < list.products.length; i++)
                    list.calcTotal(list.products[i]);
                console.log(res.data);
            },
            (res) => {
                console.log(res.status + " " + res.statusText);
            });
    };
    getAllprods();

    //make an api call to add a product into the database 
    $scope.formData = {};
    list.addProduct = function () {
        $http.post('/api/products', $scope.formData).then(
            (res) => {
                list.products.push($scope.formData); //fully utilize 2way data-binding
                list.calcTotal($scope.formData);
                $scope.formData = {};
                console.log("success adding");
            },
            (res) => {
                console.log(res.status + " " + res.statusText);
            }
        )
    };

}]);