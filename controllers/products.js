var app = angular.module('ShoppingListModule', []);

app.controller('ProductListController', ['$http', '$scope', function ($http, $scope) {
    $scope.products = [];
    $scope.total = 0;
    //calculate total cost ammount function
    $scope.calcTotal = function (products) {
        $scope.total = 0;
        for (let product of products)
            $scope.total += product.quantity * product.cost;
    }
    //get all products from API and save current state (use factories for prod. apps!)
    $scope.getAllprods = function () {
        $http.get('/api/products').then(
            (res) => {
                $scope.products = res.data;
                $scope.calcTotal($scope.products);
                console.log(res.data);
            },
            (res) => {
                console.log(res.status + " " + res.statusText);
            });
    };
    $scope.getAllprods();

    //make an api call to add a product into the database 
    $scope.formData = {};
    $scope.addProduct = function () {
        $http.post('/api/products', $scope.formData).then(
            (res) => {
                console.log('Success ' + res.status);
                $scope.getAllprods();
                $scope.formData = {};
            },
            (res) => {
                console.log(res.status + " " + res.statusText);
            }
        )
    };

    //make an api call to delete a product from the database
    $scope.deleteProduct = function (id) {
        $http.delete('/api/products/' + id).then(
            (res) => {
                console.log('Success ' + res.status);
                $scope.getAllprods();
            },
            (res) => {
                console.log('Error ' + res.status);
            }
        )
    };

}]);